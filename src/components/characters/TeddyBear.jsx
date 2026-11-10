import React from 'react';

/**
 * Animated Teddy Bear component with 3 modes:
 * - 'holding-heart'
 * - 'crying'
 * - 'dancing'
 */
export default function TeddyBear({ mode = 'holding-heart', className = 'w-48 h-48', onClick }) {
  return (
    <div 
      className={`relative inline-block select-none ${className} ${mode === 'dancing' ? 'animate-dance' : mode === 'crying' ? 'animate-soft-puff' : 'animate-bounce-cute'}`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="furGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2A76F" />
            <stop offset="100%" stopColor="#C98A50" />
          </linearGradient>
          <linearGradient id="innerEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD6E7" />
            <stop offset="100%" stopColor="#FFAEC8" />
          </linearGradient>
          <linearGradient id="snoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4E6" />
            <stop offset="100%" stopColor="#F5DCB7" />
          </linearGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B95" />
            <stop offset="100%" stopColor="#E82A5E" />
          </linearGradient>
          <linearGradient id="tearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B3E5FC" />
            <stop offset="100%" stopColor="#4FC3F7" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ears */}
        {/* Left Ear */}
        <circle cx="58" cy="58" r="28" fill="url(#furGradient)" />
        <circle cx="58" cy="58" r="16" fill="url(#innerEar)" />
        {/* Right Ear */}
        <circle cx="142" cy="58" r="28" fill="url(#furGradient)" />
        <circle cx="142" cy="58" r="16" fill="url(#innerEar)" />

        {/* Party Hat (for dancing mode) */}
        {mode === 'dancing' && (
          <g transform="translate(86, 12)">
            <polygon points="14,0 0,38 28,38" fill="#FF80B5" />
            <circle cx="14" cy="0" r="5" fill="#FFE27A" />
            <path d="M4 24 Q14 28 24 24" stroke="#FFF8F0" strokeWidth="2.5" fill="none" />
            <path d="M7 14 Q14 18 21 14" stroke="#9BF6FF" strokeWidth="2.5" fill="none" />
          </g>
        )}

        {/* Body */}
        <ellipse cx="100" cy="145" rx="55" ry="48" fill="url(#furGradient)" />
        {/* Belly highlight */}
        <ellipse cx="100" cy="148" rx="36" ry="32" fill="url(#snoutGradient)" />

        {/* Feet / Paws */}
        <ellipse cx="64" cy="180" rx="20" ry="14" fill="url(#furGradient)" />
        <circle cx="64" cy="180" r="8" fill="url(#innerEar)" />
        <circle cx="56" cy="172" r="3.5" fill="url(#innerEar)" />
        <circle cx="64" cy="170" r="3.5" fill="url(#innerEar)" />
        <circle cx="72" cy="172" r="3.5" fill="url(#innerEar)" />

        <ellipse cx="136" cy="180" rx="20" ry="14" fill="url(#furGradient)" />
        <circle cx="136" cy="180" r="8" fill="url(#innerEar)" />
        <circle cx="128" cy="172" r="3.5" fill="url(#innerEar)" />
        <circle cx="136" cy="170" r="3.5" fill="url(#innerEar)" />
        <circle cx="144" cy="172" r="3.5" fill="url(#innerEar)" />

        {/* Head */}
        <circle cx="100" cy="98" r="50" fill="url(#furGradient)" />

        {/* Snout */}
        <ellipse cx="100" cy="112" rx="24" ry="18" fill="url(#snoutGradient)" />

        {/* Nose */}
        <ellipse cx="100" cy="106" rx="9" ry="6.5" fill="#59384A" />

        {/* Mouth */}
        {mode === 'crying' ? (
          /* Sad trembling mouth */
          <path d="M92 122 Q100 114 108 122" stroke="#59384A" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          /* Happy smiling mouth */
          <g>
            <path d="M100 112.5 L100 119" stroke="#59384A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M91 119 Q100 126 109 119" stroke="#59384A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Blush Cheeks */}
        <ellipse cx="68" cy="112" rx="10" ry="6" fill="#FFAEC8" opacity="0.65" />
        <ellipse cx="132" cy="112" rx="10" ry="6" fill="#FFAEC8" opacity="0.65" />

        {/* Eyes */}
        {mode === 'crying' ? (
          /* Pleading teary eyes */
          <g>
            {/* Left Eye */}
            <ellipse cx="80" cy="90" rx="9" ry="11" fill="#2E1B25" />
            <circle cx="77" cy="86" r="4" fill="#FFFFFF" />
            <circle cx="83" cy="93" r="2" fill="#FFFFFF" />
            <circle cx="78" cy="95" r="1.5" fill="#B3E5FC" />
            {/* Right Eye */}
            <ellipse cx="120" cy="90" rx="9" ry="11" fill="#2E1B25" />
            <circle cx="117" cy="86" r="4" fill="#FFFFFF" />
            <circle cx="123" cy="93" r="2" fill="#FFFFFF" />
            <circle cx="118" cy="95" r="1.5" fill="#B3E5FC" />

            {/* Sad eyebrows */}
            <path d="M72 78 Q82 82 88 80" stroke="#59384A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M128 78 Q118 82 112 80" stroke="#59384A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Flowing animated tears */}
            <path d="M79 100 Q78 120 74 135" stroke="url(#tearGradient)" strokeWidth="4" strokeLinecap="round" className="animate-tear" fill="none" />
            <path d="M121 100 Q122 120 126 135" stroke="url(#tearGradient)" strokeWidth="4" strokeLinecap="round" className="animate-tear" fill="none" />
            <circle cx="73" cy="138" r="4" fill="#4FC3F7" className="animate-bounce" />
            <circle cx="127" cy="138" r="4" fill="#4FC3F7" className="animate-bounce" />
          </g>
        ) : mode === 'dancing' ? (
          /* Joyful closed happy eye arches */
          <g>
            <path d="M73 90 Q81 80 89 90" stroke="#59384A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M111 90 Q119 80 127 90" stroke="#59384A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Sparkles by eyes */}
            <polygon points="63,82 65,86 69,87 65,88 63,92 61,88 57,87 61,86" fill="#FFD166" />
            <polygon points="137,82 139,86 143,87 139,88 137,92 135,88 131,87 135,86" fill="#FFD166" />
          </g>
        ) : (
          /* Normal cute glossy bear eyes */
          <g>
            <circle cx="80" cy="89" r="8" fill="#3D2331" />
            <circle cx="78" cy="86" r="3.5" fill="#FFFFFF" />
            <circle cx="83" cy="91" r="1.5" fill="#FFFFFF" />

            <circle cx="120" cy="89" r="8" fill="#3D2331" />
            <circle cx="118" cy="86" r="3.5" fill="#FFFFFF" />
            <circle cx="123" cy="91" r="1.5" fill="#FFFFFF" />

            {/* Cute gentle eyebrows */}
            <path d="M74 78 Q80 75 86 78" stroke="#59384A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M114 78 Q120 75 126 78" stroke="#59384A" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Arms / Hands */}
        {mode === 'dancing' ? (
          /* Waving arms up in the air! */
          <g>
            <path d="M55 135 Q30 95 45 75 Q55 65 65 85" fill="url(#furGradient)" />
            <path d="M145 135 Q170 95 155 75 Q145 65 135 85" fill="url(#furGradient)" />
          </g>
        ) : mode === 'crying' ? (
          /* Paws clasped together pleadingly */
          <g>
            <ellipse cx="88" cy="138" rx="14" ry="12" fill="url(#furGradient)" />
            <ellipse cx="112" cy="138" rx="14" ry="12" fill="url(#furGradient)" />
            {/* Broken heart in lap */}
            <path
              d="M100 156 L94 150 A6 6 0 0 1 102 142 L100 146 L104 148 L100 156 Z"
              fill="#FF80B5"
              opacity="0.8"
            />
          </g>
        ) : (
          /* Holding Heart */
          <g>
            {/* Big Beating Heart */}
            <g className="animate-pulse">
              <path
                d="M100 162 C70 140 54 116 54 98 C54 84 66 74 80 74 C89 74 96 79 100 85 C104 79 111 74 120 74 C134 74 146 84 146 98 C146 116 130 140 100 162 Z"
                fill="url(#heartGradient)"
                filter="url(#glow)"
              />
              {/* Heart shine */}
              <ellipse cx="78" cy="85" rx="6" ry="10" transform="rotate(-30 78 85)" fill="#FFFFFF" opacity="0.55" />
            </g>
            {/* Bear hands holding heart */}
            <ellipse cx="68" cy="122" rx="12" ry="10" fill="url(#furGradient)" />
            <ellipse cx="132" cy="122" rx="12" ry="10" fill="url(#furGradient)" />
          </g>
        )}
      </svg>
    </div>
  );
}

