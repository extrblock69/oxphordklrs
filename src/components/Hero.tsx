import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Bot, Compass, Award, Zap, Sparkles, GraduationCap, CheckCircle } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenApplication: () => void;
}

export default function Hero({ onNavigate, onOpenApplication }: HeroProps) {
  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      title: "Digital Smart Classes",
      desc: "Interactive multimedia smart boards for elite learning.",
    },
    {
      icon: <Award className="w-5 h-5 text-amber-600" />,
      title: "Science & Robotics Lab",
      desc: "Hands-on physics, chemistry, and computational labs.",
    },
    {
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      title: "Character & Values",
      desc: "Deeply rooted moral foundation and leadership grit.",
    },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pt-28 md:pt-36 overflow-hidden border-b border-slate-100"
    >
      {/* Abstract Background Design */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[120px]" />
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex-grow flex flex-col justify-center py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Academic Heading & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Admissions Open Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100/80 px-3.5 py-1.5 rounded-full shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold tracking-widest text-blue-900 uppercase font-sans">
                Admissions Open 2026 - 2027 • प्रवेश प्रारंभ
              </span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
              >
                Education For A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900">
                  Better Life.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-medium"
              >
                Welcome to Oxford English Higher Secondary School, Kailaras. We are dedicated to nurturing academic excellence, fostering dynamic scientific talents, and instilling high moral virtues in young minds for over 20 glorious years.
              </motion.p>
            </div>

            {/* Bilingual Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="border-l-4 border-amber-500 pl-4 py-1"
            >
              <p className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                "विद्या ददाति विनयम्"
              </p>
              <p className="text-[11px] text-slate-500 font-medium italic mt-0.5">
                Knowledge imparts humility and shapes true character.
              </p>
            </motion.div>

            {/* Beautiful Action Controls */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                id="hero-apply-btn"
                onClick={onOpenApplication}
                className="group bg-blue-950 hover:bg-blue-900 text-white font-sans text-xs font-bold tracking-widest uppercase px-7 py-4 rounded-full transition-all duration-300 shadow-md shadow-blue-950/10 cursor-pointer flex items-center space-x-2"
              >
                <span>Apply For Admission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                id="hero-counselor-btn"
                onClick={() => onNavigate("chat")}
                className="bg-white hover:bg-slate-50 text-blue-950 border border-slate-200/80 hover:border-slate-300 font-sans text-xs font-bold tracking-widest uppercase px-7 py-4 rounded-full transition-all duration-300 shadow-xs cursor-pointer flex items-center space-x-2"
              >
                <Bot className="w-4 h-4 text-blue-900 animate-pulse" />
                <span>Talk To AI Counselor</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Premium Framed Images & Floating Metrics */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Main Interactive Collage Wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mx-auto max-w-[420px] lg:max-w-none aspect-square w-full"
            >
              {/* Main Decorative Frame with Background Image */}
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200"
                  alt="Oxford Campus Life & Students"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle soft gradient over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>

              {/* Back Drop Ring Shadow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[32px] blur-lg opacity-10 z-0 pointer-events-none" />

              {/* Floating Glassmorphic Widget 1: 100% Board Pass */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute -top-6 -right-6 md:-right-10 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg flex items-center space-x-3 max-w-[190px]"
              >
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 tracking-tight leading-none">100%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Board Pass Rate</p>
                </div>
              </motion.div>

              {/* Floating Glassmorphic Widget 2: Elite Mentorship */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute -bottom-6 -left-6 md:-left-10 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg flex items-center space-x-3 max-w-[210px]"
              >
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight">Weekly Mentor Program</p>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">District Toppers</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Feature grid - aligned with the previous theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-slate-100/70">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-xs hover:shadow-md transition-all duration-300 group flex items-start space-x-4"
            >
              <div className="p-2.5 bg-slate-50 group-hover:bg-blue-50 rounded-xl border border-slate-100/80 transition-colors shrink-0">
                {h.icon}
              </div>
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-sm tracking-wide uppercase">{h.title}</h3>
                <p className="font-sans text-slate-500 text-xs leading-relaxed mt-1">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Trust Quote / Bottom strip banner */}
      <div className="w-full bg-slate-900 text-slate-400 py-6 border-t border-slate-800 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
            <p className="text-xs font-medium text-slate-300">
              Co-educational English Medium Higher Secondary School (Grades 1 to 12) • Established in 1996
            </p>
          </div>
          <div className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
            ESTABLISHED FOR ACADEMIC TRIUMPH
          </div>
        </div>
      </div>
    </section>
  );
}
