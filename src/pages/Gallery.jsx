import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Check } from 'lucide-react';
import { PHOTO_DATA } from '../utils/photoData';

// Dynamic Light Mode themes based on category
const categoryThemes = {
  'jrotc': 'bg-[#F4F4F2]',      
  'sports': 'bg-[#F0F2F0]',     
  'landscape': 'bg-[#F9F6F2]',  
  'social-events': 'bg-[#F7F7F7]' 
};

export default function Gallery() {
  const { categoryId, subCategoryId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Detect system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);
    const handler = (e) => setIsSystemDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const categorySearch = categoryId?.toLowerCase() || "";
  const subCategorySearch = subCategoryId?.toLowerCase() || "";

  // Dynamic Theme Selection
  const themeClass = isSystemDark 
    ? 'bg-[#0A0E0C]' 
    : (categoryThemes[categorySearch] || 'bg-white');
  
  const textClass = isSystemDark ? 'text-white' : 'text-[#2F4538]';
  const borderClass = isSystemDark ? 'border-white/10' : 'border-black/5';

  const filteredPhotos = PHOTO_DATA.filter(photo => {
    const photoPath = photo.url.toLowerCase();
    if (subCategorySearch) return photoPath.includes(subCategorySearch);
    return photo.category.toLowerCase() === categorySearch.replace(/-/g, ' ');
  });

  const displayTitle = subCategorySearch 
    ? subCategorySearch.replace(/-/g, ' ') 
    : categorySearch.replace(/-/g, ' ');

  const handleCopyLink = (e, url) => {
    e.stopPropagation();
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`transition-colors duration-1000 ${themeClass} pt-32 pb-24 px-6 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-3 font-sans font-medium"
          >
            {subCategorySearch ? categorySearch.replace(/-/g, ' ') : 'Collection'}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-6xl font-serif capitalize mb-8 italic transition-colors duration-1000 ${textClass}`}
          >
            {displayTitle}
          </motion.h2>

          <Link to="/" className="text-[9px] tracking-[0.3em] text-gray-400 hover:text-[#C5A572] transition-colors font-sans group">
            <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span> 
            BACK TO COLLECTIONS
          </Link>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {filteredPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id} 
                layout 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`mb-8 cursor-pointer group shadow-sm overflow-hidden border transition-colors duration-1000 ${borderClass} ${isSystemDark ? 'bg-black' : 'bg-white/50'}`} 
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className={`w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105 ${isSystemDark ? 'opacity-80 group-hover:opacity-100' : ''}`} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 text-gray-400 font-serif italic text-xl">
            No photos found in this specific collection yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[150] bg-[#0A0E0C]/95 flex flex-col items-center justify-center p-4 backdrop-blur-md" 
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Action Bar */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center text-white">
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] text-[#C5A572] uppercase font-bold">Personal Use Only</span>
                <span className="text-xs font-serif italic uppercase tracking-widest mt-1 opacity-80">Tag @arthur0_2025</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleCopyLink(e, selectedPhoto.url)}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2.5 rounded-sm hover:bg-[#C5A572] hover:border-[#C5A572] transition-all text-[10px] uppercase tracking-widest group"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                  {copied ? 'Link Copied' : 'Share to Instagram'}
                </button>

                <a 
                  href={selectedPhoto.url} 
                  download={`ArthuroVisuals-${displayTitle.replace(/\s+/g, '-')}-${selectedPhoto.id}.jpg`}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2.5 rounded-sm hover:bg-[#C5A572] hover:border-[#C5A572] transition-all text-[10px] uppercase tracking-widest"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <Download size={14} />
                  Download
                </a>
                
                <button className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ type: "spring", damping: 25 }}
              src={selectedPhoto.url} 
              className="max-w-full max-h-[75vh] object-contain shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] px-4" 
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="mt-10 text-center text-white/40 text-[9px] tracking-[0.4em] uppercase max-w-lg px-4 leading-loose font-sans">
              Photos are free for personal use. If you post, please tag <span className="text-white opacity-100">@arthur0_2025</span>. <br />
              Please do not apply filters. See <span className="text-[#C5A572] opacity-100">Privacy & Terms</span> in footer.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}