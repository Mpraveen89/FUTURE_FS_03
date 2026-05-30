/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, ShieldCheck, ArrowRight, Star, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { heroSpaBanner } from '../data';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [tiltStyleVoucher, setTiltStyleVoucher] = useState({});

  const scrollToCatalog = () => {
    const catalog = document.getElementById('services');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Luxury 3D mouse parallax hover effect calculation
  const handleVoucherMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Relative coordinates scaled from -1 to 1
    const valX = (x / rect.width - 0.5) * 16; // Up to 16 deg rotation on Y axis
    const valY = -(y / rect.height - 0.5) * 16; // Up to 16 deg rotation on X axis
    
    setTiltStyleVoucher({
      transform: `perspective(800px) rotateX(${valY}deg) rotateY(${valX}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `${-valX * 1.5}px ${valY * 1.5}px 32px rgba(255, 46, 46, 0.15)`
    });
  };

  const handleVoucherMouseLeave = () => {
    setTiltStyleVoucher({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      boxShadow: 'none'
    });
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center pt-24 overflow-hidden">
      {/* Immersive Cinematic Background Video Cinemagraph with rich blur, vignettes & luxury shades */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-45 filter grayscale contrast-125 brightness-[0.75] select-none pointer-events-none"
        >
          <source 
            src="https://player.vimeo.com/external/498877545.hd.mp4?s=ebd96bd45dbf682cfbb12503a4695029ed5bfa33&profile_id=174&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          {/* Backup Image Fallback if video fails to load or autoplays on mobile */}
          <img
            src={heroSpaBanner}
            alt="Iron Obsidian Hardcore Lift Club"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </video>

        {/* Dynamic biometric grid/HUD overlay animation layer for tactical aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,46,46,0.015)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,46,46,0.015)_1.5px,transparent_1.5px)] bg-[size:40px_40px] opacity-60 z-1" />
        
        {/* Animated biomechanics targeting line */}
        <motion.div
          animate={{
            y: ['0vh', '100vh', '0vh']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-x-0 h-[1.5px] bg-[#ff2e2e]/20 shadow-[0_0_10px_rgba(255,46,46,0.4)] pointer-events-none z-1"
        />

        {/* Layered high-tension dark vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 z-1" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent z-1" />
      </motion.div>

      {/* Hero Core Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 text-center md:text-left flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-20">
        <div className="max-w-2xl text-left">
          {/* Subtle rating row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center space-x-2 border border-[#ff2e2e]/20 px-4 py-1.5 rounded-none mb-6 text-white bg-[#0e0e0e]"
          >
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 text-[#ff2e2e] fill-current" />
              ))}
            </div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#ff2e2e] font-extrabold uppercase">
              HIGH-TENSION IRON ATELIER
            </span>
          </motion.div>

          {/* Majestic display heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black leading-[0.9] tracking-tighter text-white mb-6 uppercase"
          >
            BRUTE FORCE &<br />
            <span className="italic font-light text-[#ff2e2e] block sm:inline">SOMATIC IRON</span>
          </motion.h1>

          {/* Descriptive narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs sm:text-base text-[#e5e1d8]/80 font-light leading-relaxed max-w-xl mb-10 font-mono border-l-2 border-[#ff2e2e] pl-4"
          >
            A high-performance limited-occupancy strength sanctuary and kinesiotherapy contrast club. No crowded lines, no commercial noise, no distractions. Customized femur/humerus relative leverage tracking, high-torque loaded barbell screens, and extreme thermodynamic recovery.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <button
              onClick={() => onOpenBooking()}
              className="group bg-[#ff2e2e] text-white hover:bg-white hover:text-black border border-transparent px-8 py-4 rounded-none font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer font-black"
            >
              <span>CLAIM SOMATIC RESERVATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={scrollToCatalog}
              className="border border-[#ff2e2e]/40 hover:border-white bg-transparent hover:bg-[#ff2e2e]/10 text-white px-8 py-4 rounded-none font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center cursor-pointer font-black"
            >
              EXPLORE FORCES
            </button>
          </motion.div>
        </div>

        {/* Dynamic interactive HUD panel containing the voucher card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="w-full lg:w-[410px] space-y-4"
        >
          <div
            onMouseMove={handleVoucherMouseMove}
            onMouseLeave={handleVoucherMouseLeave}
            style={tiltStyleVoucher}
            className="w-full bg-[#0a0a09] backdrop-blur-xl border-2 border-[#ff2e2e] p-6 shadow-2xl relative overflow-hidden transform-gpu select-none rounded-none text-left"
          >
            {/* Subtle corners styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-4 h-4 text-[#ff2e2e] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#ff2e2e] font-black uppercase">
                HIGH-VOLUME DRILL
              </span>
            </div>

            <h3 className="font-serif text-2xl text-white font-black tracking-normal mb-2 uppercase">
              THE IRON ASCENSION
            </h3>
            <p className="text-[11px] text-[#e5e1d8]/70 leading-relaxed font-light mb-5 font-sans">
              A brutal, personalized 135-minute biomechanical power-adaptation sequence: 1-on-1 max-load leverage screening, neuromuscular core activation, heavy sandbag/ Atlas carry conditioning, and volcanic contrast cryo-recovery.
            </p>

            <div className="flex justify-between items-center bg-black/80 p-3 mb-5 border border-white/10">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-mono">DURATIONS</span>
                <span className="text-xs font-black text-white font-mono">135 MINS</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-mono">ELITE RATE</span>
                <span className="text-xs font-black text-[#ff2e2e] font-mono">₹25,000 TOTAL</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="w-full border-2 border-white bg-white text-black hover:bg-transparent hover:text-white rounded-none font-sans text-[10px] uppercase tracking-widest py-3 transition-all duration-300 cursor-pointer font-black"
            >
              SECURE LIFTING BLOCK
            </button>
          </div>
        </motion.div>
      </div>

      {/* Ticker Bar at bottom of Hero */}
      <div className="absolute bottom-0 inset-x-0 bg-black border-t-2 border-[#ff2e2e]/40 backdrop-blur-md hidden lg:block z-10 py-5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="flex items-center justify-center space-x-3.5 px-6">
              <Award className="w-5 h-5 text-[#ff2e2e]" />
              <div className="text-left">
                <h4 className="text-white text-xs font-sans font-black uppercase tracking-wider">BIOMECHANIC LOAD AUDITS</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-mono">Custom bone leverage and torque profiling</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3.5 px-6">
              <ShieldCheck className="w-5 h-5 text-[#ff2e2e]" />
              <div className="text-left">
                <h4 className="text-white text-xs font-sans font-black uppercase tracking-wider">ISOLATE ZONE POLICY</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-mono">Soundproofed raw iron concrete suites</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3.5 px-6">
              <Star className="w-5 h-5 text-[#ff2e2e]" />
              <div className="text-left">
                <h4 className="text-white text-xs font-sans font-black uppercase tracking-wider">KINESIOLOGY DOCTORATES</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-mono">Coaches hold professional athletic degrees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
