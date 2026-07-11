import React, { useState } from "react";
import { GraduationCap, Mail, Phone, MapPin, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [logoSrc, setLogoSrc] = useState("https://docs.google.com/uc?export=download&id=1zlUYcwbNYHWt6zZ1n9cwZ_LyOY9k8FQT");

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
         {/* About column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="transform transition-transform hover:scale-105 duration-300 w-12 h-12 rounded-full border border-slate-800 overflow-hidden bg-white shadow-sm flex items-center justify-center p-0.5">
              <img 
                src={logoSrc} 
                alt="Oxford Logo" 
                className="w-full h-full object-contain rounded-full" 
                onError={() => setLogoSrc("/logo.png")}
                referrerPolicy="no-referrer" 
              />
            </div>
            <div>
              <h4 className="font-display text-lg font-extrabold tracking-tight text-white flex items-center">
                OXFORD<span className="text-blue-400 font-bold text-[10px] ml-1.5 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-900/40 uppercase tracking-wider font-sans">ENGLISH SCHOOL</span>
              </h4>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-semibold">Education For A Better Life</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
            Oxford English H.S. School, Kailaras (Classes 1-12) is a premier co-educational secondary school dedicated to nurturing excellence, science exhibitions, sports, and value-based global learning.
          </p>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest font-mono text-white">School Hubs</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("home")} className="hover:text-blue-400 transition-colors cursor-pointer">
                Home Portal
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("academics")} className="hover:text-blue-400 transition-colors cursor-pointer">
                Academic & Science Streams
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("campus")} className="hover:text-blue-400 transition-colors cursor-pointer">
                Facilities & Co-curriculars
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("admissions")} className="hover:text-blue-400 transition-colors cursor-pointer">
                Admissions & Fees Estimator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("chat")} className="hover:text-blue-400 transition-colors cursor-pointer">
                Talk to AI Counselor
              </button>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-4 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest font-mono text-white">Contact & Location</h5>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Sabalgarh Road, Kailaras, District Morena, Madhya Pradesh, India - 476224</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>+91 94251 18456</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>oxfordkailaras@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <p>© 2026 Oxford English H.S. School, Kailaras. All rights reserved. Co-educational Secondary School (Classes 1–12).</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0 font-medium">
          <span>Designed for education & excellence with</span>
          <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
        </p>
      </div>
    </footer>
  );
}
