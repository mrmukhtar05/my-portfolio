import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        backgroundColor: "var(--color-emerald-600)",
      }}
      className="
        hidden
        sm:flex
        fixed
        bottom-6
        right-6
        z-50
        w-14
        h-14
        rounded-full
        text-white
        items-center
        justify-center
        shadow-lg
        hover:scale-110
        hover:brightness-110
        transition-all
        duration-300
      "
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollTop;