/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, PhoneCall, CheckCircle2, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }
    // Simulate successful clinical submission
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 7000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact & Inquiries Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16 sm:mb-20 border-l-2 border-[#ff2e2e] pl-6"
        >
          <span className="text-xs font-mono tracking-[0.25em] text-[#ff2e2e] uppercase block mb-3 font-semibold animate-pulse">
            ESTABLISH FEED
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white font-black tracking-normal uppercase leading-tight">
            INQUIRIES & <span className="italic font-light text-[#ff2e2e]">RECONSTRUCTIONS</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl mt-4">
            Do you have joint sensitivities, high-torque requests, or custom performance goals? Dispatch your kinesiologic parameters to our expert desk below.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          
          {/* Column 1: Clinic Coordinates Table (lg:col-span-4) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85 } }
            }}
            className="lg:col-span-4 space-y-8"
          >
            
            <motion.div 
              whileHover={{ scale: 1.015, borderColor: 'rgba(255, 46, 46, 0.4)' }}
              className="bg-[#0b0b0b] border-2 border-white/10 p-8 shadow-xl transition-all duration-300"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#ff2e2e] font-bold block mb-4 uppercase">
                INSTANT COORDINATES
              </span>
              <h3 className="text-xl font-serif text-white font-black tracking-tight mb-6 uppercase">
                IRON SOMATIC DESK
              </h3>

              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-950 border border-white/15 text-[#ff2e2e] rounded-none shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 block font-bold">Priority line</span>
                    <a href="tel:+919820098200" className="text-xs font-bold text-white font-mono hover:text-[#ff2e2e] transition-colors">
                      +91 98200 98200
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-950 border border-white/15 text-[#ff2e2e] rounded-none shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 block font-bold">E-Desk inquiries</span>
                    <a href="mailto:concierge@ironobsidian.com" className="text-xs font-bold text-white font-mono hover:text-[#ff2e2e] transition-colors">
                      concierge@ironobsidian.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-950 border border-white/15 text-[#ff2e2e] rounded-none shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 block font-bold">IRON CHAMBER SUITE</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                      Ground Floor, Crescent House, <br />Dr. Ambedkar Rd, Khar West, Mumbai, MH 400052
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Operational hours panel */}
            <motion.div 
              whileHover={{ scale: 1.015, borderColor: 'rgba(255, 46, 46, 0.4)' }}
              className="bg-[#0b0b0b] border-2 border-white/10 p-8 shadow-xl transition-all duration-300"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#ff2e2e] font-bold block mb-4 uppercase">
                OPERATIONAL TIMERS
              </span>
              <h3 className="text-xl font-serif text-white font-black tracking-tight mb-5 uppercase">
                CHAMBER CALENDAR
              </h3>

              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex justify-between items-center py-2 border-b border-white/5 text-zinc-400">
                  <span>Monday - Friday</span>
                  <span className="text-white font-black">09:00 AM - 09:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5 text-zinc-400">
                  <span>Saturday</span>
                  <span className="text-white font-black">09:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 text-zinc-400">
                  <span>Sunday</span>
                  <span className="text-[#ff2e2e] font-black">10:00 AM - 07:00 PM</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Column 2: Inquiry Interactive Form (lg:col-span-5) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, delay: 0.1 } }
            }}
            className="lg:col-span-5 bg-[#0b0b0b] border-2 border-white/10 p-8 sm:p-10 shadow-2xl relative"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#ff2e2e] font-bold block mb-4 uppercase">
              CLINICAL DISPATCH
            </span>
            <h3 className="text-2xl font-serif text-white font-black tracking-tight mb-6 uppercase">
              ESTABLISH FORCE ACCORD
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black/40 border border-[#ff2e2e]/25 p-6 flex flex-col items-center text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#ff2e2e] animate-bounce" />
                  <h4 className="font-serif text-xl font-black text-white uppercase">DISPATCH RECORDED</h4>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    Thank you. We have cataloged your somatic athletic parameters. Our tactical desk will dial or message your credentials within 2 business hours.
                  </p>
                  <div className="text-left bg-black border border-white/10 p-3 w-full font-mono text-[10px] text-white">
                    <span className="block font-bold">DISPATCH TRACK: // OBSID-{(Math.random() * 1000000).toFixed(0)}</span>
                    <span className="block italic mt-1 text-[#ff2e2e]">Pending Coach Verification</span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left font-mono text-[11px]">
                  <div>
                    <label className="block uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Full Athlete Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dan Kowalski"
                      className="w-full bg-black/60 border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white transition-all duration-300 focus:ring-1 focus:ring-[#ff2e2e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block uppercase tracking-wider text-zinc-400 font-bold mb-2">
                        Preferred Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 555-0199"
                        className="w-full bg-black/60 border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white transition-all duration-300 focus:ring-1 focus:ring-[#ff2e2e]"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider text-[#ff2e2e] font-black mb-2">
                        E-Mail Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. lifter@domain.com"
                        className="w-full bg-black/60 border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white transition-all duration-300 focus:ring-1 focus:ring-[#ff2e2e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Your Somatic Target / Joint Wear (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about lifting targets, rigid shoulders, knee pinches, or custom kinesiotherapy setups..."
                      className="w-full bg-black/60 border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white transition-all duration-300 focus:ring-1 focus:ring-[#ff2e2e] resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#000000' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#ff2e2e] text-white border border-transparent font-sans text-xs font-black tracking-widest uppercase p-4 rounded-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBMIT RECONSTRUCTION DEED</span>
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 3: Frequent Queries (lg:col-span-3) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, delay: 0.2 } }
            }}
            className="lg:col-span-3 text-left"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#ff2e2e] uppercase font-bold block mb-4">
              FREQUENT CODES
            </span>
            <h3 className="text-xl font-serif text-white font-black tracking-tight mb-6 uppercase">
              Sanctuary FAQ
            </h3>

            <div className="space-y-4 font-mono text-[10px]">
              {FAQS.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left font-serif text-[13px] font-bold text-white flex justify-between items-center py-2 cursor-pointer hover:text-[#ff2e2e] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight className={`w-4 h-4 text-[#ff2e2e] transition-transform ${activeFaq === index ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[10px] text-zinc-400 leading-relaxed font-light pt-1.5 pb-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Beautiful Map and Location Coordinates Card */}
        <div className="mt-16 sm:mt-24 border-2 border-white/10 bg-[#080808] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-stretch justify-between gap-8 h-auto">
          {/* Mock Map Element */}
          <div className="flex-1 min-h-[220px] bg-black border border-white/10 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ff2e2e_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            
            {/* Map lines */}
            <div className="absolute h-px inset-x-0 bg-white/10 top-1/3" />
            <div className="absolute h-px inset-x-0 bg-white/10 top-2/3" />
            <div className="absolute w-px inset-y-0 bg-white/10 left-1/3" />
            <div className="absolute w-px inset-y-0 bg-white/10 left-2/3" />

            <div className="absolute text-center p-4 bg-black border border-white/15 pointer-events-none">
              <MapPin className="w-5 h-5 text-[#ff2e2e] mx-auto mb-1 animate-bounce" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff2e2e] font-black block">IRON OBSIDIAN CHAMBERS</span>
              <span className="text-[8px] text-zinc-500 block uppercase">Khar West Boutique District, Mumbai</span>
            </div>
          </div>

          {/* Quick instructions text */}
          <div className="w-full md:w-80 flex flex-col justify-between text-left">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#ff2e2e] uppercase font-black block mb-2">Transit Guidelines</span>
              <h4 className="font-serif text-xl font-black text-white mb-3">IRON VAULT GATE</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono mb-4">
                Situated in the brutal obsidian/concrete medicine pavilion behind the botanicals. Certified secure parking loops provided on rear arrival.
              </p>
            </div>
            <div className="flex space-x-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-white text-black font-sans text-[10px] font-black uppercase tracking-widest text-center py-3.5 border border-white hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none"
              >
                Launch Navigation
              </a>
              <button
                onClick={() => navigator.clipboard.writeText('Ground Floor, Crescent House, Dr. Ambedkar Rd, Khar West, Mumbai, MH 400052, India')}
                className="bg-zinc-950 text-white border border-white/15 px-4 hover:bg-[#ff2e2e] hover:border-[#ff2e2e] transition-colors cursor-pointer rounded-none"
                title="Copy Address"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Elegant Floating Call Drawer */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        {/* Call Drawer badge */}
        <a
          href="tel:+919820098200"
          className="bg-black border border-white/15 text-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-white p-3.5 shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group rounded-none"
          title="Direct Priority Dial"
        >
          <PhoneCall className="w-5 h-5 group-hover:scale-103" />
        </a>

        {/* WhatsApp Badge */}
        <a
          href="https://wa.me/919820098200"
          target="_blank"
          rel="noreferrer"
          className="bg-[#111] border border-white/15 text-white hover:bg-[#ff2e2e] p-3.5 shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer rounded-none"
          title="Live WhatsApp Chat Concierge"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>
    </section>
  );
}
