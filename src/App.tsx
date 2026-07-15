import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, GraduationCap, CheckCircle2, Clock, Trash2, Calendar, FileSpreadsheet, Star, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import SchoolStats from "./components/SchoolStats";
import Academics from "./components/Academics";
import CampusLife from "./components/CampusLife";
import WhyChooseUs from "./components/WhyChooseUs";
import StudentShowcase from "./components/StudentShowcase";
import TopFaculties from "./components/TopFaculties";
import AchievementsStack from "./components/AchievementsStack";
import Admissions from "./components/Admissions";
import Announcements from "./components/Announcements";
import EventsCalendar from "./components/EventsCalendar";
import ContactSection from "./components/ContactSection";
import AICounselor from "./components/AICounselor";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import LineSidebar from "./components/LineSidebar";
import { StudentApplication, Message } from "./types";
import Preloader from "./components/Preloader";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Preloader state
  const [loading, setLoading] = useState(true);

  // Theme state (light / dark)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("oxford_theme") as "light" | "dark" | null;
    return saved || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("oxford_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  
  // Applications list state with local storage persistence
  const [applications, setApplications] = useState<StudentApplication[]>(() => {
    const saved = localStorage.getItem("oxford_applications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse applications", e);
      }
    }
    // Pre-seed with one realistic beautiful demo record
    return [
      {
        id: "app-1",
        studentName: "Aarav Sharma",
        gradeLevel: "Class 9",
        parentName: "Ramesh Sharma",
        parentEmail: "ramesh.sharma@example.com",
        interests: ["Robotics & Science Exhibition", "Symphonic Instrumental Club"],
        notes: "Interested in secondary science streams and state level sports coaching leagues.",
        status: "Under Review",
        createdAt: new Date().toLocaleDateString(),
      }
    ];
  });

  // Chat message logs state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "model",
      content: "Hello! Welcome to Oxford English H.S. School, Kailaras. I am your AI Virtual Admissions Counselor. How can I assist you today? I can help estimate structural fees, explain our Science, Commerce and Computer streams, outline co-curricular science exhibition events, or walk you through the digital admissions application process!",
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync applications to local storage
  useEffect(() => {
    localStorage.setItem("oxford_applications", JSON.stringify(applications));
  }, [applications]);

  // Track active section on scroll to update Navbar indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", navId: "home" },
        { id: "about", navId: "about" },
        { id: "stats", navId: "about" },
        { id: "why-choose", navId: "about" },
        { id: "academics", navId: "academics" },
        { id: "campus", navId: "academics" },
        { id: "students", navId: "academics" },
        { id: "faculties", navId: "academics" },
        { id: "achievements", navId: "academics" },
        { id: "admissions", navId: "admissions" },
        { id: "announcements", navId: "announcements" },
        { id: "calendar", navId: "calendar" },
        { id: "chat", navId: "chat" },
        { id: "contact", navId: "contact" }
      ];
      
      const scrollPosition = window.scrollY + 220; // safe buffer for nav header height

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.navId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleOpenApplyPortal = () => {
    handleNavigate("admissions");
    // Pulse or focus on application card
    const formInput = document.getElementById("input-student-name");
    if (formInput) {
      setTimeout(() => {
        formInput.focus();
      }, 800);
    }
  };

  const handleAddApplication = (newApp: Omit<StudentApplication, "id" | "status" | "createdAt">) => {
    const fresh: StudentApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      status: "Received",
      createdAt: new Date().toLocaleDateString()
    };
    setApplications((prev) => [fresh, ...prev]);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  // Simulate moving status for engaging demonstration
  const handleSimulateReview = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const nextStatusMap: Record<string, StudentApplication["status"]> = {
          "Received": "Under Review",
          "Under Review": "Interview Scheduled",
          "Interview Scheduled": "Approved",
          "Approved": "Received"
        };
        return {
          ...app,
          status: nextStatusMap[app.status] || "Received"
        };
      })
    );
  };

  // AI Counselor API Caller
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // Build conversation payload for express /api/chat route
      const conversationHistory = [...chatMessages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory })
      });

      if (!res.ok) {
        throw new Error("Admissions API response failure");
      }

      const data = await res.json();
      
      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: "model",
        content: data.text,
        timestamp: new Date()
      };

      setChatMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      // Fallback message
      const fallbackMsg: Message = {
        id: `model-error-${Date.now()}`,
        role: "model",
        content: "I apologize, but my advanced server link is currently taking a short recess. However, as Oxford English School Counselor, let me remind you that admission is open! Our annual base school fee is ₹18,000, with sibling discounts and sports concessions available. Let me know if you would like me to discuss specific athletics or science exhibition opportunities!",
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 pointer-events-auto"
        >
          <Preloader onComplete={() => setLoading(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-900 selection:text-white antialiased transition-colors duration-200"
        >
      
      {/* Floating Desktop Quick-Links Navigation Rail */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-white/80 dark:bg-[#111b36]/85 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 flex-col items-start w-48 pointer-events-auto transition-colors duration-200">
        <div className="mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80 w-full">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-900 dark:text-blue-300 font-mono">Quick Navigation</p>
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Oxford School • Kailaras</p>
        </div>
        <LineSidebar
          items={["Home", "About", "Academics", "Admissions", "Notice Board", "Events", "Contact Us", "AI Counselor"]}
          activeItemIndex={["home", "about", "academics", "admissions", "announcements", "calendar", "contact", "chat"].indexOf(activeSection)}
          accentColor={theme === "dark" ? "#60a5fa" : "#1e3a8a"}
          textColor={theme === "dark" ? "#94a3b8" : "#475569"}
          markerColor={theme === "dark" ? "#334155" : "#cbd5e1"}
          showIndex={true}
          showMarker={true}
          proximityRadius={100}
          maxShift={10}
          falloff="smooth"
          fontSize={0.75}
          itemGap={10}
          onItemClick={(index) => {
            const sectionIds = ["home", "about", "academics", "admissions", "announcements", "calendar", "contact", "chat"];
            const targetId = sectionIds[index];
            if (targetId) {
              handleNavigate(targetId);
            }
          }}
        />
      </div>

      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenApplication={handleOpenApplyPortal}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Pages Stack */}
      <main className="space-y-0">
        
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigate}
          onOpenApplication={handleOpenApplyPortal}
        />

        {/* About Section */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <AboutSection />
        </ScrollReveal>

        {/* Statistics subsection */}
        <ScrollReveal preset="scale" duration={0.7} delay={0.1}>
          <SchoolStats />
        </ScrollReveal>

        {/* Academics Showcase */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <Academics />
        </ScrollReveal>

        {/* Campus Life and Facilities */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <CampusLife />
        </ScrollReveal>

        {/* Why Choose Us */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <WhyChooseUs />
        </ScrollReveal>

        {/* Student Showcase */}
        <ScrollReveal preset="scale" duration={0.7}>
          <StudentShowcase />
        </ScrollReveal>

        {/* Top Faculties */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <TopFaculties />
        </ScrollReveal>

        {/* Achievements Stack */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <AchievementsStack />
        </ScrollReveal>

        {/* Admissions, Estimator, and application Submission */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <Admissions
            applications={applications}
            onSubmitApplication={handleAddApplication}
            isPortalOpen={activeSection === "admissions"}
          />
        </ScrollReveal>

        {/* Application Live Tracker Monitoring Dashboard */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <section className="py-12 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-blue-900">
                    <FileSpreadsheet className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest font-mono">Admission Console</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Your Candidate Admissions Monitor</h3>
                  <p className="text-xs text-slate-500 font-medium">Click "Simulate Action" to cycle the evaluation status</p>
                </div>

                {/* Status helper guide */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span className="text-slate-400">Stages:</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">Received</span>
                  <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-100">Under Review</span>
                  <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-100">Interview</span>
                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">Approved</span>
                </div>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500">No Candidate Application Records Registered Yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                    Fill out and submit the application form in the admissions portal above to test the real-time reviewer monitor.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {applications.map((app) => (
                      <motion.div
                        id={`application-card-${app.id}`}
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all relative overflow-hidden group"
                      >
                        {/* Top bar with candidate name */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-black text-slate-400 font-mono uppercase">Candidate Record</p>
                            <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{app.studentName}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold">{app.gradeLevel}</p>
                          </div>

                          {/* Status badges */}
                          <div className="text-right">
                            <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              app.status === "Received" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                              app.status === "Under Review" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                              app.status === "Interview Scheduled" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                              "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            }`}>
                              {app.status}
                            </span>
                            <p className="text-[9px] text-slate-400 font-mono mt-1">Submitted {app.createdAt}</p>
                          </div>
                        </div>

                        {/* Parent details info */}
                        <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs">
                          <p className="text-[10px] font-bold text-slate-400 uppercase font-mono">Parent Contact</p>
                          <p className="text-slate-800 font-bold">{app.parentName}</p>
                          <p className="text-slate-500 font-medium truncate">{app.parentEmail}</p>
                        </div>

                        {/* Interests / Co-curricular focuses */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase font-mono">Enrolled Intersect</p>
                          <div className="flex flex-wrap gap-1">
                            {app.interests.map((int, i) => (
                              <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                {int}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom actions block */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <button
                            id={`simulate-review-btn-${app.id}`}
                            onClick={() => handleSimulateReview(app.id)}
                            className="text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center space-x-1"
                          >
                            <Activity className="w-3.5 h-3.5" />
                            <span>Simulate Action</span>
                          </button>

                          <button
                            id={`delete-app-btn-${app.id}`}
                            onClick={() => handleDeleteApplication(app.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Candidate Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

            </div>
          </section>
        </ScrollReveal>

        {/* AI Counselor Live Panel */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <AICounselor
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
          />
        </ScrollReveal>

        {/* Announcements notice board */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <Announcements />
        </ScrollReveal>

        {/* Interactive Campus Events Calendar */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <EventsCalendar />
        </ScrollReveal>

        {/* Professional Contact Section */}
        <ScrollReveal preset="slide-up" duration={0.8}>
          <ContactSection />
        </ScrollReveal>

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </motion.div>
    )}
    </AnimatePresence>
  );
}
