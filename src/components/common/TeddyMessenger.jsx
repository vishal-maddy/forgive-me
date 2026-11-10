import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyBear from '../characters/TeddyBear';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function TeddyMessenger({ currentStep }) {
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const message = siteConfig.teddyMessages[currentStep];

  const handleTap = () => {
    sounds.playPop();
    setIsBubbleOpen((prev) => !prev);
  };

  // Select appropriate teddy mode based on step
  const teddyMode = currentStep === 5 ? 'crying' : currentStep === 6 ? 'dancing' : 'holding-heart';

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 select-none flex items-end gap-2 pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {isBubbleOpen && (
          <motion.div
            key={`msg-${currentStep}`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto relative max-w-[210px] sm:max-w-xs bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl rounded-bl-none shadow-romantic border border-pastel-pink text-xs font-bold text-theme-text font-sans mb-10 leading-snug cursor-pointer group"
            onClick={handleTap}
          >
            <p>{message}</p>
            {/* Speech bubble arrow pointer */}
            <div 
              className="absolute -bottom-2 left-3 w-3 h-3 bg-white/95 border-b border-l border-pastel-pink transform rotate-[-45deg]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Teddy Messenger Character */}
      <motion.div
        layout
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleTap}
        className="pointer-events-auto cursor-pointer relative filter drop-shadow-md flex-shrink-0"
        title="Tap me! 🧸"
      >
        <TeddyBear mode={teddyMode} className="w-14 h-14 sm:w-16 sm:h-16" />
      </motion.div>
    </div>
  );
}

