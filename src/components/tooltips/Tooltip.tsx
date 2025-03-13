'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  maxWidth = '200px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  // Memoize position styles
  const positionStyles = useMemo(() => ({
    top: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    },
    bottom: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      className: 'top-full left-1/2 -translate-x-1/2 mt-2',
    },
    left: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      className: 'right-full top-1/2 -translate-y-1/2 mr-2',
    },
    right: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      className: 'left-full top-1/2 -translate-y-1/2 ml-2',
    },
  }), []);

  const handleMouseEnter = useCallback(() => {
    timeout = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeout);
    setIsVisible(false);
  }, []);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 ${positionStyles[position].className}`}
            initial={positionStyles[position].initial}
            animate={positionStyles[position].animate}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div 
              className="
                bg-white/80 backdrop-blur-lg
                px-3 py-2 rounded-lg shadow-lg
                border border-gray-100
                text-sm text-gray-700
                whitespace-normal
              "
              style={{ maxWidth }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
