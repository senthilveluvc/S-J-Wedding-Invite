import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MailOpen } from 'lucide-react';

export default function EnvelopeIntro({ onEnter, onStartMusic }) {
  const [state, setState] = useState('idle'); // 'idle' | 'playing' | 'fading' | 'done'
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = () => {
    if (state !== 'idle') return;
    setHasInteracted(true);
    setState('playing');

    // Trigger romantic background music
    if (onStartMusic) {
      onStartMusic();
    }

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video autoplay prevented:", err);
          // Fallback if video play failed: transition to invite
          handleFinish();
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime > 0.1 && !videoLoaded) {
      setVideoLoaded(true);
    }

    // Near the end of the video, start fading smoothly
    if (video.duration && video.duration - video.currentTime <= 0.8 && state === 'playing') {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setState('fading');
    if (onEnter) onEnter();
    setTimeout(() => {
      setState('done');
    }, 1000);
  };

  if (state === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5] cursor-pointer select-none overflow-hidden"
        onClick={handleOpen}
        initial={{ opacity: 1 }}
        animate={{ opacity: state === 'fading' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: state === 'fading' ? 'none' : 'auto' }}
      >
        {/* Static Poster (Shown while idle or loading) */}
        <img
          src="/assets/intro-poster.jpg"
          alt="Wedding Invitation Envelope"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
            state === 'playing' && videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          draggable={false}
        />

        {/* Video of Wax Seal Breaking & Envelope Opening */}
        <video
          ref={videoRef}
          src="/assets/intro-video.mp4"
          poster="/assets/intro-poster.jpg"
          playsInline
          muted
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
            state === 'playing' && videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Interactive Overlay & Prompts (Only in idle state) */}
        {state === 'idle' && (
          <div className="absolute inset-0 flex flex-col justify-between items-center py-12 px-6 pointer-events-none">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gold/40 shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs tracking-[0.25em] uppercase font-body font-semibold text-sage-dark">
                You Are Cordially Invited
              </span>
            </motion.div>

            {/* Central Glow / Tap Indicator on Wax Seal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full border-2 border-gold/50 shadow-[0_0_25px_rgba(197,160,89,0.4)] pointer-events-none my-auto"
            />

            {/* Bottom Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-deep/85 text-white backdrop-blur-md shadow-lg border border-gold/40 transition-transform active:scale-95">
                <MailOpen className="w-4 h-4 text-gold-light" />
                <span className="font-body text-xs md:text-sm tracking-widest uppercase font-medium">
                  Tap to Open Invitation
                </span>
              </div>
              <p className="text-[11px] font-body text-sage-dark/70 tracking-wider mt-2">
                Click anywhere to break the seal &amp; reveal
              </p>
            </motion.div>
          </div>
        )}

        {/* Skip button if playing */}
        {state === 'playing' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute bottom-6 right-6 z-50 text-xs font-body tracking-widest uppercase px-4 py-2 rounded-full bg-black/40 text-white/90 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-colors"
          >
            Skip to invite →
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
