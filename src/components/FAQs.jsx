import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { getFAQs } from "../services/faqService";

const FALLBACK_FAQS = [
  {
    question: "Who are you?",
    answer:
      "I'm Mukhtar Shah, a Full Stack Developer passionate about building modern and scalable web applications.",
  },
  {
    question: "Which technologies do you work with?",
    answer:
      "I mainly work with React.js, Node.js, Express.js, MongoDB, JavaScript, Tailwind CSS, and Bootstrap.",
  },
  {
    question: "Are you available for freelance or internships?",
    answer:
      "Yes! I'm open to internships, freelance projects, and full-time opportunities.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can contact me through the Contact section, email, or LinkedIn.",
  },
  {
    question: "Do you build responsive websites?",
    answer:
      "Yes. Every project I build is fully responsive and works smoothly on desktop, tablet, and mobile devices.",
  },
];

const FAQs = () => {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getFAQs()
      .then((res) => {
        if (res?.data?.length) setFaqs(res.data);
      })
      .catch(() => {
        // keep fallback faqs if backend/data not available yet
      });
  }, []);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section id="faqs" className="bg-white py-24 text-slate-900">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>

          <p className="text-slate-500 mt-4">
            Here are some common questions about me and my work.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq._id || index}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 transition-colors duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>

                <FaChevronDown
                  className={`transition-transform duration-300 flex-shrink-0 ml-4 ${
                    active === index ? "rotate-180 text-emerald-600" : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-slate-500 leading-7">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQs;