import Navbar from './components/shared/Navbar.jsx';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
