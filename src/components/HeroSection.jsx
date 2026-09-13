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
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between items-center text-center px-4 pt-16 pb-12 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF8F5]">
      
      {/* Classical Architectural Framing - Left & Right Curtains */}
      <img
        src="/assets/curtain-left.png"
        alt=""
        className="absolute top-0 left-0 w-32 md:w-56 lg:w-72 h-auto pointer-events-none select-none z-20 opacity-90 transition-transform duration-1000"
      />
      <img
        src="/assets/curtain-right.png"
        alt=""
        className="absolute top-0 right-0 w-32 md:w-56 lg:w-72 h-auto pointer-events-none select-none z-20 opacity-90 transition-transform duration-1000"
      />
      <img
        src="/assets/curtain-center.png"
        alt=""
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 lg:w-[32rem] h-auto pointer-events-none select-none z-20 opacity-90"
      />

      {/* Classical Marble Columns */}
      <img
        src="/assets/column-left.png"
        alt=""
        className="absolute left-0 bottom-0 h-[60%] md:h-[80%] w-auto pointer-events-none select-none z-10 opacity-70 hidden sm:block"
      />
      <img
        src="/assets/column-right.png"
        alt=""
        className="absolute right-0 bottom-0 h-[60%] md:h-[80%] w-auto pointer-events-none select-none z-10 opacity-70 hidden sm:block"
      />

      {/* Decorative Floral Accents */}
      <img
        src="/assets/roses-top-left.png"
        alt=""
        className="absolute top-12 left-4 md:left-24 w-28 md:w-44 h-auto pointer-events-none select-none z-10 opacity-80"
      />
      <img
        src="/assets/roses-bottom-right.png"
        alt=""
        className="absolute bottom-8 right-4 md:right-24 w-28 md:w-44 h-auto pointer-events-none select-none z-10 opacity-80"
      />

      {/* Main Content Container */}
      <div className="relative z-30 max-w-3xl mx-auto my-auto flex flex-col items-center">
        
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-24 h-24 md:w-32 md:h-32 mb-6 pointer-events-none select-none drop-shadow-sm"
        >
          <img
            src="/assets/monogram-sj.svg"
            alt="S & J Monogram"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Subtitle / Traditional Invocation */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-sage-dark font-medium mb-4"
        >
          Together with their families
        </motion.p>

        {/* Grand Calligraphy Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="my-2"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#2B352E] font-normal leading-tight">
            {bride}
          </h1>
          <div className="flex items-center justify-center my-2 gap-4">
            <span className="h-px w-12 md:w-20 bg-gold/50" />
            <span className="font-display text-4xl md:text-5xl text-gold italic px-2">
              &amp;
            </span>
            <span className="h-px w-12 md:w-20 bg-gold/50" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#2B352E] font-normal leading-tight">
            {groom}
          </h1>
        </motion.div>

        {/* Invitation Honor Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif italic text-lg md:text-2xl text-sage-dark/85 max-w-xl mx-auto my-6 px-4 font-light leading-relaxed"
        >
          Request the honour of your gracious presence to celebrate our wedding ceremony
        </motion.p>

        {/* Date & Location Pill Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 mt-2"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-gold/30 shadow-sm text-sage-dark">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-body text-xs md:text-sm tracking-wider uppercase font-semibold">
              {date}
            </span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-gold/30 shadow-sm text-sage-dark">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-body text-xs md:text-sm tracking-wider uppercase font-semibold">
              {venue}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Classical Candlelight & Floral bottom decoration */}
      <div className="relative z-20 flex justify-center items-end mt-8 pointer-events-none select-none">
        <img
          src="/assets/candles.png"
          alt=""
          className="w-48 md:w-64 h-auto opacity-75"
        />
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-30 flex flex-col items-center gap-1 mt-4 text-sage-dark/70 hover:text-sage-dark transition-colors cursor-pointer group"
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
