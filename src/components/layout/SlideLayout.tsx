'use client';

import React from 'react';
import SlideNavigation from '../navigation/SlideNavigation';

interface SlideLayoutProps {
  children: React.ReactNode;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SlideNavigation />
      <main className="ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SlideLayout;
