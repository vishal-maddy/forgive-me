import React, { useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

/**
 * Confetti & Sparkles Celebration effect
 */
export default function Confetti({ active = true, count = 40 }) {
  // Fire canvas-confetti bursts when activated
  useEffect(() => {
    if (!active) return;

    // First big burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E7', '#E879A9', '#E9D5FF', '#FF80B5', '#FFF8F0', '#FFE27A']
    });

    // Secondary delayed side cannons
    const t1 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD6E7', '#E879A9', '#E9D5FF', '#C4A1E8']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD6E7', '#E879A9', '#E9D5FF', '#C4A1E8']
      });
    }, 400);

    const t2 = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.4 },
        shapes: ['circle', 'square'],
        colors: ['#FF6B95', '#FFE27A', '#B3E5FC', '#E879A9']
      });
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  const pieces = useMemo(() => {
    const symbols = ['🌸', '✨', '💖', '🎉', '⭐', '🎀', '🍬'];
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        symbol: symbols[i % symbols.length],
        left: `${(i * (100 / count) + Math.random() * 3).toFixed(1)}%`,
        duration: (3 + Math.random() * 4).toFixed(1),
        delay: (Math.random() * 5).toFixed(1),
        size: Math.floor(16 + Math.random() * 18),
      });
    }
    return items;
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block animate-confetti-fall"
          style={{
            left: p.left,
            top: '-30px',
            fontSize: `${p.size}px`,
            animation: `confettiFall ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

