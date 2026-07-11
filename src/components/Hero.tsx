import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Bot, Compass, Award, Zap, Sparkles, GraduationCap, CheckCircle2, ShieldCheck, Microscope } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenApplication: () => void;
}

export default function Hero({ onNavigate, onOpenApplication }: HeroProps) {
  // Use scroll for subtle parallax scroll triggers
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between bg-[#030712] pt-28 md:pt-36 overflow-hidden border-b border-white/5"
    >
      {/* Background Animated Cinematic Glow & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Animated Radial Glowing Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 0.95, 1.1],
            x: [0, -40, 0],
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-1/3 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px]" 
        />

        {/* Premium Grid overlay representing structures & organization */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
        
        {/* Apple-style subtle light reflection ray */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex-grow flex flex-col justify-center py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glassmorphism Text Container with Elite Typography */}
          <motion.div 
            style={{ y: heroY, scale: scaleHero }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Apple-style Capsule Badge with subtle micro-glow */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2.5 bg-white/[0.04] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg hover:bg-white/[0.06] transition-colors cursor-pointer group"
              onClick={onOpenApplication}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-blue-200 uppercase font-sans flex items-center">
                Admissions Open 2026 - 2027 • प्रवेश प्रारंभ
                <ArrowRight className="w-3 h-3 ml-2 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>

            {/* Main Interactive Glassmorphic Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden"
            >
              {/* Internal subtle glow card corner */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  Education For A <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
                    Better Life.
                  </span>
                </h1>

                <p className="font-sans text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                  Welcome to <span className="text-white font-semibold">Oxford English Higher Secondary School, Kailaras</span>. 
                  Fostering academic excellence, robust modern science, and outstanding cultural values for over 20 glorious years. We prepare future global thinkers.
                </p>

                {/* Aesthetic Bilingual Tagline block */}
                <div className="border-l-2 border-blue-400 pl-4 py-1 bg-white/[0.01] rounded-r-lg">
                  <p className="text-[11px] font-black text-blue-300 uppercase tracking-[0.2em]">
                    "विद्या ददाति विनयम्"
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium italic mt-0.5">
                    Humility, virtue, and dynamic scientific logic shape true character.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons: Micro-interactions & scale lifts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {/* Primary Premium White Button with lift and hover glow */}
              <button
                id="hero-apply-btn"
                onClick={onOpenApplication}
                className="group relative bg-white hover:bg-slate-50 text-[#030712] font-sans text-xs font-bold tracking-[0.15em] uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2 overflow-hidden"
              >
                {/* Light reflecting overlay effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span>Apply For Admission</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-blue-600" />
              </button>
              
              {/* Secondary Premium Glass Button */}
              <button
                id="hero-counselor-btn"
                onClick={() => onNavigate("chat")}
                className="group bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-sans text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
              >
                <Bot className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Consult AI Counselor</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Layered 3D Parallax Images with float animations */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              
              {/* Glow backdrop directly behind image frames */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/15 to-indigo-500/15 rounded-[40px] blur-2xl opacity-70 z-0 pointer-events-none" />

              {/* Layer 1: Main Overlap Center Image with smooth parallax */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative w-[85%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 bg-[#0f172a] group"
              >
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
                  alt="Oxford Academic Students"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded">Campus Life</span>
                  <span className="text-[10px] font-mono text-slate-300">ESTD. 1996</span>
                </div>
              </motion.div>

              {/* Layer 2: Floating Top-Right Overlapping Lab/Technology Image (Parallax Float Effect) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [-10, 10, -10],
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.35 },
                  x: { duration: 0.8, delay: 0.35 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className="absolute -top-6 -right-2 w-[52%] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-20 bg-[#0f172a] group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600"
                  alt="Science & Robotics Labs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                  <Microscope className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-white">Robotics Lab</span>
                </div>
              </motion.div>

              {/* Layer 3: Floating Bottom-Left Overlapping Classroom Image (Parallax Float Effect) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [10, -10, 10]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.45 },
                  x: { duration: 0.8, delay: 0.45 },
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className="absolute -bottom-8 -left-4 w-[50%] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-20 bg-[#0f172a] group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600"
                  alt="Co-curricular collaboration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-white">Interactive Ed</span>
                </div>
              </motion.div>

              {/* Float Glassmorphic Badge Widget: 100% Academic Pass Rate */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="absolute bottom-1/3 -right-8 z-30 bg-slate-950/95 backdrop-blur-md p-3 px-4 rounded-xl border border-white/10 shadow-xl flex items-center space-x-2.5"
              >
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                  <GraduationCap className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base font-black text-white leading-none">100%</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Board Pass Rate</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Premium "Trust & Emotion" Highlights Strip with icons & slide transitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/5">
          {[
            {
              icon: <Zap className="w-5 h-5 text-blue-400" />,
              title: "Digital Smart Classes",
              desc: "Interactive multimedia smart boards for immersive digital literacy.",
            },
            {
              icon: <Award className="w-5 h-5 text-indigo-400" />,
              title: "Science & Robotics Lab",
              desc: "Practical hands-on mechanics, chemistry, and computation workspaces.",
            },
            {
              icon: <Compass className="w-5 h-5 text-cyan-400" />,
              title: "Character & Values",
              desc: "Bilingual leadership discipline anchored in Sanskriti and modern grit.",
            },
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.01] backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 group flex items-start space-x-4 cursor-pointer hover:bg-white/[0.02]"
            >
              <div className="p-3 bg-white/[0.03] group-hover:bg-blue-500/10 rounded-xl border border-white/10 transition-colors shrink-0">
                {h.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-white text-sm tracking-wide uppercase">{h.title}</h3>
                <p className="font-sans text-slate-400 text-xs leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Trust Quote / Bottom Full-Width Horizontal Strip */}
      <div className="w-full bg-[#02050c] text-slate-400 py-6 border-t border-white/5 z-10 relative overflow-hidden">
        {/* Fine glowing linear highlights */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse shrink-0" />
            <p className="text-xs font-medium text-slate-300">
              Co-educational English Medium Higher Secondary School (Grades 1 to 12) • ESTD. 1996 • Kailaras, MP
            </p>
          </div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
            ESTABLISHED FOR ACADEMIC TRIUMPH
          </div>
        </div>
      </div>
    </section>
  );
}
