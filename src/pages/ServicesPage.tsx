/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Services from '../components/Services';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      {/* Editorial Header */}
      <div className="relative py-16 bg-neutral-950 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,46,46,0.04),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-[#ff2e2e] block font-black mb-3">
            // SERVICE SYSTEM REGISTRY  
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase leading-none text-white">
            CHAMBERS, HYPERTROPHY &<br />
            <span className="italic font-light text-[#ff2e2e]">LOAD MATRIX PROTOCOLS</span>
          </h1>
          <p className="max-w-2xl text-zinc-400 font-mono text-[11px] uppercase tracking-widest mt-6 leading-relaxed">
            All reservation durations are exact exclusive suites blocks. Each session combines 1-on-1 kinesiologist alignment, premium custom metal weights, and zero external occupancy.
          </p>
        </div>
      </div>

      <Services onOpenBooking={onOpenBooking} />
    </div>
  );
}
