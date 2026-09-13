import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate = "2026-11-22T09:00:00" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="relative py-20 md:py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5]">
      
      {/* Cypress Trees & Side Decor */}
      <img
        src="/assets/cypress-trees.png"
        alt=""
        className="absolute -left-12 bottom-0 w-32 md:w-48 h-auto pointer-events-none select-none opacity-50 z-0 hidden sm:block"
      />
      <img
        src="/assets/cypress-trees.png"
        alt=""
        className="absolute -right-12 bottom-0 w-32 md:w-48 h-auto pointer-events-none select-none opacity-50 z-0 scale-x-[-1] hidden sm:block"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            Save The Date
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2B352E] font-normal">
            Countdown to the Big Day
          </h2>
          <p className="font-serif italic text-base md:text-lg text-sage-dark/80 mt-2">
            Every moment brings us closer to our forever
          </p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-md border border-gold/30 flex flex-col items-center relative group hover:border-gold transition-colors duration-300"
            >
              {/* Corner flourish dots */}
              <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gold/40" />

              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B352E] font-normal tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-body text-[11px] sm:text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mt-2">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
