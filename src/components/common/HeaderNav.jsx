import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../audio/SoundEffects';

export default function HeaderNav({ currentStep, totalSteps = 6, onReset }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    const unsubscribe = sounds.subscribe((state) => {
      setIsPlayingMusic(state.isPlayingMusic && !state.isMuted && state.volume > 0);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    sounds.playPop();
    sounds.toggleMusic();
  };

  const handleReset = () => {
    sounds.playPop();
    if (onReset) onReset();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-none">
      {/* Brand badge */}
      <div className="pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pastel-pink shadow-cute text-xs sm:text-sm font-semibold text-deep-pink font-sans">
        <Sparkles className="w-3.5 h-3.5 text-deep-pink animate-spin" style={{ animationDuration: '6s' }} />
        <span className="tracking-tight hidden xs:inline">Operation: Forgive Your Idiot</span>
        <span className="tracking-tight xs:hidden">For Tomato 💗</span>
      </div>

      {/* Progress indicators */}
      <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-pastel-pink/60 shadow-sm">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isPassed = stepNum < currentStep;
          return (
            <div
              key={stepNum}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-deep-pink shadow-sm'
                  : isPassed
                  ? 'w-2 bg-pastel-pink'
                  : 'w-2 bg-cream/90 border border-pastel-pink/50'
              }`}
              title={`Step ${stepNum} of ${totalSteps}`}
            />
          );
        })}
      </div>

      {/* Right Controls: Restart & Music Toggle */}
      <div className="pointer-events-auto flex items-center gap-2">
        {currentStep > 1 && (
          <button
            onClick={handleReset}
            title="Start from beginning"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/80 hover:bg-white text-theme-text hover:text-deep-pink backdrop-blur-md border border-pastel-pink shadow-cute transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-semibold cursor-pointer font-sans"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        )}

        <button
          onClick={toggleSound}
          title={isPlayingMusic ? "Mute music" : "Play romantic music"}
          className={`px-3 py-1.5 rounded-full backdrop-blur-md border shadow-cute transition-all duration-300 active:scale-95 flex items-center gap-1.5 text-xs font-bold cursor-pointer font-sans ${
            isPlayingMusic
              ? 'bg-gradient-to-r from-pastel-pink to-lavender text-deep-pink border-deep-pink/40 animate-pulse'
              : 'bg-white/80 hover:bg-white text-theme-text border-pastel-pink'
          }`}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 text-deep-pink" />
              <span className="hidden sm:inline">Music: On 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-theme-text/70" />
              <span className="hidden sm:inline">Music: Off 🔇</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
