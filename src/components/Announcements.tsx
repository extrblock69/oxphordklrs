import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Calendar, Sparkles, Filter, FileText, Megaphone, ArrowRight } from "lucide-react";

export default function Announcements() {
  const [activeFilter, setActiveFilter] = useState<"all" | "admission" | "academic" | "event">("all");

  const notices = [
    {
      id: "note-1",
      title: "Admissions Open for Session 2026-2027",
      subtitle: "प्रवेश प्रारंभ • सत्र २०२६-२०२७",
      category: "admission",
      date: "July 10, 2026",
      urgency: "High Priority",
      desc: "Enrollment is now active for Class 1 through Class 11 (Science and Commerce streams). Parents can calculate custom fee grants using our dynamic tuition estimator and register candidate records online immediately to reserve a seat.",
      action: "Calculate Fee Concessions"
    },
    {
      id: "note-2",
      title: "Oxford Annual Science & Robotics Fair",
      subtitle: "वार्षिक विज्ञान एवं रोबोटिक्स मेला",
      category: "event",
      date: "July 24, 2026",
      urgency: "Upcoming Event",
      desc: "Oxford's Science and Coding Guild is hosting a divisional level showcase. Students from nearby Madhya Pradesh sectors will present physics dioramas, web portals, and micro-robotics models. Parents are warmly invited to judge.",
      action: "Register Project Model"
    },
    {
      id: "note-3",
      title: "Quarterly Examination Schedule Released",
      subtitle: "त्रैमासिक परीक्षा समय-सारणी",
      category: "academic",
      date: "July 08, 2026",
      urgency: "Important Notice",
      desc: "Class 9 to 12 quarterly exams will commence from August 10, 2026. The specific chapter syllabi and test guidelines have been pinned on the physical board. Students must ensure 75% attendance for board clearance.",
      action: "Download Syllabus Sheet"
    },
    {
      id: "note-4",
      title: "Under-19 Cricket Academy Trials",
      subtitle: "क्रिकेट अकादमी ट्रायल एवं चयन",
      category: "event",
      date: "July 18, 2026",
      urgency: "Sports Action",
      desc: "Coaching audits and fitness trials for the Chambal Division inter-school cricket league selections will occur on our main playground at 3:30 PM. Players must carry their personal bat and sports clearance slips.",
      action: "Submit Athletic Clearance"
    }
  ];

  const filteredNotices = activeFilter === "all" ? notices : notices.filter(n => n.category === activeFilter);

  return (
    <section id="announcements" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Real-Time Bulletin • सूचना पट्ट
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Announcements & Notice Board
          </h2>
          <p className="text-rose-600 font-extrabold text-sm font-sans uppercase tracking-wider">
            "महत्वपूर्ण सूचनाएं और त्वरित अपडेट"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Stay completely updated with recent developments regarding registration deadlines, board exam timetables, science exhibitions, and athletic coaching leagues.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(["all", "admission", "academic", "event"] as const).map((filter) => (
            <button
              id={`announcement-filter-${filter}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer uppercase tracking-wider ${
                activeFilter === filter
                  ? "bg-blue-950 text-white border-blue-950 shadow-md shadow-blue-950/10"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {filter === "all" ? <Megaphone className="w-4 h-4" /> : filter === "admission" ? <Bell className="w-4 h-4" /> : filter === "academic" ? <FileText className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{filter === "all" ? "All Notices" : filter === "admission" ? "Admissions" : filter === "academic" ? "Academic" : "Events & Sports"}</span>
            </button>
          ))}
        </div>

        {/* Notices Board List */}
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredNotices.map((note) => (
              <motion.div
                id={note.id}
                key={note.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6.5 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
              >
                
                {/* Text Content */}
                <div className="space-y-3.5 flex-1">
                  
                  {/* Top line metadata */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border font-mono ${
                      note.category === "admission" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      note.category === "academic" ? "bg-blue-50 text-blue-950 border-blue-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {note.urgency}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{note.date}</span>
                    </span>
                  </div>

                  {/* Headings */}
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {note.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 italic">
                      {note.subtitle}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 font-sans leading-relaxed">
                    {note.desc}
                  </p>

                </div>

                {/* Interactive Action Button */}
                <button
                  id={`action-${note.id}`}
                  className="px-4.5 py-3 bg-white hover:bg-blue-950 hover:text-white transition-all text-blue-950 border border-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap shadow-xs cursor-pointer"
                >
                  <span>{note.action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
