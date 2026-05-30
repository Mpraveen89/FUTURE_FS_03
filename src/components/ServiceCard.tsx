/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, CheckSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onOpenBooking: (serviceId?: string) => void;
  variants: any;
  key?: React.Key;
}

export default function ServiceCard({ service, onOpenBooking, variants }: ServiceCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [reflectionPos, setReflectionPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Position of hover cursor relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale movement to relative percent of width/height
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Relative range mapped to degrees: -10 to 10
    const rotateY = (percentX - 0.5) * 12; 
    const rotateX = -(percentY - 0.5) * 12;

    setReflectionPos({
      x: percentX * 100,
      y: percentY * 100
    });

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.08s ease-out, box-shadow 0.15s ease-out',
      boxShadow: `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(255, 46, 46, 0.12)`,
      zIndex: 10
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease',
      boxShadow: 'none',
      zIndex: 1
    });
  };

  return (
    <motion.div
      layout
      variants={variants}
      exit="exit"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="bg-[#0b0b0b] border-2 border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#ff2e2e]/45 group pointer-events-auto transform-gpu relative overflow-hidden select-none"
    >
      {/* Visual background dynamic gloss reflection tracking the pointer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(circle at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 46, 46, 0.05) 0%, transparent 60%)`
        }}
      />

      {/* Subtle corner ticks (adds a highly premium aesthetic blueprint feel) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff2e2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff2e2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff2e2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff2e2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Embedded thumbnail with zoom details */}
      <div className="w-full sm:w-44 h-44 shrink-0 overflow-hidden relative border border-white/10 bg-black z-10">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-108 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-85 contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Service Details info container */}
      <div className="flex flex-col justify-between flex-1 z-10 text-left">
        <div>
          {/* Header Details with Duration/Price */}
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="font-serif text-lg sm:text-xl font-black text-white group-hover:text-[#ff2e2e] transition-colors tracking-tight leading-tight uppercase">
              {service.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-mono text-xl font-black text-[#ff2e2e] block">
                ₹{service.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[8px] font-mono tracking-wider uppercase text-white/40 block mt-0.5">
                VAT INCL.
              </span>
            </div>
          </div>

          {/* Metadata tags */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-1.5 text-white/55">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[10px] font-mono tracking-widest">{service.duration} MIN</span>
            </div>
            <span className="text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 border border-white/15 text-[#ff2e2e]/90 bg-white/5 rounded-none font-bold">
              {service.category}
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Core benefits indicators list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-zinc-300 text-[10px] font-mono">
                <CheckSquare className="w-3 h-3 text-[#ff2e2e] shrink-0" />
                <span className="truncate">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Add to selection booking action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[9px] font-mono tracking-[0.18em] text-[#ff2e2e] font-black">
            * INTENSIVE SPEC
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenBooking(service.id);
            }}
            className="px-5 py-2 border-2 border-white rounded-none text-[9px] uppercase tracking-widest hover:bg-[#ff2e2e] hover:text-white hover:border-[#ff2e2e] transition-all cursor-pointer font-black text-white bg-black z-25 relative"
          >
            <span>RESERVE BLOCK</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
