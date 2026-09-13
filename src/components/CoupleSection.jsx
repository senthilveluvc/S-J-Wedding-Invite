import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CoupleSection({
  bride = "Sowndarya",
  groom = "Jayanth"
}) {
  return (
    <section id="couple" className="relative py-20 md:py-28 px-4 overflow-hidden bg-[#FAF8F5]">
      
      {/* Subtle Background Accents */}
      <img
        src="/assets/bouquet.png"
        alt=""
        className="absolute -top-10 -left-12 w-36 md:w-56 h-auto pointer-events-none select-none opacity-60 z-0"
      />
      <img
        src="/assets/flower-vase.png"
        alt=""
        className="absolute -bottom-10 -right-8 w-32 md:w-48 h-auto pointer-events-none select-none opacity-60 z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            The Happy Couple
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B352E] font-normal">
            Meet the Bride &amp; Groom
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </motion.div>

        {/* Main Card with Arched Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-2xl bg-white/75 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-xl border border-gold/25 relative overflow-hidden"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-3 border border-gold/15 rounded-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            
            {/* Arched Portrait Photo Frame */}
            <div className="relative group flex-shrink-0">
              {/* Outer Glow & Filigree Rings */}
              <div className="absolute -inset-2.5 rounded-t-full rounded-b-2xl bg-gradient-to-b from-gold/30 via-gold/10 to-transparent blur-sm group-hover:from-gold/50 transition-all duration-500" />
              
              <div className="relative w-56 sm:w-64 h-80 sm:h-92 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-xl">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-cream">
                  <img
                    src="/images/couple.jpg?v=2"
                    alt={`${bride} and ${groom}`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Heart Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-gold/40 flex items-center justify-center text-gold">
                <Heart className="w-4 h-4 fill-gold text-gold" />
              </div>
            </div>

            {/* Couple Text & Description */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#2B352E] font-medium leading-tight">
                  {bride}
                </h3>
                <span className="font-body text-xs tracking-widest uppercase text-sage font-medium block">
                  The Bride
                </span>
              </div>

              <div className="w-12 h-px bg-gold/40 mx-auto md:mx-0 my-3" />

              <div className="mb-6">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#2B352E] font-medium leading-tight">
                  {groom}
                </h3>
                <span className="font-body text-xs tracking-widest uppercase text-sage font-medium block">
                  The Groom
                </span>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-sage-dark/85 leading-relaxed mb-6 font-light">
                &ldquo;With joyous hearts and the blessings of our parents, we invite you to stand with us as we exchange our vows and begin our new chapter together as one.&rdquo;
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-gold/30 text-sage-dark text-xs font-body tracking-wider">
                <span>#SowndaryaWedsJayanth</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
