import Navbar from './components/shared/Navbar.jsx';

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
