'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  className = '',
  onClick,
}) => {
  // Memoize style configurations
  const styles = useMemo(() => ({
    base: 'rounded-xl overflow-hidden transition-all duration-200',
    variant: {
      default: 'bg-white/80 backdrop-blur-sm border border-gray-100',
      elevated: 'bg-white/90 backdrop-blur-md shadow-lg border border-gray-50',
      outlined: 'bg-transparent border border-gray-200 hover:bg-white/50',
    }[variant],
    interactive: onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : '',
  }), [variant, onClick]);

  return (
    <motion.div
      className={`
        ${styles.base}
        ${styles.variant}
        ${styles.interactive}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      {(title || subtitle || icon) && (
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center space-x-4">
            {icon && (
              <div className="flex-shrink-0 text-gray-500">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={`${title || subtitle || icon ? 'p-6' : 'p-0'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
