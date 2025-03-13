'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/' },
  { name: 'Follow-up Timing', href: '/follow-up-timing' },
  { name: 'Peak Hour Staffing', href: '/peak-hour-staffing' },
  { name: 'Message Delivery', href: '/message-delivery' },
  { name: 'Optimal Sending Times', href: '/optimal-sending-times' },
];

const SlideNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <h2 className="text-xl font-medium bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Recommendation - Mad City
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-6">Performance Analytics</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-3 py-2 mb-1 rounded-lg
                  transition-all duration-200 ease-in-out
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span>Connected</span>
            </div>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SlideNavigation;
