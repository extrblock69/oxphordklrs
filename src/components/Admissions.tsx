import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Send, CheckCircle2, AlertCircle, FileText, Landmark, Clock, ArrowRight } from "lucide-react";
import { StudentApplication, EstimatorInput, TuitionEstimate } from "../types";

interface AdmissionsProps {
  applications: StudentApplication[];
  onSubmitApplication: (app: Omit<StudentApplication, "id" | "status" | "createdAt">) => void;
  isPortalOpen: boolean;
  onClosePortal?: () => void;
}

export default function Admissions({ applications, onSubmitApplication, isPortalOpen, onClosePortal }: AdmissionsProps) {
  // Tuition Calculator State
  const [income, setIncome] = useState<number>(180000);
  const [siblings, setSiblings] = useState<number>(0);
  const [academicMerit, setAcademicMerit] = useState<boolean>(false);
  const [athleticMerit, setAthleticMerit] = useState<boolean>(false);

  // Application Form State
  const [studentName, setStudentName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Class 9");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);

  const interestOptions = ["Robotics & Science Exhibition", "Symphonic Instrumental Club", "Elocution & Debate", "Traditional Dance & Singing", "Sports & Athletics League", "Painting & Fine Arts"];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Perform Tuition Aid calculation
  const calculateTuition = (): TuitionEstimate => {
    const baseTuition = 18000;
    let aidAwarded = 0;
    const explanation: string[] = [];

    // Financial aid scaling based on income (INR)
    if (income < 100000) {
      aidAwarded += 12000;
      explanation.push("Opportunity Grant: Supported school funding based on annual household income < ₹1,00,000.");
    } else if (income < 250000) {
      aidAwarded += 8000;
      explanation.push("Oxford Access Scholarship: Standard middle-income fee concession.");
    } else if (income < 400000) {
      aidAwarded += 4000;
      explanation.push("Oxford Catalyst Fellowship: Merit-income supportive tuition aid.");
    }

    // Sibling discount (5% off base tuition per sibling, max 15%)
    if (siblings > 0) {
      const discountCount = Math.min(siblings, 3);
      const discountAmt = baseTuition * (discountCount * 0.05);
      aidAwarded += discountAmt;
      explanation.push(`Sibling Discount: ${discountCount * 5}% discount applied for enrolling multiple children.`);
    }

    // Merit additions
    if (academicMerit) {
      aidAwarded += 2500;
      explanation.push("Academic Excellence Award: Awarded to exceptional standard exam scorers.");
    }
    if (athleticMerit) {
      aidAwarded += 1500;
      explanation.push("Sports Fellowship: Encouraging student athletes with direct fee concessions.");
    }

    // Safeguard total aid not exceeding base tuition
    aidAwarded = Math.min(aidAwarded, baseTuition);
    const finalTuition = baseTuition - aidAwarded;

    return {
      baseTuition,
      aidAwarded,
      finalTuition,
      explanation: explanation.length > 0 ? explanation : ["No custom fee grants applied. Base school rate applies."]
    };
  };

  const estimate = calculateTuition();

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentName || !parentEmail) return;

    onSubmitApplication({
      studentName,
      gradeLevel,
      parentName,
      parentEmail,
      interests: selectedInterests,
      notes,
    });

    // Reset Form
    setStudentName("");
    setParentName("");
    setParentEmail("");
    setNotes("");
    setSelectedInterests([]);
    
    // Show visual confirmation
    setIsSuccessMsgVisible(true);
    setTimeout(() => {
      setIsSuccessMsgVisible(false);
    }, 5000);
  };

  return (
    <section id="admissions" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Admissions & Affordability
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Begin Your Oxford Journey
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            We are dedicated to making a premier education accessible. Explore registration timelines, calculate structural concessions, and apply via our streamlined digital portal.
          </p>
        </div>

        {/* Dynamic Admissions Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Tuition Estimator Column (Col-Span-6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg space-y-6">
            
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg">Fee & Concession Estimator</h3>
                <p className="text-xs text-slate-500 font-medium">Draft custom eligibility and projected annual academic fees (INR)</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                  Household Annual Income: ₹{income.toLocaleString()}
                </label>
                <input
                  id="estimator-income-range"
                  type="range"
                  min="50000"
                  max="600000"
                  step="10000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-1">
                  <span>₹50,000</span>
                  <span>₹3,25,000</span>
                  <span>₹6,00,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                  Other Siblings Enrolled: {siblings}
                </label>
                <div className="flex items-center space-x-3">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      id={`sibling-discount-${num}`}
                      key={num}
                      type="button"
                      onClick={() => setSiblings(num)}
                      className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        siblings === num
                          ? "bg-blue-900 text-white border-blue-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {num === 3 ? "3+" : num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                  Merit Concessions
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="checkbox-merit-academic"
                    type="button"
                    onClick={() => setAcademicMerit(!academicMerit)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      academicMerit
                        ? "bg-blue-50/50 border-blue-900 text-blue-950"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-xs font-bold">Academic Topper</p>
                    <p className="text-[10px] text-slate-500 font-medium">Top standard exam scores</p>
                  </button>

                  <button
                    id="checkbox-merit-athletic"
                    type="button"
                    onClick={() => setAthleticMerit(!athleticMerit)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      athleticMerit
                        ? "bg-blue-50/50 border-blue-900 text-blue-950"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-xs font-bold">Sports Champion</p>
                    <p className="text-[10px] text-slate-500 font-medium">State / District level athlete</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Calculations display box */}
            <div className="bg-blue-950 text-white rounded-2xl p-5 space-y-4 border border-blue-900">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-blue-900/60">
                  <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Base Tuition</p>
                  <p className="text-base font-black text-white mt-1">₹{estimate.baseTuition.toLocaleString()}</p>
                </div>
                <div className="border-r border-blue-900/60 px-1">
                  <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Concession</p>
                  <p className="text-base font-black text-emerald-400 mt-1">-₹{estimate.aidAwarded.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Net Estimate</p>
                  <p className="text-base font-black text-blue-300 mt-1">₹{estimate.finalTuition.toLocaleString()}</p>
                </div>
              </div>

              {/* Breakdown messages */}
              <div className="space-y-1.5 border-t border-blue-900/50 pt-3">
                <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-300">Concession Details:</p>
                <ul className="space-y-1">
                  {estimate.explanation.map((exp, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-extrabold">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Admissions Application Portal (Col-Span-6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg space-y-6">
            
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-950 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg">Student Application Portal</h3>
                <p className="text-xs text-slate-500 font-medium">Submit details to create a candidate enrollment record</p>
              </div>
            </div>

            {/* Real submission tracker notice */}
            {applications.length > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-3">
                <Landmark className="w-5 h-5 text-blue-950 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-blue-950">Active Applications Found ({applications.length})</p>
                  <p className="text-[11px] text-blue-900 leading-relaxed font-sans">
                    You have successfully submitted applications for our committee. Use the Application Status Panel below to monitor real-time processing and reviews!
                  </p>
                </div>
              </div>
            )}

            {/* Standard admissions deadlines */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-slate-900 uppercase">First Round Intake</p>
                  <p className="text-xs text-slate-500 font-semibold">Till July 31, 2026</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-slate-900 uppercase">Rolling Intake</p>
                  <p className="text-xs text-slate-500 font-semibold">August 2026 onwards</p>
                </div>
              </div>
            </div>

            {/* Application Submission Form */}
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Candidate Full Name</label>
                  <input
                    id="input-student-name"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Target Class Level</label>
                  <select
                    id="input-grade-level"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none bg-white"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11 (Science / Commerce)</option>
                    <option value="Class 12">Class 12 (Science / Commerce)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Parent / Guardian Name</label>
                  <input
                    id="input-parent-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Parent Email Address</label>
                  <input
                    id="input-parent-email"
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Interests Multi-Select Checkbox Tags */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Interests & Co-Curricular Focus</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        id={`interest-badge-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 border-blue-900 text-blue-950"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Additional Notes / Inquiry Questions</label>
                <textarea
                  id="input-notes"
                  rows={2}
                  placeholder="e.g. Inquiring about computer science labs and sports audition dates..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none"
                />
              </div>

              <button
                id="submit-admissions-form"
                type="submit"
                className="w-full bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-950 hover:to-slate-950 text-white text-xs font-extrabold py-3 rounded-xl shadow-lg shadow-blue-900/10 flex items-center justify-center space-x-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Candidate Admissions Application</span>
              </button>
            </form>

            {/* Visual Toast Notification on Success */}
            <AnimatePresence>
              {isSuccessMsgVisible && (
                <motion.div
                  id="application-toast-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Application Submitted Successfully!</p>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-sans">
                      Our admissions committee has received your candidate file. Your record has been logged in the active tracking monitor below.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
