import './globals.css';
import { AuthProvider } from '../lib/auth/AuthContext';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ErrorBoundary from '../components/shared/ErrorBoundary';

export const metadata = {
  title: 'Hackabyte - Tech Education for Youth',
  description: 'Hackabyte is a nonprofit organization dedicated to providing tech education and opportunities for youth ages 13-19 through hackathons, workshops, and mentorship programs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <AuthProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
