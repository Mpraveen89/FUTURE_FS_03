/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Clock, CalendarCheck, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hypertrophy', path: '/services' },
    { name: 'Somatic Iron', path: '/about' },
    { name: 'Iron Vault', path: '/gallery' },
    { name: 'Inquiries', path: '/contact' }
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-luxury-950/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-3 text-luxury-100'
            : 'bg-transparent py-5 text-luxury-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 bg-luxury-600 rounded-none flex items-center justify-center shrink-0 border border-white/40">
                <div className="w-3.5 h-3.5 bg-black rotate-45 border border-white/20"></div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-lg tracking-tight uppercase font-black text-white group-hover:text-luxury-600 transition-colors duration-300">
                  IRON OBSIDIAN
                </span>
                <span className="text-[7px] uppercase tracking-[0.25em] font-mono font-bold text-luxury-700">
                  SOMATIC POWER // HIGH TENSION
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`font-sans text-[11px] tracking-[0.2em] relative py-1 uppercase transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-[#ff2e2e] font-black' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 inset-x-0 h-[2px] bg-[#ff2e2e]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Services */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/50 border-r border-white/10 pr-6">
                <Clock className="w-3.5 h-3.5 text-white/45" />
                <span className="text-[10px] font-mono tracking-widest">
                  09:00 - 21:00 DAILY
                </span>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer text-white font-medium"
              >
                <span>Book Session</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => onOpenBooking()}
                className="border border-white/30 rounded-full text-[10px] text-white px-3.5 py-1.5 uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer font-medium"
                title="Book appointment"
              >
                <span>Book Session</span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none cursor-pointer p-1.5 rounded-md hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-black/95 backdrop-blur-lg border-b border-white/10 shadow-2xl md:hidden text-white flex flex-col py-6 px-6 space-y-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleMobileLinkClick}
                    className={`w-full text-left font-serif text-lg tracking-wide py-2 border-b border-white/5 uppercase ${
                      isActive ? 'text-[#ff2e2e] font-black' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col space-y-4 pt-2">
              <div className="flex items-center space-x-3 text-white/60 bg-white/5 p-3">
                <Clock className="w-4 h-4 text-white/40" />
                <span className="text-xs font-mono tracking-wider">
                  Operational hours: 09:00 - 21:00 Daily
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/60 bg-[#111] p-3">
                <PhoneCall className="w-4 h-4 text-white/40" />
                <span className="text-xs font-mono tracking-wider">
                  Priority Line: +1 (555) 872-2872
                </span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#ff2e2e] text-white py-3.5 font-sans font-bold text-xs tracking-widest uppercase cursor-pointer hover:bg-white hover:text-black transition-all rounded-none"
              >
                Request High-Tension Strength Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
