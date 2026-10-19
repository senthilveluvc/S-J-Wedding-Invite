import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, Download, Check, Gift, ExternalLink, CalendarPlus } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScratchCardSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Event Details
  const reception = {
    title: "Sowndarya & Jayanth Wedding Reception",
    dateText: "Saturday, 21 November 2026",
    timeText: "06:00 PM Onwards",
    venue: "Lakshmi Kalyana Mandapam, Coimbatore",
    // Google Calendar URL (UTC: 2026-11-21 12:30 to 16:30 UTC for 6:00 PM to 10:00 PM IST)
    googleUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sowndarya+%26+Jayanth+Wedding+Reception&dates=20261121T123000Z/20261121T163000Z&details=Wedding+Reception+celebration+of+Sowndarya+and+Jayanth.+Join+us+for+an+evening+of+music%2C+dinner+and+celebration.&location=Lakshmi+Kalyana+Mandapam%2C+226%2F1%2C+Pollachi+Main+Rd%2C+Eachanari%2C+Coimbatore%2C+Tamil+Nadu+641021"
  };

  const muhurtham = {
    title: "Sowndarya & Jayanth Wedding Ceremony (Muhurtham)",
    dateText: "Sunday, 22 November 2026",
    timeText: "07:00 AM – 08:00 AM",
    venue: "Lakshmi Kalyana Mandapam, Coimbatore",
    // Google Calendar URL (UTC: 2026-11-22 01:30 to 02:30 UTC for 7:00 AM to 8:00 AM IST)
    googleUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sowndarya+%26+Jayanth+Wedding+Ceremony+(Muhurtham)&dates=20261122T013000Z/20261122T023000Z&details=Sacred+wedding+ceremony+(Muhurtham)+of+Sowndarya+and+Jayanth.&location=Lakshmi+Kalyana+Mandapam%2C+226%2F1%2C+Pollachi+Main+Rd%2C+Eachanari%2C+Coimbatore%2C+Tamil+Nadu+641021"
  };

  // Generate and download .ics file for Apple Calendar, Outlook & Mobile
  const downloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sowndarya & Jayanth Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Sowndarya & Jayanth Wedding Celebrations',
      'X-WR-TIMEZONE:Asia/Kolkata',
      // Event 1: Reception
      'BEGIN:VEVENT',
      'UID:reception-20261121@sowndarya-jayanth',
      'DTSTAMP:20261121T123000Z',
      'DTSTART:20261121T123000Z',
      'DTEND:20261121T163000Z',
      'SUMMARY:Sowndarya & Jayanth Wedding Reception',
      'DESCRIPTION:Join us to celebrate the Wedding Reception of Sowndarya and Jayanth! Music\\, Dinner and joyous celebrations.',
      'LOCATION:Lakshmi Kalyana Mandapam\\, 226/1\\, Pollachi Main Rd\\, Eachanari\\, Coimbatore\\, Tamil Nadu 641021',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      // Event 2: Muhurtham
      'BEGIN:VEVENT',
      'UID:muhurtham-20261122@sowndarya-jayanth',
      'DTSTAMP:20261122T013000Z',
      'DTSTART:20261122T013000Z',
      'DTEND:20261122T023000Z',
      'SUMMARY:Sowndarya & Jayanth Muhurtham (Wedding Ceremony)',
      'DESCRIPTION:Sacred Wedding Ceremony (Muhurtham) of Sowndarya and Jayanth (7:00 AM to 8:00 AM).',
      'LOCATION:Lakshmi Kalyana Mandapam\\, 226/1\\, Pollachi Main Rd\\, Eachanari\\, Coimbatore\\, Tamil Nadu 641021',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'sowndarya-jayanth-wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Celebration trigger on scratch completion
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#E6CA65', '#FAF8F5', '#E11D48', '#FFB703']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // Initialize Golden Foil Canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Golden metallic gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.25, '#F7E7A9');
    gradient.addColorStop(0.5, '#C5A059');
    gradient.addColorStop(0.75, '#F5DE88');
    gradient.addColorStop(1, '#99732B');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle patterned sparkle dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.beginPath();
          ctx.arc(i, j, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Elegant inner hairline border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Decorative Calligraphic Text on the Gold Foil
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#422800';
    ctx.font = 'bold 13px Montserrat, sans-serif';
    ctx.fillText('✨ AUSPICIOUS OCCASION ✨', width / 2, height / 2 - 32);

    ctx.font = '600 24px Cormorant Garamond, serif';
    ctx.fillStyle = '#2A1A02';
    ctx.fillText('Scratch to Reveal Dates', width / 2, height / 2 + 2);

    ctx.font = 'italic 12px Montserrat, sans-serif';
    ctx.fillStyle = '#5A3D0A';
    ctx.fillText('Use your finger or mouse to scratch', width / 2, height / 2 + 32);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isScratched) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isScratched]);

  // Check how much of the foil has been scratched away
  const calculateScratchedArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      const totalSampled = data.length / 16; // sample every 4th pixel (4 components = 16 bytes)

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent >= 38 && !isScratched) {
        setIsScratched(true);
        triggerConfetti();
      }
    } catch (e) {
      // ignore
    }
  };

  // Scratch action
  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchedArea();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchStart = (e) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      e.preventDefault(); // prevent scrolling while scratching
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => setIsDrawing(false);

  // Manual Instant Reveal
  const handleRevealAll = () => {
    setIsScratched(true);
    setScratchPercent(100);
    triggerConfetti();
  };

  return (
    <section id="dates-reveal" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            Auspicious Dates
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Reveal the Wedding Dates
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-[#FBF6EE] mt-3">
            Scratch the golden card below to reveal our sacred wedding schedule
          </p>
        </motion.div>

        {/* Scratch Card Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl relative"
        >
          {/* Card Outer Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold/40 via-gold-light/20 to-gold/40 blur-md pointer-events-none" />

          <div
            ref={containerRef}
            className="relative min-h-[460px] sm:min-h-[420px] rounded-3xl bg-gradient-to-b from-[#2B050C]/95 to-[#1A0307]/98 backdrop-blur-md border border-gold/50 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between"
          >
            {/* UNDERNEATH LAYER: The Revealed Dates & Details */}
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              
              {/* Top Flourish Badge */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/40 border border-gold/50 text-[#F5DE88] text-xs font-body font-semibold tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>The Auspicious Schedule</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-sm">
                  Sowndarya &amp; Jayanth
                </h3>
              </div>

              {/* Event 1: Wedding Reception */}
              <div className="bg-black/40 rounded-2xl p-4 sm:p-5 border border-gold/30 hover:border-gold transition-colors shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-[#F5DE88] text-[11px] font-body font-semibold tracking-wider uppercase inline-block mb-1">
                      Day 1 &bull; Reception
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Wedding Reception &amp; Feast
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-body text-[#FBF6EE] mt-1.5">
                      <span className="flex items-center gap-1 font-semibold text-[#F7E7A9]">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {reception.dateText}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#F3E5AB]">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {reception.timeText}
                      </span>
                    </div>
                  </div>

                  {/* Add Reception to Google Calendar */}
                  <a
                    href={reception.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#1A0307] text-xs font-body font-semibold shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                    title="Add Reception to Google Calendar"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#1A0307]" />
                    <span>Google Cal</span>
                  </a>
                </div>
              </div>

              {/* Event 2: Sacred Muhurtham */}
              <div className="bg-black/40 rounded-2xl p-4 sm:p-5 border border-gold/30 hover:border-gold transition-colors shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-[#F5DE88] text-[11px] font-body font-semibold tracking-wider uppercase inline-block mb-1">
                      Day 2 &bull; Wedding Ceremony
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Muhurtham (Wedding Ceremony)
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-body text-[#FBF6EE] mt-1.5">
                      <span className="flex items-center gap-1 font-semibold text-[#F7E7A9]">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {muhurtham.dateText}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#F3E5AB]">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {muhurtham.timeText}
                      </span>
                    </div>
                  </div>

                  {/* Add Muhurtham to Google Calendar */}
                  <a
                    href={muhurtham.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#1A0307] text-xs font-body font-semibold shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                    title="Add Muhurtham to Google Calendar"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#1A0307]" />
                    <span>Google Cal</span>
                  </a>
                </div>
              </div>

              {/* Venue & Universal Calendar Download */}
              <div className="pt-2 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-body text-[#F7E7A9]">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="line-clamp-1">Lakshmi Kalyana Mandapam, Coimbatore</span>
                </div>

                {/* Universal .ics Download Button */}
                <button
                  onClick={downloadICS}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B050C] border border-gold/50 hover:bg-[#3D0A13] text-[#F7E7A9] hover:text-white text-xs font-body font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                  title="Download .ics file for Apple Calendar, Outlook & Phone"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download Calendar Invite (.ics)</span>
                </button>
              </div>

            </div>

            {/* TOP SCRATCHABLE GOLDEN CANVAS OVERLAY */}
            <AnimatePresence>
              {!isScratched && (
                <motion.canvas
                  ref={canvasRef}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="absolute inset-0 z-20 w-full h-full cursor-pointer touch-none select-none rounded-3xl"
                  style={{ touchAction: 'none' }}
                />
              )}
            </AnimatePresence>

          </div>

          {/* Quick Reveal Button & Instructions */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
            {!isScratched ? (
              <>
                <p className="text-xs font-body text-sage-dark/80 italic flex items-center gap-1">
                  <span>💡 Tip: Scratch with finger or click button</span>
                  {scratchPercent > 0 && <span className="font-semibold text-gold">({scratchPercent}% cleared)</span>}
                </p>
                <button
                  onClick={handleRevealAll}
                  className="px-4 py-1.5 rounded-full bg-cream hover:bg-white border border-gold/40 text-sage-dark hover:text-gold text-xs font-body tracking-wider uppercase font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Instant Reveal</span>
                </button>
              </>
            ) : (
              <p className="w-full text-center text-xs font-body text-sage-dark font-medium flex items-center justify-center gap-1.5 text-gold-dark">
                <Check className="w-4 h-4 text-green-600" />
                <span>Dates revealed! Add them to your calendar so you don't miss our celebration.</span>
              </p>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
