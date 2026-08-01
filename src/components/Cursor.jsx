import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, {
    stiffness: 1000,
    damping: 40,
  });

  const dotY = useSpring(mouseY, {
    stiffness: 1000,
    damping: 40,
  });

  const ringX = useSpring(mouseX, {
    stiffness: 180,
    damping: 18,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 180,
    damping: 18,
  });

  const [hover, setHover] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a real mouse
    // (fine pointer) — this excludes phones and tablets.
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    );

    setIsDesktop(mediaQuery.matches);

    const handleChange = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll(
      "a, button, input, textarea, select"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        animate={{
          width: hover ? 44 : 24,
          height: hover ? 44 : 24,
          borderColor: "var(--color-emerald-600)",
          backgroundColor: hover
            ? "color-mix(in srgb, var(--color-emerald-600) 15%, transparent)"
            : "color-mix(in srgb, var(--color-emerald-600) 5%, transparent)",
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
      />

      {/* Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--color-emerald-600)",
          boxShadow: "0 0 10px var(--color-emerald-600)",
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
};

export default Cursor;