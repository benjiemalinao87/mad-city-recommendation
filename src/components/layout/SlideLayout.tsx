'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SlideNavigation from '../navigation/SlideNavigation';

interface SlideLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SlideNavigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-64 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold gradient-text">{title}</h1>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default SlideLayout;
