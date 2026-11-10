import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeaderNav from './components/common/HeaderNav';
import Welcome from './components/sections/Welcome';
import Warning from './components/sections/Warning';
import Apology from './components/sections/Apology';
import SpecialReasons from './components/sections/SpecialReasons';
import Forgiveness from './components/sections/Forgiveness';
import Celebration from './components/sections/Celebration';
import FloatingHearts from './components/effects/FloatingHearts';
import RainEffect from './components/effects/RainEffect';
import Confetti from './components/effects/Confetti';
import FloatingMusicPlayer from './components/audio/FloatingMusicPlayer';

export default function App() {
  // Step 1: Welcome
  // Step 2: Warning
  // Step 3: Apology Envelope (Letter 1 & Letter 2)
  // Step 4: Original Photo Gallery ("A Few Memories That Mean So Much ❤️")
  // Step 5: Forgiveness Room ("Will You Forgive Me? 🥺")
  // Step 6: Final Celebration ("MISSION SUCCESSFUL! 💗")
  const [currentStep, setCurrentStep] = useState(1);
  const [isRaining, setIsRaining] = useState(false);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);

  // Scroll to top smoothly whenever step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Ensure rain effect is strictly controlled by the forgiveness room
  useEffect(() => {
    if (currentStep !== 5) {
      setIsRaining(false);
    }
    if (currentStep === 6) {
      setIsCelebrationActive(true);
    } else {
      setIsCelebrationActive(false);
    }
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleForgiven = () => {
    setIsRaining(false); // Stop rain immediately
    setCurrentStep(6);
  };

  const handleReset = () => {
    setIsRaining(false);
    setIsCelebrationActive(false);
    setCurrentStep(1);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF3] to-[#F5EBFF] text-theme-text overflow-x-hidden selection:bg-pastel-pink transition-colors duration-1000">
      {/* Premium Layered Background (Bokeh orbs, stars, petals, sparkles & heart outlines) */}
      <FloatingHearts count={currentStep === 6 ? 35 : 22} opacity={isRaining ? 0.2 : 0.65} isRaining={isRaining} />

      {/* Realistic CSS Rain Effect with soft ambient lightning (Only active on NO sequence) */}
      <RainEffect active={isRaining} />

      {/* Celebration Confetti (Active during final celebration) */}
      <Confetti active={isCelebrationActive} />

      {/* Top Header & Navigation Controls */}
      <HeaderNav currentStep={currentStep} totalSteps={6} onReset={handleReset} />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Welcome key="welcome" onNext={handleNext} />
          )}

          {currentStep === 2 && (
            <Warning key="warning" onNext={handleNext} />
          )}

          {currentStep === 3 && (
            <Apology 
              key="apology" 
              onNext={handleNext} 
            />
          )}

          {currentStep === 4 && (
            <SpecialReasons 
              key="special-reasons" 
              onNext={handleNext} 
            />
          )}

          {currentStep === 5 && (
            <Forgiveness
              key="forgiveness"
              onForgiven={handleForgiven}
              onRainChange={setIsRaining}
            />
          )}

          {currentStep === 6 && (
            <Celebration key="celebration" onReplay={handleReset} />
          )}
        </AnimatePresence>
      </main>

      {/* Floating Romantic Music Player (Bottom-Right) */}
      <FloatingMusicPlayer />

      {/* Gentle Footer */}
      <footer className="relative z-10 pb-6 text-center text-xs text-theme-text/50 pointer-events-none font-sans font-medium">
        <p>Made with all my heart for Tomato 💗 • Operation: Forgive Your Idiot</p>
      </footer>
    </div>
  );
}
