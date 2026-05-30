/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Slide left
  const slideLeft = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Slide right
  const slideRight = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      slideRight();
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 60 : -60
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -60 : 60,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Background radial soft light */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-red-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials Title */}
        <div className="text-left mb-16 sm:mb-20">
          <span className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase font-black block mb-3">
            ATHLETE REVIEWS
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white font-black tracking-tighter uppercase mb-6 leading-none">
            CHAMBER <span className="italic font-light text-[#ff2e2e]">LOGBOOKS</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl border-l border-white/20 pl-4">
            Discover some of the verified log entries from elite powerlifters, classic bodybuilders, and kinesiotherapy patients who call our iron vaults home.
          </p>
        </div>

        {/* Carousel slide card container */}
        <div className="max-w-4xl mx-auto relative px-10 sm:px-16 min-h-[380px] sm:min-h-[300px] flex items-center bg-[#070707] border-2 border-white/10 p-8 sm:p-12 relative overflow-hidden group hover:border-[#ff2e2e]/40 transition-colors duration-300">
          
          {/* Subtle blueprint corner ticks (adds a highly premium aesthetic blueprint feel) */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff2e2e]/45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ff2e2e]/45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ff2e2e]/45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff2e2e]/45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Glowing pulse ambient orb background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-[#ff2e2e]/[0.025] blur-[80px] rounded-full pointer-events-none group-hover:bg-[#ff2e2e]/[0.05] transition-all duration-500" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-left flex flex-col items-start relative z-10"
            >
              {/* Grand Elegant Quote icon decoration */}
              <motion.div 
                whileHover={{ rotate: -8, scale: 1.05 }}
                className="w-12 h-12 rounded-none bg-neutral-950 flex items-center justify-center border border-[#ff2e2e]/30 text-[#ff2e2e] mb-8"
              >
                <Quote className="w-5 h-5 fill-current" />
              </motion.div>

              {/* Main Review text */}
              <blockquote className="text-lg sm:text-xl font-mono text-zinc-300 leading-relaxed mb-8 max-w-3xl">
                “{activeTestimonial.comment}”
              </blockquote>

              {/* Reviewer Meta profile columns */}
              <div className="flex items-center space-x-4 mb-4">
                <motion.img
                  initial={{ filter: 'grayscale(100%) contrast(1.2)' }}
                  whileHover={{ filter: 'grayscale(0%) contrast(1.1)', scale: 1.05 }}
                  src={activeTestimonial.imageUrl}
                  alt={activeTestimonial.name}
                  className="w-12 h-12 rounded-none border border-[#ff2e2e]/60 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <span className="text-sm font-black tracking-wider text-white block uppercase">
                    {activeTestimonial.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff2e2e] block mt-0.5">
                    {activeTestimonial.role}
                  </span>
                </div>
              </div>

              {/* Stars ratings layout */}
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#ff2e2e] fill-current animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                ESTEEMED RECORD SINCE // {activeTestimonial.date}
              </span>

            </motion.div>
          </AnimatePresence>

          {/* Nav arrows outside the card boundaries */}
          <button
            onClick={slideLeft}
            className="absolute left-4 text-[#ff2e2e]/55 hover:text-white bg-black border border-white/10 p-2.5 rounded-none cursor-pointer hidden sm:block transition-all"
            title="Scroll reviews left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={slideRight}
            className="absolute right-4 text-[#ff2e2e]/55 hover:text-white bg-black border border-white/10 p-2.5 rounded-none cursor-pointer hidden sm:block transition-all"
            title="Scroll reviews right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Visual dots indicator row */}
        <div className="flex justify-start space-x-2 mt-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`h-1 cursor-pointer transition-all duration-300 rounded-none ${
                index === currentIndex ? 'w-10 bg-[#ff2e2e]' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
