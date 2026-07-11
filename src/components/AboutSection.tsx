import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, School, Landmark, Calendar, Target, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"who" | "legacy" | "values">("who");

  const images = [
    {
      url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
      caption: "Interactive Learning Culture",
    },
    {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
      caption: "World-Class Science Pedagogy",
    },
    {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      caption: "Next-Gen Computer Literacy",
    }
  ];

  const tabContents = {
    who: {
      tagline: "विद्या ददाति विनयम् • विनम्रता और ज्ञान ही हमारा मूल आधार है",
      title: "Pioneering Futuristic Education in Kailaras",
      description: "Oxford English Higher Secondary School, Kailaras is a premier English-medium educational sanctuary in the Morena district of Madhya Pradesh. Established to bridge regional traditional ethics with state-of-the-art technological advancement, we empower pupils from Grades 1 to 12. More than a school, we are a crucible where dreams are turned into tangible reality.",
      bullets: [
        "Modern CBSE/State aligned bilingual curriculum",
        "Immersive smart-classroom infrastructure",
        "Deeply rooted moral foundation and ethical responsibility",
        "Distinguished mentorship and personalized feedback"
      ],
      icon: <School className="w-5 h-5 text-blue-900" />
    },
    legacy: {
      tagline: "विश्वास और गुणवत्ता • दो दशकों से अधिक का उत्कृष्ट इतिहास",
      title: "Our Glorious Legacy of Academic Triumph",
      description: "For over two decades, Oxford has served as the academic lighthouse of the Kailaras community. From humble beginnings, we have expanded into a sprawling futuristic campus featuring advanced chemistry and physics modules, high-bandwidth computing zones, and robust athletic arenas. We don't just teach the syllabus—we write stories of national success.",
      bullets: [
        "20+ years of educational excellence in Morena",
        "Alumni placed in elite tech, administrative, and engineering sectors",
        "Consistently recognized with district-level educational laurels",
        "Undisputed 100% Board Pass Rate benchmark yearly"
      ],
      icon: <Landmark className="w-5 h-5 text-indigo-950" />
    },
    values: {
      tagline: "चरित्र निर्माण • संस्कार, संस्कृति और समर्पण ही हमारा मंत्र है",
      title: "Our Values: Sanskriti, Gyaan, and Pratibha",
      description: "Our philosophy is built on three pillars of human advancement: Gyaan (In-depth knowledge), Sanskriti (Rich cultural heritage), and Pratibha (Inherent individual genius). We foster a culture where student mental health, sportsmanship, and creative pursuits are given equal weight with scientific equations and mathematical logic.",
      bullets: [
        "Sanskriti (संस्कृति) — Staying rooted to our ancestral values",
        "Gyaan (ज्ञान) — Experiencing absolute cognitive freedom",
        "Pratibha (प्रतिभा) — Celebrating and amplifying native talents",
        "Desh-Prem (देश-प्रेम) — Fostering deep patriotic civic duty"
      ],
      icon: <Heart className="w-5 h-5 text-rose-600" />
    }
  };

  const currentTab = tabContents[activeTab];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
          >
            Introducing Our Sanctuary • परिचय
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Oxford English Higher Secondary School
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-blue-900 font-extrabold text-sm md:text-base font-sans"
          >
            "संस्कार और आधुनिक तकनीक का सर्वोत्तम संगम"
          </motion.p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Discover a learning atmosphere that respects regional Indian values while enabling global exposure. We prepare future scientists, writers, and leaders to take on global challenges.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Tabbed Definition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tab Buttons */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
              {(["who", "legacy", "values"] as const).map((tab) => (
                <button
                  id={`about-tab-${tab}`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-blue-950 shadow-md border-b border-slate-100"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "who" ? "About School" : tab === "legacy" ? "Our Legacy" : "Core Values"}
                </button>
              ))}
            </div>

            {/* Tab Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Hindi Tagline */}
                <div className="flex items-center space-x-2 text-rose-600 bg-rose-50/50 border border-rose-100/50 px-3.5 py-2 rounded-xl w-fit">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-tight">{currentTab.tagline}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight flex items-center gap-2.5">
                    <span className="p-2 bg-slate-50 rounded-xl border border-slate-100">{currentTab.icon}</span>
                    {currentTab.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans pt-2">
                    {currentTab.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 pt-2">
                  {currentTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm font-semibold text-slate-700">
                      <div className="h-4.5 w-4.5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5 p-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-900" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Column: Dynamic Slider & Map Frame */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photo Stack */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl space-y-3 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block px-1">
                Life on Campus • झलकियां
              </span>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="space-y-1 group">
                    <div className="rounded-xl overflow-hidden aspect-square border-2 border-white shadow-sm relative">
                      <img 
                        src={img.url} 
                        alt={img.caption} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 text-center leading-tight truncate">{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Frame */}
            <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-900">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">Campus Location Map</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Kailaras, Morena, Madhya Pradesh 476224</p>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                  Active Link
                </span>
              </div>

              {/* Interactive Iframe Map Container with futuristic tech border */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-16/9 bg-slate-50 shadow-inner relative group">
                <iframe
                  id="google-maps-frame"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.591321453472!2d77.6119106!3d26.305086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397148ef8b5ab3db%3A0xe67efec368a4b0fc!2sOxford%20English%20Higher%20Secondary%20School%2C%20Kailaras!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Oxford English School Kailaras Map"
                  className="grayscale-30 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Map Info details */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 font-sans">
                <span className="font-semibold">Near MS Road, Sabalgarh Highway</span>
                <a 
                  href="https://maps.app.goo.gl/9R6K1GWh9YFpZtPj7" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-900 font-black hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Open in Maps
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
