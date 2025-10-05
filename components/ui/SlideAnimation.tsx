'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideAnimationProps {
  children: ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  className?: string;
}

export const SlideAnimation = ({ 
  children, 
  direction, 
  delay = 0,
  className = '' 
}: SlideAnimationProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};