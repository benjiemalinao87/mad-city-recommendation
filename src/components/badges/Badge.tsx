'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  pulse = false,
}) => {
  // Memoize style configurations
  const styles = useMemo(() => ({
    base: 'inline-flex items-center rounded-full font-medium',
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    }[size],
    variant: {
      primary: 'bg-blue-50 text-blue-700 border border-blue-100',
      success: 'bg-green-50 text-green-700 border border-green-100',
      warning: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
      error: 'bg-red-50 text-red-700 border border-red-100',
      info: 'bg-gray-50 text-gray-700 border border-gray-100',
    }[variant],
    dot: {
      primary: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-gray-500',
    }[variant],
  }), [variant, size]);

  // Pulse animation variants
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.span
      className={`
        ${styles.base}
        ${styles.size}
        ${styles.variant}
        backdrop-blur-sm
        shadow-sm
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {dot && (
        <motion.span
          className={`
            inline-block
            h-2
            w-2
            rounded-full
            ${styles.dot}
            mr-2
          `}
          variants={pulse ? pulseVariants : undefined}
          animate={pulse ? 'animate' : undefined}
        />
      )}
      {children}
    </motion.span>
  );
};

export default Badge;
