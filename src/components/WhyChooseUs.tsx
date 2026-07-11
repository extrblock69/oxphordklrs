import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, UserCheck, Dumbbell, Award, Flame, HeartHandshake, HelpCircle } from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      id: "why-safe",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "100% Secure & CCTV Campus",
      subtitle: "सुरक्षित और अनुशासित परिसर",
      desc: "Complete safety perimeter with continuous high-definition camera monitoring, standard gated check-ins, and proactive emergency care structures."
    },
    {
      id: "why-teachers",
      icon: <UserCheck className="w-5 h-5 text-blue-900" />,
      title: "Highly Qualified Core Faculty",
      subtitle: "अनुभवी एवं समर्पित शिक्षक",
      desc: "A passionate assembly of university-certified educators, trained extensively in progressive teaching methodologies and kid psychology."
    },
    {
      id: "why-sports",
      icon: <Dumbbell className="w-5 h-5 text-indigo-700" />,
      title: "Coached Athletic Leagues",
      subtitle: "व्यापक खेल-कूद एवं शारीरिक विकास",
      desc: "Regular sports drills, cricket training, gymnastics, and running tracks guided by certified PE trainers to stimulate coordination and focus."
    },
    {
      id: "why-merit",
      icon: <Award className="w-5 h-5 text-amber-600" />,
      title: "Science & Computer Labs",
      subtitle: "आधुनिक प्रयोगशालाएं",
      desc: "Interactive hands-on workspaces equipped with modern chemistry beakers, electricity experiment blocks, and full coding stations."
    },
    {
      id: "why-sanskriti",
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      title: "Character & Moral Studies",
      subtitle: "संस्कार और नैतिक शिक्षा",
      desc: "Weekly counseling and ethical standard seminars aimed at fostering empathy, discipline, respect for elders, and national pride."
    },
    {
      id: "why-fee",
      icon: <HeartHandshake className="w-5 h-5 text-purple-700" />,
      title: "Affordable Fee Architecture",
      subtitle: "वहनीय शुल्क संरचना",
      desc: "Quality higher-secondary learning should not burden your family budget. Sibling discounts and financial concessions are proudly available."
    }
  ];

  return (
    <section id="why-choose" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Fulfilling All Expectations • चयन का आधार
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Discerning Parents Choose Oxford
          </h2>
          <p className="text-blue-950 font-extrabold text-sm font-sans uppercase tracking-wider">
            "उत्कृष्ट शिक्षा, सुदृढ़ संस्कार • उज्जवल भविष्य का आधार"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            We provide a world-class holistic environment that ensures your child is academically brilliant, physically robust, technologically advanced, and ethically stellar.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              id={item.id}
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-2xl p-6.5 shadow-xs hover:shadow-md transition-all space-y-4 group hover:border-blue-900/10"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black uppercase text-indigo-800/80 font-mono">
                  {item.subtitle}
                </p>
                <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-950 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic bottom punch card */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900/40">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-extrabold">Ready to secure your child's seat for 2026-2027?</h4>
            <p className="text-xs text-slate-300 max-w-xl font-medium font-sans">
              Our seats fill up rapidly due to high-caliber performance rankings. Register interest online or schedule a physical school campus walk-through.
            </p>
          </div>
          <a
            href="#admissions"
            className="px-6 py-3 bg-white text-blue-950 text-xs font-black rounded-xl hover:bg-slate-100 cursor-pointer transition-transform hover:scale-105 shadow-md flex items-center space-x-1.5 whitespace-nowrap"
          >
            <span>Initiate Application</span>
          </a>
        </div>

      </div>
    </section>
  );
}
