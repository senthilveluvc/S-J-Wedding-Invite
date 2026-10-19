import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

export default function HeroSection({
  bride = "Sowndarya",
  groom = "Jayanth",
  date = "Sunday, 22 November 2026",
  venue = "Lakshmi Kalyana Mandapam, Coimbatore"
}) {
  const scrollToNext = () => {
    const el = document.getElementById('couple');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex flex-col justify-between items-center text-center px-4 pt-16 pb-12 overflow-hidden bg-[#200408]">
      
      {/* Mobile: Royal South Indian Temple Entrance Mandapam Arch */}
      <img
        src="/assets/temple-mandapam-bg.jpg"
        alt="Royal South Indian Temple Mandapam"
        className="md:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none z-0"
      />

      {/* Desktop: Wide Majestic South Indian Temple Hall */}
      <img
        src="/assets/temple-mandapam-desktop.jpg"
        alt="Royal South Indian Temple Mandapam Desktop"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Subtle Central Warm Vignette for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70 pointer-events-none select-none z-10" />

      {/* Main Content Container (Inside the Royal Arch) */}
      <div className="relative z-30 max-w-2xl mx-auto my-auto flex flex-col items-center pt-8 md:pt-4">
        
        {/* Wedding Invitation Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-3"
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.35em] uppercase text-[#F7E7A9] font-semibold block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            WEDDING INVITATION
          </span>
        </motion.div>

        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-20 h-20 md:w-28 md:h-28 mb-3 pointer-events-none select-none filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          <img
            src="/assets/monogram-sj.svg"
            alt="S & J Monogram"
            className="w-full h-full object-contain filter invert sepia saturate-200 hue-rotate-[10deg] brightness-125"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-[#F3E5AB] font-medium mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          Together with their families
        </motion.p>

        {/* Grand Calligraphy Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="my-1 text-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {bride}
          </h1>

          <div className="flex items-center justify-center my-2 gap-4">
            <span className="h-px w-12 md:w-20 bg-gold/70" />
            <span className="font-display text-4xl md:text-5xl text-[#F5DE88] italic px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              &amp;
            </span>
            <span className="h-px w-12 md:w-20 bg-gold/70" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {groom}
          </h1>
        </motion.div>

        {/* Invitation Honor Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif italic text-base md:text-xl text-[#FBF6EE] max-w-xl mx-auto my-4 px-4 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          Request the honour of your gracious presence and blessings to celebrate our wedding ceremony
        </motion.p>

        {/* Date & Location Pill Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 mt-2"
        >
          <a
            href="#dates-reveal"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/70 shadow-2xl text-[#F7E7A9] hover:bg-black/80 hover:border-gold hover:text-white hover:scale-105 transition-all cursor-pointer group"
            title="Click to reveal wedding schedule"
          >
            <Calendar className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span className="font-body text-xs md:text-sm tracking-wider uppercase font-semibold">
              {date}
            </span>
          </a>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/70 shadow-2xl text-[#F7E7A9]">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-body text-xs md:text-sm tracking-wider uppercase font-semibold">
              {venue}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-30 flex flex-col items-center gap-1 mt-6 text-[#F7E7A9]/90 hover:text-white transition-colors cursor-pointer group drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.button>
    </section>
  );
}
