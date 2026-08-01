import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaCertificate,
  FaBriefcase,
  FaBookmark,
} from "react-icons/fa";
import { getJourneys } from "../services/journeyService";

const FALLBACK_JOURNEY = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    organization: "Chandrabhan Sharma College",
    startDate: "2022",
    endDate: "2025",
    type: "Education",
  },
  {
    title: "Started MERN Stack Journey",
    organization: "React • Node.js • Express • MongoDB",
    startDate: "2024",
    endDate: "Present",
    type: "Experience",
  },
  {
    title: "Built Real World Projects",
    organization: "Portfolio • Task Management • CRUD Apps",
    startDate: "2024",
    endDate: "Present",
    type: "Experience",
  },
  {
    title: "Open to Opportunities",
    organization: "Looking for Frontend / MERN Developer Roles",
    startDate: "Present",
    endDate: "",
    type: "Experience",
  },
];

const TYPE_ICON = {
  Education: <FaGraduationCap />,
  Experience: <FaCode />,
  Internship: <FaLaptopCode />,
  Certification: <FaCertificate />,
};

const Journey = () => {
  const [journeyData, setJourneyData] = useState(FALLBACK_JOURNEY);

  useEffect(() => {
    getJourneys()
      .then((res) => {
        if (res?.data?.length) {
          setJourneyData(res.data);
        }
      })
      .catch(() => {
        // Keep fallback timeline
      });
  }, []);

  return (
    <section
      id="journey"
      className="bg-white py-14 sm:py-20 lg:py-24 text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= Heading ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              sm:gap-2
              px-2.5
              sm:px-3
              py-1
              rounded-full
              bg-emerald-50
              border
              border-emerald-100
              text-emerald-600
              text-[10px]
              sm:text-xs
              lg:text-[14px]
              font-medium
              mb-3
              sm:mb-4
            "
          >
            <FaRocket className="text-[9px] sm:text-xs" />
            Timeline
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-[28px]
              font-bold
            "
          >
            My{" "}
            <span className="text-emerald-600">
              Journey
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
            My learning path and milestones as a Full Stack Developer.
          </p>
        </motion.div>

        {/* ================= Timeline ================= */}

        <div className="relative pl-11 sm:pl-16 md:pl-0">

          {/* Vertical Line */}

          <div
            className="
              absolute
              left-5
              sm:left-7
              md:left-1/2
              top-2
              bottom-2
              w-0.5
              -translate-x-1/2
              bg-[repeating-linear-gradient(to_bottom,theme(colors.emerald.300)_0,theme(colors.emerald.300)_5px,transparent_5px,transparent_11px)]
            "
          />

          <div className="flex flex-col gap-7 sm:gap-9 md:gap-6">

            {journeyData.map((item, index) => {
              const side = index % 2 === 0 ? "right" : "left";

              const dateLabel = item.endDate
                ? `${item.startDate} - ${item.endDate}`
                : item.startDate;

              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className={`relative md:flex md:items-center ${
                    side === "left"
                      ? "md:flex-row-reverse"
                      : "md:flex-row"
                  }`}
                >

                  {/* ================= Icon ================= */}

                  <div
                    className="
                      absolute
                      -left-11
                      sm:-left-16
                      md:left-1/2
                      top-0
                      md:top-1/2
                      md:-translate-x-1/2
                      md:-translate-y-1/2
                      w-9
                      h-9
                      sm:w-11
                      sm:h-11
                      md:w-12
                      md:h-12
                      rounded-full
                      bg-emerald-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-sm
                      sm:text-base
                      md:text-lg
                      ring-4
                      ring-emerald-100
                      shadow-md
                      z-10
                    "
                  >
                    {TYPE_ICON[item.type] || <FaBriefcase />}
                  </div>

                  {/* Desktop Spacer */}

                  <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />

                  {/* ================= Card ================= */}

                  <div
                    className="
                      relative
                      z-20
                      overflow-hidden
                      w-full
                      md:w-[calc(50%-1.5rem)]
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      sm:rounded-2xl
                      p-3
                      sm:p-5
                      hover:border-emerald-400
                      hover:-translate-y-1
                      hover:shadow-md
                      transition-all
                      duration-300
                    "
                  >

                    {/* Bookmark */}

                    <div
                      className="
                        absolute
                        -top-1
                        right-3
                        sm:right-5
                        text-emerald-500
                        text-lg
                        sm:text-2xl
                      "
                    >
                      <FaBookmark />
                    </div>

                    {/* Dotted Decoration */}

                    <div
                      className="
                        absolute
                        bottom-3
                        right-3
                        sm:bottom-4
                        sm:right-4
                        grid
                        grid-cols-3
                        gap-1
                        opacity-30
                        pointer-events-none
                      "
                    >
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span
                          key={i}
                          className="
                            w-0.5
                            h-0.5
                            sm:w-1
                            sm:h-1
                            rounded-full
                            bg-emerald-400
                          "
                        />
                      ))}
                    </div>

                    {/* ================= Date ================= */}

                    <span
                      className="
                        inline-block
                        text-[9px]
                        sm:text-xs
                        lg:text-[14px]
                        font-semibold
                        tracking-wide
                        uppercase
                        px-2
                        sm:px-2.5
                        py-0.5
                        sm:py-1
                        rounded-full
                        bg-emerald-100
                        text-emerald-700
                        mb-2
                        sm:mb-3
                      "
                    >
                      {dateLabel}
                    </span>

                    {/* ================= Title ================= */}

                    <h3
                      className="
                        text-[11px]
                        sm:text-base
                        lg:text-[22px]
                        font-bold
                        text-slate-900
                        pr-7
                        sm:pr-8
                        leading-4
                        sm:leading-5
                        lg:leading-7
                        break-words
                      "
                    >
                      {item.title}
                    </h3>

                    {/* ================= Organization ================= */}

                    <p
                      className="
                        text-slate-500
                        text-[9px]
                        sm:text-xs
                        lg:text-[18px]
                        mt-1
                        leading-4
                        sm:leading-5
                        lg:leading-7
                        break-words
                      "
                    >
                      {item.organization}
                    </p>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;