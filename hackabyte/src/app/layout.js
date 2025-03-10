import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font once and use it throughout the app
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font loading
});

export const metadata = {
  title: 'Hackabyte - Hackathons for Students',
  description: 'Hackabyte hosts in-person hackathons for high school, middle school, and elementary students, building coding experience, problem-solving skills, and mentor connections.',
};

// Using a function component instead of just returning JSX to handle hydration more carefully
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}