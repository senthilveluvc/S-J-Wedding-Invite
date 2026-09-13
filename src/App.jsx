import React, { useState, useRef, useEffect } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import Countdown from './components/Countdown';
import ScheduleSection from './components/ScheduleSection';
import VenueSection from './components/VenueSection';
import DressCodeSection from './components/DressCodeSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import { Mail, Volume2, Sparkles } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Audio setup
  useEffect(() => {
    const audio = new Audio('/assets/wedding-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isPlaying && !isMuted) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      audio.pause();
      audio.src = '';
    };
  }, []);

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
    date: "Sunday, 22 November 2026",
    targetDate: "2026-11-22T09:00:00",
    venue: "Lakshmi Kalyana Mandapam, Coimbatore",
    address: "226/1, Pollachi Main Rd, Eachanari, Coimbatore, Tamil Nadu 641021",
    mapsUrl: "https://maps.app.goo.gl/sGwCCBQKmwRF8YsQ9"
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-gold/20 selection:text-sage-dark overflow-x-hidden">
      
      {/* Top Floating Glass Header */}
      <header className="fixed top-4 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gold/30 shadow-md">
          {/* Couple initials */}
          <a href="#hero" className="flex items-center gap-2 text-sage-dark hover:text-gold transition-colors">
            <span className="font-serif font-semibold text-lg text-gold">S</span>
            <span className="text-xs text-gold/60 italic">&amp;</span>
            <span className="font-serif font-semibold text-lg text-gold">J</span>
          </a>

          {/* Quick links */}
          <div className="hidden sm:flex items-center gap-5 text-xs font-body tracking-wider uppercase font-medium text-sage-dark">
            <a href="#couple" className="hover:text-gold transition-colors">Couple</a>
            <a href="#schedule" className="hover:text-gold transition-colors">Events</a>
            <a href="#venue" className="hover:text-gold transition-colors">Venue</a>
            <a href="#rsvp" className="hover:text-gold transition-colors">RSVP</a>
          </div>

          {/* Re-open Envelope Button */}
          <button
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream hover:bg-white text-sage-dark text-[11px] font-body tracking-wide font-medium border border-gold/30 transition-all active:scale-95"
            title="Re-open Envelope Animation"
          >
            <Mail className="w-3.5 h-3.5 text-gold" />
            <span className="hidden xs:inline">Envelope</span>
          </button>
        </nav>
      </header>

      {/* Main Wedding Content Sections */}
      <main className="relative">
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
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 2. Meet the Couple Section */}
        <CoupleSection
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
        />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 3. Live Countdown Section */}
        <Countdown
          targetDate={weddingDetails.targetDate}
        />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 4. Events & Schedule Section */}
        <ScheduleSection />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 5. Venue & Directions Section */}
        <VenueSection />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 6. Attire / Dress Code Section */}
        <DressCodeSection />

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent">
          <span className="w-2 h-2 rotate-45 border border-gold/50 bg-[#FAF8F5]" />
        </div>

        {/* 7. Interactive RSVP Section */}
        <RSVPSection
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
        />

        {/* 8. Footer */}
        <Footer
          bride={weddingDetails.bride}
          groom={weddingDetails.groom}
          date={weddingDetails.date}
          venue={weddingDetails.venue}
        />
      </main>

      {/* Floating Audio / Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggle={toggleMute}
      />

      {/* Wax Seal Envelope Opening Intro Overlay */}
      {showIntro && (
        <EnvelopeIntro
          onEnter={() => setShowIntro(false)}
          onStartMusic={handleStartMusic}
        />
      )}

    </div>
  );
}
