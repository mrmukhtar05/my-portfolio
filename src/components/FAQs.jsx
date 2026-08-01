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
        if (res?.data?.length) {
          setFaqs(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="bg-white py-12 sm:py-20 lg:py-24 text-slate-900"
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Frequently Asked{" "}
            <span className="text-emerald-600">
              Questions
            </span>
          </h2>

          <p className="text-[9px] sm:text-sm lg:text-base text-slate-500 mt-2 sm:mt-4 leading-4 sm:leading-6">
            Here are some common questions about me and my work.
          </p>
        </motion.div>

        {/* FAQ */}
        <div className="space-y-2 sm:space-y-4">

          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              className="
                bg-slate-50
                border
                border-slate-200
                rounded-md
                sm:rounded-xl
                overflow-hidden
                hover:border-emerald-400
                transition-colors
                duration-300
              "
            >

              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="
                  w-full
                  flex
                  justify-between
                  items-center
                  text-left
                  px-2.5
                  py-2.5
                  sm:px-5
                  sm:py-4
                "
              >
                <h3
                  className="
                    text-[9px]
                    sm:text-sm
                    lg:text-base
                    font-semibold
                    text-slate-900
                    leading-3.5
                    sm:leading-5
                    pr-2
                    break-words
                  "
                >
                  {faq.question}
                </h3>

                <FaChevronDown
                  className={`
                    text-[8px]
                    sm:text-xs
                    flex-shrink-0
                    ml-2
                    transition-transform
                    duration-300
                    ${
                      active === index
                        ? "rotate-180 text-emerald-600"
                        : "text-slate-400"
                    }
                  `}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <p
                      className="
                        px-2.5
                        pb-2.5
                        sm:px-5
                        sm:pb-4
                        text-[8px]
                        sm:text-xs
                        lg:text-sm
                        text-slate-500
                        leading-3.5
                        sm:leading-5
                        break-words
                      "
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FAQs;