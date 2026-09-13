import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, Heart, Users, CalendarCheck, Loader2, AlertCircle } from 'lucide-react';
import { GOOGLE_SHEET_URL } from '../config';

export default function RSVPSection({ bride = "Sowndarya", groom = "Jayanth" }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    guestCount: '1',
    phone: '',
    events: ['Muhurtham', 'Reception'],
    dietary: 'traditional-veg',
    message: ''
  });

  const handleEventToggle = (eventName) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventName);
      return {
        ...prev,
        events: exists
          ? prev.events.filter((e) => e !== eventName)
          : [...prev.events, eventName]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (GOOGLE_SHEET_URL) {
        // Send to Google Apps Script Web App
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web Apps to prevent CORS preflight blocking
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(formData)
        });
      }

      // Trigger golden celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#E6CA65', '#99732B', '#A3B18A', '#FAF8F5']
        });
      } catch (err) {
        console.log('Confetti effect trigger:', err);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('RSVP submission error:', err);
      setSubmitError('Unable to submit your response right now. Please check your internet connection or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-20 md:py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5]">
      
      {/* Background Decor */}
      <img
        src="/assets/bouquet.png"
        alt=""
        className="absolute -top-10 -right-10 w-32 md:w-48 h-auto pointer-events-none select-none opacity-40 z-0"
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            Kindly Respond
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B352E] font-normal">
            RSVP
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-sage-dark/80 mt-3">
            Please let us know if you can join our celebration
          </p>
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-gold/30 relative"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Attendance Toggle */}
                <div>
                  <label className="block font-serif text-lg text-[#2B352E] mb-3">
                    Will you be gracing the occasion? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.attendance === 'yes'
                          ? 'border-gold bg-cream/70 shadow-sm ring-1 ring-gold/40 text-sage-dark'
                          : 'border-sage/20 bg-white/70 hover:bg-cream/40 text-sage-dark/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={formData.attendance === 'yes'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="accent-gold w-4 h-4"
                      />
                      <span className="font-body text-xs sm:text-sm font-medium tracking-wide">
                        Joyfully Accept
                      </span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.attendance === 'no'
                          ? 'border-gold bg-cream/70 shadow-sm ring-1 ring-gold/40 text-sage-dark'
                          : 'border-sage/20 bg-white/70 hover:bg-cream/40 text-sage-dark/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={formData.attendance === 'no'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="accent-gold w-4 h-4"
                      />
                      <span className="font-body text-xs sm:text-sm font-medium tracking-wide">
                        Regretfully Decline
                      </span>
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-serif text-lg text-[#2B352E] mb-2">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar & Family"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-sage/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none font-body text-sm text-foreground transition-all"
                  />
                </div>

                {formData.attendance === 'yes' && (
                  <>
                    {/* Number of Guests */}
                    <div>
                      <label className="block font-serif text-lg text-[#2B352E] mb-2">
                        Number of Guests Attending
                      </label>
                      <div className="flex gap-2">
                        {['1', '2', '3', '4', '5+'].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setFormData({ ...formData, guestCount: count })}
                            className={`flex-1 py-2.5 rounded-xl border text-xs sm:text-sm font-body font-medium transition-all ${
                              formData.guestCount === count
                                ? 'bg-sage-dark text-white border-sage-dark shadow-sm'
                                : 'bg-white border-sage/25 text-sage-dark hover:bg-cream'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Events Attending */}
                    <div>
                      <label className="block font-serif text-lg text-[#2B352E] mb-2">
                        Which celebrations will you attend?
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: 'Muhurtham', label: 'Muhurtham (Morning Ceremony)' },
                          { id: 'Reception', label: 'Wedding Reception & Feast' }
                        ].map((evt) => (
                          <label
                            key={evt.id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-sage/20 bg-white/60 hover:bg-white cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.events.includes(evt.id)}
                              onChange={() => handleEventToggle(evt.id)}
                              className="accent-gold w-4 h-4 rounded"
                            />
                            <span className="font-body text-xs sm:text-sm text-sage-dark font-medium">
                              {evt.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block font-serif text-lg text-[#2B352E] mb-2">
                        Mobile Number (for updates)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-sage/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none font-body text-sm text-foreground transition-all"
                      />
                    </div>
                  </>
                )}

                {/* Wishes / Message */}
                <div>
                  <label className="block font-serif text-lg text-[#2B352E] mb-2">
                    Warm Wishes or Blessings for the Couple
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share your heartfelt blessing or wishes for Sowndarya & Jayanth..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-sage/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none font-body text-sm text-foreground transition-all resize-none"
                  />
                </div>

                {/* Error Notice */}
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-body flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-sage-dark hover:bg-sage-deep disabled:opacity-70 disabled:cursor-not-allowed text-white font-body text-xs sm:text-sm tracking-widest uppercase font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-gold-light animate-spin" />
                      <span>Recording Response...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Response</span>
                      <Send className="w-4 h-4 text-gold-light group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            ) : (
              /* Success Confirmation View */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-cream border border-gold/40 flex items-center justify-center text-gold mx-auto mb-6 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#2B352E] font-medium mb-2">
                  Thank You, {formData.name}!
                </h3>

                <p className="font-serif italic text-base sm:text-lg text-sage-dark leading-relaxed mb-6 font-light max-w-md mx-auto">
                  {formData.attendance === 'yes'
                    ? `Your response has been recorded with delight. Sowndarya and Jayanth eagerly await welcoming you to celebrate their sacred union!`
                    : `We are grateful for your response and will miss your presence. Your warm thoughts and blessings remain close to our hearts.`}
                </p>

                {formData.attendance === 'yes' && (
                  <div className="bg-cream/60 rounded-2xl p-4 max-w-sm mx-auto mb-6 border border-gold/20 text-xs font-body text-sage-dark text-left space-y-1.5">
                    <p><strong>Guests Attending:</strong> {formData.guestCount}</p>
                    <p><strong>Celebrations:</strong> {formData.events.join(', ')}</p>
                    <p><strong>Venue:</strong> Lakshmi Kalyana Mandapam, Coimbatore</p>
                  </div>
                )}

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-body tracking-wider uppercase text-gold-dark hover:text-sage-dark transition-colors underline underline-offset-4"
                >
                  Modify response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
