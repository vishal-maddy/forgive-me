/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFD6E7',
        'deep-pink': '#E879A9',
        'lavender': '#E9D5FF',
        'cream': '#FFF8F0',
        'soft-purple': '#C4A1E8',
        'theme-text': '#4A2838',
        'theme-pink': '#FF80B5',
        'bubble-pink': '#FFE4EE',
        'paper-tint': '#FFFDF9',
        'gold-seal': '#D4AF37',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'cute': '0 10px 25px -5px rgba(232, 121, 169, 0.2), 0 8px 10px -6px rgba(232, 121, 169, 0.1)',
        'cute-lg': '0 20px 35px -5px rgba(232, 121, 169, 0.25), 0 10px 20px -5px rgba(232, 121, 169, 0.15)',
        'romantic': '0 15px 35px -5px rgba(232, 121, 169, 0.25), 0 0 20px rgba(255, 214, 231, 0.45)',
        'glow': '0 0 30px rgba(232, 121, 169, 0.4)',
        'paper': '0 10px 30px rgba(74, 40, 56, 0.1), 0 1px 3px rgba(74, 40, 56, 0.05)',
        'wax': '0 4px 12px rgba(180, 50, 90, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceCute: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(232, 121, 169, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(232, 121, 169, 0.85))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        ambientPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.12)' },
        },
        softLightning: {
          '0%, 90%, 100%': { opacity: '0' },
          '92%': { opacity: '0.25' },
          '94%': { opacity: '0.05' },
          '96%': { opacity: '0.35' },
          '98%': { opacity: '0' },
        }
      },
      animation: {
        'wiggle': 'wiggle 2.5s ease-in-out infinite',
        'bounce-cute': 'bounceCute 2.2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 4.5s ease-in-out infinite',
        'ambient-pulse': 'ambientPulse 7s ease-in-out infinite',
        'soft-lightning': 'softLightning 9s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
