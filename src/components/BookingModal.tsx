/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Clock, User, CheckCircle2, X, ChevronRight, ChevronLeft, Ticket, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, THERAPISTS } from '../data';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceId: string | null;
}

export default function BookingModal({ isOpen, onClose, selectedServiceId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    therapistId: '',
    date: '',
    timeSlot: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    specialRequests: ''
  });

  const [activeReservation, setActiveReservation] = useState<Booking | null>(null);

  // Pre-populate serviceId when modal opens with context
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setActiveReservation(null);
      if (selectedServiceId) {
        setFormData(prev => ({ ...prev, serviceId: selectedServiceId }));
      } else {
        setFormData(prev => ({ ...prev, serviceId: SERVICES[0]?.id || '' }));
      }
      setFormData(prev => ({
        ...prev,
        therapistId: THERAPISTS[0]?.id || '',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        timeSlot: '11:30 AM',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        specialRequests: ''
      }));
    }
  }, [isOpen, selectedServiceId]);

  const selectedService = SERVICES.find(s => s.id === formData.serviceId) || SERVICES[0];
  const selectedTherapist = THERAPISTS.find(t => t.id === formData.therapistId) || THERAPISTS[0];

  const timeSlots = [
    '09:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM'
  ];

  const handleNext = () => {
    if (step === 1 && !formData.serviceId) return;
    if (step === 2 && !formData.therapistId) return;
    if (step === 3 && (!formData.date || !formData.timeSlot)) return;

    if (step < 4) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleConfirmReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      return;
    }

    const reservation: Booking = {
      id: `OBSID-${(Math.random() * 1000000).toFixed(0)}`,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      serviceId: formData.serviceId,
      therapistId: formData.therapistId,
      date: formData.date,
      timeSlot: formData.timeSlot,
      specialRequests: formData.specialRequests,
      totalPrice: selectedService ? selectedService.price : 0,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Store in LocalStorage for client-side persistence
    localStorage.setItem('aura_active_booking', JSON.stringify(reservation));
    setActiveReservation(reservation);
    setStep(5);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop Close Click */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          {/* Modal Container: Styled as concrete titanium frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-[#0b0b0b] border-2 border-white/10 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] text-white rounded-none"
          >
            {/* Elegant Header */}
            <div className="bg-black text-white p-6 flex justify-between items-center border-b border-white/10">
              <div>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#ff2e2e] uppercase font-black block">
                  TACTICAL RESERVATION ENGINE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight mt-1 uppercase">
                  DRAFTING ATELIER LOAD SPEC
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-[#ff2e2e] bg-black border border-white/10 p-2 text-xs rounded-none cursor-pointer transition-all"
                title="Cancel booking"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps tracker indicator bar (Only show steps 1-4) */}
            {step <= 4 && (
              <div className="bg-[#111] border-b border-white/10 px-6 py-4 flex justify-between items-center gap-1.5 overflow-x-auto text-[9px] font-mono tracking-widest font-black">
                <span className={`pb-1 ${step >= 1 ? 'text-[#ff2e2e] border-b-2 border-[#ff2e2e]' : 'text-zinc-600'}`}>1. PROTOCOL</span>
                <ChevronRight className="w-3 h-3 text-white/20 shrink-0" />
                <span className={`pb-1 ${step >= 2 ? 'text-[#ff2e2e] border-b-2 border-[#ff2e2e]' : 'text-zinc-600'}`}>2. COACH</span>
                <ChevronRight className="w-3 h-3 text-white/20 shrink-0" />
                <span className={`pb-1 ${step >= 3 ? 'text-[#ff2e2e] border-b-2 border-[#ff2e2e]' : 'text-zinc-600'}`}>3. TIMING</span>
                <ChevronRight className="w-3 h-3 text-white/20 shrink-0" />
                <span className={`pb-1 ${step >= 4 ? 'text-[#ff2e2e] border-b-2 border-[#ff2e2e]' : 'text-zinc-600'}`}>4. DETAILS</span>
              </div>
            )}

            {/* Step Content: Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">

              {/* STEP 1: Select Ritual Category */}
              {step === 1 && (
                <div className="space-y-4 text-left">
                  <h4 className="font-serif text-lg font-black text-white mb-4 uppercase">CHOOSE YOUR ATHLETIC PROTOCOL</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {SERVICES.map((s) => (
                      <label
                        key={s.id}
                        onClick={() => setFormData({ ...formData, serviceId: s.id })}
                        className={`p-4 border-2 cursor-pointer transition-all duration-300 flex items-start justify-between gap-4 rounded-none ${
                          formData.serviceId === s.id
                            ? 'bg-neutral-950 text-white border-[#ff2e2e] shadow-md'
                            : 'bg-black border-white/10 hover:border-white/30 text-white'
                        }`}
                      >
                        <div className="flex items-start space-x-3.5">
                          <input
                            type="radio"
                            name="serviceId"
                            checked={formData.serviceId === s.id}
                            onChange={() => {}} // handled by click of label
                            className="mt-1 accent-[#ff2e2e]"
                          />
                          <div>
                            <span className="font-serif text-base font-black block uppercase tracking-tight">{s.name}</span>
                            <span className="text-[9px] uppercase tracking-wider block mt-1 font-mono text-zinc-400">
                              CHAMBER: {s.category} // DURATION: {s.duration} MINS
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-base font-black shrink-0 text-[#ff2e2e]">₹{s.price.toLocaleString('en-IN')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Pick Certified Practitioner */}
              {step === 2 && (
                <div className="space-y-4 text-left">
                  <h4 className="font-serif text-lg font-black text-white mb-4 uppercase">CHOOSE REHAB OR CONDITIONAL SPECIALIST</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {THERAPISTS.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setFormData({ ...formData, therapistId: t.id })}
                        className={`p-4 border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full rounded-none select-none ${
                          formData.therapistId === t.id
                            ? 'bg-neutral-950 text-white border-[#ff2e2e] shadow-md'
                            : 'bg-black border-white/10 hover:border-white/30 text-white'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src={t.imageUrl}
                            alt={t.name}
                            className={`w-20 h-20 rounded-none mx-auto object-cover mb-4 border-2 grayscale contrast-125 ${formData.therapistId === t.id ? 'border-[#ff2e2e]' : 'border-white/10'}`}
                            referrerPolicy="no-referrer"
                          />
                          <h5 className="font-serif text-sm font-black text-white uppercase">{t.name}</h5>
                          <span className="text-[8px] uppercase tracking-wider font-extrabold block mb-2 text-[#ff2e2e] font-mono">{t.role}</span>
                          <p className="text-[10px] leading-relaxed font-mono mb-4 line-clamp-3 text-zinc-400">
                            {t.bio}
                          </p>
                        </div>
                        <div className={`pt-2.5 text-center border-t ${formData.therapistId === t.id ? 'border-[#ff2e2e]/25' : 'border-white/5'}`}>
                          <span className="text-[9px] font-mono tracking-widest uppercase text-[#ff2e2e] font-bold">
                            RATING: {t.rating} ★
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-black border border-white/10 p-4 mt-6 text-left flex items-start space-x-3 rounded-none">
                    <User className="w-5 h-5 text-[#ff2e2e] shrink-0 mt-0.5" />
                    <div>
                      <h6 className="text-[11px] font-sans font-black text-white uppercase tracking-wider">SOMATIC ATTRIBUTION CHARTER</h6>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-mono mt-1">
                        Binding to our primary roster establishes high diagnostic safety standards. Roster loads are tightly rotated.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Dates & Hourly Blocks */}
               {step === 3 && (
                <div className="space-y-6 text-left">
                  <h4 className="font-serif text-lg font-black text-white uppercase">SPECIFY SCHEDULE TIMERS</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date Pick */}
                    <div className="bg-black border-2 border-white/10 p-4 rounded-none">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3">
                        <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#ff2e2e]" />
                        PREFERRED CONDITION DATE
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // from tomorrow
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 focus:border-[#ff2e2e] focus:outline-none p-3 text-xs tracking-wider text-white rounded-none font-mono"
                      />
                    </div>

                    {/* Hourly block Picker */}
                    <div className="bg-black border-2 border-white/10 p-4 rounded-none">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3">
                        <Clock className="w-3.5 h-3.5 inline mr-1.5 text-[#ff2e2e]" />
                        AVAILABLE DAILY BLOCKS
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto font-mono">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeSlot: slot })}
                            className={`p-2.5 text-[10px] font-mono tracking-wider cursor-pointer transition-all border rounded-none ${
                              formData.timeSlot === slot
                                ? 'bg-[#ff2e2e] text-white border-[#ff2e2e] font-black'
                                : 'bg-black text-white/70 border-white/15 hover:border-white'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-black border border-white/10 flex items-start space-x-3 mt-4 rounded-none text-zinc-400 font-mono text-[9px]">
                    <AlertCircle className="w-4.5 h-4.5 text-[#ff2e2e] shrink-0 mt-0.5" />
                    <span>
                      * CORES, AUTOCLAVED STEEL BARS, AND THERMAL HYDRO SYSTEMS SIZED 45 MINUTES PRIOR TO APPOINTED HOUR BLOCK.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 4: Client Coordinates & Requests */}
              {step === 4 && (
                <form onSubmit={handleConfirmReservation} className="space-y-4 text-left font-mono">
                  <h4 className="font-serif text-lg font-black text-white mb-4 uppercase">CONFIRM ENTRY CREDENTIALS</h4>

                  <div className="bg-neutral-950 border border-white/10 p-4 mb-4 flex justify-between items-center font-mono text-[10px] text-zinc-400 rounded-none">
                    <div>
                      <span className="block font-black text-zinc-500 uppercase">SELECTED PROTOCOL:</span>
                      <span className="block text-[#ff2e2e] font-black mt-1 uppercase text-xs">{selectedService.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-zinc-500 uppercase">LOAD ESTIMATE:</span>
                      <span className="block text-white font-black mt-1 text-sm">₹{selectedService.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Athlete Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Dan Kowalski"
                      className="w-full bg-black border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                        Athlete Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="e.g. +1 555-0199"
                        className="w-full bg-black border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#ff2e2e] font-bold mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="e.g. lifter@domain.com"
                        className="w-full bg-black border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                      Somatic Specifics / Nerve Sensitivities (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="e.g. tight rotator cuffs, pressure sensitivities on spinal extensions..."
                      className="w-full bg-black border border-white/15 hover:border-[#ff2e2e] focus:border-[#ff2e2e] focus:outline-none p-3 text-xs placeholder:text-white/20 rounded-none resize-none text-white transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff2e2e] text-white hover:bg-white hover:text-black border border-transparent font-sans text-xs font-black tracking-widest uppercase p-4.5 rounded-none shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SECURE PERFORMANCE BLOCK</span>
                  </button>
                </form>
              )}

              {/* STEP 5: Ticket Receipt Confirmed */}
              {step === 5 && activeReservation && (
                <div className="space-y-6 text-center py-6 font-mono text-xs">
                  {/* Confirmed Visual Card */}
                  <div className="bg-black border-2 border-dashed border-[#ff2e2e] max-w-md mx-auto p-6 sm:p-8 relative shadow-2xl overflow-hidden rounded-none text-white">
                    <div className="absolute top-0 right-0 p-3">
                      <Ticket className="w-10 h-10 text-white/5" />
                    </div>

                    <div className="text-center pb-5 mb-5 border-b border-white/10">
                      <span className="text-[11px] font-mono tracking-widest text-[#ff2e2e] font-black block uppercase">IRON OBSIDIAN ATELIER</span>
                      <h4 className="font-serif text-xl font-black text-white tracking-tight mt-2 uppercase">CHAMBER LOADS RESERVED</h4>
                    </div>

                    {/* Meta stats list */}
                    <div className="space-y-4 text-left text-zinc-400">
                      <div className="flex justify-between">
                        <span>RECON TICKET:</span>
                        <span className="font-mono text-white font-bold">{activeReservation.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ATHLETE:</span>
                        <span className="text-white font-black">{activeReservation.clientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PROTOCOL:</span>
                        <span className="text-[#ff2e2e] font-serif font-black text-right max-w-[200px] leading-tight block uppercase">{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COACH:</span>
                        <span className="text-white font-black">{selectedTherapist.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COORDINATES:</span>
                        <span className="text-white font-bold">{activeReservation.date} @ {activeReservation.timeSlot}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-white/10">
                        <span className="text-white font-bold">LOAD BILLING:</span>
                        <span className="text-[#ff2e2e] font-black text-sm">₹{selectedService.price.toLocaleString('en-IN')} TOTAL</span>
                      </div>
                    </div>

                    <div className="mt-6 bg-[#040404] p-3.5 border border-white/10 text-[9px] text-[#ff2e2e] font-mono tracking-wide text-left">
                      <span>* STATUS: VALIDATED & LOCKED</span>
                      <span className="block mt-1 italic">VEHICLE LOG ENTRY: PARKING COMPED</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-relaxed max-w-sm mx-auto font-mono">
                    A secure dispatch logs containing travertine access codes, sub-zero preparations, and posture screening checklists has been secured to <strong className="text-white font-bold">{activeReservation.clientEmail}</strong>.
                  </p>

                  <div className="pt-4 border-t border-white/10 flex justify-center">
                    <button
                      onClick={onClose}
                      className="bg-white text-black hover:bg-[#ff2e2e] hover:text-white border-2 border-white hover:border-[#ff2e2e] font-sans text-xs font-black tracking-widest uppercase px-8 py-3.5 rounded-none transition-all duration-300 cursor-pointer"
                    >
                      RETURN TO VAULT
                    </button>
                  </div>
                </div>
              )}

            </div>            {/* Fixed footer with backward and forward controls */}
            {step <= 4 && (
              <div className="bg-black border-t border-white/10 p-4.5 flex justify-between items-center">
                <div>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-white font-black uppercase tracking-wider cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <span className="text-[9px] font-mono text-zinc-600">Step {step} of 4</span>
                  )}
                </div>

                <div>
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-white text-black border-2 border-white hover:bg-[#ff2e2e] hover:border-[#ff2e2e] hover:text-white inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest px-5 py-3 rounded-none cursor-pointer transition-all duration-300"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
