import React, { useMemo } from 'react';

/**
 * Gentle Romantic Rain Effect
 * Sits strictly BEHIND interactive content (z-10), completely non-blocking (pointer-events: none),
 * with a soft, bright rainy atmosphere without heavy dark overlays.
 */
export default function RainEffect({ active = false }) {
  // Layer 1: Foreground raindrops
  const foreDrops = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 40; i++) {
      drops.push({
        id: `fg-${i}`,
        left: `${(i * (100 / 40) + (Math.random() * 2 - 1)).toFixed(1)}%`,
        duration: (0.65 + Math.random() * 0.45).toFixed(2),
        delay: (Math.random() * 1.5).toFixed(2),
        height: Math.floor(30 + Math.random() * 25),
        opacity: (0.4 + Math.random() * 0.35).toFixed(2),
      });
    }
    return drops;
  }, []);

  // Layer 2: Soft background mist drops
  const bgDrops = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 45; i++) {
      drops.push({
        id: `bg-${i}`,
        left: `${(i * (100 / 45) + (Math.random() * 2 - 1)).toFixed(1)}%`,
        duration: (0.9 + Math.random() * 0.5).toFixed(2),
        delay: (Math.random() * 2).toFixed(2),
        height: Math.floor(16 + Math.random() * 18),
        opacity: (0.2 + Math.random() * 0.2).toFixed(2),
      });
    }
    return drops;
  }, []);

  if (!active) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft, gentle rainy tint - NOT dark, keeping everything clearly readable and bright */}
      <div className="absolute inset-0 bg-slate-800/15 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/10 via-transparent to-sky-900/15" />

      {/* Gentle ambient lightning shimmer without harsh flashing */}
      <div className="absolute inset-0 bg-sky-200/10 pointer-events-none animate-lightning" />

      {/* Background Mist Raindrops */}
      {bgDrops.map((d) => (
        <div
          key={d.id}
          className="absolute w-[1.5px] rounded-full animate-raindrop bg-gradient-to-b from-transparent via-sky-300/40 to-sky-200/50"
          style={{
            left: d.left,
            top: '-50px',
            height: `${d.height}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Foreground Raindrops */}
      {foreDrops.map((d) => (
        <div
          key={d.id}
          className="absolute w-[2px] rounded-full animate-raindrop bg-gradient-to-b from-transparent via-sky-300 to-sky-100"
          style={{
            left: d.left,
            top: '-60px',
            height: `${d.height}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Bottom Puddle Mist Glow */}
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-sky-300/15 to-transparent pointer-events-none" />
    </div>
  );
}
