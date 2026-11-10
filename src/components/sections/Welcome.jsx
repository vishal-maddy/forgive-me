import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import TeddyBear from '../characters/TeddyBear';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function Welcome({ onNext }) {
  const { welcome } = siteConfig;

  const handleOpen = () => {
    sounds.playPop();
    // Auto-start music on first user interaction
    sounds.startMusic();
    onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
    >
      {/* Decorative floating stickers with soft natural sway */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute top-16 left-6 sm:left-20 text-3xl sm:text-4xl select-none opacity-85 filter drop-shadow-sm"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [6, -6, 6] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute bottom-20 right-6 sm:right-24 text-3xl sm:text-4xl select-none opacity-85 filter drop-shadow-sm"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        className="absolute top-28 right-8 sm:right-32 text-2xl select-none opacity-70"
      >
        🎀
      </motion.div>

      {/* Main Digital Love Letter Container */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass-panel w-full max-w-lg p-8 sm:p-11 rounded-[2.5rem] shadow-romantic relative overflow-hidden flex flex-col items-center border border-white/80"
      >
        {/* Scrapbook Washi Tape Header */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape rounded-sm z-20" />

        {/* Small decorative handwritten accent */}
        <p className="font-handwritten text-xl sm:text-2xl text-deep-pink font-bold mt-1 mb-2 tracking-wide">
          {welcome.handwrittenNote || "A special letter just for you ♡"}
        </p>

        {/* Elegant Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pink/70 border border-deep-pink/30 text-xs font-semibold text-deep-pink uppercase tracking-widest mb-4 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-deep-pink text-deep-pink animate-pulse" />
          <span>{welcome.badge}</span>
        </div>

        {/* Animated Teddy Bear holding beating heart */}
        <div className="my-2 cursor-pointer transform transition-transform hover:scale-105 active:scale-95 filter drop-shadow-md">
          <TeddyBear mode="holding-heart" className="w-48 h-48 sm:w-56 sm:h-56" />
        </div>

        {/* Editorial Headings */}
        <h1 className="text-4xl sm:text-6xl font-black text-theme-text font-serif tracking-tight mt-3 mb-3">
          {welcome.heading}
        </h1>
        <p className="text-base sm:text-lg text-theme-text/80 max-w-md mb-8 leading-relaxed font-sans font-normal">
          {welcome.subtitle}
        </p>

        {/* Soft Glowing Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(232, 121, 169, 0.6)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpen}
          className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF6B95] to-soft-purple text-white font-bold text-lg shadow-cute cursor-pointer transition-all overflow-hidden"
        >
          {/* Button shine reflection */}
          <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
          
          <MailOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="tracking-wide">{welcome.buttonText}</span>
          <Sparkles className="w-4 h-4 opacity-90 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.button>

        {/* Soft hint */}
        <p className="text-xs text-theme-text/60 mt-6 flex items-center gap-1.5 font-medium">
          {welcome.footerHint}
        </p>
      </motion.div>
    </motion.section>
  );
}
