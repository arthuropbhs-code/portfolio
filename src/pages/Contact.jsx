import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, MapPin } from 'lucide-react';

export default function Contact({ isDarkMode }) {
  // Theme logic for automatic high-contrast visibility
  const theme = {
    bg: isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]',
    title: isDarkMode ? 'text-[#C5A572]' : 'text-[#2F4538]', // Fixes dark green on black issue
    body: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode ? 'bg-[#111814] border-white/5' : 'bg-white border-gray-100',
    input: isDarkMode ? 'border-white/10 text-white placeholder:text-gray-600' : 'border-gray-200 text-black placeholder:text-gray-400',
    iconBg: isDarkMode ? 'bg-white/5' : 'bg-gray-50',
    label: isDarkMode ? 'text-gray-500' : 'text-gray-400'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`pt-32 pb-24 px-6 transition-colors duration-1000 ${theme.bg} min-h-screen`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Info & Vibe */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[10px] text-[#C5A572] tracking-[0.3em] uppercase block mb-4 font-sans font-medium">
            Get In Touch
          </span>
          <h2 className={`text-6xl font-serif italic mb-8 transition-colors duration-1000 ${theme.title}`}>
            Let's Work.
          </h2>
          
          <p className={`${theme.body} font-sans font-light leading-relaxed mb-12 max-w-md transition-colors duration-1000`}>
            Whether you're looking to book a session, request a high-res gallery for a team, or inquire about a takedown, I'm here to help. 
          </p>

          <div className="space-y-8">
            {/* Contact Item: Email */}
            <div className="flex items-start gap-4">
              <div className={`p-3 ${theme.iconBg} rounded-full text-[#C5A572] transition-colors`}>
                <Mail size={18} />
              </div>
              <div>
                <h4 className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${isDarkMode ? 'text-[#C5A572]' : 'text-black'}`}>Email</h4>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>arthurovisuals@email.com</p>
              </div>
            </div>

            {/* Contact Item: Instagram */}
            <div className="flex items-start gap-4">
              <div className={`p-3 ${theme.iconBg} rounded-full text-[#C5A572] transition-colors`}>
                <Instagram size={18} />
              </div>
              <div>
                <h4 className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${isDarkMode ? 'text-[#C5A572]' : 'text-black'}`}>Instagram</h4>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>@arthur0_2025</p>
              </div>
            </div>

            {/* Contact Item: Location */}
            <div className="flex items-start gap-4">
              <div className={`p-3 ${theme.iconBg} rounded-full text-[#C5A572] transition-colors`}>
                <MapPin size={18} />
              </div>
              <div>
                <h4 className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${isDarkMode ? 'text-[#C5A572]' : 'text-black'}`}>Location</h4>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>South Florida / Available for Travel</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Modern Form */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${theme.card} p-8 md:p-12 border shadow-sm rounded-sm transition-all duration-1000`}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Name</label>
                <input 
                  type="text" 
                  className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors`} 
                  placeholder="Full Name" 
                />
              </div>
              <div>
                <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Email</label>
                <input 
                  type="email" 
                  className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors`} 
                  placeholder="email@address.com" 
                />
              </div>
            </div>

            <div>
              <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Subject</label>
              <select className={`w-full border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors bg-transparent cursor-pointer`}>
                <option className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Booking Inquiry</option>
                <option className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Commercial Licensing</option>
                <option className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Image Takedown Request</option>
                <option className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Other</option>
              </select>
            </div>

            <div>
              <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Message</label>
              <textarea 
                rows="4" 
                className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors resize-none`} 
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button className="w-full bg-[#2F4538] text-white py-4 rounded-sm text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#C5A572] transition-all duration-500 group shadow-lg">
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </motion.div>
  );
}