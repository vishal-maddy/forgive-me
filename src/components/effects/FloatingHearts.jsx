import React, { useMemo } from 'react';

/**
 * Premium Layered Romantic Background
 * Combines soft bokeh orbs, subtle paper grain, floating delicate petals,
 * tiny stars, and heart outlines.
 */
export default function FloatingHearts({ count = 24, opacity = 0.6, isRaining = false }) {
  const particles = useMemo(() => {
    const items = [];
    const symbols = [
      { char: '♡', type: 'outline' },
      { char: '✦', type: 'star' },
      { char: '🌸', type: 'flower' },
      { char: '✧', type: 'star-small' },
      { char: '✨', type: 'sparkle' },
      { char: '💗', type: 'heart' },
      { char: '🌷', type: 'tulip' }
    ];

    for (let i = 0; i < count; i++) {
      const s = symbols[i % symbols.length];
      items.push({
        id: i,
        symbol: s.char,
        type: s.type,
        left: `${(i * (100 / count) + (Math.random() * 4 - 2)).toFixed(1)}%`,
        size: s.type === 'star' || s.type === 'star-small' ? Math.floor(12 + Math.random() * 10) : Math.floor(14 + Math.random() * 18),
        duration: (9 + Math.random() * 9).toFixed(1),
        delay: (Math.random() * 7).toFixed(1),
        opacity: s.type === 'outline' ? 0.45 : (0.4 + Math.random() * 0.45).toFixed(2),
      });
    }
    return items;
  }, [count]);

  return (
    <div 
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none transition-opacity duration-1000"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Subtle Paper Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#4A2838 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Layered Blurred Bokeh Orbs */}
      {!isRaining && (
        <>
          {/* Top-Left Rose Orb */}
          <div 
            className="bg-ambient-orb w-[22rem] h-[22rem] sm:w-[32rem] sm:h-[32rem] -top-24 -left-20 bg-gradient-to-br from-[#FFD6E7]/60 to-[#FFAEC8]/30 animate-ambient-pulse"
          />
          {/* Bottom-Right Lavender Orb */}
          <div 
            className="bg-ambient-orb w-[24rem] h-[24rem] sm:w-[36rem] sm:h-[36rem] -bottom-24 -right-20 bg-gradient-to-tl from-[#E9D5FF]/60 to-[#C4A1E8]/30 animate-ambient-pulse"
            style={{ animationDelay: '3.5s' }}
          />
          {/* Center-Right Warm Peach Orb */}
          <div 
            className="bg-ambient-orb w-64 h-64 sm:w-96 sm:h-96 top-1/3 -left-10 bg-gradient-to-r from-[#FFF0F5]/70 to-[#FFE4EE]/40 animate-ambient-pulse"
            style={{ animationDelay: '1.8s' }}
          />
        </>
      )}

      {/* Floating Particles: Stars, Petals, Sparkles & Heart Outlines */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block animate-float-heart font-serif"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            color: p.type === 'outline' || p.type.includes('star') ? '#E879A9' : undefined,
            filter: 'drop-shadow(0 2px 6px rgba(232, 121, 169, 0.25))',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
