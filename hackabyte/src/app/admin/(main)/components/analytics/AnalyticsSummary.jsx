'use client';

import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsSummary({ data }) {
  if (!data) return null;

  const stats = [
    {
      name: 'Total Users',
      value: data.totalUsers,
      change: data.userGrowth,
      icon: UserGroupIcon,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      name: 'Active Events',
      value: data.activeEvents,
      change: data.eventGrowth,
      icon: CalendarIcon,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      name: 'Page Views',
      value: data.pageViews,
      change: data.pageViewGrowth,
      icon: CursorArrowRaysIcon,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      name: 'Registrations',
      value: data.registrations,
      change: data.registrationGrowth,
      icon: ArrowTrendingUpIcon,
      color: 'bg-orange-500/10 text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{stat.value.toLocaleString()}</h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className={`text-sm ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
            <div className="text-gray-400 text-sm ml-2">from previous period</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
