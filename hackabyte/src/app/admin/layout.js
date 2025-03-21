import { Inter } from 'next/font/google';
import '../globals.css';

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-[#1A1A1E] text-white`} suppressHydrationWarning>
        <div className="admin-layout">
          {/* Admin sidebar or navigation could go here */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
