/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Award, Flame, Zap, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { aboutTreatment } from '../data';

export default function About() {
  // Animated counters state simulated nicely in elegant fashion
  const [clients, setClients] = useState(0);
  const [years, setYears] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const clientsInterval = setInterval(() => {
      setClients((prev) => {
        if (prev >= 28) {
          clearInterval(clientsInterval);
          return 28;
        }
        return prev + 1;
      });
    }, 50);

    const yearsInterval = setInterval(() => {
      setYears((prev) => {
        if (prev >= 14) {
          clearInterval(yearsInterval);
          return 14;
        }
        return prev + 1;
      });
    }, 80);

    const awardsInterval = setInterval(() => {
      setAwards((prev) => {
        if (prev >= 18) {
          clearInterval(awardsInterval);
          return 18;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(clientsInterval);
      clearInterval(yearsInterval);
      clearInterval(awardsInterval);
    };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/10">
      {/* Background Decorative cyber glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff2e2e]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#ff2e2e]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column 1: Image Composition with offset styling */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 border-2 border-[#ff2e2e]/20 p-2 bg-neutral-900 shadow-2xl"
            >
              <img
                src={aboutTreatment}
                alt="Olympic lifting and somatic biomechanics coaching"
                className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700 contrast-125"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Hard Floating Experience badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#111] text-white p-6 sm:p-8 shadow-2xl z-20 border-2 border-luxury-600 flex flex-col items-center justify-center min-w-[170px]"
            >
              <span className="font-mono text-4xl sm:text-5xl text-[#ff2e2e] font-black tracking-tight flex items-baseline">
                {years}
                <span className="text-xl text-[#ff2e2e] ml-0.5">+</span>
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#e5e1d8]/75 mt-2 font-black text-center leading-normal">
                Years of Pure <br />Somatic Power
              </span>
            </motion.div>

            {/* Decorative background framing box */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-luxury-600/30 pointer-events-none -z-0 translate-x-2 translate-y-2 hidden sm:block" />
          </div>

          {/* Column 2: Luxurious Content narrative */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-10"
            >
              <div>
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase block mb-3 font-semibold"
                >
                  The Somatic Chronology
                </motion.span>
                <motion.h2 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight"
                >
                  An Elite Atelier Built on <br />
                  <span className="italic text-[#ff2e2e] font-light">Somatic Integrity</span>
                </motion.h2>
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 }
                }}
                className="space-y-6 text-sm text-[#e5e1d8]/70 leading-relaxed font-mono"
              >
                <p>
                  Founded in 2012 by primary athletic director Julian Vance, Iron Obsidian Somatic Club is built to transcend loud, crowded, and commercialized gym environments. We represent a quiet, high-end private athletic haven where performance is engineered around functional joint biomechanics, structural core safety, and long-term somatic longevity.
                </p>
                <p>
                  Our private training and reformer suites are optimized as noise-proof chambers, featuring premium concrete cladding, handcrafted oak reformers, and custom steel resistance equipment for total concentration. We combine continuous performance monitoring with volcanic ice plunges and cedar infrared contrast bath sequences, ensuring you reach physical thresholds in ultimate peace.
                </p>
              </motion.div>

              {/* Simulated Live Statistics Counters */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-10 border-t border-white/10 mt-10"
              >
                <div>
                  <span className="font-mono text-4xl text-white font-black tracking-tight flex items-baseline">
                    {clients}k
                    <span className="text-[#ff2e2e] text-lg ml-0.5">+</span>
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#e5e1d8]/60 mt-1.5 block">
                    Movement Audits
                  </span>
                </div>

                <div>
                  <span className="font-mono text-4xl text-white font-black tracking-tight flex items-baseline">
                    {awards}
                    <span className="text-[#ff2e2e] text-lg ml-0.5">+</span>
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#e5e1d8]/60 mt-1.5 block">
                    Athletic Honors
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="font-mono text-4xl text-white font-black tracking-tight">
                    100%
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#e5e1d8]/60 mt-1.5 block">
                    Somatic Focus
                  </span>
                </div>
              </motion.div>

              {/* Core Values / Tri-factor columns */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-1 px-1.5 bg-[#ff2e2e]/10 border border-[#ff2e2e]/30 text-[#ff2e2e] mt-0.5 rounded-none animate-pulse">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider mb-1">Precision First</h4>
                    <p className="text-[11px] text-[#e5e1d8]/60 leading-relaxed font-mono">Custom loads and volume adjusted to your exact cardiovascular baseline and cartilage tolerances.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 px-1.5 bg-[#ff2e2e]/10 border border-[#ff2e2e]/30 text-[#ff2e2e] mt-0.5 rounded-none">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider mb-1">Biomechanical Mastery</h4>
                    <p className="text-[11px] text-[#e5e1d8]/60 leading-relaxed font-mono">Every coach holds academic kinesiology degrees, with ongoing training in orthopedics.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 px-1.5 bg-[#ff2e2e]/10 border border-[#ff2e2e]/30 text-[#ff2e2e] mt-0.5 rounded-none">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider mb-1">Isolated Focus</h4>
                    <p className="text-[11px] text-[#e5e1d8]/60 leading-relaxed font-mono">Limited booking limits occupancy so you train in isolation. Never rushed, never compromised.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
