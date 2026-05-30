/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Activity } from 'lucide-react';

interface LoadingOverlayProps {
  onComplete?: () => void;
}

export default function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [telemetry, setTelemetry] = useState({
    torque: '0.0 Nm',
    cryo: '-110.0 °C',
    axis: '0.00°',
    cartilage: 'SECURE'
  });

  const statuses = [
    'PROPAGATING BIOMECHANIC MATRIX //',
    'CALIBRATING JOINT TORQUE COEFFICIENTS //',
    'CRYO THERMAL RESERVOIR INTEGRATING //',
    'SKELETAL LOAD VECTOR ALIGNMENT //',
    'VAULTS UNLOCKED // ATELIER ONLINE'
  ];

  useEffect(() => {
    // Fast-loading dynamic calibration feel
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.random() * 15 + 12;
        return Math.min(100, Math.floor(prev + step));
      });
    }, 130);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    // Rapidly changing biomechanical diagnostic numbers
    const telemetryInterval = setInterval(() => {
      if (progress < 100) {
        setTelemetry({
          torque: `${(380 + Math.random() * 120).toFixed(1)} Nm`,
          cryo: `${(-105 - Math.random() * 8).toFixed(1)} °C`,
          axis: `${(Math.random() * 1.5 - 0.75).toFixed(2)}°`,
          cartilage: Math.random() > 0.2 ? 'CALIBRATED' : 'SENSING'
        });
      } else {
        setTelemetry({
          torque: '480.0 Nm',
          cryo: '-110.0 °C',
          axis: '0.00°',
          cartilage: 'OPTIMAL'
        });
      }
    }, 80);

    return () => clearInterval(telemetryInterval);
  }, [progress]);

  useEffect(() => {
    // Progress boundaries for text updates
    if (progress < 20) {
      setStatusIdx(0);
    } else if (progress < 45) {
      setStatusIdx(1);
    } else if (progress < 70) {
      setStatusIdx(2);
    } else if (progress < 90) {
      setStatusIdx(3);
    } else {
      setStatusIdx(4);
    }

    if (progress === 100 && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 550); // Premium brief transition delay
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#060606] z-50 flex flex-col justify-between p-8 sm:p-12 text-white font-sans overflow-hidden select-none border-4 border-neutral-900">
      {/* Background ambient crimson radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,46,46,0.06),transparent_65%)] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] [background-size:100%_4px] pointer-events-none opacity-40" />

      {/* Top status bar */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase z-10">
        <span className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#ff2e2e] animate-pulse" />
          <span>IRON OBSIDIAN SYS // [v14.02]</span>
        </span>
        <span className="text-[#ff2e2e]/80">BEVERLY HILLS ATELIER</span>
      </div>

      {/* Centered Main Brand & Progress */}
      <div className="max-w-xl mx-auto w-full text-center space-y-10 relative z-10 flex flex-col justify-center items-center flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Subtle graphical logo accent */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#ff2e2e]" />
            <span className="text-[10px] font-mono tracking-[0.4em] font-extrabold text-[#ff2e2e] text-center block">SOMATIC POWER CLUB</span>
            <span className="w-1.5 h-1.5 bg-[#ff2e2e]" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif tracking-normal font-black text-white leading-none uppercase">
            IRON OBSIDIAN
          </h1>
          
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="h-[1px] w-6 bg-white/20" />
            <span className="text-[9px] font-mono tracking-[0.4em] text-zinc-400 block uppercase">
              HIGH-INTENSITY SANCTUARY
            </span>
            <span className="h-[1px] w-6 bg-white/20" />
          </div>
        </motion.div>

        {/* Tactical Telemetry Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md border border-white/10 bg-black/40 p-3 font-mono text-[9px] text-zinc-500 rounded-none text-left">
          <div className="p-2 border-r border-white/5">
            <span className="block text-zinc-600 font-bold">TORQUE COEF:</span>
            <span className="block text-white font-black mt-1">{telemetry.torque}</span>
          </div>
          <div className="p-2 sm:border-r border-white/5">
            <span className="block text-zinc-600 font-bold">ICE TEMP:</span>
            <span className="block text-[#ff2e2e] font-black mt-1">{telemetry.cryo}</span>
          </div>
          <div className="p-2 border-r border-white/5">
            <span className="block text-zinc-600 font-bold">AXIS SPLIT:</span>
            <span className="block text-white font-black mt-1">{telemetry.axis}</span>
          </div>
          <div className="p-2">
            <span className="block text-zinc-600 font-bold">CHAMBER BAR:</span>
            <span className="block text-white font-black mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#ff2e2e]" />
              <span>{telemetry.cartilage}</span>
            </span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-56 sm:w-72 space-y-4 pt-1">
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
            <motion.div 
              className="h-full bg-[#ff2e2e] absolute left-0 top-0"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut', duration: 0.15 }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest">
            <span className="text-zinc-500 text-left truncate max-w-[180px] sm:max-w-xs">{statuses[statusIdx]}</span>
            <span className="text-[#ff2e2e] font-black">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footnote details */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-widest text-[#ff2e2e]/55 border-t border-white/5 pt-6 text-center z-10">
        <span className="uppercase">// THE ART OF HYPERTROPHY, LEVERAGE CORES & RECONSTRUCTIVE BIOMECHANICS</span>
        <span className="text-zinc-500">EST. 2012 / CALIBRATED SECURITY: EXEMPT</span>
      </div>
    </div>
  );
}
