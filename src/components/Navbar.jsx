import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const location = useLocation();

  const jrotcEvents = [
    { name: 'South Broward', path: '/gallery/jrotc/south-broward' },
    { name: 'Yuletide Parade 25-26', path: '/gallery/jrotc/yuletide-parade-25-26' },
    { name: 'Open House 25-26', path: '/gallery/jrotc/open-house-25-26' },
    { name: 'Raiders State Comp', path: '/gallery/jrotc/raiders-state-comp' },
    { name: 'Raider County', path: '/gallery/jrotc/raider-county' },
    { name: 'Western Comp', path: '/gallery/jrotc/western-comp' },
  ];

  const sportsCategories = [
    {
      name: 'Flag Football',
      id: 'flag-football',
      events: [
        { name: 'In Season', path: '/gallery/flag_football/flag-football-season' },
        { name: 'Playoffs', path: '/gallery/flag_football/flag-football-playoffs' },
      ]
    }
  ];

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    document.body.style.overflow = 'unset';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeAll(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[150] bg-white border-b border-gray-100 py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
      <Link to="/" onClick={closeAll} className="text-2xl font-serif tracking-tighter hover:text-[#C5A572] transition-colors z-[200] text-[#2F4538]">
        Arthuro Visuals
      </Link>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden lg:flex gap-10 items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#2F4538]">
        
        {/* JROTC Dropdown */}
        <div className="relative py-2 group" onMouseEnter={() => setActiveDropdown('jrotc')} onMouseLeave={() => setActiveDropdown(null)}>
          <button className="flex items-center gap-1 group-hover:text-[#C5A572] transition-colors outline-none uppercase">
            JROTC <ChevronDown size={10} className={activeDropdown === 'jrotc' ? 'rotate-180' : ''} />
          </button>
          <AnimatePresence>
            {activeDropdown === 'jrotc' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-[-20px] mt-2 w-64 bg-white border border-gray-100 shadow-2xl py-6 rounded-sm">
                {jrotcEvents.map((event) => (
                  <Link key={event.name} to={event.path} onClick={closeAll} className="block px-8 py-2.5 text-gray-500 hover:text-[#C5A572] hover:bg-gray-50 transition-all font-serif italic normal-case text-sm">
                    {event.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sports Nested Dropdown */}
        <div className="relative py-2 group" onMouseEnter={() => setActiveDropdown('sports')} onMouseLeave={() => setActiveDropdown(null)}>
          <button className="flex items-center gap-1 group-hover:text-[#C5A572] transition-colors outline-none uppercase">
            Sports <ChevronDown size={10} className={activeDropdown === 'sports' ? 'rotate-180' : ''} />
          </button>
          <AnimatePresence>
            {activeDropdown === 'sports' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-[-20px] mt-2 w-64 bg-white border border-gray-100 shadow-2xl py-4 rounded-sm">
                {sportsCategories.map((sport) => (
                  <div key={sport.id} className="relative group/sub" onMouseEnter={() => setActiveSubDropdown(sport.id)} onMouseLeave={() => setActiveSubDropdown(null)}>
                    <div className="flex items-center justify-between px-8 py-3 text-[#C5A572] hover:bg-gray-50 cursor-default transition-all font-bold text-[9px] tracking-widest uppercase">
                      {sport.name} <ChevronRight size={10} />
                    </div>
                    <AnimatePresence>
                      {activeSubDropdown === sport.id && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute left-full top-0 ml-[1px] w-56 bg-white border border-gray-100 shadow-xl py-4 rounded-sm">
                          {sport.events.map((event) => (
                            <Link key={event.name} to={event.path} onClick={closeAll} className="block px-8 py-2 text-gray-500 hover:text-[#C5A572] hover:bg-gray-50 transition-all font-serif italic normal-case text-sm">
                              {event.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {['Social Events', 'Landscape', 'About'].map((item) => (
          <Link key={item} to={item === 'About' ? '/about' : `/gallery/${item.toLowerCase().replace(/\s+/g, '-')}`} className="relative group transition-colors hover:text-[#C5A572]">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A572] transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}

        <div className="w-[1px] h-4 bg-gray-200 mx-2" />
        <Link to="/contact" className="bg-[#2F4538] text-white px-7 py-3 rounded-sm hover:bg-[#C5A572] transition-all duration-500 shadow-lg">
          Contact
        </Link>
      </div>

      {/* --- MOBILE TRIGGER --- */}
      <button className="lg:hidden z-[200] p-2 text-[#2F4538]" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-white z-[180] flex flex-col lg:hidden pt-32 px-10 overflow-y-auto pb-20">
            <div className="flex flex-col gap-8 text-sm uppercase tracking-[0.3em] font-light text-[#2F4538]">
              
              <MobileDropdown title="JROTC" items={jrotcEvents} closeAll={closeAll} />

              {/* Mobile Sports Section */}
              <div className="flex flex-col gap-4">
                <span className="font-medium border-b border-gray-100 pb-2">Sports</span>
                <div className="pl-4 flex flex-col gap-6 mt-2">
                  {sportsCategories.map(sport => (
                    <div key={sport.id} className="flex flex-col gap-4">
                      <span className="text-[10px] text-[#C5A572] font-bold tracking-widest">{sport.name}</span>
                      <div className="flex flex-col gap-4 pl-4 border-l border-gray-100">
                        {sport.events.map(event => (
                          <Link key={event.name} to={event.path} onClick={closeAll} className="text-gray-500 normal-case font-serif italic text-lg">
                            {event.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {['Social Events', 'Landscape', 'About'].map(link => (
                <Link key={link} to={link === 'About' ? '/about' : `/gallery/${link.toLowerCase().replace(/\s+/g, '-')}`} onClick={closeAll} className="border-b border-gray-100 pb-4">
                  {link}
                </Link>
              ))}
              
              <Link to="/contact" onClick={closeAll} className="mt-4 bg-[#2F4538] text-white px-8 py-5 text-center rounded-sm text-[10px] tracking-[0.4em] font-bold shadow-xl">
                GET IN TOUCH
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileDropdown({ title, items, closeAll }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full border-b border-gray-100 pb-4 text-[#2F4538]">
        <span className="font-medium">{title}</span>
        <ChevronDown size={16} className={isOpen ? 'rotate-180 text-[#C5A572]' : ''} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex flex-col gap-5 pl-4 pt-6 pb-4">
              {items.map(item => (
                <Link key={item.name} to={item.path} onClick={closeAll} className="text-gray-500 text-xs tracking-[0.2em]">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}