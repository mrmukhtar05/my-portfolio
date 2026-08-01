import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        width: "100%",
        backgroundColor: "var(--color-emerald-600)",
      }}
    />
  );
};

export default ScrollProgress;