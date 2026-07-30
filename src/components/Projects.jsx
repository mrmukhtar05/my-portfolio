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
        if (res?.data?.length) setProjects(res.data);
      })
      .catch(() => {
        // keep fallback projects if backend/data not available yet
      });
  }, []);

  return (
    <section id="projects" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            My <span className="text-cyan-400">Projects</span>
          </h2>

          <p className="text-gray-400 mt-4">
            Some projects that showcase my skills and experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              whileHover={{ y: -10 }}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition"
            >
              <img
                src={
                  project.image?.startsWith("/projects")
                    ? project.image
                    : getImageUrl(project.image)
                }
                alt={project.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {(project.technologies || []).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-cyan-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-cyan-400 px-5 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition"
                    >
                      <FaGithub />
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
