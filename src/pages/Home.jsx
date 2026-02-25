import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowDown, Loader2, Target, Zap, Map, Quote, CheckCircle2 } from 'lucide-react';
import { getEventPreviews } from '../utils/photoData';

export default function Home({ isDarkMode }) {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Form Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for Testimonial Rotation
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      quote: "All your pictures are so tuff.",
      author: "Battalion Commander",
      org: "Pompano Beach High JROTC Program"
    },
    {
      quote: "The best sports photography we've had all season. He has an eye for the action.",
      author: "Head Coach",
      org: "South Broward Athletics"
    }
  ];

  // --- Scroll Tracking for Dynamic Background Colors ---
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const darkColors = ["#0A0E0C", "#1A251F", "#141414", "#1A251F", "#141414", "#0A0E0C"];
  const lightColors = ["#F9F9F7", "#FFFFFF", "#F2F4F2", "#FFFFFF", "#F2F4F2", "#F9F9F7"];

  const dynamicBg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isDarkMode ? darkColors : lightColors
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

  // Automatic Rotation Logic (Featured Images)
  useEffect(() => {
    if (featuredImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredImages]);

  // Automatic Rotation Logic (Testimonials)
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Booking Form Submission Handler
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/mreardwa", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const themes = {
    heroText: isDarkMode ? 'text-white' : 'text-[#1A251F]',
    heroSub: isDarkMode ? 'text-gray-400' : 'text-[#1A251F]/60',
    sectionText: isDarkMode ? 'text-white' : 'text-[#1A251F]',
    bodyText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    border: isDarkMode ? 'border-white/10' : 'border-black/10',
    accent: '#C5A572',
    input: isDarkMode ? 'text-white border-white/20' : 'text-[#1A251F] border-black/20',
    cardBg: isDarkMode ? 'bg-[#111]/50' : 'bg-white/50'
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
      className="relative transition-colors duration-1000 min-h-screen overflow-x-hidden"
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
            Digital Portfolio 2026
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A572]/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* --- ROTATING FEATURED SECTION --- */}
      <section id="featured-section" className={`py-32 px-6 border-t ${themes.border}`}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="h-[60vh] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#C5A572]" />
            </div>
          ) : featuredImages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <span className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-3 font-medium">Showcase</span>
                <h3 className={`text-5xl md:text-7xl font-serif italic mb-8 transition-colors duration-1000 ${themes.sectionText}`}>Featured Photos</h3>
                <p className={`${themes.bodyText} text-sm max-w-md leading-relaxed mb-12 uppercase tracking-widest font-light`}>
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
                    <div key={idx} className={`h-1 transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#C5A572]' : 'w-2 bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className={`py-24 border-t ${themes.border} overflow-hidden`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="text-[#C5A572] mx-auto mb-8 opacity-40" size={32} />
          <div className="relative h-40 md:h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0"
              >
                <p className={`text-xl md:text-2xl font-serif italic mb-6 leading-relaxed transition-colors duration-1000 ${themes.sectionText}`}>
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#C5A572] font-medium">
                  {testimonials[testimonialIndex].author} • {testimonials[testimonialIndex].org}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- CATEGORY GRID SECTION --- */}
      <section className={`py-32 px-6 border-t ${themes.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={cat.path} 
                className={`relative group aspect-[4/5] overflow-hidden ${themes.cardBg} border ${themes.border} backdrop-blur-sm`}
              >
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 transition-transform duration-700 group-hover:scale-110">
                  <div className="text-[#C5A572] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {cat.icon}
                  </div>
                  <h4 className={`${isDarkMode ? 'text-white' : 'text-[#1A251F]'} text-2xl font-serif tracking-widest mb-2`}>
                    {cat.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.desc}
                  </p>
                </div>
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-white/40'} group-hover:bg-[#C5A572]/5 transition-colors duration-700`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOOKING FORM SECTION --- */}
      <section id="book" className={`py-32 px-6 border-t ${themes.border}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A572] block mb-4 font-medium">Availability</span>
            <h2 className={`text-4xl md:text-5xl font-serif italic transition-colors duration-1000 ${themes.sectionText}`}>Book a Session</h2>
          </div>
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleBookingSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 font-sans"
              >
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Full Name</label>
                  <input name="name" required type="text" className={`bg-transparent border-b ${themes.input} py-2 focus:border-[#C5A572] outline-none transition-colors text-sm`} placeholder="Your Name" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Event Type</label>
                  <select name="event_type" className={`bg-transparent border-b ${themes.input} py-2 focus:border-[#C5A572] outline-none transition-colors text-sm appearance-none cursor-pointer`}>
                    <option className="bg-[#0A0E0C] text-white">JROTC Event</option>
                    <option className="bg-[#0A0E0C] text-white">Sports</option>
                    <option className="bg-[#0A0E0C] text-white">Landscape</option>
                    <option className="bg-[#0A0E0C] text-white">Social Event</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Event Date</label>
                  <input 
                    name="date" 
                    required 
                    type="date" 
                    className={`bg-transparent border-b ${themes.input} py-2 focus:border-[#C5A572] outline-none transition-colors text-sm w-full`} 
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Location</label>
                  <input name="location" required type="text" className={`bg-transparent border-b ${themes.input} py-2 focus:border-[#C5A572] outline-none transition-colors text-sm`} placeholder="Address" />
                </div>
                <div className="md:col-span-2 mt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#C5A572] text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 shadow-2xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Request Booking'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white/5 border border-[#C5A572]/20 rounded-sm"
              >
                <CheckCircle2 className="w-12 h-12 text-[#C5A572] mx-auto mb-6" />
                <h3 className={`text-2xl font-serif mb-4 ${themes.sectionText}`}>Request Sent Successfully</h3>
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">I will reach out to you shortly via email.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] text-[#C5A572] uppercase tracking-[0.3em] font-semibold border-b border-[#C5A572]/40 pb-1"
                >
                  Send another request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}