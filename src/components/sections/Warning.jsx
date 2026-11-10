import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import CryingCat from '../characters/CryingCat';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function Warning({ onNext }) {
  const { warning } = siteConfig;

  const handleContinue = () => {
    sounds.playPop();
    onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
    >
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="glass-panel-warning w-full max-w-lg p-8 sm:p-11 rounded-[2.5rem] shadow-romantic relative overflow-hidden flex flex-col items-center"
      >
        {/* Warning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-bold text-amber-700 uppercase tracking-widest mb-6 shadow-sm animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>{warning.tag}</span>
        </div>

        {/* Crying Cat Meme Character with big pleading eyes */}
        <div className="my-2 transform transition-transform hover:scale-105 duration-300 filter drop-shadow-md">
          <CryingCat className="w-44 h-44 sm:w-52 sm:h-52" showPleadingText={true} />
        </div>

        {/* Editorial Heading */}
        <h2 className="text-3xl sm:text-5xl font-black text-theme-text font-serif tracking-tight mt-6 mb-3">
          {warning.heading}
        </h2>

        {/* Warning Message */}
        <p className="text-lg sm:text-xl font-bold text-deep-pink mb-2 max-w-md font-sans">
          {warning.message}
        </p>

        <p className="text-sm text-theme-text/75 max-w-sm mb-8 leading-relaxed font-sans">
          {warning.subMessage}
        </p>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 20px 35px -10px rgba(232, 121, 169, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF6B95] to-soft-purple text-white font-bold text-lg shadow-cute cursor-pointer transition-all"
        >
          <span>{warning.buttonText}</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
