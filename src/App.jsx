import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const location = useLocation();

  // Detect system color scheme preference only
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update state whenever the system/device setting changes
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const globalBg = isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]';

  return (
    <div className={`min-h-screen ${globalBg} font-sans selection:bg-[#C5A572] selection:text-white transition-colors duration-1000`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        ${isDarkMode ? `
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0A0E0C; }
          ::-webkit-scrollbar-thumb { background: #2F4538; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #C5A572; }
        ` : ''}
      `}</style>

      <Navbar isDarkMode={isDarkMode} />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/:categoryId" element={<Gallery isDarkMode={isDarkMode} />} />
          <Route path="/:categoryId/:subCategoryId" element={<Gallery isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
        </Routes>
      </AnimatePresence>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}