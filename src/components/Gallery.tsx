/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY } from '../data';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'treatment' | 'lounge' | 'details'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', name: 'ALL VAULTS' },
    { id: 'treatment', name: 'STRENGTH SUITES' },
    { id: 'lounge', name: 'ANABOLIC THERMAL LOUUNGES' },
    { id: 'details', name: 'SOMATIC HARDWARE' }
  ];

  const filteredItems = selectedFilter === 'all'
    ? GALLERY
    : GALLERY.filter(item => item.category === selectedFilter);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(prevIndex => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex! - 1
    );
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(prevIndex => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex! + 1
    );
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0e0e0e] relative overflow-hidden border-t border-white/10">
      {/* Subtle graphic guidelines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff2e2e]/5 rounded-none blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gallery Header titles */}
        <div className="text-left mb-16 sm:mb-20">
          <span className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase font-black block mb-3">
            VISUAL ATMOSPHERE
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white font-black tracking-tighter uppercase mb-6 leading-none">
            TOUR THE <span className="italic font-light text-[#ff2e2e]">IRON VAULTS</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl border-l border-white/20 pl-4">
            Stare into the concrete structural architectures, specialized joint-conditioning reformer lines, sub-zero volcanic cryo pools, and raw iron logs.
          </p>
        </div>

        {/* Gallery filters tabs */}
        <div className="flex flex-wrap justify-start gap-1 pb-4 mb-12 sm:mb-16 border-b border-white/10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`px-6 py-3 text-[10px] font-mono uppercase tracking-[0.25em] transition-all duration-200 cursor-pointer rounded-none border ${
                selectedFilter === filter.id
                  ? 'bg-[#ff2e2e] text-white font-black border-[#ff2e2e]'
                  : 'bg-[#141414] text-zinc-400 hover:text-white border-white/5 hover:border-white/20'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Interactive Responsive Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer aspect-4/3 overflow-hidden bg-black/40 border-2 border-white/10 hover:border-[#ff2e2e] shadow-lg"
              >
                {/* Standard Images with referrer policy */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-110 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 contrast-125"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle graphic overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-6">
                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1.5 bg-[#ff2e2e] text-white px-3 py-1 text-[8px] uppercase tracking-widest font-mono font-black rounded-none">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{item.category}</span>
                    </span>
                  </div>
                  <div className="text-left border-l-2 border-[#ff2e2e] pl-4">
                    <h4 className="font-serif text-lg text-white mb-2 font-black tracking-normal uppercase">{item.title}</h4>
                    <span className="flex items-center space-x-1.5 text-[#ff2e2e] text-[9.5px] uppercase font-mono tracking-widest font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>ZOOM SPECIFICATIONS</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Exquisite Production-Grade Gallery Lightbox Overhaul */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            
            {/* Background close click trigger */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Lightbox UI Header */}
            <div className="absolute top-4 inset-x-0 px-6 sm:px-10 flex justify-between items-center z-10">
              <div className="border-l-2 border-[#ff2e2e] pl-4">
                <span className="text-[10px] font-mono tracking-widest text-[#ff2e2e] font-black">
                  SPEC {activeLightboxIndex + 1} OF {filteredItems.length}
                </span>
                <h3 className="text-white font-serif text-lg sm:text-xl font-black tracking-normal mt-1 uppercase">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
              </div>
              <button
                onClick={closeLightbox}
                className="text-white hover:bg-[#ff2e2e] bg-[#111] border border-white/10 p-2.5 rounded-none cursor-pointer transition-transform hover:scale-105"
                title="Close overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-10 text-white bg-black/80 hover:bg-[#ff2e2e] border border-white/10 p-3 sm:p-4 rounded-none cursor-pointer z-10"
              title="Previous space image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 h-6" />
            </button>

            {/* Active Image Render */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[75vh] w-full relative z-10 p-2 bg-[#101010] border-2 border-white/10 flex justify-center items-center shadow-2xl"
            >
              <img
                src={filteredItems[activeLightboxIndex].imageUrl}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain grayscale"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-10 text-white bg-black/80 hover:bg-[#ff2e2e] border border-white/10 p-3 sm:p-4 rounded-none cursor-pointer z-10"
              title="Next space image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 h-6" />
            </button>

            {/* Subtle Helper footer */}
            <div className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-wider text-zinc-500 font-mono">
              PRESS NAVIGATION ARROWS TO BROWSE SPECIFICATIONS.
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
