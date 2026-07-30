import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profileImg from "../assets/images/mukhtar.jpeg";
import resume from "../assets/pdf/mukhtar.pdf";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";
import { getAbout } from "../services/aboutService";
import { getImageUrl } from "../utils/getImageUrl";

const Hero = () => {
  // Fallback (default) content - shown until backend data loads,
  // or if the About document hasn't been created yet in the admin panel.
  const [about, setAbout] = useState({
    name: "Mukhtar Shah",
    title: "Full Stack Developer",
    bio: "Passionate Full Stack Developer who builds fast, responsive and scalable web applications using React, Node.js, Express and MongoDB.",
    profileImage: "",
    resume: "",
    socialLinks: {
      github: "https://github.com/mrmukhtar05",
      linkedin: "https://www.linkedin.com/in/mukhtar-shah-7b6bb83aa",
    },
    email: "mrmukhtar005@gmail.com",
  });

  useEffect(() => {
    getAbout()
      .then((res) => {
        if (res?.data) {
          setAbout((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {
        // keep fallback defaults, backend/about doc may not exist yet
      });
  }, []);

  const nameParts = about.name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-slate-950 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 text-lg font-medium mb-3">
              👋 Hello, I'm
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              {firstName}
              {lastName && (
                <>
                  <br />
                  <span className="text-cyan-400">{lastName}</span>
                </>
              )}
            </h1>

            <div className="mt-6 text-2xl md:text-3xl font-semibold text-gray-300">
              <TypeAnimation
                sequence={[
                  about.title || "Full Stack Developer",
                  2000,
                  "MERN Stack Developer",
                  2000,
                  "React Developer",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </div>

            <p className="mt-6 text-gray-400 leading-8 max-w-xl">
              {about.bio}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition"
              >
                View Projects
                <FaArrowRight />
              </a>

              <a
                href={about.resume ? getImageUrl(about.resume) : resume}
                download="Resume.pdf"
                target={about.resume ? "_blank" : undefined}
                rel={about.resume ? "noreferrer" : undefined}
                className="flex items-center gap-2 border border-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-xl transition"
              >
                <FaDownload />
                Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-10 text-2xl">
              {about.socialLinks?.github && (
                <a
                  href={about.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  <FaGithub />
                </a>
              )}

              {about.socialLinks?.linkedin && (
                <a
                  href={about.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  <FaLinkedin />
                </a>
              )}

              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="hover:text-cyan-400 transition"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-500 blur-3xl opacity-30"></div>

              <img
                src={about.profileImage ? getImageUrl(about.profileImage) : profileImg}
                alt={about.name}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
