import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({
  bride = "Sowndarya",
  groom = "Jayanth",
  date = "22 November 2026",
  venue = "Lakshmi Kalyana Mandapam, Coimbatore"
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 md:py-24 px-4 text-center bg-[#FAF8F5] border-t border-gold/20 overflow-hidden">
      
      {/* Decorative candles & floral corners */}
      <img
        src="/assets/roses-bottom-right.png"
        alt=""
        className="absolute -bottom-10 -left-10 w-28 md:w-40 h-auto pointer-events-none select-none opacity-40"
      />
      <img
        src="/assets/roses-bottom-right.png"
        alt=""
        className="absolute -bottom-10 -right-10 w-28 md:w-40 h-auto pointer-events-none select-none opacity-40 scale-x-[-1]"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 md:w-24 md:h-24 mb-6"
        >
          <img
            src="/assets/monogram-sj.svg"
            alt="S & J Monogram"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Names */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#2B352E] font-normal tracking-wide mb-2">
          {bride} <span className="font-display text-2xl sm:text-3xl text-gold italic px-1">&amp;</span> {groom}
        </h3>

        <p className="font-body text-xs tracking-[0.25em] uppercase text-sage-dark/75 font-medium mb-4">
          {date} &bull; {venue}
        </p>

        <p className="font-serif italic text-sm sm:text-base text-sage-dark/80 max-w-md mx-auto mb-8 font-light">
          Your warm blessings and gracious presence will make our wedding day truly unforgettable.
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream hover:bg-white text-sage-dark text-xs font-body tracking-wider uppercase font-medium border border-gold/30 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-gold" />
        </button>

        <div className="mt-12 flex items-center gap-1.5 text-[11px] font-body text-sage-dark/60">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-gold fill-gold" />
          <span>for Sowndarya &amp; Jayanth</span>
        </div>

      </div>
    </footer>
  );
}
