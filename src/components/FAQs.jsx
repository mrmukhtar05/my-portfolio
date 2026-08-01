import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getFAQs } from "../services/faqService";

const FALLBACK_FAQS = [
  {
    question: "What technologies do you work with?",
    answer:
      "I mainly work with React.js, Node.js, Express.js, MongoDB, JavaScript, Tailwind CSS and other modern web technologies.",
  },
  {
    question: "Are you available for freelance projects?",
    answer:
      "Yes, I am available for freelance and full-stack development projects depending on the requirements.",
  },
  {
    question: "Can you build a complete full-stack application?",
    answer:
      "Yes. I can build complete full-stack applications including frontend, backend, database integration, authentication and deployment.",
  },
  {
    question: "Do you create responsive websites?",
    answer:
      "Yes. I build responsive websites that work smoothly across mobile, tablet, laptop and desktop devices.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can contact me through the contact section, email, GitHub or LinkedIn.",
  },
];

const FAQs = () => {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    getFAQs()
      .then((res) => {
        if (res?.data?.length) {
          setFaqs(res.data);
        }
      })
      .catch(() => {
        // Keep fallback FAQs
      });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="
        py-14
        sm:py-20
        lg:py-24
        bg-white
        text-slate-900
      "
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ================= Heading ================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            text-center
            mb-10
            sm:mb-14
            lg:mb-16
          "
        >
          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-[28px]
              font-bold
            "
          >
            Frequently Asked{" "}
            <span className="text-emerald-500">
              Questions
            </span>
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              md:text-base
              lg:text-[18px]
              text-slate-500
              mt-3
              sm:mt-4
              max-w-xl
              mx-auto
              leading-5
              sm:leading-6
              lg:leading-7
            "
          >
            Find answers to some common questions about my
            skills, projects and development services.
          </p>
        </motion.div>

        {/* ================= FAQ List ================= */}

        <div className="space-y-3 sm:space-y-4 lg:space-y-5">

          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={faq._id || index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  sm:rounded-2xl
                  overflow-hidden
                  hover:border-emerald-400
                  transition-all
                  duration-300
                "
              >

                {/* ================= Question ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-3
                    text-left
                    px-4
                    py-4
                    sm:px-5
                    sm:py-5
                    lg:px-6
                    lg:py-6
                  "
                >
                  <span
                    className="
                      text-sm
                      sm:text-base
                      lg:text-[22px]
                      font-bold
                      text-slate-900
                      leading-5
                      sm:leading-6
                      lg:leading-7
                    "
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      shrink-0
                      w-7
                      h-7
                      sm:w-8
                      sm:h-8
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    {isOpen ? (
                      <FaMinus className="text-[10px] sm:text-xs" />
                    ) : (
                      <FaPlus className="text-[10px] sm:text-xs" />
                    )}
                  </span>
                </button>

                {/* ================= Answer ================= */}

                <AnimatePresence initial={false}>
                  {isOpen && (
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
                      className="overflow-hidden"
                    >
                      <div
                        className="
                          px-4
                          pb-4
                          sm:px-5
                          sm:pb-5
                          lg:px-6
                          lg:pb-6
                        "
                      >
                        <p
                          className="
                            text-[11px]
                            sm:text-sm
                            md:text-base
                            lg:text-[18px]
                            text-slate-500
                            leading-5
                            sm:leading-6
                            lg:leading-7
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default FAQs;