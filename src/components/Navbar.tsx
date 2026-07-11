import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Menu, X, Bot, Sparkles, BookOpen } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenApplication: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenApplication }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState("https://docs.google.com/uc?export=download&id=1zlUYcwbNYHWt6zZ1n9cwZ_LyOY9k8FQT");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Academics", id: "academics" },
    { label: "Admissions", id: "admissions" },
    { label: "Notice Board", id: "announcements" },
    { label: "Events", id: "calendar" },
    { label: "Contact Us", id: "contact" },
    { label: "AI Counselor", id: "chat", icon: <Bot className="w-3.5 h-3.5 mr-1 text-amber-400" /> },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090D1A]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => handleItemClick("home")}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="transform transition-transform group-hover:scale-105 duration-300 w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm flex items-center justify-center p-0.5">
            <img 
              src={logoSrc} 
              alt="Oxford Logo" 
              className="w-full h-full object-contain rounded-full" 
              onError={() => setLogoSrc("/logo.png")}
              referrerPolicy="no-referrer" 
            />
          </div>
          <div>
            <h1 className="font-sans text-xs sm:text-sm font-bold tracking-[0.18em] text-white uppercase flex items-center">
              OXFORD ENGLISH SCHOOL
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-amber-500/90 font-sans font-medium mt-0.5">
              KAILARAS • ESTD. 1996
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  id={`nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-sans text-xs font-semibold tracking-widest uppercase transition-colors py-2 px-1 flex items-center cursor-pointer ${
                    activeSection === item.id
                      ? "text-amber-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <motion.button
            id="navbar-apply-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenApplication}
            className="font-sans bg-transparent border border-white/30 hover:border-white text-white text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2.5 rounded-none transition-all duration-300 hover:bg-white/5 cursor-pointer"
          >
            <span>Apply Portal</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenApplication}
            className="bg-transparent border border-white/30 text-white text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 rounded-none cursor-pointer"
          >
            Apply
          </motion.button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-white hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#090D1A]/98 border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full text-left font-sans text-xs tracking-wider uppercase font-semibold py-2 px-3 rounded-none flex items-center transition-colors ${
                        activeSection === item.id
                          ? "bg-white/10 text-amber-400 border-l-2 border-amber-500 pl-2.5"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-1.5">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-white/10">
                <button
                  id="mobile-nav-apply"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenApplication();
                  }}
                  className="w-full text-center bg-transparent border border-white/20 text-white py-2.5 rounded-none text-xs tracking-widest uppercase font-semibold hover:bg-white/5 transition-colors"
                >
                  Enter Application Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
