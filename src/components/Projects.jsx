import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { getProjects } from "../services/projectService";
import { getImageUrl } from "../utils/getImageUrl";

const FALLBACK_PROJECTS = [
  {
    title: "Task Management App",
    description:
      "A collaborative task management tool to help teams stay organized and productive.",
    image: "/projects/task.png",
    technologies: ["React", "Node.js", "MongoDB", "Bootstrap"],
    github: "https://github.com/yourusername/task-management",
    liveDemo: "https://your-demo-link.com",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern personal portfolio built using React, Tailwind CSS and Framer Motion.",
    image: "/projects/portfolio.png",
    technologies: ["React", "Tailwind", "Framer Motion"],
    github: "https://github.com/yourusername/portfolio",
    liveDemo: "https://your-portfolio.com",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    getProjects()
      .then((res) => {
        if (res?.data?.length) {
          setProjects(res.data);
        }
      })
      .catch(() => {
        // Keep fallback projects
      });
  }, []);

  return (
    <section
      id="projects"
      className="py-14 sm:py-20 lg:py-24 bg-white text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My{" "}
            <span className="text-emerald-500">
              Projects
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-3 sm:mt-4 max-w-xl mx-auto">
            Some projects that showcase my skills and experience.
          </p>
        </motion.div>

        {/* ================= Projects Grid ================= */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">

          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-slate-50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >

              {/* ================= Project Image ================= */}
              <img
                src={
                  project.image?.startsWith("/projects")
                    ? project.image
                    : getImageUrl(project.image)
                }
                alt={project.title}
                className="w-full h-44 sm:h-56 lg:h-72 object-cover"
              />

              {/* ================= Content ================= */}
              <div className="p-4 sm:p-5 lg:p-6">

                {/* Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-[11px] sm:text-sm mt-2 sm:mt-3 leading-5 sm:leading-6">
                  {project.description}
                </p>

                {/* ================= Technologies ================= */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                  {(project.technologies || []).map((item) => (
                    <span
                      key={item}
                      className="px-2 sm:px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] sm:text-xs lg:text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* ================= Buttons ================= */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-6">

                  {/* Live Demo */}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 bg-emerald-600 text-white px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-emerald-700 transition"
                    >
                      <FaExternalLinkAlt className="text-xs sm:text-sm" />
                      Live Demo
                    </a>
                  )}

                  {/* GitHub */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 border border-emerald-400 text-slate-900 px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-emerald-500 hover:text-white transition"
                    >
                      <FaGithub className="text-sm sm:text-base" />
                      GitHub
                    </a>
                  )}

                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;