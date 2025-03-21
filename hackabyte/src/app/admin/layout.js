import { Inter } from 'next/font/google';
import AdminNavbar from '@/components/admin/AdminNavbar';

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Admin Dashboard - Hackabyte',
  description: 'Admin panel for Hackabyte events and user management',
};

export default function AdminLayout({ children }) {
  return (
    <div className={`flex h-screen bg-[#1A1A1E] text-white ${inter.className}`}>
      <AdminNavbar />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
