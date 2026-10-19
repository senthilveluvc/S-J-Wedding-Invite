import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({
  bride = "Sowndarya",
  groom = "Jayanth",
  date = "21, 22 & 29 November 2026",
  venue = "Coimbatore & Tenkasi"
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 md:py-24 px-4 text-center bg-black/40 backdrop-blur-md border-t border-gold/30 overflow-hidden">
      
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
            className="w-full h-full object-contain filter invert sepia saturate-200 hue-rotate-[10deg] brightness-125"
          />
        </motion.div>

        {/* Names */}
        <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide mb-2">
          {bride} <span className="font-display text-2xl sm:text-3xl text-gold italic px-1">&amp;</span> {groom}
        </h3>

        <p className="font-body text-xs tracking-[0.25em] uppercase text-[#F5DE88] font-medium mb-4">
          {date} &bull; 
        </p>

        <p className="font-serif italic text-sm sm:text-base text-[#FBF6EE]/90 max-w-md mx-auto mb-8 font-light">
          Your warm blessings and gracious presence will make our wedding day truly unforgettable.
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2B050C] hover:bg-[#3D0A13] text-[#F7E7A9] hover:text-white text-xs font-body tracking-wider uppercase font-medium border border-gold/40 shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-gold" />
        </button>

        <div className="mt-12 flex items-center gap-1.5 text-[11px] font-body text-[#F7E7A9]/60">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-gold fill-gold" />
          <span>for Sowndarya &amp; Jayanth</span>
        </div>

      </div>
    </footer>
  );
}
