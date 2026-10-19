import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StorySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 1,
      image: '/images/story-slide-1.jpg',
      chapter: 'Chapter 01',
      tagline: 'College Days',
      caption: 'we met as college classmates',
      emoji: '🎓',
      accent: '#E6CA65'
    },
    {
      id: 2,
      image: '/images/story-slide-2.jpg',
      chapter: 'Chapter 02',
      tagline: 'Best Friends',
      caption: 'we become friends, then best friends',
      emoji: '🤍',
      accent: '#D4AF37'
    },
    {
      id: 3,
      image: '/images/story-slide-3.jpg',
      chapter: 'Chapter 03',
      tagline: 'Falling in Love',
      caption: 'somewhere along the way, we fell in love..❤️',
      emoji: '💌',
      accent: '#F59E0B'
    },
    {
      id: 4,
      image: '/images/story-slide-4.jpg',
      chapter: 'Chapter 04',
      tagline: 'Forever & Always',
      caption: 'Two families, one love, and now... forever..💍❤️',
      emoji: '💍',
      accent: '#E11D48'
    }
  ];

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E6CA65', '#D4AF37', '#FAF8F5', '#E11D48', '#FFB703']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // Auto-play timer: starts ONLY when user scrolls to this section
  useEffect(() => {
    if (!isPlaying || !isInView) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => {
        const next = (prev + 1) % slides.length;
        if (next === slides.length - 1) {
          triggerCelebration();
        }
        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, isInView, slides.length, triggerCelebration]);

  const goToSlide = (index, dir = 1) => {
    setDirection(dir);
    setCurrentIndex(index);
    if (index === slides.length - 1) {
      triggerCelebration();
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex, -1);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex, 1);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum swipe distance in px
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped Left -> Next slide
        handleNext();
      } else {
        // Swiped Right -> Prev slide
        handlePrev();
      }
    }
  };

  // Tap navigation: Left 35% triggers prev, Right 65% triggers next
  const handleCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.35) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const currentSlide = slides[currentIndex];

  // Motion animation variants for slide transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  return (
    <section ref={sectionRef} id="story" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      {/* Background Decorative Flourishes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold/10 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-body font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Journey</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Our Little Story
          </h2>

          <div className="w-16 h-px bg-gold/50 mx-auto mt-4 mb-3" />

          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#FBF6EE] leading-relaxed px-4">
            &ldquo;Two hearts, two families, one beautiful beginning &mdash; and a new chapter waiting to unfold&rdquo;
          </p>
        </motion.div>

        {/* The Instagram Reel-Style Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[420px] relative select-none"
        >
          {/* Outer Royal Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent rounded-[2.5rem] blur-xl pointer-events-none" />

          {/* Main Polaroid-Style Glass Card Container */}
          <div
            className="relative bg-gradient-to-b from-[#2B050C]/95 via-[#23040A]/95 to-[#1A0307]/98 backdrop-blur-xl rounded-[2.2rem] p-4 sm:p-5 shadow-2xl border-2 border-gold/50 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Story Progress Bars (Instagram Stories Style) */}
            <div className="grid grid-cols-4 gap-1.5 mb-3.5 px-1 pt-1">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                const isPast = idx < currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                    className="h-1 rounded-full overflow-hidden bg-white/20 transition-all cursor-pointer group"
                    title={`Go to ${slide.chapter}`}
                  >
                    {isPast ? (
                      <div className="h-full w-full bg-gold" />
                    ) : isActive ? (
                      <motion.div
                        key={`bar-${currentIndex}-${isInView}-${isPlaying}`}
                        className="h-full bg-gradient-to-r from-gold-light to-gold shadow-[0_0_8px_rgba(230,202,101,0.9)]"
                        initial={{ width: '0%' }}
                        animate={{ width: isPlaying && isInView ? '100%' : '0%' }}
                        transition={{
                          duration: 5.5,
                          ease: 'linear'
                        }}
                      />
                    ) : (
                      <div className="h-full w-0 bg-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Story Card Top Monogram & Actions */}
            <div className="flex items-center justify-between px-2 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                <span className="font-serif italic text-gold-light text-sm tracking-wide font-medium">
                  {currentSlide.chapter} &bull; {currentSlide.tagline}
                </span>
              </div>

              {/* View Real Couple Photo Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOriginalModal(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 border border-gold/40 text-[11px] text-[#F7E7A9] hover:text-white transition-all active:scale-95"
                title="View original couple photo"
              >
                <ImageIcon className="w-3 h-3 text-gold" />
                <span className="hidden xs:inline">Real Photo</span>
              </button>
            </div>

            {/* Interactive Image Frame */}
            <div
              onClick={handleCardClick}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#120205] border border-gold/30 shadow-inner cursor-pointer group"
              title="Tap left side for Previous, right side for Next"
            >
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.caption}
                    className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft bottom vignette for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307]/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Gentle Floating Chapter Badge inside photo */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-gold/40 text-[10px] font-body tracking-wider uppercase text-gold-light font-medium shadow-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-gold" />
                      {currentSlide.chapter}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tap Left / Right Visual Guides (Subtle on Hover) */}
              <div className="absolute inset-y-0 left-0 w-1/4 flex items-center justify-start pl-2 opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
                <ChevronLeft className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
                <ChevronRight className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>

            {/* Slide Caption Box (Matching Instagram Card Style) */}
            <div className="mt-4 px-3 py-3 rounded-xl bg-gradient-to-r from-[#3B0711]/90 via-[#450A14]/90 to-[#3B0711]/90 border border-gold/40 text-center shadow-lg relative overflow-hidden">
              <div className="absolute -right-3 -top-3 w-10 h-10 bg-gold/10 rounded-full blur-sm pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-serif italic text-lg sm:text-xl text-white font-medium leading-snug drop-shadow-sm">
                    &ldquo;{currentSlide.caption}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar (Replicating the Reel UI) */}
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gold/20 px-2">
              {/* Previous Slide Button */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-gold/20 border border-gold/40 hover:border-gold flex items-center justify-center text-gold-light hover:text-white transition-all active:scale-90 shadow-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Center Counter & Swipe Hint */}
              <div className="text-center">
                <div className="font-serif text-sm tracking-[0.2em] font-semibold text-gold-light">
                  0{currentIndex + 1} <span className="text-gold/50 mx-1">/</span> 0{slides.length}
                </div>
                <div className="text-[10px] font-body tracking-wider uppercase text-white/70 font-light flex items-center justify-center gap-1">
                  <span>Swipe or tap</span>
                </div>
              </div>

              {/* Play / Pause Reel Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-md ${
                    isPlaying
                      ? 'bg-gold/20 border-gold text-gold-light'
                      : 'bg-black/40 border-gold/40 hover:border-gold text-white/70 hover:text-white'
                  }`}
                  title={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
                  aria-label={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-gold" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5 text-gold-light" />
                  )}
                </button>

                {/* Next Slide Button */}
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-black/40 hover:bg-gold/20 border border-gold/40 hover:border-gold flex items-center justify-center text-gold-light hover:text-white transition-all active:scale-90 shadow-md"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Chapter Navigation Thumbnails */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-8 flex-wrap px-4">
          {slides.map((slide, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-body ${
                  isSelected
                    ? 'bg-gold/25 border-gold text-white shadow-[0_0_12px_rgba(197,160,89,0.4)] scale-105'
                    : 'bg-black/30 border-gold/30 text-white/70 hover:text-white hover:border-gold/60'
                }`}
              >
                <span className="w-4 h-4 rounded-full overflow-hidden inline-block flex-shrink-0 border border-gold/40">
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </span>
                <span className="font-serif italic font-medium">
                  {slide.chapter}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Couple Photo Comparison Modal */}
      <AnimatePresence>
        {showOriginalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOriginalModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-gradient-to-b from-[#2B050C] to-[#1A0307] p-5 rounded-3xl border border-gold/50 shadow-2xl text-center"
            >
              <button
                onClick={() => setShowOriginalModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-gold/40 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-gold text-xs font-body tracking-[0.2em] uppercase mb-2">
                <Heart className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>The Real Couple</span>
                <Heart className="w-3.5 h-3.5 fill-gold text-gold" />
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-3">
                Jayanth &amp; Sowndarya
              </h3>

              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gold/40 shadow-inner mb-3">
                <img
                  src="/images/story-couple-real.jpg"
                  alt="Real photo of Jayanth and Sowndarya"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <p className="font-serif italic text-sm text-[#F7E7A9]">
                The beautiful real-life inspiration behind our animated love story illustrations!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
