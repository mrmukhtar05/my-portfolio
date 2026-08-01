import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getAbout } from "../services/aboutService";
import { sendContactMessage } from "../services/contactService";

const Contact = () => {
  const [about, setAbout] = useState({
    email: "yourmail@gmail.com",
    phone: "+91 XXXXX XXXXX",
    location: "Maharashtra, India",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    getAbout()
      .then((res) => res?.data && setAbout((prev) => ({ ...prev, ...res.data })))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ state: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      setStatus({ state: "loading", message: "" });
      await sendContactMessage(form);
      setStatus({ state: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error?.response?.data?.message || "Something went wrong. Try again.",
      });
    }
  };

  return (
    <section id="contact" className="bg-white py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            Contact <span className="text-emerald-600">Me</span>
          </h2>

          <p className="text-slate-500 mt-4">
            Have a project in mind? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <div className="flex items-center gap-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <FaEnvelope className="text-emerald-600 text-3xl flex-shrink-0" />
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap min-w-0">
                <h3 className="font-bold text-slate-900 flex-shrink-0">Email:</h3>
                <p className="text-slate-500 truncate">
                  {about.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <FaPhoneAlt className="text-emerald-600 text-3xl flex-shrink-0" />
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap min-w-0">
                <h3 className="font-bold text-slate-900 flex-shrink-0">Phone:</h3>
                <p className="text-slate-500 truncate">
                  {about.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <FaMapMarkerAlt className="text-emerald-600 text-3xl flex-shrink-0" />
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap min-w-0">
                <h3 className="font-bold text-slate-900 flex-shrink-0">Location:</h3>
                <p className="text-slate-500 truncate">
                  {about.location}
                </p>
              </div>
            </div>

          </motion.div>

          {/* Right Side */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-5"
          >

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500"
            />

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500"
            />

            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 resize-none"
            />

            {status.state === "error" && (
              <p className="text-red-500 text-sm">{status.message}</p>
            )}
            {status.state === "success" && (
              <p className="text-emerald-600 text-sm">{status.message}</p>
            )}

            <button
              type="submit"
              disabled={status.state === "loading"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold transition disabled:opacity-60"
            >
              {status.state === "loading" ? "Sending..." : "Send Message"}
            </button>

          </motion.form>

        </div>

      </div>
    </section>
  );
};

export default Contact;