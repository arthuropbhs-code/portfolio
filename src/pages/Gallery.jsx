import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Check, Loader2, AlertCircle } from 'lucide-react';
import { fetchCloudinaryGallery } from '../utils/photoData';
import SmartImage from '../components/SmartImage';

export default function Gallery({ isDarkMode }) {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const [eventGroups, setEventGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [copied, setCopied] = useState(false);

  // Helper to format names (e.g., "south-broward" -> "South Broward")
// Helper to format names (e.g., "south-broward" -> "South Broward" or "flag_football" -> "Flag Football")
const formatName = (str) => {
  if (!str) return "";
  return str
    .replace(/[_-]/g, ' ') // Match both underscores and dashes
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      setError(null);
      
      const folderName = categoryId || "jrotc"; 
      const data = await fetchCloudinaryGallery(folderName);

      if (subCategoryId) {
        // Find specific event. We normalize both for a bulletproof match.
        const filtered = data.filter(group => 
          group.name.toLowerCase().replace(/[\s_]/g, '-') === subCategoryId.toLowerCase()
        );

        if (filtered.length === 0 && data.length > 0) {
          setError(`"${formatName(subCategoryId)}" not found.`);
          setTimeout(() => navigate(`/gallery/${categoryId}`), 3000);
        } else {
          setEventGroups(filtered);
        }
      } else {
        setEventGroups(data);
      }
      setLoading(false);
    };
    loadGallery();
  }, [categoryId, subCategoryId, navigate]);

  // Theme Constants
  const themeClass = isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]';
  const textClass = isDarkMode ? 'text-white' : 'text-[#2F4538]';
  const borderClass = isDarkMode ? 'border-white/5' : 'border-black/5';

  // --- TITLE LOGIC ---
  // If subCategoryId exists, it takes priority over categoryId.
  const mainTitle = subCategoryId ? formatName(subCategoryId) : formatName(categoryId);
  const topLabel = subCategoryId ? formatName(categoryId) : "Collection";

  const handleCopyLink = (e, url) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
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
        <div className="text-center mb-12">
          <motion.span 
            key={`label-${topLabel}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-[#C5A572] tracking-[0.4em] uppercase block mb-3 font-sans font-medium"
          >
            {topLabel}
          </motion.span>
          
          <motion.h2 
            key={`title-${mainTitle}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-serif capitalize mb-8 italic transition-colors duration-1000 ${textClass}`}
          >
            {mainTitle}
          </motion.h2>

          <Link 
            to={subCategoryId ? `/gallery/${categoryId}` : "/"} 
            className="text-[9px] tracking-[0.3em] text-gray-400 hover:text-[#C5A572] transition-colors font-sans group uppercase"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span> 
            {subCategoryId ? `Back to ${formatName(categoryId)}` : "Back to Collections"}
          </Link>
        </div>

        {/* Error Redirect UI */}
        {error && (
          <motion.div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="text-[#C5A572] mb-4" size={48} />
            <p className="font-serif italic text-2xl text-gray-400 mb-2">{error}</p>
          </motion.div>
        )}

        {/* Photo Rendering */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 text-gray-500">
            <Loader2 className="animate-spin text-[#C5A572]" size={32} />
            <p className="text-[10px] tracking-widest uppercase">Fetching Visuals...</p>
          </div>
        ) : (
          eventGroups.map((event, gIndex) => (
            <section 
              key={`group-${event.name}-${gIndex}`} // Fix: Unique key combining name and index
              id={event.name.replace(/\s+/g, '-').toLowerCase()} 
              className="mb-32 scroll-mt-32"
            >
              {!subCategoryId && (
                <div className="flex items-center gap-4 mb-12">
                  <h3 className={`text-sm tracking-[0.3em] uppercase font-sans font-semibold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                    {event.name}
                  </h3>
                  <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
                </div>
              )}

              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {event.photos.map((photo, pIndex) => (
                  <motion.div 
                    key={photo.id || `photo-${gIndex}-${pIndex}`} 
                    layout 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pIndex * 0.02 }}
                    className={`cursor-pointer group shadow-sm overflow-hidden border transition-colors duration-1000 ${borderClass} ${isDarkMode ? 'bg-black' : 'bg-white/50'}`} 
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <SmartImage 
                      src={photo.url} 
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      className={`w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[1500ms] ease-out hover:scale-110 ${isDarkMode ? 'opacity-80 group-hover:opacity-100' : ''}`} 
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

{/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[150] bg-[#0A0E0C]/98 flex flex-col items-center justify-between py-6 backdrop-blur-xl overflow-hidden" 
            onClick={() => setSelectedPhoto(null)}
          >
            {/* --- TOP BAR: Stats & Close --- */}
            <div className="w-full px-6 flex justify-between items-start text-white">
              <div className="flex flex-col text-left">
                <span className="text-[9px] tracking-[0.3em] text-[#C5A572] uppercase font-bold">Personal Use Only</span>
                <span className="text-[10px] font-serif italic uppercase tracking-widest mt-1 opacity-80">Tag @arthur0_2025</span>
              </div>
              
              <button 
                onClick={() => setSelectedPhoto(null)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors -mt-2"
              >
                <X size={28} />
              </button>
            </div>

            {/* --- IMAGE CONTAINER --- */}
            <div className="flex-grow flex items-center justify-center w-full px-2">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ type: "spring", damping: 30 }}
                src={selectedPhoto.url} 
                className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* --- BOTTOM BAR: Actions & Instructions --- */}
            <div className="w-full flex flex-col items-center gap-6 pb-4">
              <div className="flex items-center gap-3 w-full px-6 md:justify-center">
                <button
                  onClick={(e) => handleCopyLink(e, selectedPhoto.url)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-sm hover:bg-[#C5A572] hover:border-[#C5A572] transition-all text-[10px] uppercase tracking-widest"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                  {copied ? 'Copied' : 'Share'}
                </button>

                <a 
                  href={selectedPhoto.url} 
                  download={`ArthuroVisuals-${selectedPhoto.id}.jpg`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-sm hover:bg-[#C5A572] hover:border-[#C5A572] transition-all text-[10px] uppercase tracking-widest"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
              
              <div className="text-center text-white/40 text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase max-w-sm px-6 leading-relaxed font-sans">
                Complimentary for personal use • <br className="hidden md:block" />
                Preserve the art—please do not apply filters.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}