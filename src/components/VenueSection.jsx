import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Calendar, Clock, ExternalLink } from 'lucide-react';

export default function VenueSection() {
  const [copiedId, setCopiedId] = useState(null);

  const venues = [
    {
      id: 'reception-cbe',
      eventName: 'Wedding Reception (Coimbatore)',
      eventBadge: 'Event 01 • Coimbatore',
      dateText: 'Saturday, 21 November 2026',
      timeText: '06:00 PM – 09:00 PM',
      venueName: 'Lakshmi Kalyana Mandapam',
      completeAddress: 'Lakshmi Kalyana Mandapam, 226/1, Pollachi Main Rd, Eachanari, Coimbatore, Tamil Nadu 641021',
      landmark: 'Pollachi Main Road, near Eachanari Vinayagar Temple',
      mapUrl: 'https://maps.app.goo.gl/42tu9b9yNE1ib6Dz7',
      mapEmbedQuery: 'Lakshmi+Kalyana+Mandapam+Eachanari+Coimbatore'
    },
    {
      id: 'muhurtham-cbe',
      eventName: 'Muhurtham (Wedding Ceremony)',
      eventBadge: 'Event 02 • Coimbatore',
      dateText: 'Sunday, 22 November 2026',
      timeText: 'Morning 07:00 AM – 08:00 AM',
      venueName: 'Sridevi Bhoodevi Sametha Sri Sundararaja Perumal Thirukkoil',
      completeAddress: 'Sridevi Bhoodevi Sametha Sri Sundararaja Perumal Thirukkoil, Seerapalayam, Coimbatore, Tamil Nadu 641021',
      landmark: 'Seerapalayam, near Eachanari, Coimbatore',
      mapUrl: 'https://maps.app.goo.gl/EEM2oKrHQS2zHq3P6?g_st=aw',
      mapEmbedQuery: 'Sri+Sundararaja+Perumal+Thirukkoil+Seerapalayam+Coimbatore'
    },
    {
      id: 'reception-tenkasi',
      eventName: 'Wedding Reception (Tenkasi)',
      eventBadge: 'Event 03 • Tenkasi',
      dateText: 'Sunday, 29 November 2026',
      timeText: '06:00 PM – 09:00 PM',
      venueName: 'Shri Sharadhamba Grand A/C',
      completeAddress: 'Shri Sharadhamba Grand A/C, Courtallam, Madurai - Tenkasi Main Rd, Vallam, Tenkasi, Tamil Nadu 627805',
      landmark: 'Courtallam, Madurai - Tenkasi Main Road, Vallam',
      mapUrl: 'https://maps.app.goo.gl/JEiig7g9bjBpABW96?g_st=iw',
      mapEmbedQuery: 'Shri+Sharadhamba+Grand+Vallam+Tenkasi'
    }
  ];

  const [activeVenueId, setActiveVenueId] = useState(venues[0].id);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const activeVenue = venues.find(v => v.id === activeVenueId) || venues[0];

  return (
    <section id="venue" className="relative py-20 md:py-28 px-4 overflow-hidden bg-transparent">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-[#F7E7A9] font-semibold block mb-2">
            LOCATION &amp; DIRECTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-md">
            Wedding Venues &amp; Addresses
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-[#FBF6EE] mt-3 max-w-2xl mx-auto">
            Complete venue addresses and interactive navigation for all 3 wedding celebration locations
          </p>
        </motion.div>

        {/* Venue Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {venues.map((v) => {
            const isSelected = v.id === activeVenueId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVenueId(v.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold transition-all duration-300 active:scale-95 border ${
                  isSelected
                    ? 'bg-gold text-[#1A0307] border-gold shadow-[0_0_15px_rgba(197,160,89,0.5)] scale-105'
                    : 'bg-[#2B050C]/80 text-[#F7E7A9] border-gold/40 hover:bg-[#3D0A13] hover:text-white'
                }`}
              >
                {v.eventName}
              </button>
            );
          })}
        </div>

        {/* Active Venue Highlight Feature Card */}
        <motion.div
          key={activeVenue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-[#2B050C]/75 via-[#200308]/70 to-[#150205]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-gold/50 mb-4 relative overflow-hidden text-white"
        >
          {/* Inner hairline frame */}
          <div className="absolute inset-3 border border-gold/20 rounded-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
            
            {/* Left Info Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/50 text-[#F5DE88] text-xs font-body font-semibold tracking-wider mb-3">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{activeVenue.eventBadge}</span>
                </div>

                <div className="mb-2">
                  <span className="text-xs uppercase tracking-widest font-body text-[#F7E7A9] font-semibold block">
                    Event Name:
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium drop-shadow-sm">
                    {activeVenue.eventName}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 my-3 text-xs sm:text-sm font-body">
                  <span className="flex items-center gap-1 text-[#F5DE88] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {activeVenue.dateText}
                  </span>
                  <span className="flex items-center gap-1 text-[#F3E5AB]">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {activeVenue.timeText}
                  </span>
                </div>

                {/* Complete Venue Address Text */}
                <div className="bg-black/45 rounded-2xl p-4 sm:p-5 border border-gold/30 my-4">
                  <span className="text-[11px] font-body tracking-wider uppercase text-gold font-semibold block mb-1">
                    Complete Venue Address:
                  </span>
                  <p className="font-body text-sm sm:text-base text-white leading-relaxed font-normal">
                    {activeVenue.completeAddress}
                  </p>
                  <p className="font-body text-xs text-[#F7E7A9] mt-2 italic">
                    <strong>Landmark:</strong> {activeVenue.landmark}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gold/30">
                <a
                  href={activeVenue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-[#1A0307] text-xs sm:text-sm font-body tracking-wider uppercase font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-4 h-4 text-[#1A0307]" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  onClick={() => handleCopy(activeVenue.id, activeVenue.completeAddress)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/70 text-[#F7E7A9] hover:text-white text-xs sm:text-sm font-body tracking-wider font-medium border border-gold/40 shadow-sm transition-all duration-300"
                >
                  {copiedId === activeVenue.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold" />
                      <span>Copy Complete Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Map Embed Column */}
            <div className="w-full lg:w-[48%] min-h-[280px] sm:min-h-[320px] rounded-2xl overflow-hidden shadow-inner border border-gold/40 relative bg-black/60">
              <iframe
                title={`${activeVenue.venueName} Map`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeVenue.completeAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>

          </div>
        </motion.div>

        {/* 3 All-Venues Summary Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gradient-to-b from-[#2B050C]/90 to-[#1A0307]/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-gold/30 hover:border-gold transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-[#F5DE88] text-[10px] font-body font-semibold tracking-wider uppercase inline-block mb-2">
                  {item.eventBadge}
                </span>

                <h4 className="font-serif text-xl sm:text-2xl text-white font-medium mb-1">
                  {item.eventName}
                </h4>

                <div className="text-xs font-body text-[#F7E7A9] space-y-0.5 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold" />
                    <span>{item.dateText}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#F3E5AB]">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{item.timeText}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gold/20">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gold block mb-1">
                    Complete Address:
                  </span>
                  <p className="font-body text-xs text-[#FBF6EE]/90 leading-relaxed">
                    {item.completeAddress}
                  </p>
                </div>
              </div>

          
              <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between gap-2">
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-gold hover:text-gold-light transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps &rarr;</span>
                </a>

                <button
                  onClick={() => handleCopy(item.id, item.completeAddress)}
                  className="text-xs font-body text-[#F7E7A9] hover:text-white flex items-center gap-1 transition-colors"
                  title="Copy address"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gold" />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div> */}

      </div>
    </section>
  );
}
