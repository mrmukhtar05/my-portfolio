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
  const [about, setAbout] = useState({
    name: "Mukhtar Shah",
    title: "Full Stack Developer",
    bio: "Passionate MERN Stack Developer who loves building modern, responsive, and user-friendly web applications. Skilled in MongoDB, Express.js, React.js, and Node.js, with a strong interest in creating scalable solutions and learning new technologies.",
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
          setAbout((prev) => ({
            ...prev,
            ...res.data,
          }));
        }
      })
      .catch(() => {
        // Keep fallback data
      });
  }, []);

  const nameParts = about.name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-white
        text-slate-900
        flex
        items-center
        pt-24
        pb-14
        sm:pt-28
        sm:pb-20
        lg:pt-20
        lg:pb-10
      "
    >
      {/* ================= BACKGROUND ================= */}

      {/* Green Glow - Top Right */}
      <div
        className="
          absolute
          -top-24
          -right-20
          w-72
          h-72
          sm:w-96
          sm:h-96
          rounded-full
          bg-emerald-100
          blur-3xl
          opacity-70
          pointer-events-none
        "
      />

      {/* Green Glow - Bottom Right */}
      <div
        className="
          absolute
          -bottom-32
          right-[-80px]
          sm:right-[-120px]
          w-80
          h-80
          sm:w-[500px]
          sm:h-[500px]
          rounded-full
          bg-emerald-50
          blur-3xl
          pointer-events-none
        "
      />

      {/* Left Green Line */}
      <div
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          w-1
          h-28
          sm:h-40
          bg-emerald-500
          rounded-r-full
        "
      />

      {/* Dotted Pattern */}
      <div
        className="
          absolute
          top-24
          right-8
          sm:right-16
          lg:right-20
          grid
          grid-cols-5
          gap-2
          opacity-50
          pointer-events-none
        "
      >
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="
              w-1
              h-1
              rounded-full
              bg-emerald-400
            "
          />
        ))}
      </div>

      {/* Decorative Circles */}
      <div
        className="
          absolute
          right-16
          bottom-24
          w-5
          h-5
          rounded-full
          bg-emerald-400
          opacity-80
        "
      />

      <div
        className="
          absolute
          right-10
          bottom-40
          w-3
          h-3
          rounded-full
          bg-emerald-300
        "
      />

      {/* ================= CONTAINER ================= */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            sm:gap-16
            lg:gap-20
            items-center
          "
        >
          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              order-2
              lg:order-1
              text-center
              lg:text-left
            "
          >
            {/* Hello */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                bg-emerald-50
                border
                border-emerald-100
                text-emerald-600
                text-xs
                sm:text-sm
                font-medium
                mb-4
              "
            >
              👋 Hello, I'm
            </div>

            {/* Name */}
            <h1
              className="
                text-3xl
                sm:text-5xl
                md:text-6xl
                lg:text-[40px]
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-slate-900
                whitespace-nowrap
                sm:whitespace-normal
              "
            >
              {firstName}

              {lastName && (
                <>
                  <span className="hidden sm:inline">
                    <br />
                  </span>

                  <span className="text-emerald-600">
                    {" "}
                    {lastName}
                  </span>
                </>
              )}
            </h1>

            {/* Title */}
            <div
              className="
                mt-4
                sm:mt-5
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-[22px]
                font-semibold
                text-slate-700
                min-h-[30px]
                sm:min-h-[36px]
              "
            >
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

            {/* Description */}
            <p
              className="
                mt-5
                sm:mt-6
                max-w-xl
                mx-auto
                lg:mx-0
                text-left
                text-[11px]
                sm:text-base
                lg:text-[18px]
                text-slate-500
                leading-5
                sm:leading-7
              "
            >
              {about.bio}
            </p>

            {/* ================= BUTTONS ================= */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                justify-center
                lg:justify-start
                gap-3
                mt-7
                sm:mt-8
              "
            >
              {/* View Projects */}
              <a
                href="#projects"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  sm:px-6
                  py-2.5
                  sm:py-3
                  rounded-lg
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-sm
                  lg:text-base
                  font-semibold
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                View Projects
                <FaArrowRight className="text-xs" />
              </a>

              {/* Resume */}
              <a
                href={about.resume ? getImageUrl(about.resume) : resume}
                download="Resume.pdf"
                target={about.resume ? "_blank" : undefined}
                rel={about.resume ? "noreferrer" : undefined}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  sm:px-6
                  py-2.5
                  sm:py-3
                  rounded-lg
                  bg-white
                  hover:bg-emerald-50
                  text-slate-800
                  text-sm
                  lg:text-base
                  font-semibold
                  border
                  border-emerald-300
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                <FaDownload className="text-xs" />
                Resume
              </a>
            </div>

            {/* ================= SOCIAL ================= */}

            <div
              className="
                flex
                justify-center
                lg:justify-start
                items-center
                gap-3
                mt-7
                sm:mt-8
              "
            >
              {/* GitHub */}
              {about.socialLinks?.github && (
                <a
                  href={about.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="
                    w-9
                    h-9
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    text-slate-700
                    hover:text-emerald-600
                    hover:border-emerald-300
                    hover:bg-emerald-50
                    transition-all
                  "
                >
                  <FaGithub />
                </a>
              )}

              {/* LinkedIn */}
              {about.socialLinks?.linkedin && (
                <a
                  href={about.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="
                    w-9
                    h-9
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    text-slate-700
                    hover:text-emerald-600
                    hover:border-emerald-300
                    hover:bg-emerald-50
                    transition-all
                  "
                >
                  <FaLinkedin />
                </a>
              )}

              {/* Email */}
              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  aria-label="Email"
                  className="
                    w-9
                    h-9
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    text-slate-700
                    hover:text-emerald-600
                    hover:border-emerald-300
                    hover:bg-emerald-50
                    transition-all
                  "
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              order-1
              lg:order-2
              flex
              justify-center
              items-center
            "
          >
            <div
              className="
                relative
                w-full
                sm:w-auto
                px-4
                sm:px-0
              "
            >
              {/* Offset Green Background */}
              <div
                className="
                  absolute
                  -inset-2
                  sm:-inset-3
                  md:-inset-4
                  translate-x-2
                  translate-y-2
                  sm:translate-x-3
                  sm:translate-y-3
                  md:translate-x-4
                  md:translate-y-4
                  bg-emerald-100
                "
              />

              {/* Image Card */}
              <div
                className="
                  relative
                  overflow-hidden
                  bg-white
                  shadow-xl
                  shadow-emerald-100
                "
              >
                <img
                  src={
                    about.profileImage
                      ? getImageUrl(about.profileImage)
                      : profileImg
                  }
                  alt={about.name}
                  className="
                    w-full
                    h-[25rem]
                    sm:w-64
                    sm:h-80
                    md:w-80
                    md:h-96
                    lg:w-[26rem]
                    lg:h-[32rem]
                    object-cover
                  "
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;