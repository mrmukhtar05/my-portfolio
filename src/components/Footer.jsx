import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">

          {/* Logo / About */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-emerald-600">
              MS
            </h2>

            <p className="text-gray-600 mt-2 max-w-sm leading-relaxed">
              Passionate Full Stack Developer creating modern,
              scalable and user-friendly web applications.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-600 font-bold">
  <a
    href="#home"
    className="hover:text-emerald-600 transition-colors duration-300"
  >
    Home
  </a>

  <a
    href="#about"
    className="hover:text-emerald-600 transition-colors duration-300"
  >
    About
  </a>

  <a
    href="#projects"
    className="hover:text-emerald-600 transition-colors duration-300"
  >
    Projects
  </a>

  <a
    href="#journey"
    className="hover:text-emerald-600 transition-colors duration-300"
  >
    Journey
  </a>

  <a
    href="#contact"
    className="hover:text-emerald-600 transition-colors duration-300"
  >
    Contact
  </a>
</div>

          {/* Social Icons */}
          <div className="flex gap-5 text-2xl text-gray-600">
            <a
              href="https://github.com/mrmukhtar05"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-emerald-600 hover:-translate-y-1 transition-all duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/mukhtar-shah-7b6bb83aa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-emerald-600 hover:-translate-y-1 transition-all duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:mrmukhtar005@gmail.com"
              aria-label="Email"
              className="hover:text-emerald-600 hover:-translate-y-1 transition-all duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-100 mt-10 pt-6 text-center text-gray-500">
          <p className="flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base">
            <span>© {new Date().getFullYear()} Mukhtar Shah</span>

            <span className="flex items-center gap-1">
              Made with
              <FaHeart className="text-emerald-600" />
            </span>

            <span>All Rights Reserved.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;