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
    { label: "AI Counselor", id: "chat", icon: <Bot className="w-4 h-4 mr-1 text-blue-800" /> },
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
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
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
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className={`transform transition-transform group-hover:scale-105 duration-300 w-12 h-12 rounded-full border overflow-hidden bg-white shadow-sm flex items-center justify-center p-0.5 ${
            isScrolled ? "border-slate-100" : "border-white/20"
          }`}>
            <img 
              src={logoSrc} 
              alt="Oxford Logo" 
              className="w-full h-full object-contain rounded-full" 
              onError={() => setLogoSrc("/logo.png")}
              referrerPolicy="no-referrer" 
            />
          </div>
          <div>
            <h1 className={`font-display text-lg sm:text-xl font-extrabold tracking-tight flex items-center transition-colors duration-300 ${
              isScrolled ? "text-blue-950" : "text-white"
            }`}>
              OXFORD
              <span className={`font-bold text-[10px] ml-1.5 px-2 py-0.5 rounded-md border uppercase tracking-wider font-sans transition-all ${
                isScrolled 
                  ? "text-blue-900 bg-blue-50 border-blue-100" 
                  : "text-blue-200 bg-white/10 border-white/20"
              }`}>
                English H.S. School
              </span>
            </h1>
            <p className={`text-[9px] uppercase tracking-wider font-mono font-bold transition-colors duration-300 ${
              isScrolled ? "text-blue-800/80" : "text-blue-200/80"
            }`}>
              KAILARAS • Education For A Better Life
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
                  className={`relative font-sans text-sm font-semibold transition-colors py-2 px-1 flex items-center cursor-pointer ${
                    activeSection === item.id
                      ? (isScrolled ? "text-blue-950" : "text-white")
                      : (isScrolled ? "text-slate-600 hover:text-blue-950" : "text-slate-300 hover:text-white")
                  }`}
                >
                  {item.icon && React.cloneElement(item.icon as React.ReactElement, {
                    className: `w-4 h-4 mr-1 ${isScrolled ? "text-blue-800" : "text-blue-400"}`
                  })}
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? "bg-gradient-to-r from-blue-900 to-indigo-800" : "bg-gradient-to-r from-blue-400 to-sky-300"
                      }`}
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
            className={`font-sans text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center space-x-1.5 cursor-pointer border ${
              isScrolled
                ? "bg-blue-950 hover:bg-blue-900 text-white border-blue-900/40 shadow-lg shadow-blue-950/10"
                : "bg-white hover:bg-slate-50 text-blue-950 border-white/10 shadow-xl"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isScrolled ? "text-amber-400" : "text-blue-600"}`} />
            <span>Apply Portal</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenApplication}
            className={`text-[11px] font-bold px-3 py-2 rounded-full cursor-pointer ${
              isScrolled ? "bg-blue-950 text-white" : "bg-white text-blue-950 shadow-sm"
            }`}
          >
            Apply
          </motion.button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isScrolled 
                ? "text-blue-950 hover:text-blue-800 bg-slate-100 hover:bg-slate-200" 
                : "text-white hover:text-blue-200 bg-white/10 hover:bg-white/20"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full text-left font-sans text-sm font-bold py-2 px-3 rounded-lg flex items-center ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-900"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-1.5">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100">
                <button
                  id="mobile-nav-apply"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenApplication();
                  }}
                  className="w-full text-center bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-900/10"
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
