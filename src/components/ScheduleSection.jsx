import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flower2, Utensils, Music2, Sparkles } from 'lucide-react';

export default function ScheduleSection() {
  const events = [
    {
      icon: Music2,
      time: "Saturday, 21 Nov 2026 • 06:00 PM Onwards",
      title: "Wedding Reception",
      subtext: "Evening Reception & Musical Dinner Banquet",
      description: "Join us for an elegant evening welcoming the newlyweds with live classical melodies, photography, and an exquisite dinner banquet."
    },
    {
      icon: Flower2,
      time: "Sunday, 22 Nov 2026 • Morning 07:00 AM – 08:00 AM",
      title: "Muhurtham (Wedding Ceremony)",
      subtext: "Sacred Auspicious Vows & Mangalyadharanam",
      description: "Witness the sacred rituals, tying of the sacred Thali, Vedic chants, and seven sacred steps (Saptapadi) accompanied by traditional Nadaswaram and Thavil."
    }
  ];

  return (
    <section id="schedule" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            ORDER OF CELEBRATIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Wedding Itinerary
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-[#FBF6EE] mt-3 max-w-lg mx-auto">
            We look forward to celebrating every cherished ritual and auspicious moment together with you
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="space-y-6 sm:space-y-8 relative">
          {/* Vertical line through timeline */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gold/40 -translate-x-1/2 pointer-events-none" />

          {events.map((event, index) => {
            const IconComponent = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[46%] bg-gradient-to-b from-[#2B050C]/90 to-[#1A0307]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gold/40 relative group hover:shadow-2xl hover:border-gold transition-all duration-300">
                  
                  {/* Subtle corner flourish */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-black/40 text-[#F7E7A9] text-xs font-body font-semibold tracking-wide border border-gold/40 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-1 drop-shadow-sm">
                    {event.title}
                  </h3>
                  
                  <p className="font-serif italic text-sm sm:text-base text-[#F5DE88] font-medium mb-3">
                    {event.subtext}
                  </p>

                  <p className="font-body text-xs sm:text-sm text-[#FBF6EE]/90 leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>

                {/* Center Badge (Desktop) */}
                <div className="hidden md:flex w-[8%] justify-center relative z-20">
                  <div className="w-12 h-12 rounded-full bg-[#2B050C] border-2 border-gold shadow-lg flex items-center justify-center text-gold">
                    <IconComponent className="w-5 h-5 text-gold" />
                  </div>
                </div>

                {/* Empty side for layout balance */}
                <div className="hidden md:block w-[46%]" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
