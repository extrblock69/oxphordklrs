import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Users, Trophy, Computer, Sparkles, Award } from "lucide-react";

export default function SchoolStats() {
  const stats = [
    {
      id: "stat-pass",
      value: "100%",
      label: "Board Pass Rate",
      desc: "Our annual secondary state merit pass results",
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      badge: "National Standard",
      bg: "bg-emerald-50/40 border-emerald-100"
    },
    {
      id: "stat-ratio",
      value: "15:1",
      label: "Student-Teacher Ratio",
      desc: "Ensuring highly personalized classroom feedback",
      icon: <Users className="w-5 h-5 text-blue-900" />,
      badge: "Guaranteed Focus",
      bg: "bg-blue-50/40 border-blue-100"
    },
    {
      id: "stat-tech",
      value: "24+",
      label: "Smart Classrooms & Labs",
      desc: "Immersive coding hubs and physical science systems",
      icon: <Computer className="w-5 h-5 text-indigo-700" />,
      badge: "Bilingual Smart Tech",
      bg: "bg-indigo-50/40 border-indigo-100"
    },
    {
      id: "stat-trophy",
      value: "15+",
      label: "Inter-School Sports Titles",
      desc: "State-level cricket championships and athletic victories",
      icon: <Trophy className="w-5 h-5 text-amber-600" />,
      badge: "Khel-Kood (खेल-कूद)",
      bg: "bg-amber-50/40 border-amber-100"
    }
  ];

  return (
    <section id="stats" className="py-16 bg-slate-50 border-y border-slate-100/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Statistics Head tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest font-mono text-blue-900 uppercase">
              By The Numbers • आंकड़े
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
              A Culture of Stellar Milestones
            </h3>
            <p className="text-xs text-slate-500 font-medium font-sans">
              Every statistic represents our commitment to creating high-caliber global citizens.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-indigo-950 bg-indigo-50 px-4 py-2.5 rounded-2xl border border-indigo-100/50 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-900 animate-pulse" />
            <span>Tagline: "सफलता हमारी आदत है, और शिक्षा हमारा संकल्प"</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              id={stat.id}
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl border bg-white ${stat.bg} shadow-sm hover:shadow-md transition-all space-y-4`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-white rounded-xl border shadow-xs">
                  {stat.icon}
                </div>
                <span className="text-[9px] uppercase font-black text-slate-500 bg-white px-2 py-0.5 rounded-md border font-mono">
                  {stat.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display block">
                  {stat.value}
                </span>
                <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                  {stat.label}
                </span>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
