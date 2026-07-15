import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load the SVG file from the public directory
  useEffect(() => {
    let activeUrl = "";
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
        // to keep all other white/colored accent path details perfectly visible!
        let isFirst = true;
        parsedSvg = parsedSvg.replace(/<path([\s\S]*?)\/?>/g, (match, attributes) => {
          if (isFirst) {
            isFirst = false;
            return '<path d="" fill="none" />';
          }
          return match;
        });

        // Convert the modified SVG string into a canvas-paintable Image element
        const blob = new Blob([parsedSvg], { type: "image/svg+xml;charset=utf-8" });
        activeUrl = URL.createObjectURL(blob);
        setImageSrc(activeUrl);
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.onerror = (e) => {
          console.error("Failed to load SVG image into Canvas element", e);
        };
        img.src = activeUrl;
      })
      .catch((err) => {
        console.error("Error loading preloader SVG:", err);
      });

    return () => {
      if (activeUrl) {
        URL.revokeObjectURL(activeUrl);
      }
    };
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

  // Draw and pixelate on the canvas whenever image or progress updates
  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate dynamic pixel size based on progress.
    // Starts with a moderate pixel size (e.g., 18px) and dynamically decreases pixel size
    // to a very fine grid (e.g., 1px) as progress reaches 100%, resolving the image cleanly.
    const maxPixelSize = 16; // Moderate, highly aesthetic starting resolution
    const minPixelSize = 1.0;
    
    // Reverse the transition: pixel size goes from max to min as progress goes from 0 to 100
    const currentPixelSize = maxPixelSize - (maxPixelSize - minPixelSize) * Math.min(1, progress / 100);

    // Scale and center the image nicely inside the offscreen layout
    const scale = Math.min(width / image.width, height / image.height) * 0.95;
    const xOffset = (width - image.width * scale) / 2;
    const yOffset = (height - image.height * scale) / 2;

    const size = Math.round(currentPixelSize);

    if (size <= 2) {
      // Draw directly for smooth high-performance rendering when almost fully resolved
      ctx.drawImage(image, xOffset, yOffset, image.width * scale, image.height * scale);
    } else {
      // Create an offscreen canvas to sample pristine high-res pixel colors
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext("2d");
      if (!oCtx) return;

      oCtx.drawImage(image, xOffset, yOffset, image.width * scale, image.height * scale);

      // Obtain the raw pixel buffer
      const imgData = oCtx.getImageData(0, 0, width, height).data;

      // Draw the custom pixelated grid with even distribution
      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          // Sample center pixel of each grid block safely
          const sampleX = Math.min(width - 1, Math.floor(x + size / 2));
          const sampleY = Math.min(height - 1, Math.floor(y + size / 2));
          const pixelIdx = (sampleY * width + sampleX) * 4;

          const r = imgData[pixelIdx];
          const g = imgData[pixelIdx + 1];
          const b = imgData[pixelIdx + 2];
          const a = imgData[pixelIdx + 3] / 255;

          // Render solid or semi-transparent grid tiles
          if (a > 0.05) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            const gap = size > 6 ? 1 : 0.5;
            ctx.fillRect(x, y, Math.max(1, size - gap), Math.max(1, size - gap));
          }
        }
      }
    }
  }, [image, progress]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-slate-800 overflow-hidden select-none"
      style={{ backgroundColor: "#FCFCFC" }}
    >
      {/* Background soft ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Canvas Container with premium scaling and float effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center"
        >
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
              {imageSrc && (
                <img 
                  src={imageSrc}
                  alt="Oxford School Logo"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500 ease-out"
                  style={{ 
                    opacity: progress >= 50 ? Math.min(1, (progress - 50) / 35) : 0 
                  }}
                />
              )}
            </div>
          ) : (
            // Fallback premium placeholder icon if Image fails to load
            <div className="flex flex-col items-center justify-center p-4 border border-blue-200 rounded-full bg-blue-50/50 animate-pulse">
              <GraduationCap className="w-16 h-16 text-blue-700 mb-2" />
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
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-[0.25em] text-slate-900">
            OXFORD SCHOOL
          </h1>
          <p className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-blue-800 uppercase font-mono">
            Kailaras • Estd 1999
          </p>
        </motion.div>

        {/* Progress Loading Ring/Bar */}
        <div className="w-48 md:w-56 space-y-3">
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
        </div>
      </div>

      {/* Decorative side accent lines inspired by LineSidebar theme */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-slate-200/50 hidden md:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-slate-200/50 hidden md:block" />
    </div>
  );
}
