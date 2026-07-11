import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Mail, Star, BookOpen, GraduationCap } from "lucide-react";

export default function TopFaculties() {
  const faculties = [
    {
      id: "fac-1",
      name: "Mr. S.P. Rawat",
      role: "Founder & Managing Director",
      qualification: "M.Sc., B.Ed. • 25+ Years Experience",
      specialty: "Educational Leadership, Strategic Growth & Science Ethics",
      bio: "A visionary educationist who pioneered English-medium learning in Kailaras. Dedicated to building standard life values and digital literacy in rural MP.",
      badge: "संस्थापक मार्गदर्शक",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "fac-2",
      name: "Mrs. Anita Sharma",
      role: "School Principal",
      qualification: "M.A. (English), B.Ed. • 18+ Years Experience",
      specialty: "Linguistic Fluency, Academic Integrity & Public Speaking",
      bio: "An outstanding scholar in English literature. Anita leads our high academic pass rate, daily assemblies, and active student mental health programs.",
      badge: "प्रधानाचार्या",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "fac-3",
      name: "Mr. K.K. Kushwah",
      role: "HOD Science & Technology",
      qualification: "M.Sc. (Physics) • 12+ Years Experience",
      specialty: "Electromagnetism, Coding Logic & Science Exhibition Models",
      bio: "A rigorous mentor who guides the Oxford Robotics Guild. Under his guidance, students achieved consecutive MP State science awards.",
      badge: "विज्ञान विभागाध्यक्ष",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "fac-4",
      name: "Ms. Pooja Sikarwar",
      role: "Head of Primary Section",
      qualification: "B.A. (Child Psychology), B.El.Ed. • 8+ Years Experience",
      specialty: "Play-Way Pedagogy, Moral Science & Creative Arts",
      bio: "Pooja specializes in building high-concept bilingual foundations for young minds, integrating drawing, singing, and storytelling into core classes.",
      badge: "प्राथमिक विभाग प्रमुख",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section id="faculties" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Faculty Directory • अनुभवी शिक्षक
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Meet Our Distinguished Educators
          </h2>
          <p className="text-blue-950 font-extrabold text-sm font-sans uppercase tracking-wider">
            "शिक्षक राष्ट्र का निर्माता होता है • हमारे योग्य शिक्षक"
          </p>
          <p className="text-slate-500 font-sans text-xs md:text-sm max-w-2xl mx-auto">
            Our qualified teachers bring stellar expertise, empathetic counseling, and extensive hands-on industry techniques to make complex subjects simple and engaging for children.
          </p>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculties.map((fac, i) => (
            <motion.div
              id={fac.id}
              key={fac.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-xl transition-all flex flex-col justify-between group h-full"
            >
              <div className="space-y-4">
                
                {/* Photo frame */}
                <div className="rounded-2xl overflow-hidden aspect-square relative border-2 border-slate-100 group-hover:border-blue-900/10 transition-colors">
                  <img
                    src={imgReferenceFix(fac.image, fac.id)}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 grayscale-20 group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Decorative badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black text-blue-950 shadow-sm border border-slate-100">
                    {fac.badge}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                      {fac.name}
                    </h4>
                    <p className="text-[10px] text-blue-900 font-bold uppercase font-mono">{fac.role}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl space-y-1">
                    <p className="text-[9px] text-slate-500 font-mono font-bold leading-none flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-900" />
                      <span>{fac.qualification}</span>
                    </p>
                    <p className="text-[10px] text-slate-700 font-bold font-sans">
                      Focus: {fac.specialty}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
                    {fac.bio}
                  </p>
                </div>

              </div>

              {/* Action button */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Mentor</span>
                </span>
                <span className="text-blue-900 hover:underline cursor-pointer flex items-center gap-0.5">
                  Contact Profile
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Utility to handle image references safely
function imgReferenceFix(url: string, id: string) {
  return url;
}
