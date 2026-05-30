/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Leaf, Award, ShieldCheck, Flame, Coffee, Dumbbell, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_FEATURES } from '../data';

const iconMapping: { [key: string]: any } = {
  Sparkles: Sparkles,
  Leaf: Leaf,
  Award: Award,
  ShieldCheck: ShieldCheck
};

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/10">
      {/* Decorative vertical lines representing clean architectural columns */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/5 pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Pillars Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5 text-left border-l-2 border-[#ff2e2e] pl-6">
            <span className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase block mb-3 font-semibold">
              THE INTELLECTUAL LIFT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-none uppercase">
              four pillars of <br />
              <span className="italic text-[#ff2e2e] font-light">somatic engineering</span>
            </h2>
          </div>
          <div className="lg:col-span-7 pt-4 text-left">
            <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl">
              We operate at the precise intersection of biological levers, mechanical load constraints, and clinical deep hypertrophic rehabilitation. Our environment eliminates low-effort distractions.
            </p>
          </div>
        </div>

        {/* Bento Board Architecture Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {CORE_FEATURES.map((feature, index) => {
            const IconComponent = iconMapping[feature.icon] || Sparkles;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 80,
                      damping: 18
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.015,
                  borderColor: 'rgba(255, 46, 46, 0.45)',
                  boxShadow: '0 15px 40px rgba(255, 46, 46, 0.08)'
                }}
                transition={{ duration: 0.25 }}
                className="bg-[#0b0b0b] border-2 border-white/10 p-8 sm:p-10 group flex flex-col justify-between rounded-none cursor-default select-none"
              >
                <div>
                  {/* Premium floating icon accent */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-white/5 text-[#ff2e2e] group-hover:bg-[#ff2e2e] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-8 border border-white/10 rounded-none shrink-0"
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>

                  <h3 className="font-serif text-2xl font-black mb-4 text-white uppercase tracking-tight">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono mt-4">
                  {feature.description}
                </p>

                {/* Subtle visual baseline stamp */}
                <div className="w-16 h-[2px] bg-[#ff2e2e] mt-8 opacity-70 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Secondary Features Badging Grid (Purity & Perks) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          
          <div className="flex items-center space-x-3.5 bg-[#0b0b0b] p-4 border border-white/10 hover:border-[#ff2e2e]/40 transition-colors">
            <div className="p-2 bg-neutral-900 border border-[#ff2e2e]/35 text-[#ff2e2e] shrink-0 rounded-none">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left w-full">
              <h4 className="text-white text-xs font-black uppercase tracking-wider font-sans">Cedar Dry Saunas</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Custom 95°C infrared timber</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-[#0b0b0b] p-4 border border-white/10 hover:border-[#ff2e2e]/40 transition-colors">
            <div className="p-2 bg-neutral-900 border border-[#ff2e2e]/35 text-[#ff2e2e] shrink-0 rounded-none">
              <Coffee className="w-4 h-4" />
            </div>
            <div className="text-left w-full">
              <h4 className="text-white text-xs font-black uppercase tracking-wider font-sans">Protein Elixirs</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Grass-fed whey & cold brews</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-[#0b0b0b] p-4 border border-white/10 hover:border-[#ff2e2e]/40 transition-colors">
            <div className="p-2 bg-neutral-900 border border-[#ff2e2e]/35 text-[#ff2e2e] shrink-0 rounded-none">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div className="text-left w-full">
              <h4 className="text-white text-xs font-black uppercase tracking-wider font-sans">Validated Protocols</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Autoclaved kinesis steel bars</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-[#0b0b0b] p-4 border border-white/10 hover:border-[#ff2e2e]/40 transition-colors">
            <div className="p-2 bg-neutral-900 border border-[#ff2e2e]/35 text-[#ff2e2e] shrink-0 rounded-none">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-left w-full">
              <h4 className="text-white text-xs font-black uppercase tracking-wider font-sans">Somatic Acoustics</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Soundproofed concrete suites</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
