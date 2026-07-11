import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Music, Globe, BookOpen, Layers, CheckCircle, ArrowRight, FlaskConical, Award } from "lucide-react";

export default function Academics() {
  const [activeTab, setActiveTab] = useState<"stem" | "arts" | "humanities" | "languages" >("stem");

  const academicData = {
    stem: {
      title: "Science, Technology, Engineering & Mathematics (STEM)",
      icon: <Cpu className="w-5 h-5 text-blue-900" />,
      description: "Preparing students for a digital, science-driven future through practical hands-on experimentation, programming logic, and school laboratory investigations.",
      courses: [
        "Physics, Chemistry & Biology Labs",
        "Introduction to Computer Applications & Coding",
        "Elementary Robotics & Electronics Foundations",
        "Advanced Mathematics & Calculus streams",
        "Environmental Science & Sustainable Projects",
      ],
      highlight: "Our science programs feature highly active participation in State and National Science Exhibition events.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      spotlight: "Oxford Robotics & Coding Guild secured multiple top-tier state-level science awards."
    },
    arts: {
      title: "Fine, Performing & Creative Arts Academy",
      icon: <Music className="w-5 h-5 text-indigo-950" />,
      description: "Unleashing creative potential through standard classical practices, fine arts instruction, music, public drama, and cultural festival performances.",
      courses: [
        "Vocal & Instrumental Music Training",
        "Traditional Dance & Theatre Performance",
        "Drawing, Sketching & Canvas painting",
        "Crafting, Origami & Sculpting Foundations",
        "Creative Design & School Magazine Illustration",
      ],
      highlight: "Every year, Oxford organizes massive inter-school cultural contests to host masterclasses with professional mentors.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800",
      spotlight: "Our cultural dance troupe won the highest honors at the State Republic Day parade exhibition."
    },
    humanities: {
      title: "Commerce, Humanities & General Studies",
      icon: <BookOpen className="w-5 h-5 text-amber-700" />,
      description: "Developing robust reading comprehension, commercial accounting fluency, political history empathy, and eloquent public speaking skills.",
      courses: [
        "Accountancy & Business Economics studies",
        "History, Civics, Geography & Social Studies",
        "English Grammar & Advanced Creative Writing",
        "Public Speaking, Group Debates & Logic Studies",
        "Moral Sciences & Civic Ethics Foundations",
      ],
      highlight: "The humanities and commerce streams equip students with outstanding management, financial arithmetic, and business strategy foundations.",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800",
      spotlight: "The Oxford Orators Society won the Inter-District English Debate Championship."
    },
    languages: {
      title: "Global Languages & Intercultural Studies",
      icon: <Globe className="w-5 h-5 text-emerald-800" />,
      description: "Building true multilingual mastery, excellent communication skills, and native-level fluency in English, Hindi, and classical languages.",
      courses: [
        "Advanced English Literature & Speech Delivery",
        "Hindi Literature & Creative Poetry streams",
        "Sanskrit Foundations & Historical Contexts",
        "Public Elocution & Eloquent Essay Writing",
        "Bilingual Communications & Leadership Seminars",
      ],
      highlight: "Oxford offers comprehensive language-lab training for grammar perfection and standard accent training.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      spotlight: "100% of our secondary grade students achieve top certification in the English Speaking Union metrics."
    }
  };

  const tabs = [
    { id: "stem" as const, label: "STEM Academy", icon: <Cpu className="w-4 h-4" /> },
    { id: "arts" as const, label: "Arts & Music", icon: <Music className="w-4 h-4" /> },
    { id: "humanities" as const, label: "Commerce & Humanities", icon: <BookOpen className="w-4 h-4" /> },
    { id: "languages" as const, label: "Language Mastery", icon: <Globe className="w-4 h-4" /> }
  ];

  const current = academicData[activeTab];

  return (
    <section id="academics" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Intellectual Rigor & Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Our Prestigious Academic Curriculums
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            Our comprehensive educational pathways are custom designed to nurture brilliant problem solvers, creative pioneers, and moral leaders.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              id={`tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-950 text-white border-blue-950 shadow-md shadow-blue-950/10"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Core detail column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    {current.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                    {current.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                  {current.description}
                </p>

                {/* Courses Offered */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">
                    Featured Curriculum
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.courses.map((course, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-blue-900 flex-shrink-0" />
                        <span className="font-medium">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Academic Highlights & Spotlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-800">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">Excellence Spotlight</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {current.spotlight}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-indigo-900">
                      <FlaskConical className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">Hands-on Focus</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {current.highlight}
                    </p>
                  </div>
                </div>

              </div>

              {/* Photo spotlight column */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 relative group border-4 border-white">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-blue-300">Experience Academics</p>
                    <h4 className="text-sm font-bold mt-1">Innovative learning environments designed to inspire.</h4>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
