import React from 'react';

/**
 * Crying Cat Meme Character
 * Features the iconic huge glossy glassy pleading cat eyes with tears!
 */
export default function CryingCat({ className = "w-44 h-44", showPleadingText = false }) {
  return (
    <div className={`relative inline-block select-none ${className} animate-soft-puff`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="catBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8F0" />
            <stop offset="100%" stopColor="#F5E4D5" />
          </linearGradient>
          <linearGradient id="catEarInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD6E7" />
            <stop offset="100%" stopColor="#FFAEC8" />
          </linearGradient>
          <radialGradient id="wateryEye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5CD2E6" />
            <stop offset="60%" stopColor="#2E79B4" />
            <stop offset="90%" stopColor="#1B3B6F" />
            <stop offset="100%" stopColor="#0B1B3D" />
          </radialGradient>
          <linearGradient id="catTearStream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E1F5FE" />
            <stop offset="50%" stopColor="#81D4FA" />
            <stop offset="100%" stopColor="#29B6F6" />
          </linearGradient>
        </defs>

        {/* Cat Ears */}
        <polygon points="40,90 25,32 80,55" fill="url(#catBody)" />
        <polygon points="43,80 34,42 74,58" fill="url(#catEarInner)" />

        <polygon points="160,90 175,32 120,55" fill="url(#catBody)" />
        <polygon points="157,80 166,42 126,58" fill="url(#catEarInner)" />

        {/* Head */}
        <ellipse cx="100" cy="110" rx="68" ry="58" fill="url(#catBody)" />

        {/* Cute Whisker Cheeks */}
        <ellipse cx="62" cy="126" rx="14" ry="8" fill="#FFAEC8" opacity="0.5" />
        <ellipse cx="138" cy="126" rx="14" ry="8" fill="#FFAEC8" opacity="0.5" />

        {/* Whiskers */}
        <path d="M48 118 L20 114" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 126 L18 128" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />
        <path d="M48 134 L22 142" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />

        <path d="M152 118 L180 114" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />
        <path d="M154 126 L182 128" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />
        <path d="M152 134 L178 142" stroke="#C4A1E8" strokeWidth="2" strokeLinecap="round" />

        {/* THE FAMOUS GLOSSY CRYING MEME EYES */}
        {/* Left Eye */}
        <g>
          <ellipse cx="70" cy="98" rx="22" ry="24" fill="url(#wateryEye)" />
          {/* Giant tear reflections / sparkles */}
          <ellipse cx="64" cy="88" rx="10" ry="8" fill="#FFFFFF" opacity="0.95" />
          <circle cx="80" cy="106" r="5" fill="#FFFFFF" opacity="0.85" />
          <circle cx="62" cy="108" r="3" fill="#FFFFFF" opacity="0.7" />
          <circle cx="74" cy="85" r="2.5" fill="#FFFFFF" opacity="0.9" />

          {/* Water meniscus overflow */}
          <path d="M50 112 Q70 126 90 112" stroke="#E1F5FE" strokeWidth="3" fill="none" opacity="0.8" />
          
          {/* Animated tear stream */}
          <path d="M68 116 Q62 145 56 172" stroke="url(#catTearStream)" strokeWidth="6" strokeLinecap="round" className="animate-tear" fill="none" />
          <circle cx="56" cy="176" r="4.5" fill="#29B6F6" />
        </g>

        {/* Right Eye */}
        <g>
          <ellipse cx="130" cy="98" rx="22" ry="24" fill="url(#wateryEye)" />
          {/* Giant tear reflections / sparkles */}
          <ellipse cx="124" cy="88" rx="10" ry="8" fill="#FFFFFF" opacity="0.95" />
          <circle cx="140" cy="106" r="5" fill="#FFFFFF" opacity="0.85" />
          <circle cx="122" cy="108" r="3" fill="#FFFFFF" opacity="0.7" />
          <circle cx="134" cy="85" r="2.5" fill="#FFFFFF" opacity="0.9" />

          {/* Water meniscus overflow */}
          <path d="M110 112 Q130 126 150 112" stroke="#E1F5FE" strokeWidth="3" fill="none" opacity="0.8" />
          
          {/* Animated tear stream */}
          <path d="M132 116 Q138 145 144 172" stroke="url(#catTearStream)" strokeWidth="6" strokeLinecap="round" className="animate-tear" fill="none" />
          <circle cx="144" cy="176" r="4.5" fill="#29B6F6" />
        </g>

        {/* Super Sad Eyebrows */}
        <path d="M52 70 Q68 76 84 72" stroke="#59384A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M148 70 Q132 76 116 72" stroke="#59384A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <polygon points="100,116 95,110 105,110" fill="#FFAEC8" />

        {/* Trembling Sad Pouting Mouth */}
        <path d="M92 126 Q100 118 108 126" stroke="#59384A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M96 128 Q100 124 104 128" stroke="#59384A" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Cute pleading paws at bottom */}
        <ellipse cx="80" cy="170" rx="16" ry="12" fill="url(#catBody)" stroke="#F5E4D5" strokeWidth="2" />
        <ellipse cx="120" cy="170" rx="16" ry="12" fill="url(#catBody)" stroke="#F5E4D5" strokeWidth="2" />
        
        {/* Paw pads */}
        <circle cx="80" cy="170" r="5" fill="#FFAEC8" />
        <circle cx="74" cy="166" r="2" fill="#FFAEC8" />
        <circle cx="80" cy="164" r="2" fill="#FFAEC8" />
        <circle cx="86" cy="166" r="2" fill="#FFAEC8" />

        <circle cx="120" cy="170" r="5" fill="#FFAEC8" />
        <circle cx="114" cy="166" r="2" fill="#FFAEC8" />
        <circle cx="120" cy="164" r="2" fill="#FFAEC8" />
        <circle cx="126" cy="166" r="2" fill="#FFAEC8" />
      </svg>

      {showPleadingText && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-deep-pink shadow-md border border-pastel-pink animate-bounce">
          *sniff sniff* 🥺
        </div>
      )}
    </div>
  );
}

