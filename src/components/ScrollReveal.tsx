import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  once?: boolean;
  ease?: number[] | string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 25,
  xOffset = 0,
  once = true,
  ease = [0.16, 1, 0.3, 1], // Custom cinematic Apple-like cubic-bezier curves for premium feel
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
