import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Bot, Compass, Award, Zap, Sparkles } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenApplication: () => void;
}

export default function Hero({ onNavigate, onOpenApplication }: HeroProps) {
  const stats = [
    { value: "15:1", label: "Student-Teacher Ratio" },
    { value: "100%", label: "Board Pass Rate" },
    { value: "100%", label: "Experienced Staff" },
    { value: "Affordable", label: "Fee Structure" },
  ];

  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Digital Smart Classrooms",
      desc: "Immersive multimedia-enabled learning environments tailored for elite digital literacy.",
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: "Science & Robotics Lab",
      desc: "Next-gen practical education with fully equipped physics, chemistry, and robotics workspaces.",
    },
    {
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      title: "Education For A Better Life",
      desc: "Fostering leadership, robust values, physical grit, and stellar academic performance.",
    },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between bg-[#060814] pt-28 md:pt-36 overflow-hidden border-b border-white/5"
    >
      {/* Background Cinematic Photo Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000"
          alt="Oxford Academic Campus"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft Radial Gradients for Luxurious Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#060814] via-[#090d1a]/95 to-[#111827]/90 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex-grow flex flex-col justify-center py-12">
        {/* Cinematic Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-8 md:gap-4 items-center">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-5 space-y-6">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-sans text-[11px] font-bold tracking-[0.25em] text-amber-500/90 uppercase"
            >
              FAMILY-FOUNDED • EDUCATOR-LED • CHARACTER-FIRST
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.05]"
            >
              Oxford <br />
              English <br />
              School
            </motion.h2>

            {/* Subtext Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center space-x-3 pt-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] tracking-widest text-slate-400 font-sans uppercase font-semibold">
                Kailaras, Madhya Pradesh
              </span>
            </motion.div>
          </div>

          {/* Center Divider: Thin Golden/Bronze Line */}
          <div className="md:col-span-1 flex justify-start md:justify-center">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="w-16 md:w-[1px] h-[1px] md:h-52 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-amber-500/40 to-transparent my-2 md:my-0"
            />
          </div>

          {/* Right Column: Statement & CTA */}
          <div className="md:col-span-5 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif italic text-xl sm:text-2xl text-slate-200 leading-relaxed font-light"
            >
              Building critical thinkers, principled leaders, and self-directed learners prepared for a better life.
            </motion.p>

            {/* Elegant Button Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="hero-apply-btn"
                onClick={onOpenApplication}
                className="group border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-slate-950 font-sans text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Discover Admissions</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                id="hero-counselor-btn"
                onClick={() => onNavigate("chat")}
                className="border border-amber-500/40 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/15 text-amber-400 font-sans text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center space-x-2"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Consult AI Counselor</span>
              </button>
            </motion.div>
          </div>

        </div>

        {/* Highlight Cards integrated gracefully */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/5">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.02] backdrop-blur-sm p-6 rounded-none border border-white/5 hover:border-amber-500/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="p-3 bg-white/[0.04] group-hover:bg-amber-500/10 rounded-none w-fit transition-all mb-4 border border-white/10">
                {h.icon}
              </div>
              <h3 className="font-sans font-semibold text-white text-base tracking-wider uppercase mb-2">{h.title}</h3>
              <p className="font-sans text-slate-400 text-sm leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Stats Counter Glassmorphic Panel at Bottom Fold */}
      <div className="w-full bg-[#03050c]/90 backdrop-blur-md border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left"
          >
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1 relative group pl-0 sm:pl-4">
                {i > 0 && (
                  <div className="hidden sm:block absolute left-0 top-1/4 h-1/2 w-[1px] bg-white/10" />
                )}
                <p className="font-serif font-semibold text-3xl sm:text-4xl text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="font-sans text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
