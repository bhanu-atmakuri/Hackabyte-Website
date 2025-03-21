'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const pathname = usePathname();
  
  useEffect(() => {
    // Get admin info from session storage
    const email = sessionStorage.getItem('adminEmail');
    if (email) {
      // Just use the part before @ for a simple name
      setAdminName(email.split('@')[0]);
    }
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Events', href: '/admin/events', icon: CalendarIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1E]">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
           onClick={() => setSidebarOpen(false)}
      />
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#16161A] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Hackabyte" className="h-8 w-8" />
            <span className="text-white font-semibold text-lg">Hackabyte</span>
          </Link>
          <button 
            className="lg:hidden text-gray-400 hover:text-white" 
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="mb-8">
            <div className="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase">
              Admin Menu
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-[#FF2247]/10 text-[#FF2247]'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <item.icon 
                      className={`mr-3 h-5 w-5 ${isActive ? 'text-[#FF2247]' : 'text-gray-400'}`} 
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF2247] flex items-center justify-center text-white">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{adminName}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-[#1A1A1E] pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
