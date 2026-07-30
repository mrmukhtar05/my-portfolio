import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScroll = (href) => {
    setOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => handleScroll("#home")}
          className="text-3xl font-bold text-cyan-400 cursor-pointer"
        >
          MS
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">

          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className={`relative text-lg transition duration-300 ${
                active === link.href.substring(1)
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.name}

              {active === link.href.substring(1) && (
                <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-cyan-400 rounded-full"></span>
              )}
            </button>
          ))}

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">

          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className={`block w-full text-left px-6 py-4 transition ${
                active === link.href.substring(1)
                  ? "text-cyan-400 bg-slate-800"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              {link.name}
            </button>
          ))}

        </div>
      )}
    </header>
  );
};

export default Navbar;