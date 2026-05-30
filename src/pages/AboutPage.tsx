/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import About from '../components/About';
import Features from '../components/Features';

export default function AboutPage() {
  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white pt-24 min-h-screen">
      {/* Immersive Obsidian Philosophy Header */}
      <div className="relative py-20 bg-neutral-950 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,46,46,0.04),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-[#ff2e2e] block font-black mb-3">
            // SOCIETY DOSSIER
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase leading-none text-white">
            SOMATIC CONSTITUTIONS &<br />
            <span className="italic font-light text-[#ff2e2e]">THE IRON SANCTUARY</span>
          </h1>
          <div className="h-[2px] w-20 bg-[#ff2e2e] mt-6 mb-4" />
          <p className="max-w-xl text-zinc-400 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
            Founded in 2012 / Mumbai. An elite biomechanical refuge dedicated strictly to the architecture of load, muscle tension, and rapid musculoskeletal recovery.
          </p>
        </div>
      </div>

      {/* Renders the luxurious Somatic chronicles of the Reformer */}
      <div className="w-full">
        <About />
      </div>

      {/* Renders the detailed Bento Quality System Pillars of force */}
      <div className="w-full bg-neutral-950/60">
        <Features />
      </div>

      {/* Additional Brutalist Creed Card on Philosophy */}
      <section className="py-24 bg-black border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#ff2e2e] block font-black mb-4">
            // OUR UNYIELDING CREED
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mb-6 uppercase">
            WE DO NOT TRAIN; WE RECONSTRUCT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12 max-w-2xl mx-auto">
            <div className="p-6 bg-[#080808] border border-white/5 space-y-3">
              <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">// MAXIMUM SPECIFICITY</h4>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                No random workouts. Every grip alignment, joint flexion angle, and eccentric tempo is calibrated by a doctoral athletic therapist to address your exact neuromuscular skeletal posture.
              </p>
            </div>
            <div className="p-6 bg-[#080808] border border-white/5 space-y-3">
              <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">// NOISE EXCLUSION</h4>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                Shared gyms are a sensory intrusion. Our private, split-level, raw concrete zones exclude auditory friction so you can focus 100% on high-load neurological output.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
