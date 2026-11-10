import React from 'react';

/**
 * Sad Rainy Cloud with dripping tears & lightning/drops
 */
export default function SadCloud({ className = "w-40 h-28" }) {
  return (
    <div className={`relative inline-block select-none ${className} animate-cloud-drift`}>
      <svg
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#90A4AE" />
            <stop offset="100%" stopColor="#607D8B" />
          </linearGradient>
          <linearGradient id="cloudCheek" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAEC8" />
            <stop offset="100%" stopColor="#FF80B5" />
          </linearGradient>
        </defs>

        {/* Cloud Puffs */}
        <path
          d="M45 95 C30 95 20 83 20 68 C20 54 30 43 44 42 C49 26 65 15 84 15 C101 15 116 24 122 38 C128 34 135 32 143 32 C160 32 174 46 174 63 C174 65 174 67 173 69 C183 73 190 83 190 95 C190 109 179 120 165 120 L50 120 C35 120 25 110 25 95"
          fill="url(#cloudGrad)"
        />

        {/* Cheeks */}
        <ellipse cx="65" cy="85" rx="8" ry="4" fill="url(#cloudCheek)" opacity="0.6" />
        <ellipse cx="135" cy="85" rx="8" ry="4" fill="url(#cloudCheek)" opacity="0.6" />

        {/* Sad Eyes */}
        <path d="M68 70 Q75 65 82 72" stroke="#ECEFF1" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M132 70 Q125 65 118 72" stroke="#ECEFF1" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Sad Droopy Eyebrows */}
        <path d="M64 62 Q72 65 78 61" stroke="#37474F" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M136 62 Q128 65 122 61" stroke="#37474F" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Quivering sad mouth */}
        <path d="M92 88 Q100 80 108 88" stroke="#ECEFF1" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Dripping Raindrops from Cloud */}
        <ellipse cx="55" cy="132" rx="3" ry="6" fill="#81D4FA" className="animate-bounce" />
        <ellipse cx="85" cy="138" rx="3.5" ry="7" fill="#4FC3F7" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
        <ellipse cx="115" cy="134" rx="3" ry="6" fill="#81D4FA" className="animate-bounce" style={{ animationDelay: '0.6s' }} />
        <ellipse cx="145" cy="140" rx="3.5" ry="7" fill="#4FC3F7" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
      </svg>
    </div>
  );
}

