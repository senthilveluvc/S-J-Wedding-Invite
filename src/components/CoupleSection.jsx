import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CoupleSection({
  bride = "Sowndarya",
  groom = "Jayanth"
}) {
  const handleProposalClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#C5A059', '#E6CA65', '#FAF8F5', '#E11D48', '#FFB703']
      });
    } catch (e) {
      // ignore
    }
  };

  // Floating romantic hearts configuration
  const floatingHearts = [
    { id: 1, left: 48, bottom: 45, size: 16, drift: 12, duration: 3.8, delay: 0 },
    { id: 2, left: 54, bottom: 42, size: 14, drift: -10, duration: 4.2, delay: 1.2 },
    { id: 3, left: 50, bottom: 46, size: 18, drift: 8, duration: 3.5, delay: 2.1 },
    { id: 4, left: 45, bottom: 40, size: 12, drift: -14, duration: 4.6, delay: 0.7 },
    { id: 5, left: 57, bottom: 44, size: 15, drift: 15, duration: 4.0, delay: 2.8 },
  ];

  // Ambient fairy light sparkles
  const fairyLights = [
    { id: 1, top: '15%', left: '20%', size: 6, delay: 0 },
    { id: 2, top: '22%', right: '22%', size: 8, delay: 0.8 },
    { id: 3, top: '35%', left: '15%', size: 5, delay: 1.5 },
    { id: 4, top: '28%', right: '14%', size: 7, delay: 2.1 },
    { id: 5, top: '12%', left: '50%', size: 8, delay: 1.1 },
  ];

  return (
    <section id="couple" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      
      {/* Subtle Background Accents */}
      <img
        src="/assets/bouquet.png"
        alt=""
        className="absolute -top-10 -left-12 w-36 md:w-56 h-auto pointer-events-none select-none opacity-20 filter invert sepia z-0"
      />
      <img
        src="/assets/flower-vase.png"
        alt=""
        className="absolute -bottom-10 -right-8 w-32 md:w-48 h-auto pointer-events-none select-none opacity-20 filter invert sepia z-0"
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
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            Our Love Story
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            The Proposal &amp; Vows
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
        </motion.div>

        {/* Main Card with Arched Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-3xl bg-gradient-to-b from-[#2B050C]/90 to-[#1A0307]/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-gold/40 relative overflow-hidden"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-3 border border-gold/25 rounded-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 relative z-10">
            
            {/* Arched Animated Proposal Motion Frame */}
            <div className="relative group flex-shrink-0 cursor-pointer" onClick={handleProposalClick} title="Click for celebration!">
              {/* Outer Golden Glow & Animated Aura */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.75, 0.4],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-3 rounded-t-full rounded-b-3xl bg-gradient-to-b from-gold/40 via-gold/15 to-transparent blur-md pointer-events-none"
              />
              
              {/* Arched Framing Container */}
              <div className="relative w-64 sm:w-72 md:w-80 h-[380px] sm:h-[430px] rounded-t-full rounded-b-3xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-2xl">
                <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-cream">
                  
                  {/* Living Video Breathing Motion Container */}
                  <motion.div
                    className="w-full h-full relative"
                    animate={{
                      scale: [1, 1.035, 1],
                      y: [0, -4, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src="/images/animated-proposal.jpg"
                      alt={`${groom} proposing to ${bride}`}
                      className="w-full h-full object-cover object-center select-none pointer-events-none"
                    />

                    {/* Cinematic Sweeping Light Beam */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                      animate={{
                        x: ['-120%', '220%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4.5,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Sparkling Diamond Ring Glint Animation */}
                  <motion.div
                    className="absolute pointer-events-none z-20"
                    style={{ left: '52%', top: '48%', transform: 'translate(-50%, -50%)' }}
                    animate={{
                      scale: [0, 1.4, 0],
                      rotate: [0, 90, 180],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-gold/50 blur-md absolute" />
                      <Sparkles className="w-6 h-6 text-yellow-100 fill-white drop-shadow-[0_0_10px_rgba(255,230,120,1)]" />
                    </div>
                  </motion.div>

                  {/* Continuous Floating Romantic Hearts */}
                  {floatingHearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      className="absolute pointer-events-none z-20"
                      style={{ left: `${heart.left}%`, bottom: `${heart.bottom}%` }}
                      animate={{
                        y: [0, -110],
                        x: [0, heart.drift, -heart.drift * 0.5, 0],
                        opacity: [0, 0.95, 0],
                        scale: [0.6, 1.15, 0.8]
                      }}
                      transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart
                        className="fill-rose-500/80 text-gold-light drop-shadow-[0_0_6px_rgba(225,29,72,0.6)]"
                        style={{ width: heart.size, height: heart.size }}
                      />
                    </motion.div>
                  ))}

                  {/* Twinkling Fairy Light Orbs */}
                  {fairyLights.map((light) => (
                    <motion.div
                      key={light.id}
                      className="absolute rounded-full bg-gold-light pointer-events-none z-10"
                      style={{
                        top: light.top,
                        left: light.left,
                        right: light.right,
                        width: light.size,
                        height: light.size
                      }}
                      animate={{
                        opacity: [0.2, 0.9, 0.2],
                        scale: [0.8, 1.3, 0.8]
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: light.delay,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* "Forever & Always" Floating Tag Inside Frame */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
                    <span className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-[11px] font-body tracking-[0.2em] uppercase text-white/95 font-medium shadow-sm flex items-center gap-1.5">
                      <Gem className="w-3 h-3 text-gold" />
                      <span>Forever &amp; Always</span>
                    </span>
                  </div>

                </div>
              </div>

              {/* Romantic Bottom Proposal Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#2B050C] shadow-lg border border-gold/50 flex items-center gap-2 text-gold z-30"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span className="font-serif italic text-xs text-[#F7E7A9] font-medium whitespace-nowrap">
                  &ldquo;She Said Yes!&rdquo;
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </motion.div>
            </div>

            {/* Couple Text & Description */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                  {bride}
                </h3>
                <span className="font-body text-xs tracking-widest uppercase text-gold font-medium block">
                  The Bride
                </span>
              </div>

              <div className="w-12 h-px bg-gold/50 mx-auto md:mx-0 my-3" />

              <div className="mb-6">
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                  {groom}
                </h3>
                <span className="font-body text-xs tracking-widest uppercase text-gold font-medium block">
                  The Groom
                </span>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-[#FBF6EE] leading-relaxed mb-6 font-light">
                &ldquo;From that magical moment of holding hands and saying yes to forever, with joyous hearts and the blessings of our parents, we invite you to stand with us as we exchange our vows and begin our new chapter together as one.&rdquo;
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gold/40 text-[#F7E7A9] text-xs font-body tracking-wider shadow-sm">
                <span>#SowndaryaWedsJayanth</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
