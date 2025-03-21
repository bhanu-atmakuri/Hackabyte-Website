import { Inter } from 'next/font/google';

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Admin Dashboard - Hackabyte',
  description: 'Admin panel for Hackabyte events and user management',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${inter.className} min-h-screen bg-[#1A1A1E] text-white`}>
      {children}
    </div>
  );
}
