import React, { ReactNode } from "react";
import { motion, UseInViewOptions } from "motion/react";

export type AnimationPreset = "slide-up" | "slide-left" | "slide-right" | "fade" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  preset?: AnimationPreset;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scaleOffset?: number;
  id?: string;
  className?: string;
  once?: boolean;
  amount?: UseInViewOptions["amount"];
}

export default function ScrollReveal({
  children,
  preset = "slide-up",
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 30,
  scaleOffset = 0.96,
  id,
  className = "",
  once = true,
  amount = 0.1,
}: ScrollRevealProps) {
  // Define animation states based on preset
  const getVariants = () => {
    switch (preset) {
      case "slide-up":
        return {
          initial: { opacity: 0, y: yOffset },
          animate: { opacity: 1, y: 0 },
        };
      case "slide-left":
        return {
          initial: { opacity: 0, x: xOffset },
          animate: { opacity: 1, x: 0 },
        };
      case "slide-right":
        return {
          initial: { opacity: 0, x: -xOffset },
          animate: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: scaleOffset },
          animate: { opacity: 1, scale: 1 },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      id={id}
      initial="initial"
      whileInView="animate"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth cubic-bezier curve (power4-out equivalent)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

