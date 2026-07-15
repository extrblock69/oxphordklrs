import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Load the SVG file from the public directory
  useEffect(() => {
    fetch("/preloader.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Preloader SVG not found");
        return res.text();
      })
      .then((data) => {
        let parsedSvg = data;
        
        // Ensure the SVG uses viewBox and scales 100% inside its container
        parsedSvg = parsedSvg.replace(
          /<svg([^>]*)/,
          (match, attributes) => {
            const cleanAttributes = attributes
              .replace(/width="[^"]*"/g, "")
              .replace(/height="[^"]*"/g, "")
              .replace(/viewBox="[^"]*"/g, "");
            return `<svg viewBox="0 0 992 1081" width="100%" height="100%" ${cleanAttributes}`;
          }
        );

        // Hide ONLY the first path (the massive #FCFCFC full-view outer canvas block)
        // to keep all other beautiful logo paths perfectly visible and integrated!
        let isFirst = true;
        parsedSvg = parsedSvg.replace(/<path([\s\S]*?)\/?>/g, (match, attributes) => {
          if (isFirst) {
            isFirst = false;
            return '<path d="" fill="none" />';
          }
          return match;
        });

        setSvgContent(parsedSvg);
      })
      .catch((err) => {
        console.error("Error loading preloader SVG:", err);
      });
  }, []);

  // Animate the progress bar
  useEffect(() => {
    const duration = 2400; // 2.4 seconds total load time
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          // Wait 1200ms before finishing for a very slow, smooth exit transition
          setTimeout(() => {
            onComplete();
          }, 1200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-slate-800 overflow-hidden select-none"
      style={{ backgroundColor: "#FCFCFC" }}
    >
      {/* Background soft ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Animated container for smooth fade-in and fade-out */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isDone ? 0 : 1, 
            scale: isDone ? 0.95 : 1 
          }}
          transition={{ 
            duration: 1.4, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center"
        >
          {svgContent ? (
            <div 
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            // Fallback premium placeholder icon if SVG fails to load
            <div className="flex flex-col items-center justify-center p-4 border border-blue-200 rounded-full bg-blue-50/50 animate-pulse">
              <GraduationCap className="w-16 h-16 text-blue-700 mb-2" />
            </div>
          )}
        </motion.div>

        {/* Title Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: isDone ? 0 : 1, 
            y: isDone ? -10 : 0 
          }}
          transition={{ 
            delay: 0.15, 
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="space-y-2 mb-10"
        >
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-[0.25em] text-slate-900">
            OXFORD SCHOOL
          </h1>
          <p className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-blue-800 uppercase font-mono">
            Kailaras • Estd 1999
          </p>
        </motion.div>

        {/* Progress Loading Ring/Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isDone ? 0 : 1 }}
          transition={{ duration: 1.0 }}
          className="w-48 md:w-56 space-y-3"
        >
          <div className="h-[2px] w-full bg-slate-200 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-700 via-sky-500 to-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span className="tracking-wider uppercase">
              {isDone ? "System Ready" : "Initializing Portal..."}
            </span>
            <span className="font-semibold text-slate-700">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative side accent lines inspired by LineSidebar theme */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-slate-200/50 hidden md:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-slate-200/50 hidden md:block" />
    </div>
  );
}
