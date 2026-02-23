import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Mail } from 'lucide-react';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-sans">
          © {new Date().getFullYear()} Arthuro Visuals
        </div>
        
        <div className="flex gap-8 items-center text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-gray-500">
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-[#C5A572] transition-colors"
          >
            Privacy & Terms
          </button>
          <a href="https://instagram.com/arthur0_2025" target="_blank" className="hover:text-[#C5A572] transition-colors">
            Instagram
          </a>
        </div>
      </div>

      {/* Privacy & Takedown Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white max-w-2xl w-full p-8 md:p-12 relative shadow-2xl overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <X size={20} />
              </button>

              <h3 className="text-3xl font-serif italic mb-8 text-[#2F4538]">Privacy & Image Rights</h3>
              
              <div className="space-y-6 text-sm text-gray-600 font-sans font-light leading-relaxed">
                <section>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-black mb-2 flex items-center gap-2">
                    <Shield size={14} className="text-[#C5A572]" /> Media Release
                  </h4>
                  <p>All photography is conducted in coordination with hosting organizations (Schools, JROTC, Sports Programs). Images are captured under the media release agreements held by these organizations for documentary and promotional use.</p>
                </section>

                <section>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-black mb-2 flex items-center gap-2">
                    <Mail size={14} className="text-[#C5A572]" /> Takedown Requests
                  </h4>
                  <p>I prioritize the privacy and safety of all subjects. If you are a parent or guardian and wish for a specific image of your child to be removed from this portfolio, please contact me directly at <span className="text-[#C5A572] font-medium underline">arthuro.pbhs@gmail.com</span>. Please include the image ID or a screenshot of the photo in question.</p>
                </section>

                <section>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-black mb-2">Usage Policy</h4>
                  <p>Images downloaded from this site are for personal, non-commercial use only. Transformation or commercial resale of these images is strictly prohibited without written consent.</p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}