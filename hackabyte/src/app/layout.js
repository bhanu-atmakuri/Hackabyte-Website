import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font once and use it throughout the app
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata = {
  title: 'Hackabyte - Hackathons for Students',
  description: 'Hackabyte hosts in-person hackathons for high school, middle school, and elementary students, building coding experience, problem-solving skills, and mentor connections.',
};

// Separate viewport export as recommended by Next.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased text-white bg-[#1A1A1E]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}