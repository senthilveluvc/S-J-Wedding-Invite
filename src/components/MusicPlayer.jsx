import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ isPlaying, isMuted, onToggle }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Animated sound wave bars when playing */}
      {isPlaying && !isMuted && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-end gap-1 h-5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-md border border-gold/30 shadow-sm"
        >
          {[0.4, 0.8, 0.5, 0.9, 0.6].map((height, i) => (
            <motion.span
              key={i}
              className="w-0.5 bg-gold rounded-full"
              animate={{ height: ['20%', '100%', '30%'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
              style={{ height: `${height * 100}%` }}
            />
          ))}
          <span className="text-[10px] font-body text-sage-dark font-medium tracking-wider ml-1">
            Now Playing
          </span>
        </motion.div>
      )}

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggle}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border ${
          isPlaying && !isMuted
            ? 'bg-sage-dark text-white border-gold/40 shadow-sage-dark/25 ring-2 ring-gold/30'
            : 'bg-white/90 text-sage-dark border-sage/20 hover:bg-white shadow-black/10'
        }`}
        title={isMuted ? "Unmute Music" : "Mute Music"}
        aria-label="Toggle wedding music"
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-5 h-5 text-sage-dark/70" />
        ) : (
          <Volume2 className="w-5 h-5 text-gold-light" />
        )}
      </motion.button>
    </div>
  );
}
