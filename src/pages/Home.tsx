/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import { SERVICES } from '../data';

interface HomeProps {
  onOpenBooking: (serviceId?: string) => void;
  navigatePage: (page: string) => void;
}

export default function Home({ onOpenBooking, navigatePage }: HomeProps) {
  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Spotlight premium highlighted services
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <div className="bg-black text-white">
      {/* 1. Cinematic Hero Section */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Brand Identity Focus & Philosophy Teaser */}
      <section className="py-24 bg-neutral-950 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,46,46,0.03),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#ff2e2e] block font-black">
                // THE ANCHOR ARCHITECTURE
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight uppercase leading-none text-white">
                ELITE DISCIPLINE FOR THE<br />
                <span className="text-[#ff2e2e] italic font-light">BIOMECHANICALLY DRIVEN</span>
              </h2>
              <p className="text-zinc-400 font-serif leading-relaxed max-w-xl text-lg">
                Iron Obsidian is not a playground. It is an exclusive kinesiotherapy atelier and weight-training cathedral built inside thick soundproofed board-form concrete.
              </p>
              <p className="text-zinc-500 font-sans text-xs leading-relaxed max-w-lg">
                Every apparatus is hand-calibrated. From custom carbon-coated barbells with dual-knurling textures, to medical-grade somatic reform systems and pressurized ice chambers, we offer a high-tension ecosystem for body restructurings and extreme power adaptation.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigatePage('about')}
                  className="bg-transparent hover:bg-white text-white hover:text-black border border-white/20 px-6 py-3.5 font-sans text-[10px] tracking-widest uppercase font-black transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>PHILOSOPHY PROTOCOLS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-white/10 p-8 sm:p-10 bg-black/80 backdrop-blur-md relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2e2e]/5 rounded-none blur-3xl pointer-events-none" />
                
                <span className="text-3xl font-serif font-black tracking-tighter text-[#ff2e2e] block mb-2">35%</span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-4">
                  AVERAGE Neuromuscular APEX GAIN
                </span>
                
                <p className="text-[11px] text-zinc-500 font-sans leading-relaxed mb-6">
                  Leveraging high-torque biometric assessments, our kinesiologists identify and rectify spinal-axle loads, resulting in optimal leverage distribution and joint preservation.
                </p>

                <div className="space-y-3 font-mono text-[9px] text-zinc-400 uppercase">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Active Member Limit:</span>
                    <span className="text-white font-bold">120 Active worldwide</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Suite Occupancy:</span>
                    <span className="text-white font-bold">1 Client at a time</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Biomechanics Focus:</span>
                    <span className="text-[#ff2e2e] font-bold">Somatic Hypertrophy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Highly Unique Vault Services Teaser */}
      <section className="py-24 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#ff2e2e] block font-black mb-3">
            // SPECIALIZED FORCES
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight uppercase mb-16 text-white text-center">
            HIGH-INTENSITY SPECS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div 
                key={service.id}
                className="bg-[#0b0b0b] border border-white/10 p-6 text-left flex flex-col justify-between group hover:border-[#ff2e2e]/40 transition-all duration-300"
              >
                <div>
                  <span className="font-mono text-xs text-[#ff2e2e] block mb-4 font-black">0{index + 1} //</span>
                  <h3 className="font-serif text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#ff2e2e] transition-colors duration-200">
                    {service.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-sans leading-normal mb-8">
                    {service.description.slice(0, 150)}...
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-400 mb-4">
                    <span>{service.duration} MINS</span>
                    <span className="text-white font-bold">{service.price}</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="w-full bg-[#161616] group-hover:bg-[#ff2e2e] text-white hover:text-white py-3 font-sans text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    SELECT SLOT
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => navigatePage('services')}
              className="inline-flex items-center space-x-2 border border-[#ff2e2e]/40 px-8 py-4 bg-transparent hover:bg-[#ff2e2e]/10 text-white font-sans text-xs uppercase tracking-widest font-black transition-all cursor-pointer"
            >
              <span>VIEW FULL SERVICE PORTFOLIO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Luxury Testimonial Carousel */}
      <Testimonials />

      {/* 5. Bespoke Bottom CTA Panel */}
      <section className="py-28 bg-[#040404] relative overflow-hidden border-t border-white/10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,46,46,0.05),transparent_65%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Trophy className="w-10 h-10 text-[#ff2e2e] mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white mb-6 uppercase">
            COMMISSION YOUR SESSION
          </h2>
          <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Each booking requests a personal isolated suite, optimized barbell loading coefficients from resident kinesiologists, and unlimited volcanic contrast recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#ff2e2e] hover:bg-white text-white hover:text-black border border-transparent px-8 py-4 font-sans text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              SECURE CURRENT ACCESS
            </button>
            <button
              onClick={() => navigatePage('contact')}
              className="border border-white/20 hover:border-[#ff2e2e] bg-transparent text-white px-8 py-4 font-sans text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              VISIT ATELIER DETAILS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
