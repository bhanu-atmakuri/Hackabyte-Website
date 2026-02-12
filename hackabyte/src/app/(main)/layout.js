// hackabyte/src/app/layout.js
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Hackabyte - Hackathons for Students',
  description: 'Hackabyte hosts in-person hackathons for high school, middle school, and elementary students, building coding experience, problem-solving skills, and mentor connections.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

// Using a function component instead of just returning JSX to handle hydration more carefully
export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
