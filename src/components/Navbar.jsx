import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // UPDATED: All paths now include /gallery/ to match App.jsx
  const jrotcEvents = [
    { name: 'South Broward', path: '/gallery/jrotc/south-broward' },
    { name: 'Yuletide Parade 25-26', path: '/gallery/jrotc/yuletide-parade-25-26' },
    { name: 'Open House 25-26', path: '/gallery/jrotc/open-house-25-26' },
    { name: 'Raiders State Comp', path: '/gallery/jrotc/raiders-state-comp' },
    { name: 'Raider County', path: '/gallery/jrotc/raider-county' },
    { name: 'Western Comp', path: '/gallery/jrotc/western-comp' },
  ];

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 py-5 px-6 md:px-12 flex justify-between items-center">
      <Link 
        to="/" 
        onClick={closeAll} 
        className="text-2xl font-serif tracking-tighter hover:text-[#C5A572] transition-colors z-[110] text-[#2F4538]"
      >
        Arthuro Visuals
      </Link>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden lg:flex gap-10 items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#2F4538]">
        
        <div 
          className="relative py-2 group"
          onMouseEnter={() => setActiveDropdown('jrotc')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="flex items-center gap-1 group-hover:text-[#C5A572] transition-colors cursor-default">
            JROTC <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'jrotc' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'jrotc' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-[-20px] mt-2 w-64 bg-white border border-gray-100 shadow-2xl py-6 rounded-sm"
              >
                {jrotcEvents.map((event) => (
                  <Link 
                    key={event.name} 
                    to={event.path} 
                    className="block px-8 py-2.5 text-gray-500 hover:text-[#C5A572] hover:bg-gray-50 transition-all font-serif italic normal-case text-sm"
                    onClick={closeAll}
                  >
                    {event.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* UPDATED: Path includes /gallery/ for sports, social, and landscape */}
        {['Sports', 'Social Events', 'Landscape'].map((item) => (
          <Link 
            key={item} 
            to={`/gallery/${item.toLowerCase().replace(/\s+/g, '-')}`} 
            className={`relative group transition-colors hover:text-[#C5A572] ${location.pathname.includes(item.toLowerCase().replace(/\s+/g, '-')) ? 'text-[#C5A572]' : ''}`}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A572] transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}

        <Link 
          to="/about" 
          className={`relative group transition-colors hover:text-[#C5A572] ${location.pathname === '/about' ? 'text-[#C5A572]' : ''}`}
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A572] transition-all duration-300 group-hover:w-full" />
        </Link>

        <div className="w-[1px] h-4 bg-gray-200 mx-2" />

        <Link 
          to="/contact" 
          className="bg-[#2F4538] text-white px-7 py-3 rounded-sm hover:bg-[#C5A572] transition-all duration-500 shadow-lg hover:shadow-[#C5A572]/20"
        >
          Contact
        </Link>
      </div>

      {/* --- MOBILE TRIGGER --- */}
      <button 
        className="lg:hidden z-[110] p-2 text-[#2F4538]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[105] flex flex-col lg:hidden"
          >
            <div className="flex flex-col pt-32 px-10 gap-8 text-sm uppercase tracking-[0.3em] font-light h-full overflow-y-auto pb-12">
              
              <div className="w-full">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'jrotc' ? null : 'jrotc')}
                  className="flex items-center justify-between w-full border-b border-gray-100 pb-4 text-[#2F4538]"
                >
                  <span className="font-medium">JROTC</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'jrotc' ? 'rotate-180 text-[#C5A572]' : ''}`} />
                </button>
                
                {activeDropdown === 'jrotc' && (
                  <div className="flex flex-col gap-6 pl-4 pt-6 pb-2">
                    {jrotcEvents.map((event) => (
                      <Link 
                        key={event.name} 
                        to={event.path} 
                        onClick={closeAll} 
                        className="text-gray-400 text-xs tracking-[0.2em] hover:text-[#C5A572]"
                      >
                        {event.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { name: 'Sports', path: '/gallery/sports' },
                { name: 'Social Events', path: '/gallery/social-events' },
                { name: 'Landscape', path: '/gallery/landscape' },
                { name: 'About', path: '/about' }
              ].map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={closeAll} 
                  className="border-b border-gray-100 pb-4 text-[#2F4538] hover:text-[#C5A572] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                to="/contact" 
                onClick={closeAll} 
                className="mt-4 bg-[#2F4538] text-white px-8 py-5 text-center rounded-sm text-[10px] tracking-[0.4em] font-bold shadow-xl active:scale-95 transition-transform"
              >
                GET IN TOUCH
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}