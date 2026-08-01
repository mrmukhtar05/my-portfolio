import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaCode,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiMysql,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { getAbout } from "../services/aboutService";
import { getSkills } from "../services/skillService";
import { getProjects } from "../services/projectService";

// ================= Skill Icons =================
const ICON_MAP = {
  react: <FaReact />,
  "node.js": <FaNodeJs />,
  node: <FaNodeJs />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  javascript: <SiJavascript />,
  python: <FaPython />,
  mysql: <SiMysql />,
  git: <FaGitAlt />,
  html: <FaHtml5 />,
  html5: <FaHtml5 />,
  css: <FaCss3Alt />,
  css3: <FaCss3Alt />,
  java: <FaJava />,
  tailwind: <SiTailwindcss />,
  "tailwind css": <SiTailwindcss />,
  typescript: <SiTypescript />,
};

// ================= Get Skill Icon =================
const getIconForSkill = (name = "") => {
  return ICON_MAP[name.toLowerCase()] || <FaCode />;
};

// ================= Default Skills =================
const DEFAULT_SKILLS = [
  { name: "React" },
  { name: "Node.js" },
  { name: "Express" },
  { name: "MongoDB" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "MySQL" },
  { name: "Git" },
];

const About = () => {
  const [about, setAbout] = useState({
    name: "Mukhtar Shah",
    bio: "I'm a passionate Full Stack Developer who enjoys building responsive, modern, and high-performance web applications. I mainly work with React.js, Node.js, Express.js and MongoDB.",
  });

  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [projectCount, setProjectCount] = useState(10);

  useEffect(() => {
    // ================= About =================
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

    // ================= Skills =================
    getSkills()
      .then((res) => {
        if (res?.data?.length) {
          setSkills(res.data);
        }
      })
      .catch(() => {});

    // ================= Projects =================
    getProjects()
      .then((res) => {
        if (res?.data?.length) {
          setProjectCount(res.data.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="
        py-14
        sm:py-20
        lg:py-24
        bg-white
        text-slate-900
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

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
              lg:text-5xl
              font-bold
            "
          >
            About{" "}
            <span className="text-emerald-500">
              Me
            </span>
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              md:text-base
              text-slate-500
              mt-3
              sm:mt-4
              max-w-xl
              mx-auto
              leading-5
              sm:leading-6
            "
          >
            I love creating modern, scalable and user-friendly web
            applications with clean code and beautiful UI.
          </p>
        </motion.div>

        {/* ================= Main Content ================= */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-7
            sm:gap-10
            lg:gap-16
            items-center
          "
        >

          {/* ================= Left Side ================= */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            {/* ================= Bio ================= */}
            {/* Hidden on small screen */}
            <p
              className="
                hidden
                sm:block
                text-left
                text-slate-500
                text-sm
                md:text-base
                leading-6
                sm:leading-7
                md:leading-8
              "
            >
              {about.bio}
            </p>

            {/* ================= Stats ================= */}
            <div
              className="
                grid
                grid-cols-3
                gap-1.5
                sm:gap-4
                mt-0
                sm:mt-10
              "
            >

              {/* Projects */}
              <div
                className="
                  bg-slate-50
                  rounded-xl
                  sm:rounded-2xl
                  p-3
                  sm:p-6
                  text-center
                  border
                  border-emerald-500/20
                  hover:border-emerald-400
                  hover:-translate-y-1
                  transition
                  duration-300
                "
              >
                <h3
                  className="
                    text-lg
                    sm:text-3xl
                    font-bold
                    text-emerald-500
                  "
                >
                  {projectCount}+
                </h3>

                <p
                  className="
                    text-[10px]
                    sm:text-sm
                    text-slate-500
                    mt-1
                    sm:mt-2
                  "
                >
                  Projects
                </p>
              </div>

              {/* Technologies */}
              <div
                className="
                  bg-slate-50
                  rounded-xl
                  sm:rounded-2xl
                  p-3
                  sm:p-6
                  text-center
                  border
                  border-emerald-500/20
                  hover:border-emerald-400
                  hover:-translate-y-1
                  transition
                  duration-300
                "
              >
                <h3
                  className="
                    text-lg
                    sm:text-3xl
                    font-bold
                    text-emerald-500
                  "
                >
                  {skills.length}+
                </h3>

                <p
                  className="
                    text-[10px]
                    sm:text-sm
                    text-slate-500
                    mt-1
                    sm:mt-2
                  "
                >
                  Technologies
                </p>
              </div>

              {/* Dedication */}
              <div
                className="
                  bg-slate-50
                  rounded-xl
                  sm:rounded-2xl
                  p-3
                  sm:p-6
                  text-center
                  border
                  border-emerald-500/20
                  hover:border-emerald-400
                  hover:-translate-y-1
                  transition
                  duration-300
                "
              >
                <h3
                  className="
                    text-lg
                    sm:text-3xl
                    font-bold
                    text-emerald-500
                  "
                >
                  100%
                </h3>

                <p
                  className="
                    text-[10px]
                    sm:text-sm
                    text-slate-500
                    mt-1
                    sm:mt-2
                  "
                >
                  Dedication
                </p>
              </div>

            </div>
          </motion.div>

          {/* ================= Right Side ================= */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className="
                grid
                grid-cols-4
                gap-1.5
                sm:gap-4
                lg:gap-5
              "
            >

              {skills.map((skill, index) => (
                <motion.div
                  key={skill._id || index}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="
                    bg-slate-50
                    border
                    border-emerald-500/20
                    rounded-lg
                    sm:rounded-2xl
                    p-2
                    sm:p-5
                    lg:p-6
                    flex
                    flex-col
                    items-center
                    hover:border-emerald-400
                    transition
                    duration-300
                    min-w-0
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      text-base
                      sm:text-3xl
                      lg:text-4xl
                      text-emerald-500
                      mb-1
                      sm:mb-3
                    "
                  >
                    {getIconForSkill(skill.name)}
                  </div>

                  {/* Skill Name */}
                  <p
                    className="
                      text-[9px]
                      sm:text-xs
                      lg:text-sm
                      text-center
                      font-medium
                      text-slate-700
                      leading-3
                      sm:leading-5
                      break-words
                    "
                  >
                    {skill.name}
                  </p>

                </motion.div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;