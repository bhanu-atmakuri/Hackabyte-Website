'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/events', label: 'Events' },
    { path: '/admin/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="w-64 bg-gray-900 h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Hackabyte Admin</h2>
      </div>
      
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`block p-2 rounded ${
                  pathname === item.path ? 'bg-indigo-600' : 'hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <Link 
          href="/"
          className="block p-2 text-gray-400 hover:text-white"
        >
          Back to Site
        </Link>
      </div>
    </nav>
  );
}
