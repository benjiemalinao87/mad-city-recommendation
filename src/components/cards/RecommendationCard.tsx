'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  type?: 'info' | 'success' | 'warning';
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  actionText,
  onAction,
  type = 'info'
}) => {
  const colors = {
    info: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      icon: '📊'
    },
    success: {
      bg: 'bg-green-50/50',
      border: 'border-green-100',
      text: 'text-green-700',
      icon: '✨'
    },
    warning: {
      bg: 'bg-yellow-50/50',
      border: 'border-yellow-100',
      text: 'text-yellow-700',
      icon: '⚡️'
    }
  };

  return (
    <motion.div
      className={`
        rounded-xl backdrop-blur-sm border
        ${colors[type].bg}
        ${colors[type].border}
        overflow-hidden
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-start">
          <span className="text-2xl mr-4">{colors[type].icon}</span>
          <div>
            <h3 className={`text-lg font-medium mb-2 ${colors[type].text}`}>
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
            {actionText && onAction && (
              <button
                onClick={onAction}
                className={`
                  mt-4 px-4 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${colors[type].bg}
                  ${colors[type].text}
                  hover:bg-opacity-75
                `}
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
