import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              MS
            </h2>

            <p className="text-gray-400 mt-2 max-w-sm">
              Passionate Full Stack Developer creating modern,
              scalable and user-friendly web applications.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-6 text-gray-400">

            <a href="#home" className="hover:text-cyan-400 transition">
              Home
            </a>

            <a href="#about" className="hover:text-cyan-400 transition">
              About
            </a>

            <a href="#projects" className="hover:text-cyan-400 transition">
              Projects
            </a>

            <a href="#journey" className="hover:text-cyan-400 transition">
              Journey
            </a>

            <a href="#contact" className="hover:text-cyan-400 transition">
              Contact
            </a>

          </div>

          {/* Social */}
          <div className="flex gap-5 text-2xl">

            <a
              href="https://github.com/mrmukhtar05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/mukhtar-shah-7b6bb83aa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:mrmukhtar005@gmail.com"
              className="hover:text-cyan-400 transition"
            >
              <FaEnvelope />
            </a>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-gray-500">

          <p className="flex justify-center items-center gap-2">

            © {new Date().getFullYear()} Mukhtar Shah

            <FaHeart className="text-red-500" />

            All Rights Reserved.

          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;