import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Bookmark, 
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface SchoolEvent {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  category: "academic" | "sports" | "cultural" | "holiday" | "exam";
}

export default function EventsCalendar() {
  // Current date context is July 2026 according to system metadata
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed is 6)
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>("2026-07-10");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "2026-07-15",
    time: "10:00 AM",
    location: "",
    description: "",
    category: "academic" as const
  });

  // Default seeded events for July 2026
  const [events, setEvents] = useState<SchoolEvent[]>(() => {
    const saved = localStorage.getItem("oxford_calendar_events");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse calendar events", e);
      }
    }
    return [
      {
        id: "ev-1",
        name: "Admission Advisory & Counseling Drive",
        date: "2026-07-10",
        time: "09:00 AM - 01:00 PM",
        location: "Main Reception Hall & Audio-Visual Block",
        description: "Special localized counseling and dynamic fee concession calculation desk for parents of primary division candidates.",
        category: "academic"
      },
      {
        id: "ev-2",
        name: "Under-19 Cricket Selection Trials",
        date: "2026-07-18",
        time: "03:30 PM",
        location: "Oxford Main Athletic Ground",
        description: "Fitness audits and batting selection rounds for the upcoming Chambal Division inter-school tournament championship.",
        category: "sports"
      },
      {
        id: "ev-3",
        name: "Annual Robotics & Science Exhibition",
        date: "2026-07-24",
        time: "10:00 AM - 04:00 PM",
        location: "Senior Physics & Chemistry Wing Laboratories",
        description: "Division-level tech carnival showcasing AI models, automated drip irrigation prototypes, and science projects.",
        category: "cultural"
      },
      {
        id: "ev-4",
        name: "Class 9 to 12 Timetable Counseling",
        date: "2026-07-15",
        time: "11:30 AM",
        location: "Room 104 • Academic block",
        description: "Syllabus guidance seminar and blueprint mapping sessions for Class 9 to 12 ahead of August quarterly examinations.",
        category: "academic"
      },
      {
        id: "ev-5",
        name: "Kailaras Regional Cultural Meet Prep",
        date: "2026-07-28",
        time: "02:00 PM",
        location: "School Indoor Amphitheater",
        description: "Group folk-dance rehearsals, classical vocal training, and street-play scripts preparation for the regional MP Youth Festival.",
        category: "cultural"
      },
      {
        id: "ev-6",
        name: "Guru Purnima Commemoration Ceremony",
        date: "2026-07-29",
        time: "08:30 AM",
        location: "Assembly Grounds",
        description: "Special bilingual cultural morning dedicating respects to teachers and mentors with traditional hymns and award distributions.",
        category: "holiday"
      }
    ];
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper to get number of days in current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get day of the week for the 1st of current month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDateStr(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDateStr(null);
  };

  // Check if a day has events
  const getEventsForDay = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return events.filter(e => e.date === dateStr);
  };

  // Handle click on a calendar date
  const handleDayClick = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    setSelectedDateStr(dateStr === selectedDateStr ? null : dateStr);
  };

  // Add event handler
  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location) {
      setFormError("Please fill out all mandatory fields before registering.");
      return;
    }

    const createdEvent: SchoolEvent = {
      id: `ev-custom-${Date.now()}`,
      name: newEvent.name,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      description: newEvent.description || "No additional event details provided.",
      category: newEvent.category
    };

    const updatedEvents = [...events, createdEvent];
    setEvents(updatedEvents);
    localStorage.setItem("oxford_calendar_events", JSON.stringify(updatedEvents));

    // Reset Form
    setNewEvent({
      name: "",
      date: "2026-07-15",
      time: "10:00 AM",
      location: "",
      description: "",
      category: "academic"
    });
    setShowAddModal(false);
  };

  // Filter events based on selections
  const filteredEvents = events.filter((evt) => {
    // Category Filter
    if (activeCategoryFilter !== "all" && evt.category !== activeCategoryFilter) {
      return false;
    }
    // Date Selection Filter
    if (selectedDateStr && evt.date !== selectedDateStr) {
      return false;
    }
    return true;
  });

  // Sort upcoming events chronologically
  const upcomingChronologicalEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="calendar" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Visual background blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
          >
            Academic Planner • समय-सारणी एवं कार्यक्रम
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Oxford Campus Events Calendar
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-indigo-950 font-extrabold text-sm font-sans uppercase tracking-wider"
          >
            "संयोजन ही उत्कृष्ट प्रदर्शन का मार्ग प्रशस्त करता है"
          </motion.p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Stay aligned with upcoming science forums, soccer tournaments, board registration updates, and traditional cultural milestones curated weekly on our modern digital schedule board.
          </p>
        </div>

        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Grid Month Calendar (Col-Span-7) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100/80 rounded-3xl p-6.5 shadow-sm space-y-6">
            
            {/* Header controls */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider">Interactive Calendar</span>
                <h3 className="text-lg font-black text-slate-900">
                  {months[currentMonth]} {currentYear}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-slate-600 cursor-pointer transition-colors"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-slate-600 cursor-pointer transition-colors"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  id="btn-add-event"
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-black rounded-xl cursor-pointer transition-transform hover:scale-103 shadow-sm flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Propose Event</span>
                </button>
              </div>
            </div>

            {/* Days grid header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono font-black uppercase text-slate-400 pb-2 border-b border-slate-200/50">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Numbers Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Blank spacers for day alignments */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`spacer-${idx}`} className="aspect-square bg-slate-100/20 rounded-xl" />
              ))}

              {/* Number items */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const dayEvents = getEventsForDay(day);
                const hasEvents = dayEvents.length > 0;
                
                // Formulate key
                const formattedMonth = String(currentMonth + 1).padStart(2, "0");
                const formattedDay = String(day).padStart(2, "0");
                const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
                const isSelected = selectedDateStr === dateStr;
                const isToday = day === 10 && currentMonth === 6 && currentYear === 2026; // system date: July 10, 2026

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square rounded-xl p-1.5 flex flex-col justify-between items-center transition-all relative border cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-slate-900 text-white shadow-md scale-102"
                        : isToday
                        ? "bg-rose-50 border-rose-200 text-rose-900 ring-2 ring-rose-600/10 font-black"
                        : "bg-white border-slate-100 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    {/* Date Number */}
                    <span className="text-xs font-extrabold">{day}</span>

                    {/* Dot indicators */}
                    <div className="flex gap-0.5 justify-center mt-auto w-full">
                      {dayEvents.slice(0, 3).map((e, eIdx) => (
                        <span 
                          key={eIdx} 
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected 
                              ? "bg-white" 
                              : e.category === "academic" ? "bg-blue-900" :
                                e.category === "sports" ? "bg-amber-500" :
                                e.category === "cultural" ? "bg-indigo-600" :
                                e.category === "holiday" ? "bg-emerald-600" : "bg-rose-600"
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Badge text on hover/presence */}
                    {isToday && (
                      <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-rose-600 text-white font-bold px-1.5 rounded-full uppercase tracking-wider scale-90">
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Color key guide */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-slate-200/50 text-[10px] font-bold text-slate-500 font-mono justify-center">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-blue-900 rounded-full" />
                <span>Academic</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                <span>Sports Drill</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                <span>Exhibitions</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                <span>Culture / Holidays</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Schedule Board & Selected Events (Col-Span-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-lg space-y-6">
            
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-indigo-950" />
                  <span>Campus Bulletin Schedule</span>
                </h3>
                {selectedDateStr && (
                  <button 
                    onClick={() => setSelectedDateStr(null)}
                    className="text-[10px] text-rose-600 font-black hover:underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Dynamic filter bar inside list side */}
              <div className="flex flex-wrap gap-1">
                {(["all", "academic", "sports", "cultural", "holiday"] as const).map((cat) => (
                  <button
                    id={`calendar-cat-filter-${cat}`}
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border cursor-pointer ${
                      activeCategoryFilter === cat
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-2"
                  >
                    <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider">No Scheduled Events Found</p>
                    <p className="text-[10px] text-slate-400 font-sans max-w-xs mx-auto">
                      {selectedDateStr 
                        ? `There are no scheduled items registered on date ${selectedDateStr}. Click other dates or clear the selection filter.`
                        : "No events match your category selection criteria right now."}
                    </p>
                  </motion.div>
                ) : (
                  filteredEvents.map((evt) => (
                    <motion.div
                      id={`calendar-event-${evt.id}`}
                      key={evt.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="p-4 bg-slate-50/70 border border-slate-100 hover:border-slate-200/80 rounded-2xl transition-all space-y-3"
                    >
                      {/* Top Header line */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black uppercase tracking-widest font-mono px-2 py-0.5 rounded border ${
                          evt.category === "academic" ? "bg-blue-50 text-blue-900 border-blue-200" :
                          evt.category === "sports" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          evt.category === "cultural" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                          "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          {evt.category}
                        </span>
                        
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono font-bold">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>{evt.date}</span>
                        </div>
                      </div>

                      {/* Name & Desc */}
                      <div className="space-y-1">
                        <h4 className="text-xs md:text-sm font-black text-slate-900 leading-tight">
                          {evt.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      {/* Timing & Location indicators */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 text-[9px] font-bold text-slate-500 font-mono">
                        <div className="flex items-center space-x-1 min-w-0">
                          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{evt.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>

                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Quick stats counter */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono">
              <span>Total Board Events: {events.length}</span>
              <span className="text-blue-900">Oxford Kailaras Official</span>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Modal form to propose an event */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-6">
            <motion.div
              id="calendar-add-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6.5 max-w-lg w-full border border-slate-100 shadow-2xl space-y-6"
            >
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-blue-50 text-blue-900 rounded-xl">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Propose Campus Event</h3>
                    <p className="text-[10px] text-slate-400 font-medium font-sans">Submit schedule candidates for regional parent viewing</p>
                  </div>
                </div>
                <button
                  id="modal-close-btn"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-black text-slate-400 hover:text-slate-800 cursor-pointer"
                >
                  Close
                </button>
              </div>

              {formError && (
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-rose-800 text-[11px] font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleAddEventSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Event Name *</label>
                  <input
                    id="event-input-name"
                    type="text"
                    required
                    placeholder="e.g. Science Laboratory Workshop"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Date *</label>
                    <input
                      id="event-input-date"
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Time Frame *</label>
                    <input
                      id="event-input-time"
                      type="text"
                      required
                      placeholder="e.g. 10:00 AM - 12:30 PM"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Location Room *</label>
                    <input
                      id="event-input-location"
                      type="text"
                      required
                      placeholder="e.g. Physical Lab Annex"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Stream Category *</label>
                    <select
                      id="event-input-category"
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                      className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none bg-white"
                    >
                      <option value="academic">Academic</option>
                      <option value="sports">Sports Drill</option>
                      <option value="cultural">Exhibition & Cultural</option>
                      <option value="holiday">Holiday/Ceremony</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 font-mono mb-1.5">Brief Description</label>
                  <textarea
                    id="event-input-description"
                    rows={2}
                    placeholder="Provide highlights, dress code details, mandatory item permissions for children..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="btn-event-submit"
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-1.5 cursor-pointer transition-transform hover:scale-[1.01]"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Register New Calendar Entry</span>
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
