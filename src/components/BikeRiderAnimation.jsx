import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BikeRiderAnimation() {
  const [honk, setHonk] = useState(false);

  const handleBikeClick = (e) => {
    e.stopPropagation();
    setHonk(true);
    setTimeout(() => setHonk(false), 1200);

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.5, y: 0.9 },
        colors: ['#C5A059', '#E6CA65', '#E11D48', '#FFB703']
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 pointer-events-none z-30 overflow-hidden h-28 sm:h-36 select-none">
      {/* Moving bike container spanning from left of screen to right */}
      <motion.div
        className="absolute bottom-2 flex items-end pointer-events-auto cursor-pointer group"
        initial={{ x: '-320px' }}
        animate={{ x: 'calc(100vw + 320px)' }}
        transition={{
          duration: 13,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear'
        }}
        onClick={handleBikeClick}
        title="Sowndarya & Jayanth on their Royal Enfield! Click for celebration"
      >
        <div className="relative">
          
          {/* Exhaust Heart & Smoke Trail Particles */}
          <div className="absolute -left-6 bottom-4 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute text-rose-500/80"
                style={{ bottom: i * 4, left: -i * 12 }}
                animate={{
                  scale: [0.4, 1.2, 0],
                  x: [-5, -35],
                  y: [0, -15 - i * 5],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.28,
                  ease: 'easeOut'
                }}
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400 drop-shadow-sm" />
              </motion.div>
            ))}
            
            {/* Trailing golden sparkles */}
            <motion.div
              className="absolute -left-8 bottom-2"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.9, 0]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold fill-gold" />
            </motion.div>
          </div>

          {/* Bike & Couple Illustration with Subtle Road Motion */}
          <motion.div
            animate={{
              y: [0, -2.5, 1, -1.5, 0],
              rotate: [0, 0.4, -0.4, 0]
            }}
            transition={{
              duration: 0.45,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-48 sm:w-60 md:w-68 filter drop-shadow-md"
          >
            <img
              src="/images/couple-bike.jpg"
              alt="Sowndarya & Jayanth on Royal Enfield"
              className="w-full h-auto object-contain mix-blend-multiply select-none pointer-events-none"
            />
          </motion.div>

          {/* "Just Married" or Honk Speech Bubble */}
          {honk && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: -10 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white shadow-md border border-gold text-[11px] font-body font-bold text-gold-dark whitespace-nowrap flex items-center gap-1"
            >
              <span>🎉 Beep Beep! Forever Together!</span>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
