/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, ArrowUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setNewsletterEmail('');
    }, 6000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-[#ff2e2e]/40 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff2e2e]/5 rounded-none blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Bio Description (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2.5 group hover:opacity-90">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-neutral-950 rounded-none border-t-[#ff2e2e]">
                <Zap className="text-[#ff2e2e] w-5 h-5" />
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="font-serif text-2xl tracking-tight uppercase font-black text-white">
                  IRON OBSIDIAN
                </span>
                <span className="text-[8px] uppercase tracking-widest font-mono font-black text-[#ff2e2e] block">
                  SOMATIC POWER ATELIER
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-sm">
              An elite limited-occupancy strength sanctuary and private bodybuilding/kinesiotherapy club. Optimized leverage assessments, noise-proof concrete training suites, heavy solid-steel lifting apparatus, and sub-zero volcanic contrast pools.
            </p>

            <div className="text-[10px] font-mono tracking-widest text-[#ff2e2e] uppercase font-black">
              // OBSIDIAN SOMATIC CHRONOLOGY 2012
            </div>
          </div>

          {/* Column 2: Navigation anchors (lg:col-span-2) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-sans font-black text-[10px] uppercase tracking-[0.2em] text-[#ff2e2e] mb-6">
              SOCIETAL DIRECTORY
            </h4>
            <div className="flex flex-col space-y-3.5 text-xs font-mono text-zinc-400">
              <Link to="/" onClick={scrollToTop} className="text-left hover:text-[#ff2e2e] hover:translate-x-1 transition-all cursor-pointer">
                The Core Sanctuary
              </Link>
              <Link to="/services" onClick={scrollToTop} className="text-left hover:text-[#ff2e2e] hover:translate-x-1 transition-all cursor-pointer">
                The Hypertrophy Loads
              </Link>
              <Link to="/about" onClick={scrollToTop} className="text-left hover:text-[#ff2e2e] hover:translate-x-1 transition-all cursor-pointer">
                Our Somatic Club & Creed
              </Link>
              <Link to="/gallery" onClick={scrollToTop} className="text-left hover:text-[#ff2e2e] hover:translate-x-1 transition-all cursor-pointer">
                Moments & Vaults
              </Link>
              <Link to="/contact" onClick={scrollToTop} className="text-left hover:text-[#ff2e2e] hover:translate-x-1 transition-all cursor-pointer">
                Inquiries E-Desk
              </Link>
            </div>
          </div>

          {/* Column 3: E-Newsletter Dispatch Subscription (lg:col-span-5) */}
          <div className="lg:col-span-5 text-left space-y-5">
            <h4 className="font-sans font-black text-[10px] uppercase tracking-[0.2em] text-[#ff2e2e] mb-2">
              THE CHRONICLES DISPATCH
            </h4>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Subscribe to recieve seasonal kinesiotherapy journals, bespoke athletic schedules, and priority contrast bath session allocations.
            </p>

            {isSubscribed ? (
              <div className="bg-neutral-900 border border-[#ff2e2e]/30 p-4 flex items-center space-x-3 text-white">
                <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-[#ff2e2e]" />
                <span className="text-xs font-mono tracking-wide">Journal Subscription Confirmed // Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border border-white/10 focus-within:border-[#ff2e2e] transition-colors bg-neutral-950 rounded-none overflow-hidden">
                <input
                  required
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Insert client email coordinates"
                  className="w-full bg-transparent p-3.5 text-xs focus:outline-none placeholder:text-zinc-600 font-mono text-white border-none"
                />
                <button
                  type="submit"
                  className="bg-[#ff2e2e] text-white hover:bg-neutral-900 hover:text-white px-5 flex items-center justify-center cursor-pointer transition-colors font-black border-l border-white/10"
                  title="Subscribe Email"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="text-[9px] font-mono tracking-widest text-[#ff2e2e]/40">
              * Privacy: We never dispatch promotional spam. Subscriptions can be annulled instantly from any dispatch email link.
            </div>
          </div>

        </div>

        {/* Closing details bar */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 font-mono text-center gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span>© {new Date().getFullYear()} Iron Obsidian Somatic Club. All rights certified.</span>
            <span className="text-[#ff2e2e] font-bold">Created by Gym Group</span>
          </div>

          {/* Social vectors list */}
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase font-mono tracking-wide">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase font-mono tracking-wide">
              Facebook
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase font-mono tracking-wide">
              Pinterest
            </a>
            <button
              onClick={scrollToTop}
              className="bg-neutral-950 hover:bg-[#ff2e2e] border border-white/10 p-2 text-white cursor-pointer transition-all rounded-none"
              title="Return to topmost screen"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
