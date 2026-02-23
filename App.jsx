import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mail, Instagram, ArrowDown, Linkedin, X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- MOCK DATA (Replaces base44) ---
const MOCK_PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800', category: 'sports', title: 'Action Shot' },
  { id: 2, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800', category: 'ceremonial', title: 'Grand Hall' },
  { id: 3, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800', category: 'social', title: 'Evening Event' },
  { id: 4, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800', category: 'landscapes', title: 'Mountain Vista' },
  { id: 5, url: 'https://images.unsplash.com/photo-1461891213886-4b0af0a68cbb?auto=format&fit=crop&w=800', category: 'sports', title: 'The Sprint' },
  { id: 6, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800', category: 'social', title: 'Celebration' },
];

export default function PortfolioApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = activeCategory === 'all' 
    ? MOCK_PHOTOS 
    : MOCK_PHOTOS.filter(p => p.category === activeCategory);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C5A572] selection:text-white">
      {/* Dynamic Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 bg-[#FAFAFA]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#C5A572]" />
            <Camera className="w-5 h-5 text-[#2F4538]" />
            <div className="w-12 h-px bg-[#C5A572]" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-light mb-4 tracking-tight">De Almeida Visuals</h1>
          <p className="text-[#2F4538] text-lg md:text-xl font-light tracking-[0.2em] uppercase">Professional Photography</p>
        </motion.div>
        
        <motion.button 
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToGallery} className="absolute bottom-10"
        >
          <ArrowDown className="w-6 h-6 text-[#C5A572]" />
        </motion.button>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-8">Portfolio</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['all', 'sports', 'ceremonial', 'social', 'landscapes'].map(cat => (
              <button 
                key={cat} onClick={() => setActiveCategory(cat)}
                className={`uppercase tracking-widest text-xs pb-2 border-b-2 transition-all ${activeCategory === cat ? 'border-[#C5A572] text-black' : 'border-transparent text-gray-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mb-6 relative group cursor-pointer overflow-hidden"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={photo.url} alt={photo.title} className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs tracking-[0.3em] uppercase border border-white/50 px-4 py-2">View</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="bg-[#2F4538] py-24 px-6 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-8 text-[#C5A572]">The Vision</h2>
          <p className="font-light leading-relaxed text-lg opacity-90">
            Specializing in the raw energy of sports and the quiet dignity of ceremonial events. 
            We capture moments that don't just look good—they feel real.
          </p>
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <footer className="py-20 px-6 text-center bg-white border-t border-gray-100">
        <div className="flex justify-center gap-8 mb-8 text-[#2F4538]">
          <Instagram className="hover:text-[#C5A572] cursor-pointer" />
          <Linkedin className="hover:text-[#C5A572] cursor-pointer" />
          <Mail className="hover:text-[#C5A572] cursor-pointer" />
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
          © {new Date().getFullYear()} De Almeida Visuals
        </p>
      </footer>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setSelectedPhoto(null)} className="absolute top-10 right-10 text-white"><X /></button>
          <img src={selectedPhoto.url} className="max-w-full max-h-[80vh] object-contain" />
        </div>
      )}
    </div>
  );
}