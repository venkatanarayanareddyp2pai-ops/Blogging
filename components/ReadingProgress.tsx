"use client";

import { useScroll, motion } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] origin-left z-[100]" 
      style={{ scaleX: scrollYProgress }} 
    />
  );
}
