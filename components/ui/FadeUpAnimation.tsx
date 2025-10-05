'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeScaleAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeScaleAnimation = ({ 
  children, 
  delay = 0,
  className = '' 
}: FadeScaleAnimationProps) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
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


interface FadeUpAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeUpAnimation = ({ 
  children, 
  delay = 0,
  className = '' 
}: FadeUpAnimationProps) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};