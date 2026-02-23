import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowDown } from 'lucide-react';
import { getEventPreviews } from '../utils/photoData';

export default function Home({ isDarkMode }) {
  const eventPreviews = getEventPreviews();

  // Theme logic driven by the prop from App.jsx
  const themes = {
    globalBg: isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]',
    heroText: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    heroSub: isDarkMode ? 'text-gray-400' : 'text-[#2F4538]/70',
    
    // Alternating section colors for visual diversification
    sections: isDarkMode 
      ? [
          { bg: 'bg-[#0A0E0C]', text: 'text-white', border: 'border-white/5' },
          { bg: 'bg-[#161D1A]', text: 'text-white', border: 'border-white/5' },
          { bg: 'bg-[#2F4538]', text: 'text-white', border: 'border-white/10' },
        ]
      : [
          { bg: 'bg-[#FCFAF8]', text: 'text-[#2F4538]', border: 'border-gray-100' },
          { bg: 'bg-[#F9F6F2]', text: 'text-[#2F4538]', border: 'border-gray-200' },
          { bg: 'bg-[#F0F2F0]', text: 'text-[#2F4538]', border: 'border-gray-100' },
        ]
  };

  const scrollToGallery = () => {
    document.getElementById('event-previews')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const itemVars = {
    initial: { opacity: 0, y: 25 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={`${themes.globalBg} transition-colors duration-1000 min-h-screen`}
    >
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <motion.div 
          initial="initial" 
          animate="animate" 
          transition={{ staggerChildren: 0.4 }}
          className="text-center z-10"
        >
          <motion.div variants={itemVars} className="flex items-center justify-center gap-6 mb-10">
            <div className="w-16 h-px bg-[#C5A572]/40" />
            <Camera className="w-5 h-5 text-[#C5A572]" strokeWidth={1.5} />
            <div className="w-16 h-px bg-[#C5A572]/40" />
          </motion.div>
          
          <motion.h1 variants={itemVars} className={`text-7xl md:text-9xl font-serif font-light mb-6 tracking-tighter transition-colors duration-1000 ${themes.heroText}`}>
            Arthuro Visuals
          </motion.h1>
          
          <motion.p variants={itemVars} className={`${themes.heroSub} text-xs md:text-sm font-light tracking-[0.5em] uppercase transition-colors duration-1000`}>
            By Arthuro De Almeida
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button 
          animate={{ y: [0, 12, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} 
          onClick={scrollToGallery} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#C5A572] hover:scale-110 transition-transform p-4 z-20 cursor-pointer"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
        
        {/* Subtle Ambient Glow */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-40'} pointer-events-none`}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(197,165,114,0.05)_0%,_transparent_70%)]" />
        </div>
      </section>

      {/* Diversified Collection Sections */}
      <div id="event-previews">
        {eventPreviews.map((event, index) => {
          const sectionTheme = themes.sections[index % themes.sections.length];
          
          return (
            <section 
              key={event.categoryName} 
              className={`${sectionTheme.bg} py-32 px-6 transition-colors duration-1000 scroll-mt-20 border-t ${sectionTheme.border}`}
            >
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex justify-between items-end mb-12 border-b ${sectionTheme.border} pb-8`}
                >
                  <div>
                    <span className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-3 font-medium">
                      Collection
                    </span>
                    <h3 className={`text-4xl md:text-5xl font-serif capitalize italic transition-colors duration-1000 ${sectionTheme.text}`}>
                      {event.categoryName}
                    </h3>
                  </div>
                  <Link 
                    to={`/${event.categoryName.replace(/\s+/g, '-')}`} 
                    className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-1000 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#C5A572]'}`}
                  >
                    Explore Gallery 
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  {event.photos.map((photo) => (
                    <div key={photo.id} className={`relative group overflow-hidden shadow-2xl transition-colors duration-1000 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                      <div className="overflow-hidden">
                        <img 
                          src={photo.url} 
                          alt={photo.title}
                          loading="lazy"
                          className={`w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-[1500ms] ease-out scale-[1.02] group-hover:scale-100 ${isDarkMode ? 'opacity-70 group-hover:opacity-100' : 'opacity-100'}`}
                        />
                      </div>
                      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-white/5' : 'bg-[#2F4538]/5'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </motion.div>
  );
}