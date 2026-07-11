import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, BookmarkCheck, PhoneCall } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
  createdAt: string;
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Class 1");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [savedInquiries, setSavedInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem("oxford_inquiries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse inquiries", e);
      }
    }
    return [];
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const fresh: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      grade,
      message,
      createdAt: new Date().toLocaleString()
    };

    const updated = [fresh, ...savedInquiries];
    setSavedInquiries(updated);
    localStorage.setItem("oxford_inquiries", JSON.stringify(updated));

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setGrade("Class 1");
    setMessage("");

    // Show Toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Get In Touch • संपर्क करें
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Contact Our Admissions Office
          </h2>
          <p className="text-blue-950 font-extrabold text-sm font-sans uppercase tracking-wider">
            "हमसे संपर्क करें • आपकी सेवा में सदैव तत्पर"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Have questions about sports trials, admission registration fees, curriculum syllabi, or school transport routes? File an instant digital inquiry below.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Credentials (Col-Span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Direct Communication Hub
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Connect with our front desk staff during regular working hours. We are committed to responding to digital inquiries within 12 business hours.
              </p>
            </div>

            {/* Visual credential blocks */}
            <div className="space-y-4">
              
              {/* Phone */}
              <div className="flex items-start space-x-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 font-mono">Admission Hotline</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">+91 94251 34956</p>
                  <p className="text-[11px] text-slate-500 font-semibold font-sans mt-0.5">Direct Campus Front-desk Manager</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-100 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 font-mono">Official Email</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">oxford.kailaras@gmail.com</p>
                  <p className="text-[11px] text-slate-500 font-semibold font-sans mt-0.5">Direct administrative desk channels</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <div className="p-2.5 bg-indigo-50 text-indigo-950 rounded-xl border border-indigo-100 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 font-mono">Campus Address</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">Oxford School, MS Road, Kailaras</p>
                  <p className="text-[11px] text-slate-500 font-semibold font-sans mt-0.5">Morena Division, Madhya Pradesh - 476224</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 font-mono">Office Timings</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">Monday to Saturday: 8AM - 2PM</p>
                  <p className="text-[11px] text-slate-500 font-semibold font-sans mt-0.5">Closed on National holidays & Sundays</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Dynamic Inquiry Form (Col-Span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg space-y-6">
            
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg">Interactive Inquiry Registrar</h3>
                <p className="text-xs text-slate-500 font-medium">Have your questions answered directly by administrative gurus</p>
              </div>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Parent / Visitor Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sikarwar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Expected Class Level</label>
                  <select
                    id="contact-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none bg-white"
                  >
                    <option value="Primary Division (1 to 5)">Primary Division (Class 1 to 5)</option>
                    <option value="Middle Division (6 to 8)">Middle Division (Class 6 to 8)</option>
                    <option value="Secondary Level (9 & 10)">Secondary Level (Class 9 & 10)</option>
                    <option value="Class 11 (Science Streams)">Class 11 Science (PCM / PCB)</option>
                    <option value="Class 11 (Commerce Stream)">Class 11 Commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Detailed Question / Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  placeholder="Inquire about school bus routes, custom hostel options, biology lab setups, or state athletic scholarships..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                />
              </div>

              <button
                id="submit-contact-form"
                type="submit"
                className="w-full bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-950 hover:to-slate-950 text-white text-xs font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Digital Inquiry Sheet</span>
              </button>
            </form>

            {/* Inquiry Success Toast */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  id="inquiry-toast-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Inquiry Logged Successfully!</p>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-sans">
                      Our front office has successfully registered your sheet in our system. A committee advisor will dial your number or reply to your email address shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Displaying Live Logged Inquiries (Simulated admin console) */}
            {savedInquiries.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3.5">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-mono">
                  Active Logged Inquiries ({savedInquiries.length})
                </p>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                  {savedInquiries.map((inq) => (
                    <div key={inq.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] font-semibold text-slate-700 flex justify-between items-center">
                      <div>
                        <p className="text-slate-900 font-extrabold">{inq.name} ({inq.grade})</p>
                        <p className="text-[10px] text-slate-400 font-medium">Logged {inq.createdAt}</p>
                      </div>
                      <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-bold uppercase">
                        Pending Advisor Call
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
