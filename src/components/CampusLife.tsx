import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trophy, MapPin, School, Compass, Dumbbell } from "lucide-react";

export default function CampusLife() {
  const [selectedFacility, setSelectedFacility] = useState<string>("observatory");

  const facilities = [
    {
      id: "observatory",
      name: "Stellar Science Museum",
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      description: "Equipped with physics dioramas, chemical models, planetary charts, and weekly student exhibitions.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      stats: { highlight: "Student Supervised", schedule: "Open Daily: 2PM - 5PM" }
    },
    {
      id: "aquatics",
      name: "Sports Complex & Playground",
      icon: <Dumbbell className="w-5 h-5 text-blue-800" />,
      description: "An extensive multi-sport field hosting basketball courts, running tracks, and dynamic cricket pitches.",
      image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
      stats: { highlight: "Coached Training Systems", schedule: "Team Matches: 4PM - 6PM" }
    },
    {
      id: "coding",
      name: "Digital Smart Classroom Lab",
      icon: <Sparkles className="w-5 h-5 text-indigo-700" />,
      description: "A highly advanced computer center where students practice coding logic, office tools, and presentation slides.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
      stats: { highlight: "Broadband Enabled Systems", schedule: "Lab Access: 9AM - 4PM" }
    },
    {
      id: "theater",
      name: "Oxford Seminar & Cultural Hall",
      icon: <School className="w-5 h-5 text-rose-500" />,
      description: "A massive auditorium designed for annual gatherings, multi-school quizzes, elocution debates, and guest speaker assemblies.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      stats: { highlight: "Integrated Stereo Setup", schedule: "Events: Monthly Slots" }
    }
  ];

  const clubs = [
    { name: "Oxford Robotics & Coding Guild", desc: "Crafting innovative science exhibition models and learning basic programmatic controls." },
    { name: "Scouts, Guides & NCC wing", desc: "Fostering patriotism, emergency survival drills, social service, and leadership skills." },
    { name: "Symphonic Chamber & Vocal Club", desc: "Classical vocal lessons, traditional instruments practice, and massive festival performances." },
    { name: "Championship Elocution Society", desc: "Dynamic training in persuasive speaking, declamation contests, and active group discussions." },
  ];

  const currentFacility = facilities.find((f) => f.id === selectedFacility) || facilities[0];

  return (
    <section id="campus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Life Beyond the Classroom
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            An Enriching Student Experience
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            Our campus is designed to be a living ecosystem of intellectual pursuit, creative expression, athletic training, and collaborative community.
          </p>
        </div>

        {/* Dynamic Facility Explorer & Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick List (Col-Span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono mb-4 px-2">
              Explore Our Campus Hubs
            </h3>
            <div className="space-y-2">
              {facilities.map((fac) => (
                <button
                  id={`facility-tab-${fac.id}`}
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center space-x-4 cursor-pointer ${
                    selectedFacility === fac.id
                      ? "bg-blue-950 text-white border-blue-950 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-100"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${
                    selectedFacility === fac.id ? "bg-white/10 text-white" : "bg-white text-slate-700 shadow-sm"
                  }`}>
                    {fac.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{fac.name}</p>
                    <p className={`text-[11px] truncate ${selectedFacility === fac.id ? "text-slate-300" : "text-slate-500"}`}>
                      {fac.stats.highlight}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Showcase (Col-Span-8) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFacility}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6"
              >
                <div className="rounded-2xl overflow-hidden shadow-md aspect-21/9 relative border border-slate-200">
                  <img
                    src={currentFacility.image}
                    alt={currentFacility.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/20 shadow-sm">
                    {currentFacility.stats.schedule}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-900" />
                    <span className="text-xs font-black text-blue-900 uppercase tracking-widest font-mono">Location On-Campus</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">{currentFacility.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">{currentFacility.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Feature Highlight</span>
                    <p className="text-xs text-slate-800 font-bold mt-0.5">{currentFacility.stats.highlight}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Availability</span>
                    <p className="text-xs text-slate-800 font-bold mt-0.5">{currentFacility.stats.schedule}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Clubs & Athletics Block */}
        <div className="mt-20 pt-12 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 space-y-4">
              <div className="p-2 bg-amber-50 rounded-xl w-fit border border-amber-100">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Championship Athletics & Dynamic Clubs
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                Oxford English H.S. School encourages students to take risks, discover talents, and lead peers. We sponsor competitive clubs, traditional ensembles, and active sports teams.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clubs.map((club, idx) => (
                <div key={idx} className="bg-slate-50 hover:bg-blue-50/50 transition-all p-5 rounded-2xl border border-slate-100/50 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{club.name}</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">{club.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
