import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  id?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.9,
  yOffset = 35,
  id,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.43, 1.01], // Fluid, premium cubic-bezier ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
