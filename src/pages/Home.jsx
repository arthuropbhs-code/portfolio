import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowDown, Loader2, Target, Zap, Map } from 'lucide-react';
import { getEventPreviews } from '../utils/photoData';

export default function Home({ isDarkMode }) {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- Scroll Tracking for Dynamic Background Colors ---
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // This morphs the background color as you scroll through the specific components
  // 0 (Hero) -> 0.3 (Philosophy) -> 0.6 (Featured) -> 1 (Categories)
  const dynamicBg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0A0E0C", "#1A251F", "#141414", "#0A0E0C"]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEventPreviews();
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
    heroText: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    heroSub: isDarkMode ? 'text-gray-400' : 'text-[#2F4538]/70',
    sectionText: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    border: isDarkMode ? 'border-white/5' : 'border-black/5'
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ 
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

  const categories = [
    { title: 'JROTC', path: '/gallery/jrotc', icon: <Target className="w-5 h-5" />, desc: 'Discipline and Ceremony' },
    { title: 'Sports', path: '/gallery/sports', icon: <Zap className="w-5 h-5" />, desc: 'High-speed Motion' },
    { title: 'Landscape', path: '/gallery/landscape', icon: <Map className="w-5 h-5" />, desc: 'Natural Perspectives' }
  ];

  return (
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor: dynamicBg }}
      className="transition-colors duration-1000 min-h-screen overflow-x-hidden"
    >
      {/* --- HERO SECTION --- */}
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
          onClick={() => scrollToSection('philosophy')} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#C5A572] hover:scale-110 transition-transform p-4 z-20 cursor-pointer"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section id="philosophy" className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-8 font-medium">
            The Philosophy
          </span>
          <h2 className={`text-3xl md:text-5xl font-serif italic leading-relaxed transition-colors duration-1000 ${themes.sectionText}`}>
            "Capturing the <span className="text-[#C5A572]">discipline</span> of the uniform and the <span className="text-[#C5A572]">chaos</span> of the game."
          </h2>
          <div className="w-20 h-px bg-[#C5A572]/30 mx-auto mt-12" />
        </div>
        {/* Adds visual depth as background color shifts */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A572]/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* --- ROTATING FEATURED SECTION --- */}
      <section id="featured-section" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="h-[60vh] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#C5A572]" />
            </div>
          ) : featuredImages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
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
                  to={`/gallery/${featuredImages[currentIndex].categoryName.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[#C5A572] font-semibold"
                >
                  View Collection: {featuredImages[currentIndex].categoryName}
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>

              <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-[16/10] overflow-hidden shadow-2xl bg-black border border-white/10 group">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

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

      {/* --- CATEGORY GRID SECTION --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={cat.path} 
                className="relative group aspect-[4/5] overflow-hidden bg-[#111]/50 border border-white/5 backdrop-blur-sm"
              >
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 transition-transform duration-700 group-hover:scale-110">
                  <div className="text-[#C5A572] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {cat.icon}
                  </div>
                  <h4 className="text-white text-2xl font-serif tracking-widest mb-2">
                    {cat.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.desc}
                  </p>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-[#C5A572]/5 transition-colors duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}