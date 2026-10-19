import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, Sparkles, Heart } from 'lucide-react';

export default function Countdown() {
  const targets = [
    {
      id: 'coimbatore',
      cityBadge: 'Coimbatore Celebrations',
      title: 'Coimbatore Reception & Wedding',
      dateText: 'Saturday, 21 November 2026 • 06:00 PM',
      venue: 'Lakshmi Kalyana Mandapam, Coimbatore',
      targetDate: '2026-11-21T18:00:00+05:30'
    },
    {
      id: 'tenkasi',
      cityBadge: 'Tenkasi Celebrations',
      title: 'Tenkasi Wedding Reception',
      dateText: 'Sunday, 29 November 2026 • 06:00 PM',
      venue: 'Shri Sharadhamba Grand A/C, Tenkasi',
      targetDate: '2026-11-29T18:00:00+05:30'
    }
  ];

  const calculateTime = (targetIso) => {
    const difference = +new Date(targetIso) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  };

  const [countdowns, setCountdowns] = useState(() => ({
    coimbatore: calculateTime(targets[0].targetDate),
    tenkasi: calculateTime(targets[1].targetDate)
  }));

  useEffect(() => {
    const update = () => {
      setCountdowns({
        coimbatore: calculateTime(targets[0].targetDate),
        tenkasi: calculateTime(targets[1].targetDate)
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            SAVE THE DATES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Countdown to the Celebrations
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-[#FBF6EE] mt-3 max-w-xl mx-auto">
            Counting down every blessed moment to our wedding celebrations in Coimbatore and Tenkasi
          </p>
        </motion.div>

        {/* Dual Countdowns Grid: 1 for Coimbatore, 1 for Tenkasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {targets.map((item, idx) => {
            const time = countdowns[item.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            const units = [
              { label: 'Days', value: time.days },
              { label: 'Hours', value: time.hours },
              { label: 'Minutes', value: time.minutes },
              { label: 'Seconds', value: time.seconds }
            ];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="bg-gradient-to-b from-[#2B050C]/75 via-[#200308]/70 to-[#150205]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-gold/45 hover:border-gold transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Inner hairline border */}
                <div className="absolute inset-2.5 border border-gold/20 rounded-2xl pointer-events-none" />

                {/* Card Header */}
                <div className="text-center mb-6 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[#F5DE88] text-[11px] font-body font-semibold tracking-wider uppercase mb-2">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{item.cityBadge}</span>
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium drop-shadow-sm mb-1.5">
                    {item.title}
                  </h3>

                  <div className="flex flex-col items-center gap-1 text-xs font-body text-[#F7E7A9]">
                    <span className="flex items-center gap-1 text-[#F5DE88] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {item.dateText}
                    </span>
                    <span className="flex items-center gap-1 text-[#FBF6EE]/80 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {item.venue}
                    </span>
                  </div>
                </div>

                {/* 4 Countdown Boxes */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 relative z-10 my-2">
                  {units.map((unit) => (
                    <div
                      key={unit.label}
                      className="bg-black/40 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-gold/30 flex flex-col items-center shadow-inner group-hover:border-gold/50 transition-colors"
                    >
                      <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5DE88] font-normal tracking-tight drop-shadow-[0_2px_8px_rgba(245,222,136,0.3)]">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#F3E5AB]/90 font-medium mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Auspicious Blessing Tag */}
                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-center gap-2 text-xs font-serif italic text-gold-light/90 relative z-10">
                  <Heart className="w-3 h-3 fill-gold/40 text-gold" />
                  <span>Bless our beginning with your presence</span>
                  <Heart className="w-3 h-3 fill-gold/40 text-gold" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
