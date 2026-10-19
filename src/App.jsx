import React, { useState, useRef, useEffect } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import StorySection from './components/StorySection';
import Countdown from './components/Countdown';
import ScheduleSection from './components/ScheduleSection';
import VenueSection from './components/VenueSection';
import ScratchCardSection from './components/ScratchCardSection';
import CelebrationEffects from './components/CelebrationEffects';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import { DoorOpen, Volume2, Sparkles } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Audio setup with iOS and Android compatibility
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.5;
    } catch (e) {
      // iOS volume is system-controlled
    }

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isPlaying && !isMuted) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Global one-time interaction unlock for iOS Safari & Android
    const unlockAudio = () => {
      if (audio && audio.paused && !isMuted) {
        audio.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch(() => {});
      }
    };

    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchend', unlockAudio, { once: true, passive: true });
    window.addEventListener('click', unlockAudio, { once: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, [isPlaying, isMuted]);

  const handleStartMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn("Audio play prevented:", err);
          });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      handleStartMusic();
      return;
    }

    if (isMuted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const weddingDetails = {
    bride: "Sowndarya",
    groom: "Jayanth",
    receptionDate: "Saturday, 21 November 2026",
    receptionTime: "06:00 PM – 09:00 PM",
    weddingDate: "Sunday, 22 November 2026",
    weddingTime: "07:00 AM – 08:00 AM",
    tenkasiDate: "Sunday, 29 November 2026",
    tenkasiTime: "06:00 PM – 09:00 PM",
    date: "21, 22 & 29 November 2026",
    targetDate: "2026-11-21T18:00:00",
    venue: "Lakshmi Kalyana Mandapam, Coimbatore",
    address: "226/1, Pollachi Main Rd, Eachanari, Coimbatore, Tamil Nadu 641021",
    mapsUrl: "https://maps.app.goo.gl/42tu9b9yNE1ib6Dz7"
  };

  return (
    <div className="min-h-screen bg-[#1A0307] text-[#FAF8F5] font-sans relative selection:bg-gold/30 selection:text-white overflow-x-hidden">
      
      {/* Global Royal Temple Mandapam Wallpaper & Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Mobile background (Rich, vibrant temple mandapam arch, pillars, and diyas) */}
        <img
          src="/assets/temple-mandapam-bg.jpg"
          alt=""
          className="md:hidden w-full h-full object-cover object-top opacity-80 filter brightness-95 contrast-110"
        />
        {/* Desktop background */}
        <img
          src="/assets/temple-mandapam-desktop.jpg"
          alt=""
          className="hidden md:block w-full h-full object-cover object-center opacity-70 filter brightness-95 contrast-110"
        />
        {/* Soft, translucent royal maroon veil to maintain high text contrast without washing out the architecture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0307]/30 via-[#1A0307]/45 to-[#120205]/60" />
        
        {/* Luminous warm ambient golden lighting for festive royal atmosphere */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gold/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* Top Floating Glass Header */}
      <header className="fixed top-4 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-5 py-2.5 rounded-full bg-[#2B050C]/90 backdrop-blur-md border border-gold/40 shadow-2xl">
          {/* Couple initials */}
          <a href="#hero" className="flex items-center gap-2 text-[#F5DE88] hover:text-white transition-colors">
            <span className="font-serif font-semibold text-lg text-[#F5DE88]">S</span>
            <span className="text-xs text-gold/70 italic">&amp;</span>
            <span className="font-serif font-semibold text-lg text-[#F5DE88]">J</span>
          </a>

          {/* Quick links matching active sections */}
          <div className="hidden sm:flex items-center gap-5 text-xs font-body tracking-wider uppercase font-medium text-[#F7E7A9]">
            <a href="#dates-reveal" className="hover:text-white transition-colors">Dates</a>
            <a href="#countdown" className="hover:text-white transition-colors">Countdown</a>
            <a href="#venue" className="hover:text-white transition-colors">Venue</a>
          </div>

          {/* Re-open Royal Entrance Button */}
          <button
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/70 text-[#F7E7A9] hover:text-white text-[11px] font-body tracking-wide font-medium border border-gold/40 transition-all active:scale-95 cursor-pointer"
            title="Re-open Royal Mandapam Entrance"
          >
            <DoorOpen className="w-3.5 h-3.5 text-gold" />
            <span className="hidden xs:inline">Entrance</span>
          </button>
        </nav>
      </header>

      {/* Main Wedding Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <div id="hero">
          <HeroSection
            bride={weddingDetails.bride}
            groom={weddingDetails.groom}
            date={weddingDetails.date}
            venue={weddingDetails.venue}
          />
        </div>

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div>

        {/* 2. Meet the Couple Section */}
        {/* <CoupleSection
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
        /> */}

        {/* Elegant Gold Divider */}
        {/* <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div> */}

        {/* 3. Our Little Story Section */}
        {/* <StorySection /> */}

        {/* Elegant Gold Divider */}
        {/* <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div> */}

        {/* Elegant Gold Divider */}
        {/* <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div> */}

        {/* 4. Interactive Golden Scratch Card Section to Reveal Dates */}
        <ScratchCardSection />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div>

         {/* 4. Live Countdown Section */}
        <Countdown
          targetDate={weddingDetails.targetDate}
        />

        {/* <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div> */}

        {/* 5. Events & Schedule Section */}
        {/* <ScheduleSection /> */}

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent">
          <span className="w-2.5 h-2.5 rotate-45 border border-gold/80 bg-[#2B050C]" />
        </div>

        {/* 5. Venue & Directions Section */}
        <VenueSection />

        {/* 7. Interactive RSVP Form Section (commented out - not needed now) */}
        {/*
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        <RSVPSection
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
        />
        */}

        {/* 8. Footer */}
        <Footer
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
          date={weddingDetails.date}
          venue={weddingDetails.venue}
        />
      </main>

      {/* Native HTML5 Audio with iOS (M4A) and Android (MP4/AAC) support */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        playsInline
        webkit-playsinline="true"
      >
        <source src="/assets/Thirukkural.m4a" type="audio/mp4" />
        <source src="/assets/Thirukkural.mp4" type="audio/mp4" />
        <source src="/assets/Thirukkural.aac" type="audio/aac" />
        <source src="/assets/Thirukkural.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Audio / Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggle={toggleMute}
      />

      {/* Celebration Mode Background Effects & Shower Blessings Button (Deferred until inside invite) */}
      {!showIntro && <CelebrationEffects />}

      {/* Royal Mandapam Opening Intro Overlay */}
      {showIntro && (
        <EnvelopeIntro
          onEnter={() => setShowIntro(false)}
          onStartMusic={handleStartMusic}
        />
      )}

    </div>
  );
}
