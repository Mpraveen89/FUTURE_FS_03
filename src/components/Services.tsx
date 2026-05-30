/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import ServiceCard from './ServiceCard';
import SomaticTelemetry from './SomaticTelemetry';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'strength' | 'pilates' | 'recovery' | 'classes'>('strength');

  const categories = [
    { id: 'strength', name: 'Performance Strength' },
    { id: 'pilates', name: 'Decompress & FRC' },
    { id: 'recovery', name: 'Thermal Contrasts' },
    { id: 'classes', name: 'Loaded Classes' }
  ];

  const filteredServices = SERVICES.filter(s => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.25 } 
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Editorial Watermark background */}
      <div className="absolute top-10 left-10 text-[10vw] font-serif text-white/5 select-none pointer-events-none leading-none uppercase font-black tracking-tighter">
        IRON REBUILD
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16 sm:mb-20">
          <span className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase font-black block mb-3">
            SYSTEM SPECIFICATIONS
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tighter text-white mb-6 uppercase">
            ANABOLIC FOCUS & <span className="text-[#ff2e2e] italic font-light">Somatic Loads</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl border-l border-white/20 pl-4">
            Every movement protocol, skeletal screening, and contrast therapeutic cycle is calculated to absolute biomechanical limits. Select an objective-focus catalog.
          </p>
        </div>

        {/* Categories Tab Grid Trigger */}
        <div className="flex flex-wrap justify-start gap-1 mb-16 max-w-4xl border-b-2 border-white/10 pb-0 shadow-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-4 text-[10px] uppercase tracking-[0.25em] font-mono transition-all duration-200 relative cursor-pointer border-t border-x border-transparent ${
                activeCategory === cat.id
                  ? 'text-white bg-[#111] border-white/20 font-black border-b-[#ff2e2e]'
                  : 'text-zinc-500 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-[#ff2e2e]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Interactive Service Card Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOpenBooking={onOpenBooking}
                variants={itemVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Somatic Integrated Performance Telemetry Panel */}
        <SomaticTelemetry activeCategory={activeCategory} />

        {/* Guarantee bottom promo card */}
        <div className="mt-16 sm:mt-24 bg-[#0a0a0a] border-2 border-white/10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2e2e]/5 rounded-none blur-3xl pointer-events-none" />
          <div className="max-w-2xl text-left border-l-2 border-[#ff2e2e] pl-6">
            <h4 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-normal mb-3 uppercase">
              NOT SURE WHICH HEAVY PARAMETERS CORRESPOND TO YOUR LEVERAGES?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed">
              Consult directly with Julian Vance for a complimentary 15-minute diagnostic. Simply select "Bespoke Strength Counseling" inside our private booking engine.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking('str-1')}
            className="shrink-0 border-2 border-[#ff2e2e] bg-[#ff2e2e] text-white hover:bg-transparent hover:text-[#ff2e2e] px-6 py-3.5 rounded-none font-sans font-black text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            REQUEST SKELETAL SCREEN
          </button>
        </div>

      </div>
    </section>
  );
}
