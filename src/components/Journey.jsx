import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaCertificate,
  FaBriefcase,
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
    <section id="journey" className="bg-slate-950 py-24 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold">
            My <span className="text-cyan-400">Journey</span>
          </h2>

          <p className="text-gray-400 mt-4">
            My learning path and milestones as a Full Stack Developer.
          </p>
        </div>

        <div className="relative">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-cyan-500/30 -translate-x-1/2 hidden md:block"></div>

          {journeyData.map((item, index) => {
            const side = index % 2 === 0 ? "right" : "left";
            const dateLabel = item.endDate
              ? `${item.startDate} - ${item.endDate}`
              : item.startDate;

            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`mb-16 flex ${
                  side === "left"
                    ? "md:justify-start"
                    : "md:justify-end"
                }`}
              >
                <div className="relative w-full md:w-[45%]">

                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 transition">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
                        {TYPE_ICON[item.type] || <FaRocket />}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold">
                          {item.title}
                        </h3>

                        <p className="text-gray-400">
                          {item.organization}
                        </p>

                        <p className="text-cyan-400 mt-1">
                          {dateLabel}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Journey;
