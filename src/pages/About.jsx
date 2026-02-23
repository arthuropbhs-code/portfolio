import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, Target } from 'lucide-react';

export default function About({ isDarkMode }) {
  const stats = [
    { label: 'Years Experience', value: '2+', icon: <Zap size={20} /> },
    { label: 'Events Captured', value: '15+', icon: <Camera size={20} /> },
    { label: 'Moments Delivered', value: '5k+', icon: <Target size={20} /> },
  ];

  // Dynamic Theme Classes
  const theme = {
    text: isDarkMode ? 'text-white' : 'text-[#2F4538]',
    subText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-white/5' : 'bg-white',
    cardBorder: isDarkMode ? 'border-white/10' : 'border-gray-100',
    statIconBg: isDarkMode ? 'bg-white/5' : 'bg-gray-50',
    accentLine: isDarkMode ? 'border-white/10' : 'border-gray-100'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen transition-colors duration-1000`}
    >
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className={`aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border ${theme.cardBorder} ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
            <img 
              /* Updated to Cloudinary URL so you can delete local files */
              src="https://res.cloudinary.com/dauzn6kas/image/upload/f_auto,q_auto/v1/jrotc/featured_photo" 
              alt="Arthuro De Almeida" 
              className={`w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105 ${isDarkMode ? 'opacity-80 hover:opacity-100' : ''}`}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C5A572]/10 -z-10" />
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-[10px] text-[#C5A572] tracking-[0.3em] uppercase block mb-4 font-sans font-medium">
            The Photographer
          </span>
          <h2 className={`text-5xl font-serif mb-8 italic transition-colors duration-1000 ${theme.text}`}>
            The Vision
          </h2>
          
          <div className={`space-y-6 font-sans font-light leading-relaxed transition-colors duration-1000 ${theme.subText}`}>
            <p>
              At <span className={`${isDarkMode ? 'text-white' : 'text-[#2F4538]'} font-normal`}>Arthuro Visuals</span>, I focus on capturing moments with precision, authenticity, and impact. My work is rooted in the raw intensity of sports, the discipline and pride of JROTC competitions, and the natural beauty found in landscapes.
            </p>
            <p>
              I’m drawn to the energy of real moments, from split-second action to the quiet focus before an event. Whether documenting competition, ceremony, or environment, my goal is to create images that feel as powerful as the moment itself.
            </p>
            <p className={`text-sm italic pt-4 border-t ${theme.accentLine} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A572]" />
              Based in South Florida, available for travel and commissions.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className={`p-8 border ${theme.cardBorder} text-center ${theme.cardBg} shadow-sm rounded-sm transition-colors duration-1000`}
          >
            <div className={`inline-block p-3 ${theme.statIconBg} text-[#C5A572] mb-4 rounded-full`}>
              {stat.icon}
            </div>
            <h3 className={`text-3xl font-serif mb-1 ${theme.text}`}>{stat.value}</h3>
            <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-sans font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Philosophy Callout */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[#2F4538] text-white p-12 md:p-20 text-center rounded-sm shadow-xl"
      >
        <h3 className="text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed">
          "Every athlete and cadet deserves a memory that looks as powerful as the moment felt."
        </h3>
        <div className="w-12 h-px bg-[#C5A572] mx-auto mb-6" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C5A572] font-sans font-bold">
          Arthuro De Almeida
        </p>
      </motion.div>
    </motion.div>
  );
}