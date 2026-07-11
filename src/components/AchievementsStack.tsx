import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Zap, Trophy, ShieldAlert, ChevronRight, CheckCircle2, Star } from "lucide-react";

export default function AchievementsStack() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const achievements = [
    {
      id: "ach-1",
      title: "First Prize: MP State Science Exhibition",
      subtitle: "राज्य विज्ञान प्रदर्शनी विजेता",
      category: "Science & Robotics",
      year: "Academic Year 2025-2026",
      desc: "Our Robotics Guild successfully designed and programmed an AI-enabled automated drip irrigation and solar telemetry system, which won 1st prize at the State Level Science Carnival, bringing absolute honor to Kailaras.",
      quote: "Our young techies created this agricultural model to support localized farming families in the Chambal division.",
      highlight: "Winner out of 150+ regional entries",
      color: "from-blue-900 to-indigo-950",
      accent: "text-blue-900 bg-blue-50 border-blue-200"
    },
    {
      id: "ach-2",
      title: "Dominating the District Board Merit Board",
      subtitle: "जिला बोर्ड मेरिट सूची में शीर्ष स्थान",
      category: "Academic Toppers",
      year: "Consistently Since 2018",
      desc: "In the recent Class 10 and 12 Board examinations, over 35 students from Oxford English H.S. School registered outstanding scores exceeding 95%, with our regional topper logging an incredible 98.4% state score.",
      quote: "Commitment to hard study routines, personalized weekly mock tests, and intensive faculty support yielded this success.",
      highlight: "100% first-division pass rate benchmark",
      color: "from-amber-600 to-amber-900",
      accent: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: "ach-3",
      title: "Champions: Chambal Division Cricket League",
      subtitle: "चंबल संभाग क्रिकेट लीग विजेता",
      category: "Athletics & Sports",
      year: "Won in November 2025",
      desc: "Our Senior Athletics and Cricket Squad dominated the Morena District and Chambal Division schools, clinching the prestigious gold trophy with an undefeated tournament streak.",
      quote: "Our players train under elite coaches on our sprawling campus athletic fields daily.",
      highlight: "State level training curriculum",
      color: "from-emerald-700 to-emerald-950",
      accent: "text-emerald-800 bg-emerald-50 border-emerald-200"
    },
    {
      id: "ach-4",
      title: "NCC & Scouts: Community Service Honors",
      subtitle: "एनसीसी और स्काउट्स सामुदायिक सेवा सम्मान",
      category: "Social Leadership",
      year: "Presented by Morena Collector",
      desc: "Oxford's dedicated National Cadet Corps (NCC) and Scouts wing were officially commended for their outstanding voluntary contributions to sanitation, tree plantations, and digital literacy seminars.",
      quote: "Character building is nothing without community dedication and active civic duties.",
      highlight: "Recognized as 'Best Voluntary School Squad'",
      color: "from-rose-800 to-rose-950",
      accent: "text-rose-800 bg-rose-50 border-rose-200"
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Gold Standard Laurels • उपलब्धियां
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our Hall of Outstanding Achievements
          </h2>
          <p className="text-rose-600 font-extrabold text-sm font-sans uppercase tracking-wider">
            "गौरवमयी यात्रा • प्रतिभा, परिश्रम और परिणाम"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            From coding software applications to winning major sports championships, we celebrate the absolute pinnacle of student dedication and mentor guidance.
          </p>
        </div>

        {/* Stack Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Navigation stack selector list */}
          <div className="lg:col-span-5 space-y-3.5">
            <p className="text-[10px] font-black tracking-widest font-mono text-slate-400 uppercase px-2">
              Select Achievement Stream
            </p>
            <div className="space-y-3">
              {achievements.map((item, idx) => (
                <button
                  id={`ach-btn-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all border flex items-center justify-between cursor-pointer group ${
                    activeIndex === idx
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-100"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                      activeIndex === idx ? "bg-white/10 text-white" : "bg-white text-slate-700 shadow-xs"
                    }`}>
                      {idx === 0 ? <Zap className="w-4 h-4" /> : idx === 1 ? <Award className="w-4 h-4" /> : idx === 2 ? <Trophy className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-wider opacity-60 font-mono text-indigo-500">{item.category}</p>
                      <p className="text-sm font-extrabold truncate mt-0.5">{item.title}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeIndex === idx ? "translate-x-1 opacity-100" : "opacity-40 group-hover:opacity-100"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive full-screen stack viewer */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {achievements.map((item, idx) => {
                if (idx !== activeIndex) return null;
                return (
                  <motion.div
                    id={`ach-panel-${item.id}`}
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm"
                  >
                    {/* Background visual watermarks */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-slate-200/40 rounded-full blur-3xl -z-10" />

                    {/* Metadata bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/55 pb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border tracking-wider font-mono ${item.accent}`}>
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-500 font-mono">{item.year}</span>
                      </div>
                      <span className="text-xs font-extrabold text-indigo-950 font-sans">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Body content */}
                    <div className="space-y-4">
                      <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="bg-white border border-slate-200/50 p-4.5 rounded-2xl italic text-xs md:text-sm text-slate-600 leading-relaxed font-sans relative">
                      <span className="text-4xl text-slate-200 font-serif absolute -top-1 left-2 pointer-events-none">“</span>
                      <p className="pl-6 relative z-10">{item.quote}</p>
                    </div>

                    {/* Spotlight key metric */}
                    <div className="flex items-center space-x-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 w-fit">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item.highlight}</span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
