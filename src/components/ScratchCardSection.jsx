import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, Download, Check, ExternalLink, CalendarPlus, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScratchCardSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // 3 Auspicious Events
  const events = [
    {
      id: "reception-cbe",
      badge: "Event 01 • Coimbatore",
      title: "Wedding Reception (Coimbatore)",
      dateText: "Saturday, 21 November 2026",
      timeText: "06:00 PM – 09:00 PM",
      venueName: "Lakshmi Kalyana Mandapam",
      city: "Coimbatore",
      fullAddress: "Lakshmi Kalyana Mandapam, 226/1, Pollachi Main Rd, Eachanari, Coimbatore, Tamil Nadu 641021",
      mapUrl: "https://maps.app.goo.gl/42tu9b9yNE1ib6Dz7",
      startUtc: "20261121T123000Z", // 18:00 IST -> 12:30 UTC
      endUtc: "20261121T153000Z",   // 21:00 IST -> 15:30 UTC
      details: "Wedding Reception celebration of Sowndarya and Jayanth at Lakshmi Kalyana Mandapam, Eachanari, Coimbatore. Join us for an evening of music, banquet dinner, and joy!"
    },
    {
      id: "muhurtham-cbe",
      badge: "Event 02 • Coimbatore",
      title: "Muhurtham (Wedding Ceremony)",
      dateText: "Sunday, 22 November 2026",
      timeText: "07:00 AM – 08:00 AM",
      venueName: "Sri Sundararaja Perumal Thirukkoil",
      city: "Coimbatore",
      fullAddress: "Sridevi Bhoodevi Sametha Sri Sundararaja Perumal Thirukkoil, Seerapalayam (near Eachanari), Coimbatore, Tamil Nadu 641021",
      mapUrl: "https://maps.app.goo.gl/EEM2oKrHQS2zHq3P6?g_st=aw",
      startUtc: "20261122T013000Z", // 07:00 IST -> 01:30 UTC
      endUtc: "20261122T023000Z",   // 08:00 IST -> 02:30 UTC
      details: "Sacred Wedding Ceremony (Muhurtham) & Mangalyadharanam of Sowndarya and Jayanth at Sri Sundararaja Perumal Thirukkoil, Seerapalayam, Coimbatore."
    },
    {
      id: "reception-tenkasi",
      badge: "Event 03 • Tenkasi",
      title: "Wedding Reception (Tenkasi)",
      dateText: "Sunday, 29 November 2026",
      timeText: "06:00 PM – 09:00 PM",
      venueName: "Shri Sharadhamba Grand A/C",
      city: "Tenkasi",
      fullAddress: "Shri Sharadhamba Grand A/C, Courtallam, Madurai - Tenkasi Main Rd, Vallam, Tenkasi, Tamil Nadu 627805",
      mapUrl: "https://maps.app.goo.gl/JEiig7g9bjBpABW96?g_st=iw",
      startUtc: "20261129T123000Z", // 18:00 IST -> 12:30 UTC
      endUtc: "20261129T153000Z",   // 21:00 IST -> 15:30 UTC
      details: "Wedding Reception celebration of Sowndarya and Jayanth at Shri Sharadhamba Grand A/C, Courtallam - Tenkasi Main Road, Vallam, Tenkasi. Join us with family and friends!"
    }
  ];

  // Robust Google Calendar URL builder (compatible with mobile and desktop)
  const getGoogleCalendarUrl = (ev) => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: ev.title,
      dates: `${ev.startUtc}/${ev.endUtc}`,
      details: ev.details,
      location: ev.fullAddress
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  // Open calendar on mobile / desktop with fallback
  const handleAddToCalendar = (ev) => {
    // Generate individual .ics and trigger download/open
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sowndarya & Jayanth Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${ev.id}-2026@sowndarya-jayanth`,
      `DTSTAMP:${ev.startUtc}`,
      `DTSTART:${ev.startUtc}`,
      `DTEND:${ev.endUtc}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.details.replace(/\n/g, '\\n')}`,
      `LOCATION:${ev.fullAddress.replace(/,/g, '\\,')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // On iOS Safari, we can open the Google Calendar web URL or download .ics
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Open Google Calendar URL directly in a clean new tab
    const gCalUrl = getGoogleCalendarUrl(ev);
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  // Download individual .ics file (works natively on iOS Apple Calendar & Android)
  const downloadSingleICS = (ev) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sowndarya & Jayanth Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${ev.id}-2026@sowndarya-jayanth`,
      `DTSTAMP:${ev.startUtc}`,
      `DTSTART:${ev.startUtc}`,
      `DTEND:${ev.endUtc}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.details.replace(/\n/g, '\\n')}`,
      `LOCATION:${ev.fullAddress.replace(/,/g, '\\,')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.id}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate and download all 3 events in a single .ics file
  const downloadAllICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sowndarya & Jayanth Wedding Celebrations//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Sowndarya & Jayanth Wedding Celebrations',
      'X-WR-TIMEZONE:Asia/Kolkata',

      // Event 1: Coimbatore Reception
      'BEGIN:VEVENT',
      'UID:reception-cbe-20261121@sowndarya-jayanth',
      'DTSTAMP:20261121T123000Z',
      'DTSTART:20261121T123000Z',
      'DTEND:20261121T153000Z',
      'SUMMARY:Sowndarya & Jayanth Wedding Reception (Coimbatore)',
      'DESCRIPTION:Wedding Reception of Sowndarya and Jayanth! Music banquet dinner and joy at Lakshmi Kalyana Mandapam\\, Coimbatore.',
      'LOCATION:Lakshmi Kalyana Mandapam\\, 226/1\\, Pollachi Main Rd\\, Eachanari\\, Coimbatore\\, Tamil Nadu 641021',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // Event 2: Muhurtham
      'BEGIN:VEVENT',
      'UID:muhurtham-cbe-20261122@sowndarya-jayanth',
      'DTSTAMP:20261122T013000Z',
      'DTSTART:20261122T013000Z',
      'DTEND:20261122T023000Z',
      'SUMMARY:Sowndarya & Jayanth Muhurtham (Wedding Ceremony)',
      'DESCRIPTION:Sacred Wedding Ceremony (Muhurtham) of Sowndarya and Jayanth (07:00 AM to 08:00 AM) at Sri Sundararaja Perumal Thirukkoil\\, Seerapalayam\\, Coimbatore.',
      'LOCATION:Sridevi Bhoodevi Sametha Sri Sundararaja Perumal Thirukkoil\\, Seerapalayam\\, Coimbatore\\, Tamil Nadu 641021',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // Event 3: Tenkasi Reception
      'BEGIN:VEVENT',
      'UID:reception-tenkasi-20261129@sowndarya-jayanth',
      'DTSTAMP:20261129T123000Z',
      'DTSTART:20261129T123000Z',
      'DTEND:20261129T153000Z',
      'SUMMARY:Sowndarya & Jayanth Wedding Reception (Tenkasi)',
      'DESCRIPTION:Wedding Reception of Sowndarya and Jayanth at Shri Sharadhamba Grand A/C\\, Courtallam - Tenkasi Main Road\\, Vallam\\, Tenkasi.',
      'LOCATION:Shri Sharadhamba Grand A/C\\, Courtallam\\, Madurai - Tenkasi Main Rd\\, Vallam\\, Tenkasi\\, Tamil Nadu 627805',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'sowndarya-jayanth-all-wedding-events.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Celebration trigger on scratch completion
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 85,
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
    ctx.fillText('✨ AUSPICIOUS OCCASIONS ✨', width / 2, height / 2 - 32);

    ctx.font = '600 24px Cormorant Garamond, serif';
    ctx.fillStyle = '#2A1A02';
    ctx.fillText('Scratch to Reveal Dates & Venues', width / 2, height / 2 + 2);

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
      const totalSampled = data.length / 16;

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent >= 30 && !isScratched) {
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
    ctx.arc(x, y, 30, 0, Math.PI * 2);
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
      e.preventDefault();
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
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            Auspicious Dates &amp; Locations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Reveal the Wedding Dates
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-[#FBF6EE] mt-3">
            Scratch the golden card below to reveal our Coimbatore &amp; Tenkasi wedding celebrations
          </p>

          {/* Top Instant Reveal Button */}
          {!isScratched ? (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={handleRevealAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-[#1A0307] text-xs sm:text-sm font-body tracking-wider uppercase font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(245,222,136,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-gold-light cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#1A0307]" />
                <span>Instant Reveal Dates</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-gold/40 text-[#F5DE88] text-xs font-body">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Dates Revealed &bull; Add to Calendar Below</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Scratch Card Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl relative"
        >
          {/* Card Outer Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold/40 via-gold-light/20 to-gold/40 blur-md pointer-events-none" />

          <div
            ref={containerRef}
            className="relative min-h-[660px] sm:min-h-[600px] rounded-3xl bg-gradient-to-b from-[#2B050C]/75 via-[#200308]/70 to-[#150205]/80 backdrop-blur-xl border border-gold/45 shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-5 sm:p-7 overflow-hidden flex flex-col justify-between"
          >
            {/* UNDERNEATH LAYER: The 3 Revealed Cards */}
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              
              {/* Top Flourish Badge */}
              <div className="text-center pb-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/40 border border-gold/50 text-[#F5DE88] text-xs font-body font-semibold tracking-widest uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>The Auspicious Schedule</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-sm">
                  Sowndarya &amp; Jayanth
                </h3>
              </div>

              {/* 3 Event Cards */}
              <div className="space-y-3.5">
                {events.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 border border-gold/30 hover:border-gold/60 transition-colors shadow-md"
                  >
                    <div className="flex flex-col gap-2.5">
                      
                      {/* Top Row: Badge, Title, Date & Time */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-[#F5DE88] text-[11px] font-body font-semibold tracking-wider uppercase inline-block mb-1">
                            {ev.badge}
                          </span>
                          <h4 className="font-serif text-lg sm:text-xl text-white font-medium leading-snug">
                            {ev.title}
                          </h4>
                        </div>

                        {/* Date & Time Pills */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-body">
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2B050C] border border-gold/40 text-[#F7E7A9] font-medium">
                            <Calendar className="w-3.5 h-3.5 text-gold" />
                            {ev.dateText}
                          </span>
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2B050C] border border-gold/40 text-[#F3E5AB] font-medium">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            {ev.timeText}
                          </span>
                        </div>
                      </div>

                      {/* Venue Text */}
                      <div className="flex items-start gap-1.5 text-xs font-body text-[#FBF6EE]/90">
                        <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          <strong className="text-[#F5DE88]">{ev.venueName}</strong> &bull; 
                        </span>
                      </div>

                      {/* Action Buttons: Map Location + Calendar Sync */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gold/20">
                        
                        {/* Map Location Button Mentioning Venue & Date */}
                        {/* <a
                          href={ev.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-[#1A0307] text-xs font-body font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                          title={`View Google Map location for ${ev.venueName} (${ev.dateText})`}
                        >
                          <Navigation className="w-3.5 h-3.5 text-[#1A0307]" />
                          <span>Map Location &bull; {ev.venueName}</span>
                        </a> */}

                        {/* Calendar Sync Options (Mobile-Friendly Google Cal + Direct .ics) */}
                        <div className="flex items-center gap-1.5">
                          {/* Google Calendar Link */}
                          <button
                            type="button"
                            onClick={() => handleAddToCalendar(ev)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-gold/40 hover:border-gold text-[#F7E7A9] hover:text-white text-[11px] font-body font-medium transition-all active:scale-95"
                            title="Add event to Google Calendar"
                          >
                            <CalendarPlus className="w-3 h-3 text-gold" />
                            <span>Google Cal</span>
                          </button>

                          {/* Direct .ics for Apple / Native Phone Calendar */}
                          <button
                            type="button"
                            onClick={() => downloadSingleICS(ev)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-gold/40 hover:border-gold text-[#F7E7A9] hover:text-white text-[11px] font-body font-medium transition-all active:scale-95"
                            title="Download calendar file for Apple Calendar or Phone"
                          >
                            <Download className="w-3 h-3 text-gold" />
                            <span>iCal / Phone</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Bar: Universal Download All 3 Events */}
              <div className="pt-2 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-body text-[#F7E7A9] italic text-center sm:text-left">
                  ✨ 3 Grand Celebrations: Coimbatore Reception, Muhurtham &amp; Tenkasi Reception
                </span>

                <button
                  type="button"
                  onClick={downloadAllICS}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B050C] border border-gold/50 hover:bg-[#3D0A13] text-[#F7E7A9] hover:text-white text-xs font-body font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                  title="Download all 3 events to your calendar"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download All 3 Events (.ics)</span>
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
                <p className="text-xs font-body text-white/70 italic flex items-center gap-1">
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
              <p className="w-full text-center text-xs font-body text-white/90 font-medium flex items-center justify-center gap-1.5 text-gold-light">
                <Check className="w-4 h-4 text-green-400" />
                <span>All 3 events revealed! Add them to your calendar so you don't miss our celebration.</span>
              </p>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
