import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';

export default function DressCodeSection() {
  const colorPalette = [
    { name: 'Sacred Gold', hex: '#C5A059' },
    { name: 'Kanchi Pink', hex: '#B73268' },
    { name: 'Temple Emerald', hex: '#2E4C3D' },
    { name: 'Turmeric Glow', hex: '#D99B26' },
    { name: 'Pattu Ivory', hex: '#F5EFEB' }
  ];

  return (
    <section id="dress-code" className="relative py-20 md:py-28 px-4 overflow-hidden bg-[#FAF8F5]">
      
      {/* Decorative floral accent */}
      <img
        src="/assets/roses-top-left.png"
        alt=""
        className="absolute -top-12 -left-8 w-32 md:w-44 h-auto pointer-events-none select-none opacity-40 z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            Attire Inspiration
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B352E] font-normal">
            Dress Code
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-sage-dark/80 mt-3">
            Traditional Indian / Festive Wedding Splendor
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          
          {/* Ladies Attire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-gold/30 shadow-md relative group hover:border-gold transition-colors duration-300"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-cream text-sage-dark text-xs font-body font-semibold tracking-wider uppercase mb-4 border border-gold/25">
              Ladies
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B352E] font-medium mb-3">
              Traditional Elegance
            </h3>
            <p className="font-body text-xs sm:text-sm text-sage-dark/85 leading-relaxed mb-4">
              Kanchipuram Silk Sarees, Pure Silk Pattu, Traditional Zari weaves, or Festive Indian Ethnic wear in vibrant celebratory tones.
            </p>
            <div className="text-xs font-body text-gold-dark font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Silk Sarees &bull; Lehengas &bull; Festive Ensembles</span>
            </div>
          </motion.div>

          {/* Gentlemen Attire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-gold/30 shadow-md relative group hover:border-gold transition-colors duration-300"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-cream text-sage-dark text-xs font-body font-semibold tracking-wider uppercase mb-4 border border-gold/25">
              Gentlemen
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B352E] font-medium mb-3">
              Classic Sophistication
            </h3>
            <p className="font-body text-xs sm:text-sm text-sage-dark/85 leading-relaxed mb-4">
              Traditional South Indian Silk Veshti (Dhoti) with Silk Shirt, Kurta Pyjama with Bandhgala jacket, or Formal Suits for the Reception.
            </p>
            <div className="text-xs font-body text-gold-dark font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Silk Veshti &bull; Kurta Suit &bull; Formal Attire</span>
            </div>
          </motion.div>

        </div>

        {/* Color Palette Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gold/20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-sage-dark">
            <Palette className="w-4 h-4 text-gold" />
            <h4 className="font-serif text-xl sm:text-2xl text-[#2B352E] font-medium">
              Suggested Color Accents
            </h4>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-4">
            {colorPalette.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-white ring-1 ring-gold/30 transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-body text-[11px] text-sage-dark font-medium tracking-wide">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
