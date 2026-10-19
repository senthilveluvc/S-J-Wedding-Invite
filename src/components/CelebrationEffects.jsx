import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CelebrationEffects() {
  const [activeFlowerBurst, setActiveFlowerBurst] = useState([]);

  // FLOWER SHOWER (POO MAZHAI) on "Shower Blessings" click
  const triggerFlowerShower = useCallback(() => {
    // 1. Generate 50 realistic fluttering Tamil wedding flower petals
    const newPetals = Array.from({ length: 48 }, (_, i) => {
      const types = ['mango-leaf', 'marigold-orange', 'marigold-yellow', 'rose-crimson', 'jasmine-white'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: `${Date.now()}-${i}`,
        type,
        startX: Math.random() * 92 + 4, // 4vw to 96vw
        startY: Math.random() * -15 - 5, // start slightly above screen
        driftX: (Math.random() - 0.5) * 160,
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.7,
        duration: Math.random() * 2.5 + 3.2, // 3.2s to 5.7s
        delay: Math.random() * 0.4
      };
    });

    setActiveFlowerBurst(newPetals);

    // Auto-clean after petals fall
    setTimeout(() => {
      setActiveFlowerBurst([]);
    }, 6000);

    // 2. Auspicious Tamil Wedding Floral Confetti Burst
    try {
      // Wide floral shower from top-left and top-right
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#E11D48', '#F59E0B', '#FBBF24', '#FFFDF0', '#16A34A', '#C5A059'],
        scalar: 1.2
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#E11D48', '#F59E0B', '#FBBF24', '#FFFDF0', '#16A34A', '#C5A059'],
        scalar: 1.2
      });
      confetti({
        particleCount: 45,
        spread: 110,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#E11D48', '#F59E0B', '#FBBF24', '#FFFDF0', '#22C55E', '#D4AF37'],
        scalar: 1.3
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // 32 AMBIENT CONTINUOUS FALLING LEAVES & FLOWERS (Mango Leaves, Marigold, Rose & Jasmine)
  const ambientLeavesAndFlowers = [
    // Green Mango Leaves (Maa Ilai)
    { id: 'leaf-1', left: '4%', type: 'mango-leaf', size: 'w-4 h-6', duration: 15, delay: 0 },
    { id: 'leaf-2', left: '16%', type: 'mango-leaf', size: 'w-3.5 h-5.5', duration: 17, delay: 4 },
    { id: 'leaf-3', left: '29%', type: 'mango-leaf', size: 'w-4 h-6.5', duration: 14, delay: 8 },
    { id: 'leaf-4', left: '44%', type: 'mango-leaf', size: 'w-3 h-5', duration: 18, delay: 2 },
    { id: 'leaf-5', left: '58%', type: 'mango-leaf', size: 'w-4 h-6', duration: 16, delay: 6 },
    { id: 'leaf-6', left: '71%', type: 'mango-leaf', size: 'w-3.5 h-5.5', duration: 13, delay: 10 },
    { id: 'leaf-7', left: '84%', type: 'mango-leaf', size: 'w-4 h-6', duration: 19, delay: 3 },
    { id: 'leaf-8', left: '95%', type: 'mango-leaf', size: 'w-3 h-5', duration: 15, delay: 7 },
    { id: 'leaf-9', left: '22%', type: 'mango-leaf', size: 'w-4 h-6', duration: 16, delay: 11 },
    { id: 'leaf-10', left: '65%', type: 'mango-leaf', size: 'w-3.5 h-5', duration: 17, delay: 13 },

    // Orange Marigold Petals (Sevvanthi / Samandhi)
    { id: 'mari-1', left: '8%', type: 'marigold-orange', size: 'w-3.5 h-4.5', duration: 13, delay: 1 },
    { id: 'mari-2', left: '25%', type: 'marigold-orange', size: 'w-3 h-4', duration: 16, delay: 5 },
    { id: 'mari-3', left: '39%', type: 'marigold-orange', size: 'w-4 h-5', duration: 14, delay: 9 },
    { id: 'mari-4', left: '52%', type: 'marigold-orange', size: 'w-3 h-4', duration: 15, delay: 3 },
    { id: 'mari-5', left: '77%', type: 'marigold-orange', size: 'w-3.5 h-4.5', duration: 12, delay: 7 },
    { id: 'mari-6', left: '91%', type: 'marigold-orange', size: 'w-4 h-5', duration: 18, delay: 11 },

    // Yellow Marigold Petals (Samandhi)
    { id: 'mari-y1', left: '12%', type: 'marigold-yellow', size: 'w-3 h-4', duration: 14, delay: 2 },
    { id: 'mari-y2', left: '34%', type: 'marigold-yellow', size: 'w-4 h-4.5', duration: 15, delay: 6 },
    { id: 'mari-y3', left: '48%', type: 'marigold-yellow', size: 'w-3 h-4', duration: 13, delay: 10 },
    { id: 'mari-y4', left: '62%', type: 'marigold-yellow', size: 'w-3.5 h-4.5', duration: 17, delay: 4 },
    { id: 'mari-y5', left: '81%', type: 'marigold-yellow', size: 'w-3 h-4', duration: 14, delay: 8 },
    { id: 'mari-y6', left: '97%', type: 'marigold-yellow', size: 'w-4 h-4.5', duration: 16, delay: 12 },

    // Fragrant White Jasmine (Malligai)
    { id: 'jas-1', left: '19%', type: 'jasmine-white', size: 'w-2.5 h-3.5', duration: 16, delay: 3 },
    { id: 'jas-2', left: '42%', type: 'jasmine-white', size: 'w-3 h-4', duration: 14, delay: 7 },
    { id: 'jas-3', left: '74%', type: 'jasmine-white', size: 'w-2.5 h-3.5', duration: 18, delay: 1 },
    { id: 'jas-4', left: '88%', type: 'jasmine-white', size: 'w-3 h-4', duration: 15, delay: 9 },

    // Crimson Rose Petals (Roja)
    { id: 'rose-1', left: '6%', type: 'rose-crimson', size: 'w-3 h-4', duration: 15, delay: 4 },
    { id: 'rose-2', left: '32%', type: 'rose-crimson', size: 'w-3.5 h-4.5', duration: 13, delay: 8 },
    { id: 'rose-3', left: '55%', type: 'rose-crimson', size: 'w-3 h-4', duration: 17, delay: 2 },
    { id: 'rose-4', left: '69%', type: 'rose-crimson', size: 'w-3.5 h-4.5', duration: 14, delay: 6 },
    { id: 'rose-5', left: '86%', type: 'rose-crimson', size: 'w-3 h-4', duration: 16, delay: 10 },
    { id: 'rose-6', left: '93%', type: 'rose-crimson', size: 'w-3 h-4', duration: 15, delay: 12 }
  ];

  // Helper for petal style classes
  const getPetalStyle = (type) => {
    switch (type) {
      case 'mango-leaf':
        return 'bg-gradient-to-br from-emerald-500 to-green-700 shadow-sm border-r border-emerald-300/40 rounded-[80%_0_80%_0]';
      case 'marigold-orange':
        return 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm rounded-[60%_60%_60%_0]';
      case 'marigold-yellow':
        return 'bg-gradient-to-br from-yellow-300 to-amber-400 shadow-sm rounded-[60%_60%_60%_0]';
      case 'rose-crimson':
        return 'bg-gradient-to-br from-rose-600 to-red-800 shadow-sm rounded-[50%_50%_50%_0]';
      case 'jasmine-white':
        return 'bg-gradient-to-br from-white via-amber-50 to-amber-100/90 shadow-sm border border-gold/30 rounded-[70%_30%_70%_30%]';
      default:
        return 'bg-amber-400 rounded-full';
    }
  };

  return (
    <>
      {/* 1. CONTINUOUS AMBIENT FALLING LEAVES & PETALS (32 ITEMS) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
        
        {/* Ambient Leaves & Petals Falling from Top to Bottom */}
        {ambientLeavesAndFlowers.map((item) => (
          <motion.div
            key={item.id}
            className={`absolute ${item.size} ${getPetalStyle(item.type)} opacity-75`}
            style={{
              left: item.left,
              top: '-6%'
            }}
            animate={{
              y: ['0vh', '112vh'],
              x: [0, 35, -30, 20, 0],
              rotate: [0, 180, 360, 540],
              opacity: [0, 0.85, 0.85, 0]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear'
            }}
          />
        ))}

        {/* Soft Golden Temple Diya Sparks */}
        {[
          { top: '18%', left: '7%' },
          { top: '32%', right: '9%' },
          { top: '52%', left: '12%' },
          { top: '72%', right: '14%' },
          { top: '88%', left: '18%' }
        ].map((pos, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={pos}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.85, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut'
            }}
          >
            <Sparkles className="w-4 h-4 text-gold fill-gold/40 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
          </motion.div>
        ))}

      </div>

      {/* 2. DYNAMIC FLOWER BURST (POO MAZHAI) ON BUTTON CLICK */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
        <AnimatePresence>
          {activeFlowerBurst.map((flower) => (
            <motion.div
              key={flower.id}
              initial={{
                x: `${flower.startX}vw`,
                y: `${flower.startY}vh`,
                opacity: 0,
                scale: 0.3,
                rotate: 0
              }}
              animate={{
                x: `${flower.startX + flower.driftX * 0.15}vw`,
                y: '108vh',
                opacity: [0, 1, 1, 0],
                scale: [0.4, flower.scale, flower.scale * 0.9, 0.5],
                rotate: flower.rotation
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: flower.duration,
                delay: flower.delay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`absolute w-4 h-5 sm:w-5 sm:h-6 ${getPetalStyle(flower.type)} filter drop-shadow-md`}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 3. INTERACTIVE "SHOWER BLESSINGS" BUTTON */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={triggerFlowerShower}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2B050C]/95 backdrop-blur-md border border-gold/60 shadow-2xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] text-[#F7E7A9] hover:text-white transition-all duration-300 group ring-1 ring-gold/40"
          title="Click to shower celebration wedding flowers and blessings!"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flower2 className="w-4 h-4 text-[#F5DE88] group-hover:scale-125 transition-transform" />
          </motion.div>
          <span className="font-body text-xs font-semibold tracking-wider uppercase text-[#F5DE88]">
            Shower Blessings
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        </motion.button>
      </div>
    </>
  );
}
