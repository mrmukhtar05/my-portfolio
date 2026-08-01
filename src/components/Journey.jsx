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
        if (res?.data?.length) setJourneyData(res.data);
      })
      .catch(() => {
        // keep fallback timeline if backend/data not available yet
      });
  }, []);

  return (
    <section id="journey" className="bg-white py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            <FaRocket className="text-xs" />
            Timeline
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold">
            My <span className="text-emerald-600">Journey</span>
          </h2>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            My learning path and milestones as a Full Stack Developer.
          </p>
        </motion.div>

        <div className="relative pl-16 sm:pl-20 md:pl-0">

          {/* Vertical dotted line - mobile/tablet */}
          <div
            className="
              absolute
              left-6
              sm:left-8
              md:left-1/2
              top-2
              bottom-2
              w-0.5
              -translate-x-1/2
              bg-[repeating-linear-gradient(to_bottom,theme(colors.emerald.300)_0,theme(colors.emerald.300)_6px,transparent_6px,transparent_12px)]
            "
          />

          <div className="flex flex-col gap-10 md:gap-6">
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`relative md:flex md:items-center ${
                    side === "left"
                      ? "md:flex-row-reverse"
                      : "md:flex-row"
                  }`}
                >
                  {/* Icon node on the line */}
                  <div
                    className="
                      absolute
                      -left-16
                      sm:-left-20
                      md:left-1/2
                      top-0
                      md:top-1/2
                      md:-translate-x-1/2
                      md:-translate-y-1/2
                      w-12
                      h-12
                      rounded-full
                      bg-emerald-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-lg
                      ring-4
                      ring-emerald-100
                      shadow-md
                      z-10
                    "
                  >
                    {TYPE_ICON[item.type] || <FaBriefcase />}
                  </div>

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />

                  {/* Card */}
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
                      rounded-2xl
                      p-4
                      sm:p-5
                      hover:border-emerald-400
                      hover:shadow-md
                      transition-all
                      duration-300
                    "
                  >
                    {/* Ribbon accent */}
                    <div className="absolute -top-1 right-6 text-emerald-500 text-2xl drop-shadow-sm">
                      <FaBookmark />
                    </div>

                    {/* Dotted pattern decoration */}
                    <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1.5 opacity-40 pointer-events-none">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full bg-emerald-400"
                        />
                      ))}
                    </div>

                    <span
                      className="
                        inline-block
                        text-xs
                        font-semibold
                        tracking-wide
                        uppercase
                        px-2.5
                        py-1
                        rounded-full
                        bg-emerald-100
                        text-emerald-700
                        mb-3
                      "
                    >
                      {dateLabel}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 pr-8 truncate">{item.title}</h3>

                    <p className="text-slate-500 text-sm mt-1">
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