import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, Award, Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import TeddyBear from '../characters/TeddyBear';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function Celebration({ onReplay }) {
  const { celebration } = siteConfig;
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  const handleOpenGift = () => {
    if (!isGiftOpened) {
      sounds.playChime();
      try {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.7 },
          colors: ['#FFD6E7', '#E879A9', '#E9D5FF', '#FF80B5', '#FFF8F0', '#FFE27A']
        });
      } catch {}
      setIsGiftOpened(true);
    }
  };

  const handleReplayClick = () => {
    sounds.playPop();
    onReplay();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 min-h-screen py-20 px-4 flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
    >
      {/* Celebration Card Container */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="glass-panel w-full p-7 sm:p-11 rounded-[2.5rem] shadow-romantic relative overflow-hidden flex flex-col items-center border-4 border-pastel-pink/80 mb-6"
      >
        {/* Washi Tape Header */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape rounded-sm z-20" />

        {/* Mission Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pastel-pink to-lavender border border-deep-pink/30 text-xs font-bold text-deep-pink uppercase tracking-widest mb-4 shadow-sm">
          <Award className="w-4 h-4 text-deep-pink" />
          <span>{celebration.badge}</span>
        </div>

        {/* Dancing Teddy Bear */}
        <div className="my-2 cursor-pointer transform hover:scale-105 transition-transform duration-300 filter drop-shadow-md">
          <TeddyBear mode="dancing" className="w-44 h-44 sm:w-52 sm:h-52" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-theme-text font-serif tracking-tight mt-2 mb-2">
          {celebration.heading}
        </h1>
        <p className="text-base sm:text-xl font-bold text-deep-pink mb-6 font-sans">
          {celebration.subtitle}
        </p>

        {/* First Celebration Message Card */}
        <div className="w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-paper border-2 border-pastel-pink/70 lined-paper text-left mb-6 relative">
          <div className="absolute top-3 right-4 text-xl select-none opacity-40">🌸</div>

          <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-theme-text font-bold leading-relaxed">
            {celebration.messageParagraphs.map((para, idx) => (
              <p 
                key={idx} 
                className={idx === celebration.messageParagraphs.length - 1 ? "text-deep-pink text-2xl sm:text-3xl pt-2 font-extrabold text-center sm:text-left" : ""}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-3xl">
            <span>🧸</span>
            <Heart className="w-6 h-6 fill-deep-pink text-deep-pink animate-pulse" />
            <span>🍅</span>
          </div>
        </div>

        {/* ================= VIRTUAL WRAPPED GIFT BOX ================= */}
        <div className="w-full mt-4 flex flex-col items-center">
          {!isGiftOpened ? (
            /* Closed Floating Gift Box */
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="w-full max-w-sm cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-[#FFE4EE] via-[#FFD6E7] to-[#E9D5FF] border-3 border-white shadow-romantic flex flex-col items-center group transition-all relative overflow-hidden"
            >
              {/* Soft Pulsing Aura */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Gift Ribbon Cross Overlay */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#FF527B] to-deep-pink shadow-sm opacity-80" />
              <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#FF527B] to-deep-pink shadow-sm opacity-80" />

              {/* Center Bow with Heart */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white shadow-md border-2 border-deep-pink flex items-center justify-center mb-2 animate-bounce-cute">
                <Gift className="w-8 h-8 text-deep-pink" />
                <Heart className="w-3.5 h-3.5 fill-[#FF527B] text-[#FF527B] absolute -top-1 -right-1 animate-pulse" />
              </div>

              {/* Tag & Hint */}
              <div className="relative z-10 text-center mt-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border border-pastel-pink shadow-sm">
                <span className="text-xs uppercase font-extrabold text-deep-pink tracking-wider block">
                  {celebration.virtualGift.tag}
                </span>
                <span className="text-xs font-semibold text-theme-text/80 mt-0.5 block">
                  {celebration.virtualGift.boxHint}
                </span>
              </div>
            </motion.div>
          ) : (
            /* Opened Gift Card */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-9 shadow-paper border-2 border-deep-pink/50 lined-paper text-left relative overflow-hidden"
              >
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape rounded-sm opacity-95" />

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-pink bg-pastel-pink/70 px-3.5 py-1 rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-deep-pink" />
                  <span>{celebration.virtualGift.title}</span>
                </div>

                {/* Final Handwritten Letter Content */}
                <p className="font-handwritten text-2xl sm:text-3xl text-theme-text font-bold leading-relaxed pt-1">
                  "{celebration.virtualGift.finalLetter}"
                </p>

                <div className="mt-5 text-right font-handwritten">
                  <p className="text-2xl sm:text-3xl font-extrabold text-deep-pink">
                    Always with love, Your Idiot ❤️
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Replay Our Little Story Button */}
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 35px -10px rgba(232, 121, 169, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReplayClick}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white hover:bg-cream border-2 border-deep-pink text-deep-pink font-extrabold text-lg shadow-cute cursor-pointer transition-all group"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-90 duration-300" />
            <span>{celebration.virtualGift.replayButton}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}
