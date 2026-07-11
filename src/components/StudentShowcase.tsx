import React from "react";
import { motion } from "motion/react";
import { Award, Star, Trophy, Target, Sparkles } from "lucide-react";

export default function StudentShowcase() {
  const students = [
    {
      id: "stud-1",
      name: "Devendra Rawat",
      class: "Class 12 (Science Streams)",
      achievement: "97.8% Score in MP State Board Exam",
      desc: "An aspiring Aerospace Engineer who consistently ranked 1st across the Morena division. Devendra credits Oxford's weekly mentorship program for his board success.",
      role: "Academic Topper",
      badge: "प्रतिभाशाली छात्र",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      icon: <Award className="w-4 h-4 text-amber-500" />
    },
    {
      id: "stud-2",
      name: "Anjali Kushwah",
      class: "Class 10 (Secondary division)",
      achievement: "State Science Fair Gold Medalist",
      desc: "Designed and prototyped a solar-powered smartphone and agricultural battery charging unit to assist local farmers. Winner of the prestigious State Young Scientist Award.",
      role: "Science Innovation Lead",
      badge: "नवाचारी वैज्ञानिक",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      icon: <Sparkles className="w-4 h-4 text-blue-800" />
    },
    {
      id: "stud-3",
      name: "Raghav Bhadoria",
      class: "Class 11 (Commerce & Humanities)",
      achievement: "Under-19 State Cricket Captain",
      desc: "Led the Chambal division cricket academy squad to victory. Scored 3 consecutive centuries in state-wide tournaments while maintaining a stellar academic scorecard.",
      role: "Athletics Captain",
      badge: "खिलाड़ी और कप्तान",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      icon: <Trophy className="w-4 h-4 text-indigo-700" />
    },
    {
      id: "stud-4",
      name: "Kavita Sikarwar",
      class: "Class 9 (Junior division)",
      achievement: "Best Cadet Award - District NCC Wing",
      desc: "Awarded 'Best Junior Cadet' by the District Collector for leading community hygiene drives, rescue simulation exercises, and outstanding parade drilling.",
      role: "Youth NCC Commander",
      badge: "अनुशासन एवं नेतृत्व",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      icon: <Target className="w-4 h-4 text-rose-600" />
    }
  ];

  return (
    <section id="students" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Student Showcase • होनहार छात्र
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our Shining Stars & Leaders
          </h2>
          <p className="text-blue-950 font-extrabold text-sm font-sans uppercase tracking-wider">
            "जब मेहनत रंग लाती है, तो सफलता शोर मचाती है"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Meet the exceptional young minds of Oxford English H.S. School who are actively reshaping local benchmarks in engineering science, sportsmanship, academic excellence, and state leadership.
          </p>
        </div>

        {/* Students list layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {students.map((student, i) => (
            <motion.div
              id={student.id}
              key={student.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-5 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between group h-full"
            >
              <div className="space-y-4">
                
                {/* Photo with modern frame */}
                <div className="rounded-2xl overflow-hidden aspect-4/3 relative border-2 border-white shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-900 shadow-sm flex items-center gap-1.5 border border-slate-100">
                    {student.icon}
                    <span>{student.role}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">{student.class}</p>
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded uppercase font-sans">
                      {student.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                    {student.name}
                  </h4>
                  <p className="text-xs text-blue-900 font-extrabold font-mono tracking-tight leading-none pt-1">
                    {student.achievement}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                    {student.desc}
                  </p>
                </div>

              </div>

              {/* Verified Badge */}
              <div className="pt-4 border-t border-slate-200/50 mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono">
                <span>Certified Scholar</span>
                <span className="text-emerald-600 font-bold uppercase">● Oxford Star</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
