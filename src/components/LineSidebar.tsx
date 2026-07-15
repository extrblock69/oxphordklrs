import React, { useRef, useState, useCallback, useEffect } from "react";
import "./LineSidebar.css";

const FALLOFF_CURVES = {
  linear: (p: number) => p,
  smooth: (p: number) => p * p * (3 - 2 * p),
  sharp: (p: number) => p * p * p,
};

const DEFAULT_ITEMS = [
  "Home",
  "About",
  "Academics",
  "Admissions",
  "Notice Board",
  "Events",
  "Contact Us",
  "AI Counselor",
];

interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: "linear" | "smooth" | "sharp";
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  activeItemIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

export default function LineSidebar({
  items = DEFAULT_ITEMS,
  accentColor = "#1e3a8a", // Deep Blue accent color to match our branding
  textColor = "#475569", // Slate resting text color
  markerColor = "#94a3b8", // Slate light resting marker line
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 24, // Optimized shift to stay within mobile constraints
  falloff = "smooth",
  markerLength = 40, // Elegant marker length for sidebars
  markerGap = 8,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16, // Clean spacing for items
  fontSize = 1.0, // Clean legible font size
  smoothing = 100,
  activeItemIndex = null,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const activeRef = useRef<number | null>(activeItemIndex);
  const smoothingRef = useRef<number>(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(activeItemIndex);

  // Sync activeIndex with prop updates from scroll-spying
  useEffect(() => {
    setActiveIndex(activeItemIndex);
  }, [activeItemIndex]);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const itemsList = itemRefs.current;
    for (let i = 0; i < itemsList.length; i++) {
      const el = itemsList[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] !== undefined ? currentRef.current[i] : (activeRef.current === i ? 1 : 0);
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const itemsList = itemRefs.current;
      for (let i = 0; i < itemsList.length; i++) {
        const el = itemsList[i];
        if (!el) continue;
        const elRect = el.getBoundingClientRect();
        // Calculate coordinate center relative to container top
        const center = (elRect.top + elRect.bottom) / 2 - rect.top;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handleMouseLeave = useCallback(() => {
    targetsRef.current = items.map(() => 0);
    startLoop();
  }, [items, startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <nav
      className={`line-sidebar${showMarker ? " line-sidebar--markers" : ""}${
        scaleTick ? " line-sidebar--scale-tick" : ""
      }${className ? ` ${className}` : ""}`}
      style={{
        "--accent-color": accentColor,
        "--text-color": textColor,
        "--marker-color": markerColor,
        "--marker-length": `${markerLength}px`,
        "--marker-gap": `${markerGap}px`,
        "--tick-scale": tickScale,
        "--max-shift": `${maxShift}px`,
        "--item-gap": `${itemGap}px`,
        "--font-size": `${fontSize}rem`,
        "--smoothing": `${smoothing}ms`,
      } as React.CSSProperties}
    >
      <ul
        ref={listRef}
        className="line-sidebar__list w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? "true" : undefined}
            onPointerDown={() => handleClick(index, label)}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              {showIndex && (
                <span className="line-sidebar__index">{String(index + 1).padStart(2, "0")}</span>
              )}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
