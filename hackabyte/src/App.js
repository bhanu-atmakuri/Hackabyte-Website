import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import HackathonsPage from './pages/HackathonsPage';
import PastEventsPage from './pages/PastEventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LumaPage from './pages/LumaPage';
import JoinUsPage from './pages/JoinUsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-hackabyte-dark text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/hackathons" element={<HackathonsPage />} />
          <Route path="/events/past-events" element={<PastEventsPage />} />
          <Route path="/events/past-events/:eventId" element={<EventDetailPage />} />
          <Route path="/luma" element={<LumaPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;