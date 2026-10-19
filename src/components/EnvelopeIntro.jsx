import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, DoorOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EnvelopeIntro({ onEnter, onStartMusic }) {
  const [state, setState] = useState('idle'); // 'idle' | 'opening' | 'fading' | 'done'

  const handleOpen = () => {
    if (state !== 'idle') return;
    setState('opening');

    // Trigger background wedding music synchronously within user interaction
    if (onStartMusic) {
      try {
        onStartMusic();
      } catch (err) {
        console.warn('Audio play triggered:', err);
      }
    }

    // Festive golden & rose confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#E6CA65', '#D4AF37', '#FAF8F5', '#E11D48', '#FFB703', '#F43F5E']
      });
    } catch (e) {
      // ignore
    }

    // Door opening animation duration before fading smoothly into the invite
    setTimeout(() => {
      handleFinish();
    }, 2200);
  };

  const handleFinish = () => {
    setState('fading');
    if (onEnter) onEnter();
    setTimeout(() => {
      setState('done');
    }, 800);
  };

  if (state === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Tap anywhere to enter the sacred wedding mandapam"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#120205] cursor-pointer select-none overflow-hidden"
        onClick={handleOpen}
        onTouchEnd={handleOpen}
        initial={{ opacity: 1 }}
        animate={{ opacity: state === 'fading' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: state === 'fading' ? 'none' : 'auto' }}
      >
        {/* WIDESCREEN BACKGROUND AMBIANCE (Seen on desktop or through doors) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B050C] via-[#1A0307] to-[#120205] overflow-hidden pointer-events-none">
          <picture>
            <source media="(min-width: 768px)" srcSet="/assets/temple-mandapam-desktop.jpg" />
            <img
              src="/assets/temple-mandapam-mobile.jpg"
              alt=""
              className="w-full h-full object-cover object-center opacity-60 filter brightness-110 contrast-110"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />

          {/* Radiant Golden Light Burst from behind the doors when opening */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5DE88]/50 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: state === 'opening' ? [0, 1, 0.8] : 0 }}
            transition={{ duration: 1.8 }}
          />
        </div>

        {/* 3D MANDAPAM PORTAL FRAMEWORK
            - On Mobile: Fills 100% of the screen seamlessly edge-to-edge
            - On Desktop/Tablet: Centered majestic palace gateway with proper 9:16 proportions
        */}
        <div
          className="relative w-full h-full md:w-auto md:h-[92vh] md:max-w-[540px] md:aspect-[768/1376] flex items-center justify-center overflow-hidden md:rounded-2xl md:shadow-[0_0_80px_rgba(0,0,0,0.9)] md:border md:border-gold/30"
          style={{ perspective: '1400px' }}
        >
          {/* Inner zoom wrapper during opening */}
          <motion.div
            className="relative w-full h-full flex items-stretch overflow-hidden"
            animate={state === 'opening' ? { scale: [1, 1.08, 1.15] } : { scale: 1 }}
            transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* LEFT DOOR PANEL (Covers left 50%) */}
            <motion.div
              className="relative w-[calc(50%+0.5px)] h-full overflow-hidden origin-left z-20 shadow-2xl"
              initial={{ rotateY: 0 }}
              animate={
                state === 'opening'
                  ? {
                      rotateY: -105,
                      opacity: [1, 1, 0.5]
                    }
                  : { rotateY: 0 }
              }
              transition={{
                duration: 2.0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Left Door Image Slice: Centered 200% width pinned to the left */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/assets/royal-door.jpg"
                  alt="Royal Mandapam Entrance Door Left"
                  className="absolute top-0 left-0 w-[200%] max-w-none h-full object-cover object-center"
                  draggable={false}
                />
              </div>

              {/* Inner Shadow on seam only appears during opening */}
              {state === 'opening' && (
                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
              )}
            </motion.div>

            {/* RIGHT DOOR PANEL (Covers right 50%) */}
            <motion.div
              className="relative w-1/2 h-full overflow-hidden origin-right z-20 shadow-2xl"
              initial={{ rotateY: 0 }}
              animate={
                state === 'opening'
                  ? {
                      rotateY: 105,
                      opacity: [1, 1, 0.5]
                    }
                  : { rotateY: 0 }
              }
              transition={{
                duration: 2.0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Right Door Image Slice: Centered 200% width pinned to the right */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/assets/royal-door.jpg"
                  alt="Royal Mandapam Entrance Door Right"
                  className="absolute top-0 right-0 w-[200%] max-w-none h-full object-cover object-center"
                  draggable={false}
                />
              </div>

              {/* Inner Shadow on seam only appears during opening */}
              {state === 'opening' && (
                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
              )}
            </motion.div>

            {/* ASTRAGAL (CENTRAL MICRO LIGHT SEAM) */}
            <motion.div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#FFF4B8]/20 via-[#F5DE88]/40 to-[#FFF4B8]/20 pointer-events-none z-30"
              initial={{ opacity: 0.4 }}
              animate={
                state === 'opening'
                  ? {
                      opacity: [0.4, 1, 0],
                      scaleX: [1, 35, 120],
                      boxShadow: '0 0 50px rgba(245, 222, 136, 1)'
                    }
                  : {
                      opacity: [0.2, 0.5, 0.2]
                    }
              }
              transition={{
                duration: state === 'opening' ? 1.6 : 2.5,
                repeat: state === 'idle' ? Infinity : 0,
                ease: 'easeInOut'
              }}
            />

            {/* PULSING AURA ON THE DOOR'S BUILT-IN "S & J" MEDALLION
                (Placed directly over the artwork's golden medallion at vertical center ~53.4%)
            */}
            {state === 'idle' && (
              <motion.div
                className="absolute top-[53.4%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 w-32 h-32 sm:w-40 sm:h-40 rounded-full"
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.25, 0.55, 0.25],
                  boxShadow: [
                    '0 0 20px rgba(230, 202, 101, 0.3)',
                    '0 0 40px rgba(245, 222, 136, 0.7)',
                    '0 0 20px rgba(230, 202, 101, 0.3)'
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut'
                }}
              />
            )}
          </motion.div>
        </div>

        {/* ELEGANT TOP & BOTTOM INTERACTIVE PROMPTS (Only shown when idle) */}
        <AnimatePresence>
          {state === 'idle' && (
            <div className="absolute inset-0 flex flex-col justify-between items-center py-6 sm:py-10 px-3 sm:px-4 pointer-events-none z-40">
              {/* TOP HEADER BADGE */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/75 backdrop-blur-md border border-gold/50 shadow-2xl flex items-center gap-1.5 sm:gap-2 max-w-[96vw]"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
                <span className="text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.25em] uppercase font-body font-semibold text-[#F5DE88] whitespace-nowrap">
                  Sowndarya &amp; Jayanth Wedding
                </span>
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
              </motion.div>

              {/* BOTTOM CALL TO ACTION BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15, transition: { duration: 0.3 } }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-center px-4 max-w-md"
              >
                <div className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#2B050C]/95 text-white backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-gold/60 transition-transform active:scale-95 hover:border-gold">
                  <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light" />
                  <span className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[#F7E7A9]">
                    Tap to Open Invitation
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-body text-[#F7E7A9]/90 tracking-wider mt-2.5 drop-shadow-md">
                  Click or tap anywhere to open the royal doors
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SKIP BUTTON DURING ANIMATION */}
        {state === 'opening' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute bottom-6 right-6 z-50 text-[11px] font-body tracking-widest uppercase px-4 py-2 rounded-full bg-black/70 text-white/95 backdrop-blur-md border border-gold/40 hover:bg-black/90 transition-colors"
          >
            Skip to invite &rarr;
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
