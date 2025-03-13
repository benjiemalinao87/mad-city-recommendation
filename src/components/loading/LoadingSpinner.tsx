'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray';
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
  label,
}) => {
  // Memoize style configurations
  const styles = useMemo(() => ({
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    }[size],
    color: {
      blue: 'border-blue-500',
      gray: 'border-gray-500',
    }[color],
    track: {
      blue: 'border-blue-100',
      gray: 'border-gray-100',
    }[color],
  }), [size, color]);

  // Spinner animation variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`
          ${styles.size}
          border-2
          ${styles.track}
          rounded-full
          relative
        `}
        variants={spinnerVariants}
        animate="animate"
      >
        <div 
          className={`
            absolute
            top-0
            left-0
            w-full
            h-full
            border-2
            ${styles.color}
            rounded-full
            border-t-transparent
            border-l-transparent
          `}
        />
      </motion.div>
      {label && (
        <span className="mt-2 text-sm text-gray-500 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
