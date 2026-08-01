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
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleScroll = (href) => {
    setOpen(false);

    const section = document.querySelector(href);

    if (!section) return;

    const navbarHeight = 60;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        w-full

        bg-white/95
        backdrop-blur-md

        border-b
        border-slate-200

        shadow-sm
      "
    >
      {/* ================= NAVBAR ================= */}

      <div
        className="
          w-full
          max-w-7xl
          mx-auto

          h-[58px]
          sm:h-[62px]
          lg:h-[68px]

          px-4
          sm:px-6
          lg:px-10

          flex
          items-center
          justify-between
        "
      >
        {/* ================= LOGO ================= */}

     <button
  onClick={() => handleScroll("#home")}
  aria-label="Go to home"
  className="
    group
    flex
    items-center
    gap-2
    cursor-pointer
  "
>
  {/* Logo */}
  <span
    className="
      relative
      w-9
      h-9
      sm:w-10
      sm:h-10
      rounded-xl
      bg-slate-900
      flex
      items-center
      justify-center
      shadow-sm
      group-hover:bg-emerald-600
      transition-all
      duration-300
    "
  >
    <span
      className="
        text-lg
        sm:text-xl
        font-black
        text-white
        tracking-tight
      "
    >
      M
    </span>

    {/* Green dot */}
    <span
      className="
        absolute
        -right-1
        -top-1
        w-3
        h-3
        rounded-full
        bg-emerald-500
        border-2
        border-white
        group-hover:scale-125
        transition-transform
      "
    />
  </span>

  {/* Name */}
  <span
    className="
      hidden
      sm:block
      text-sm
      font-bold
      tracking-wide
      text-slate-800
      group-hover:text-emerald-600
      transition-colors
    "
  >
    Mukhtar
  </span>
</button>

        {/* ================= DESKTOP MENU ================= */}

        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {links.map((link) => {
            const isActive =
              active === link.href.substring(1);

            return (
              <button
                key={link.name}
                onClick={() => handleScroll(link.href)}
                className={`
                  relative

                  py-2

                  text-sm
                  lg:text-[15px]

                  font-medium

                  transition-colors
                  duration-200

                  ${isActive
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-emerald-600"
                  }
                `}
              >
                {link.name}

                {/* ACTIVE LINE */}

                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-0.5

                      mx-auto

                      h-[2px]

                      rounded-full

                      bg-emerald-500
                    "
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={
            open ? "Close navigation" : "Open navigation"
          }
          aria-expanded={open}
          className="
            md:hidden

            w-9
            h-9

            flex
            items-center
            justify-center

            rounded-lg

            border
            border-slate-200

            bg-white

            text-slate-700

            hover:bg-slate-50

            transition
          "
        >
          {open ? (
            <HiX className="text-xl" />
          ) : (
            <HiMenuAlt3 className="text-xl" />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {open && (
        <div
          className="
            md:hidden

            w-full

            bg-white

            border-t
            border-slate-100

            shadow-lg

            px-3
            py-2
          "
        >
          {links.map((link) => {
            const isActive =
              active === link.href.substring(1);

            return (
              <button
                key={link.name}
                onClick={() => handleScroll(link.href)}
                className={`
                  w-full

                  flex
                  items-center
                  justify-between

                  px-4
                  py-3

                  mb-1

                  rounded-lg

                  text-left
                  text-sm

                  transition

                  ${isActive
                    ? "bg-emerald-50 text-emerald-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                <span>{link.name}</span>

                {isActive && (
                  <span
                    className="
                      w-1.5
                      h-1.5

                      rounded-full

                      bg-emerald-500
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;