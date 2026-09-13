import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Car, Train, Plane } from 'lucide-react';

export default function VenueSection() {
  const [copied, setCopied] = useState(false);
  const mapsUrl = "https://maps.app.goo.gl/sGwCCBQKmwRF8YsQ9";
  const address = "Lakshmi Kalyana Mandapam, 226/1, Pollachi Main Rd, Eachanari, Coimbatore, Tamil Nadu 641021";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="relative py-20 md:py-28 px-4 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5]">
      
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            Location &amp; Directions
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2B352E] font-normal">
            The Wedding Venue
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
          <p className="font-serif italic text-base md:text-lg text-sage-dark/80 mt-3">
            Lakshmi Kalyana Mandapam, Eachanari, Coimbatore
          </p>
        </motion.div>

        {/* Venue Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-gold/30 mb-10 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Left Info Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border border-gold/30 text-sage-dark text-xs font-body font-semibold tracking-wider mb-4">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Mandapam &amp; Banquet Hall</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#2B352E] font-medium mb-3">
                  Lakshmi Kalyana Mandapam
                </h3>

                <p className="font-body text-sm sm:text-base text-sage-dark leading-relaxed mb-6 font-normal">
                  {address}
                </p>

                {/* Landmarks */}
                <div className="space-y-3 mb-6 font-body text-xs sm:text-sm text-sage-dark/85">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    <span><strong>Landmark:</strong> Pollachi Main Road, near Eachanari Vinayagar Temple</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    <span><strong>Parking:</strong> Dedicated spacious parking for four-wheelers &amp; two-wheelers</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gold/20">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-dark hover:bg-sage-deep text-white text-xs sm:text-sm font-body tracking-wider uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-4 h-4 text-gold-light" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream hover:bg-white text-sage-dark text-xs sm:text-sm font-body tracking-wider font-medium border border-gold/30 shadow-sm transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Map Embed Column */}
            <div className="w-full lg:w-[48%] min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden shadow-inner border border-gold/25 relative bg-cream">
              <iframe
                title="Lakshmi Kalyana Mandapam Map"
                src="https://maps.google.com/maps?q=Lakshmi+Kalyana+Mandapam+Eachanari+Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              />
            </div>

          </div>
        </motion.div>

        {/* Travel & Transit Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cream border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#2B352E] font-medium">By Road</h4>
              <p className="font-body text-xs text-sage-dark/80 mt-1 leading-relaxed">
                Well connected via NH 83 (Pollachi Road) with direct city bus access from Gandhipuram &amp; Ukkadam.
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cream border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#2B352E] font-medium">Railway Station</h4>
              <p className="font-body text-xs text-sage-dark/80 mt-1 leading-relaxed">
                Coimbatore Junction (CBE) is approx. 9 km away (~20 mins by auto/cab).
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cream border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#2B352E] font-medium">Airport</h4>
              <p className="font-body text-xs text-sage-dark/80 mt-1 leading-relaxed">
                Coimbatore International Airport (CJB) is approx. 17 km away (~35 mins drive).
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
