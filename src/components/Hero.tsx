import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Bot, Compass, Award, ShieldCheck, Zap } from "lucide-react";

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
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Digital Smart Classrooms",
      desc: "Immersive multimedia enabled learning environments tailored for digital literacy.",
    },
    {
      icon: <Award className="w-5 h-5 text-blue-800" />,
      title: "Science & Robotics Lab",
      desc: "Next-gen practical education with fully equipped physics, chemistry, and robotic systems.",
    },
    {
      icon: <Compass className="w-5 h-5 text-indigo-700" />,
      title: "Education For A Better Life",
      desc: "Fostering standard life values, sports leadership, character building, and academic excellence.",
    },
  ];

  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 bg-gradient-to-b from-blue-50/40 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-700"></span>
              </span>
              <span>Enrollment is Open for Academic Year 2026-2027</span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Where Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-950">Excellence</span> Shapes Noble Character
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Oxford English H.S. School, Kailaras offers a transformative modern English-medium education (Grades 1–12). Guided by our motto <strong>“Education For A Better Life”</strong>, we empower students to lead with digital mastery, physical resilience, and stellar morals.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-apply-btn"
                onClick={onOpenApplication}
                className="bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-950 hover:to-slate-950 text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/35 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-blue-800/30 font-sans"
              >
                <span>Apply for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-counselor-btn"
                onClick={() => onNavigate("chat")}
                className="bg-white border border-slate-200 hover:border-blue-200 hover:bg-slate-50 text-slate-800 text-sm font-bold px-7 py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer font-sans"
              >
                <Bot className="w-4 h-4 text-blue-900" />
                <span>Consult Oxford AI Counselor</span>
              </button>
            </motion.div>

            {/* Stats list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100"
            >
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-display font-black text-2xl sm:text-3xl text-blue-950">{stat.value}</p>
                  <p className="font-sans text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
                alt="Oxford English H.S. School Campus"
                className="w-full h-[320px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border border-slate-100 overflow-hidden bg-white shadow-sm flex items-center justify-center p-0.5 flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Oxford Emblem" 
                    className="w-full h-full object-contain rounded-full" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider font-display">Oxford English H.S. School</h4>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider font-mono">Kailaras, Madhya Pradesh</p>
                </div>
              </div>
            </motion.div>

            {/* Background design elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl -z-0" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-100/40 rounded-full blur-2xl -z-0" />
          </div>

        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-100">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer"
            >
              <div className="p-3 bg-slate-50 group-hover:bg-blue-50 rounded-xl w-fit transition-colors mb-4">
                {h.icon}
              </div>
              <h3 className="font-sans font-bold text-slate-900 text-lg mb-2">{h.title}</h3>
              <p className="font-sans text-slate-600 text-sm leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
