import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, User, ClipboardList } from "lucide-react";
import { Message } from "../types";

interface AICounselorProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isGenerating: boolean;
}

export default function AICounselor({ messages, onSendMessage, isGenerating }: AICounselorProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterQuestions = [
    "What are the school fees and sibling discounts?",
    "Tell me about the science, robotics, and coding labs.",
    "When is the admission registration open?",
    "What is the student-to-teacher ratio?"
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleStarterClick = (question: string) => {
    if (isGenerating) return;
    onSendMessage(question);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  return (
    <section id="chat" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Interactive AI Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Consult Oxford AI Admissions Guide
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            Our virtual assistant is equipped with comprehensive knowledge regarding class registration, sports concessions, fee structures, and co-curricular events.
          </p>
        </div>

        {/* Chat Console Structure */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Quick Info Sidebar Panel (Col-Span-4) */}
          <div className="md:col-span-4 bg-blue-950 text-slate-100 p-6 md:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">AI Admissions Guide</h3>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest font-mono">Status: Connected</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  We can answer questions instantly! Simply type your questions or tap one of our recommended questions to start.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-bold uppercase font-mono">
                    <ClipboardList className="w-3.5 h-3.5 text-blue-400" />
                    <span>Things you can ask:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside">
                    <li>Concessions & scholarships</li>
                    <li>Science & robotics exhibitions</li>
                    <li>Arts, dance, & cultural clubs</li>
                    <li>School timing & sports playground</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer reference */}
            <div className="text-[10px] text-slate-500 font-mono font-medium leading-relaxed pt-4 border-t border-blue-900/40">
              Powered by server-side Gemini 3.5 Flash API for natural, real-time consultation response.
            </div>
          </div>

          {/* Interactive Chat Board (Col-Span-8) */}
          <div className="md:col-span-8 flex flex-col h-[500px]">
            
            {/* Conversations list area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-3 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                  >
                    {/* Icon */}
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      msg.role === "user" ? "bg-slate-900 text-white" : "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                    }`}>
                      {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Speech bubble */}
                    <div className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-tr-none"
                        : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none space-y-2"
                    }`}>
                      {msg.role === "model" ? (
                        /* Simple formatting of helper texts, list bullet formatting */
                        <div className="whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Processing/Typing Indicator */}
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="p-2 bg-blue-900 text-white rounded-xl shadow-md flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter helpers */}
            {messages.length <= 1 && !isGenerating && (
              <div className="px-6 py-3 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-2">
                {starterQuestions.map((q, idx) => (
                  <button
                    id={`starter-question-${idx}`}
                    key={idx}
                    onClick={() => handleStarterClick(q)}
                    className="inline-block text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input submission box */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
              <input
                id="counselor-chat-input"
                type="text"
                disabled={isGenerating}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isGenerating ? "Admissions guide is writing..." : "Ask Oxford English School counselor anything..."}
                className="flex-1 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:outline-none disabled:bg-slate-50"
              />
              <button
                id="submit-chat-btn"
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
