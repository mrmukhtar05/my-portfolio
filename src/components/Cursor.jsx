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

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: hover ? 60 : 35,
          height: hover ? 60 : 35,
          borderColor: hover ? "#22d3ee" : "#67e8f9",
          backgroundColor: hover
            ? "rgba(34,211,238,.15)"
            : "rgba(34,211,238,.05)",
        }}
        transition={{
          duration: 0.2,
        }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 pointer-events-none z-[9999] shadow-[0_0_15px_#22d3ee]"
      />
    </>
  );
};

export default Cursor;