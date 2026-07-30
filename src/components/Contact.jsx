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
    <section id="contact" className="bg-slate-900 py-24 text-white">
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
            Contact <span className="text-cyan-400">Me</span>
          </h2>

          <p className="text-gray-400 mt-4">
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

            <div className="flex items-center gap-5 bg-slate-800 p-6 rounded-2xl">
              <FaEnvelope className="text-cyan-400 text-3xl" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-400">
                  {about.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-slate-800 p-6 rounded-2xl">
              <FaPhoneAlt className="text-cyan-400 text-3xl" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-400">
                  {about.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-slate-800 p-6 rounded-2xl">
              <FaMapMarkerAlt className="text-cyan-400 text-3xl" />
              <div>
                <h3 className="font-bold">Location</h3>
                <p className="text-gray-400">
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
            className="bg-slate-800 p-8 rounded-2xl space-y-5"
          >

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-cyan-400 resize-none"
            />

            {status.state === "error" && (
              <p className="text-red-400 text-sm">{status.message}</p>
            )}
            {status.state === "success" && (
              <p className="text-green-400 text-sm">{status.message}</p>
            )}

            <button
              type="submit"
              disabled={status.state === "loading"}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-lg font-bold transition disabled:opacity-60"
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
