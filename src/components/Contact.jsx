import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
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

  const [status, setStatus] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    getAbout()
      .then((res) => {
        if (res?.data) {
          setAbout((prev) => ({
            ...prev,
            ...res.data,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {
      setStatus({
        state: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    try {
      setStatus({
        state: "loading",
        message: "",
      });

      await sendContactMessage(form);

      setStatus({
        state: "success",
        message: "Message sent successfully!",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error?.response?.data?.message ||
          "Something went wrong. Try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="bg-white py-12 sm:py-20 lg:py-24 text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">

        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-9 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Contact{" "}
            <span className="text-emerald-600">
              Me
            </span>
          </h2>

          <p className="text-[9px] sm:text-sm lg:text-base text-slate-500 mt-2 sm:mt-4 leading-4 sm:leading-6">
            Have a project in mind? Let's connect.
          </p>
        </motion.div>

        {/* ================= Main Grid ================= */}
        <div className="grid lg:grid-cols-2 gap-7 sm:gap-10 lg:gap-12">

          {/* ================= Left Side ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              grid
              grid-cols-3
              gap-2
              sm:flex
              sm:flex-col
              sm:gap-5
              lg:gap-6
            "
          >

            {/* ================= Email ================= */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                sm:justify-start
                gap-1
                sm:gap-5
                bg-slate-50
                border
                border-slate-200
                p-2
                sm:p-5
                lg:p-6
                rounded-lg
                sm:rounded-2xl
                hover:border-emerald-400
                transition
                text-center
                sm:text-left
                min-w-0
              "
            >
              <FaEnvelope
                className="
                  text-emerald-600
                  text-sm
                  sm:text-2xl
                  lg:text-3xl
                  flex-shrink-0
                "
              />

              <div className="min-w-0 w-full">
                <h3 className="font-bold text-[8px] sm:text-sm lg:text-base text-slate-900">
                  Email
                </h3>

                <p className="text-[7px] sm:text-xs lg:text-sm text-slate-500 mt-0.5 break-all leading-3 sm:leading-5">
                  {about.email}
                </p>
              </div>
            </div>

            {/* ================= Phone ================= */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                sm:justify-start
                gap-1
                sm:gap-5
                bg-slate-50
                border
                border-slate-200
                p-2
                sm:p-5
                lg:p-6
                rounded-lg
                sm:rounded-2xl
                hover:border-emerald-400
                transition
                text-center
                sm:text-left
                min-w-0
              "
            >
              <FaPhoneAlt
                className="
                  text-emerald-600
                  text-sm
                  sm:text-2xl
                  lg:text-3xl
                  flex-shrink-0
                "
              />

              <div className="min-w-0 w-full">
                <h3 className="font-bold text-[8px] sm:text-sm lg:text-base text-slate-900">
                  Phone
                </h3>

                <p className="text-[7px] sm:text-xs lg:text-sm text-slate-500 mt-0.5 break-words leading-3 sm:leading-5">
                  {about.phone}
                </p>
              </div>
            </div>

            {/* ================= Location ================= */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                sm:justify-start
                gap-1
                sm:gap-5
                bg-slate-50
                border
                border-slate-200
                p-2
                sm:p-5
                lg:p-6
                rounded-lg
                sm:rounded-2xl
                hover:border-emerald-400
                transition
                text-center
                sm:text-left
                min-w-0
              "
            >
              <FaMapMarkerAlt
                className="
                  text-emerald-600
                  text-sm
                  sm:text-2xl
                  lg:text-3xl
                  flex-shrink-0
                "
              />

              <div className="min-w-0 w-full">
                <h3 className="font-bold text-[8px] sm:text-sm lg:text-base text-slate-900">
                  Location
                </h3>

                <p className="text-[7px] sm:text-xs lg:text-sm text-slate-500 mt-0.5 break-words leading-3 sm:leading-5">
                  {about.location}
                </p>
              </div>
            </div>

          </motion.div>

          {/* ================= Right Side ================= */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              bg-slate-50
              border
              border-slate-200
              p-3
              sm:p-6
              lg:p-8
              rounded-xl
              sm:rounded-2xl
              space-y-3
              sm:space-y-4
              lg:space-y-5
            "
          >

            {/* Name */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="
                w-full
                p-2.5
                sm:p-3
                lg:p-4
                rounded-md
                sm:rounded-lg
                bg-white
                border
                border-slate-200
                text-[9px]
                sm:text-sm
                lg:text-base
                text-slate-900
                placeholder:text-slate-400
                outline-none
                focus:border-emerald-500
              "
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="
                w-full
                p-2.5
                sm:p-3
                lg:p-4
                rounded-md
                sm:rounded-lg
                bg-white
                border
                border-slate-200
                text-[9px]
                sm:text-sm
                lg:text-base
                text-slate-900
                placeholder:text-slate-400
                outline-none
                focus:border-emerald-500
              "
            />

            {/* Subject */}
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="
                w-full
                p-2.5
                sm:p-3
                lg:p-4
                rounded-md
                sm:rounded-lg
                bg-white
                border
                border-slate-200
                text-[9px]
                sm:text-sm
                lg:text-base
                text-slate-900
                placeholder:text-slate-400
                outline-none
                focus:border-emerald-500
              "
            />

            {/* Message */}
            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="
                w-full
                p-2.5
                sm:p-3
                lg:p-4
                rounded-md
                sm:rounded-lg
                bg-white
                border
                border-slate-200
                text-[9px]
                sm:text-sm
                lg:text-base
                text-slate-900
                placeholder:text-slate-400
                outline-none
                focus:border-emerald-500
                resize-none
              "
            />

            {/* Error */}
            {status.state === "error" && (
              <p className="text-red-500 text-[9px] sm:text-sm">
                {status.message}
              </p>
            )}

            {/* Success */}
            {status.state === "success" && (
              <p className="text-emerald-600 text-[9px] sm:text-sm">
                {status.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status.state === "loading"}
              className="
                w-full
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                py-2.5
                sm:py-3
                lg:py-4
                rounded-md
                sm:rounded-lg
                text-[9px]
                sm:text-sm
                lg:text-base
                font-bold
                transition
                disabled:opacity-60
              "
            >
              {status.state === "loading"
                ? "Sending..."
                : "Send Message"}
            </button>

          </motion.form>

        </div>
      </div>
    </section>
  );
};

export default Contact;