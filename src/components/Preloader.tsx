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
        // Remove the background path (fill="#FCFCFC") to make it transparent
        const transparentBackgroundSvg = data.replace(
          /fill="#FCFCFC"/g,
          'fill="none" style="display: none;"'
        );
        setSvgContent(transparentBackgroundSvg);
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
          // Wait 600ms before finishing for a smooth exit transition
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f19] text-slate-100 overflow-hidden select-none">
      {/* Background soft ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* SVG Container with premium scaling and float effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-48 h-48 md:w-56 md:h-56 mb-8 flex items-center justify-center"
        >
          {svgContent ? (
            <div
              className="oxford-preloader-svg w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            // Fallback premium placeholder icon if SVG fails to load
            <div className="flex flex-col items-center justify-center p-4 border border-blue-500/20 rounded-full bg-slate-900/40 animate-pulse">
              <GraduationCap className="w-16 h-16 text-blue-400 mb-2" />
            </div>
          )}
        </motion.div>

        {/* Title Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2 mb-10"
        >
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-[0.25em] text-white">
            OXFORD SCHOOL
          </h1>
          <p className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-blue-400/80 uppercase font-mono">
            Kailaras • Estd 1999
          </p>
        </motion.div>

        {/* Progress Loading Ring/Bar */}
        <div className="w-48 md:w-56 space-y-3">
          <div className="h-[2px] w-full bg-slate-800/80 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="tracking-wider uppercase">
              {isDone ? "System Ready" : "Initializing Portal..."}
            </span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Decorative side accent lines inspired by LineSidebar theme */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-slate-900/50 hidden md:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-slate-900/50 hidden md:block" />
    </div>
  );
}
