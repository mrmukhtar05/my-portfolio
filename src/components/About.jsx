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

// Maps a skill name (from backend) to an icon component.
// Falls back to a generic code icon if no match is found.
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

const getIconForSkill = (name = "") => ICON_MAP[name.toLowerCase()] || <FaCode />;

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
    getAbout()
      .then((res) => res?.data && setAbout((prev) => ({ ...prev, ...res.data })))
      .catch(() => {});

    getSkills()
      .then((res) => {
        if (res?.data?.length) setSkills(res.data);
      })
      .catch(() => {});

    getProjects()
      .then((res) => {
        if (res?.data?.length) setProjectCount(res.data.length);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="bg-white text-slate-900 py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold">
            About <span className="text-emerald-500">Me</span>
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            I love creating modern, scalable and user-friendly web
            applications with clean code and beautiful UI. 
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">
              Hi, I'm <span className="text-emerald-500">{about.name}</span>
            </h3>

            <p className="text-slate-500 text-sm sm:text-base leading-6 sm:leading-8">
              {about.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 mt-10">

              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-emerald-500/20">
                <h3 className="text-3xl font-bold text-emerald-500">{projectCount}+</h3>
                <p className="text-slate-500 mt-2">Projects</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-emerald-500/20">
                <h3 className="text-3xl font-bold text-emerald-500">{skills.length}+</h3>
                <p className="text-slate-500 mt-2">Technologies</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-emerald-500/20">
                <h3 className="text-3xl font-bold text-emerald-500">100%</h3>
                <p className="text-slate-500 mt-2">Dedication</p>
              </div>

            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-5">

              {skills.map((skill, index) => (
                <div
                  key={skill._id || index}
                  className="bg-slate-50 border border-emerald-500/20 rounded-xl sm:rounded-2xl p-2 sm:p-6 flex flex-col items-center hover:border-emerald-400 hover:-translate-y-2 transition duration-300"
                >
                  <div className="text-xl sm:text-4xl text-emerald-500 mb-1 sm:mb-3">
                    {getIconForSkill(skill.name)}
                  </div>

                  <p className="text-[10px] sm:text-sm text-center">{skill.name}</p>
                </div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;