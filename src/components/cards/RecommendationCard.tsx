'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  title: string;
  description: string;
  category: string;
  impact: 'low' | 'medium' | 'high';
  implementation: 'easy' | 'medium' | 'complex';
  actionItems: string[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  category,
  impact,
  implementation,
  actionItems,
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-blue-600';
      case 'medium': return 'text-purple-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getImplementationColor = (implementation: string) => {
    switch (implementation) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'complex': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      className="mac-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {description}
            </p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <span className="text-xs uppercase tracking-wide text-gray-500 mr-2">Impact:</span>
                <span className={`text-sm font-medium ${getImpactColor(impact)}`}>
                  {impact.charAt(0).toUpperCase() + impact.slice(1)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs uppercase tracking-wide text-gray-500 mr-2">Effort:</span>
                <span className={`text-sm font-medium ${getImplementationColor(implementation)}`}>
                  {implementation.charAt(0).toUpperCase() + implementation.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
