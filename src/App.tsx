/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import our modular pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Import our layouts & modals
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';

import { Booking } from './types';
import { SERVICES } from './data';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeReservation, setActiveReservation] = useState<Booking | null>(null);
  const [showReservationBanner, setShowReservationBanner] = useState(false);
  const navigate = useNavigate();

  // Scan for active bookings saved in localStorage on boot
  useEffect(() => {
    const cached = localStorage.getItem('aura_active_booking');
    if (cached) {
      try {
        const parsed: Booking = JSON.parse(cached);
        if (parsed.status === 'confirmed') {
          setActiveReservation(parsed);
          setShowReservationBanner(true);
        }
      } catch (err) {
        console.error('Error parsing reservation context:', err);
      }
    }
  }, [isBookingModalOpen]); // check again whenever booking state closes/updates

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    } else {
      setSelectedServiceId(null);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleCancelReservation = () => {
    localStorage.removeItem('aura_active_booking');
    setActiveReservation(null);
    setShowReservationBanner(false);
  };

  const navigatePage = (pagePath: string) => {
    navigate('/' + pagePath);
    window.scrollTo(0, 0);
  };

  const activeServiceObj = activeReservation 
    ? SERVICES.find(s => s.id === activeReservation.serviceId)
    : null;

  return (
    <div className="min-h-screen bg-luxury-50 flex flex-col justify-between selection:bg-[#ff2e2e] selection:text-white font-sans text-luxury-900 overflow-x-hidden antialiased">
      
      {/* Dynamic Cinematic Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isInitializing && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <LoadingOverlay onComplete={() => setIsInitializing(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Reservation Notification Sticky Banner Alert */}
      <AnimatePresence>
        {showReservationBanner && activeReservation && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-[#ff2e2e] text-white px-4 py-3 z-50 fixed bottom-6 left-6 max-w-sm border border-[#ff2e2e]/40 shadow-2xl flex items-start space-x-3.5"
          >
            <div className="p-1.5 bg-black text-[#ff2e2e] mt-0.5 border border-white/10">
              <Calendar className="w-4 h-4" />
            </div>

            <div className="flex-1 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-white/80">Active Booking</span>
                <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5">{activeReservation.id}</span>
              </div>
              <p className="text-xs font-serif font-black mt-1 text-white leading-tight uppercase tracking-tight">
                {activeServiceObj ? activeServiceObj.name : 'Aura Signature Ritual'}
              </p>
              <div className="text-[10px] font-mono mt-1 text-white/80">
                Scheduled: {activeReservation.date} @ {activeReservation.timeSlot}
              </div>
              
              <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="text-[9px] uppercase tracking-widest font-black underline hover:text-white bg-transparent border-none cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={handleCancelReservation}
                  className="text-[9px] uppercase tracking-widest font-black text-white/70 hover:text-white underline bg-transparent border-none cursor-pointer"
                >
                  Cancel Slot
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowReservationBanner(false)}
              className="text-white hover:text-zinc-200 p-0.5 bg-transparent border-none cursor-pointer"
              title="Hide notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero-Top level Sticky Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Cinematic Main Section Route Matcher */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onOpenBooking={handleOpenBooking} 
                navigatePage={navigatePage} 
              />
            } 
          />
          <Route 
            path="/services" 
            element={<ServicesPage onOpenBooking={handleOpenBooking} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />
          <Route 
            path="/gallery" 
            element={<GalleryPage />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />
        </Routes>
      </main>

      {/* Modular footer containing newsletter sign-up email dispatch */}
      <Footer />

      {/* Absolute Scheduling Modal Overhaul Overlay */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        selectedServiceId={selectedServiceId}
      />

    </div>
  );
}
