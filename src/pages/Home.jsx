import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowDown, Loader2 } from 'lucide-react';
import { getEventPreviews } from '../utils/photoData';

export default function Home({ isDarkMode }) {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEventPreviews();
        // Extract all images from categories into one flat array for the rotator
        if (data && data.length > 0) {
          setFeaturedImages(data);
        }
      } catch (error) {
        console.error("Failed to load featured photos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Automatic Rotation Logic (every 5 seconds)
  useEffect(() => {
    if (featuredImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredImages]);

  const themes = {
    globalBg: isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]',
    heroText: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    heroSub: isDarkMode ? 'text-gray-400' : 'text-[#2F4538]/70',
    sectionText: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    border: isDarkMode ? 'border-white/5' : 'border-black/5'
  };

  const scrollToGallery = () => {
    document.getElementById('featured-section')?.scrollIntoView({ 
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

        <motion.button 
          animate={{ y: [0, 12, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} 
          onClick={scrollToGallery} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#C5A572] hover:scale-110 transition-transform p-4 z-20 cursor-pointer"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </section>

      {/* Rotating Featured Photos Section */}
      <section id="featured-section" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="h-[60vh] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#C5A572]" />
            </div>
          ) : featuredImages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Side: Info */}
              <div className="lg:col-span-5">
                <span className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-3 font-medium">
                  Showcase
                </span>
                <h3 className={`text-5xl md:text-7xl font-serif italic mb-8 transition-colors duration-1000 ${themes.sectionText}`}>
                  Featured Photos
                </h3>
                <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-12 uppercase tracking-widest font-light">
                  A curated rotation of visuals capturing the raw energy of sports and JROTC discipline.
                </p>
                
                <Link 
                  to={`/gallery/${featuredImages[currentIndex].categoryName.toLowerCase()}`} 
                  className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[#C5A572] font-semibold"
                >
                  View Collection: {featuredImages[currentIndex].categoryName}
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Right Side: Rotating Image Display */}
              <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-[16/10] overflow-hidden shadow-2xl bg-black border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={featuredImages[currentIndex].image} 
                      alt="Featured visual"
                      className={`w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 right-8 flex gap-3 z-20">
                  {featuredImages.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1 transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#C5A572]' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}