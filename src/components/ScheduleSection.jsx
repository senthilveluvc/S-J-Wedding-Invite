import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flower2, Utensils, Music2, Sparkles } from 'lucide-react';

export default function ScheduleSection() {
  const events = [
    {
      icon: Music2,
      time: "Evening 06:30 PM Onwards",
      title: "Wedding Reception",
      subtext: "An evening of music, greetings & celebration",
      description: "Join us for an elegant evening welcoming the newlyweds with live classical melodies, photography, and an exquisite dinner banquet."
    },
    {
      icon: Flower2,
      time: "Auspicious Morning 09:00 AM – 10:30 AM",
      title: "Muhurtham (Wedding Ceremony)",
      subtext: "The sacred union & Mangalyadharanam",
      description: "Witness the sacred rituals, tying of the sacred Thali, Vedic chants, and seven sacred steps (Saptapadi) accompanied by traditional Nadaswaram and Thavil."
    },
    {
      icon: Utensils,
      time: "11:30 AM – 02:30 PM",
      title: "Kalyana Virundhu (Wedding Feast)",
      subtext: "Grand Traditional South Indian Elai Sappadu",
      description: "Savor an authentic, traditional wedding feast served on fresh banana leaves, prepared with love and culinary heritage."
    }
  ];

  return (
    <section id="schedule" className="relative py-20 md:py-28 px-4 overflow-hidden bg-[#FAF8F5]">
      
      {/* Decorative floral vases */}
      <img
        src="/assets/flower-stand.png"
        alt=""
        className="absolute -top-12 left-4 w-28 md:w-40 h-auto pointer-events-none select-none opacity-50 z-0"
      />
      <img
        src="/assets/bouquet.png"
        alt=""
        className="absolute -bottom-10 right-4 w-32 md:w-48 h-auto pointer-events-none select-none opacity-50 z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            Order of Celebrations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B352E] font-normal">
            Wedding Itinerary
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-sage-dark/80 mt-3 max-w-lg mx-auto">
            We look forward to celebrating every cherished ritual and auspicious moment together with you
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="space-y-6 sm:space-y-8 relative">
          {/* Vertical line through timeline */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gold/30 -translate-x-1/2 pointer-events-none" />

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
                <div className="w-full md:w-[46%] bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-md border border-gold/25 relative group hover:shadow-xl hover:border-gold transition-all duration-300">
                  
                  {/* Subtle corner flourish */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-cream text-sage-dark text-xs font-body font-semibold tracking-wide border border-gold/30 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B352E] font-medium mb-1">
                    {event.title}
                  </h3>
                  
                  <p className="font-serif italic text-sm sm:text-base text-gold font-medium mb-3">
                    {event.subtext}
                  </p>

                  <p className="font-body text-xs sm:text-sm text-sage-dark/80 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>

                {/* Center Badge (Desktop) */}
                <div className="hidden md:flex w-[8%] justify-center relative z-20">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border-2 border-gold shadow-md flex items-center justify-center text-gold">
                    <IconComponent className="w-5 h-5" />
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
