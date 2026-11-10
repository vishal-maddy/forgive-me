import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import TeddyBear from '../characters/TeddyBear';
import CryingCat from '../characters/CryingCat';
import SadCloud from '../characters/SadCloud';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function Forgiveness({ onForgiven, onRainChange }) {
  const { forgiveness } = siteConfig;

  // States:
  // 'initial' | 'no-step1' | 'no-step2' | 'no-step3' | 'yes-celebrating'
  const [stage, setStage] = useState('initial');

  const handleYes = () => {
    sounds.playCelebration();
    if (onRainChange) onRainChange(false); // Stop rain immediately
    
    // Heart-shaped multi-cannon celebration confetti
    try {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD6E7', '#E879A9', '#E9D5FF', '#FF80B5', '#FFF8F0', '#FFE27A']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#FFD6E7', '#E879A9', '#FFAEC8']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#E9D5FF', '#C4A1E8', '#FF80B5']
        });
      }, 300);
    } catch {}

    setStage('yes-celebrating');

    // Transition smoothly to celebration section
    setTimeout(() => {
      onForgiven();
    }, 2400);
  };

  const handleNo = () => {
    sounds.playSad();
    if (onRainChange) onRainChange(true); // Start gentle rain
    setStage('no-step1');
  };

  // Automated gentle timer transitions for dramatic NO sequence,
  // while also allowing immediate tap to advance if the user wants!
  useEffect(() => {
    if (stage === 'no-step1') {
      const timer = setTimeout(() => {
        setStage('no-step2');
      }, 3500);
      return () => clearTimeout(timer);
    } else if (stage === 'no-step2') {
      const timer = setTimeout(() => {
        setStage('no-step3');
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-20 min-h-screen py-16 px-4 flex flex-col items-center justify-center text-center"
    >
      <AnimatePresence mode="wait">
        {/* ================= STAGE 1: INITIAL QUESTION ================= */}
        {stage === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="w-full max-w-lg glass-panel p-8 sm:p-12 rounded-[2.5rem] shadow-romantic flex flex-col items-center border border-white/80 relative z-20"
          >
            {/* Cute crying teddy bear with pleading eyes */}
            <div className="mb-2 filter drop-shadow-md">
              <TeddyBear mode="crying" className="w-48 h-48 sm:w-56 sm:h-56" />
            </div>

            {/* Editorial Heading */}
            <h2 className="text-4xl sm:text-6xl font-black text-theme-text font-serif tracking-tight mt-3 mb-2">
              {forgiveness.heading}
            </h2>
            <p className="text-base sm:text-xl font-bold text-deep-pink mb-8 font-sans">
              {forgiveness.subtitle}
            </p>

            {/* The Two Main Buttons: YES and NO (High z-index, touch friendly) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-30">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px -10px rgba(232, 121, 169, 0.6)' }}
                whileTap={{ scale: 0.94 }}
                onClick={handleYes}
                className="w-full sm:w-1/2 py-4.5 px-6 rounded-full bg-gradient-to-r from-deep-pink via-[#FF527B] to-theme-pink text-white font-extrabold text-xl shadow-cute-lg flex items-center justify-center gap-2.5 cursor-pointer transition-transform pointer-events-auto"
              >
                <span>{forgiveness.yesBtn}</span>
                <Heart className="w-5 h-5 fill-white animate-pulse" />
              </motion.button>

              {/* NO BUTTON */}
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleNo}
                className="w-full sm:w-1/2 py-4.5 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xl border-2 border-slate-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all pointer-events-auto"
              >
                <span>{forgiveness.noBtn}</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 2: NO SEQUENCE STEP 1 (RAIN + NOOOOO) ================= */}
        {/* Bright, uncluttered, high-contrast card with crying cat & teddy */}
        {stage === 'no-step1' && (
          <motion.div
            key="no-step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg bg-white/95 backdrop-blur-md p-8 sm:p-11 rounded-[2.5rem] border-2 border-sky-300 shadow-romantic flex flex-col items-center text-center relative z-20"
          >
            {/* Sad Rainy Cloud */}
            <div className="mb-2">
              <SadCloud className="w-40 h-28" />
            </div>

            {/* Crying Teddy and Crying Cat together */}
            <div className="flex items-center justify-center gap-4 my-2 filter drop-shadow-md">
              <CryingCat className="w-36 h-36" showPleadingText={false} />
              <TeddyBear mode="crying" className="w-36 h-36" />
            </div>

            {/* Big Expressive High-Contrast Headline */}
            <h2 className="text-4xl sm:text-6xl font-black text-deep-pink font-serif tracking-wider mt-4 animate-bounce">
              {forgiveness.noFlow.step1.text}
            </h2>
            <p className="text-base sm:text-lg text-theme-text font-bold mt-2 font-sans">
              {forgiveness.noFlow.step1.subtext}
            </p>

            <button
              onClick={() => setStage('no-step2')}
              className="mt-6 text-sm text-deep-pink underline underline-offset-4 font-bold cursor-pointer hover:scale-105 transition-transform relative z-30 pointer-events-auto"
            >
              (Tap to see how sorry I am... 🥺)
            </button>
          </motion.div>
        )}

        {/* ================= STAGE 3: NO SEQUENCE STEP 2 (FULL SCREEN DRAMATIC PLEADING) ================= */}
        {/* Clear, bright, ultra-readable card */}
        {stage === 'no-step2' && (
          <motion.div
            key="no-step2"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border-3 border-deep-pink/60 shadow-romantic flex flex-col items-center text-center relative z-20"
          >
            {/* Crying Cat and Crying Teddy Together */}
            <div className="flex items-center justify-center gap-4 sm:gap-10 my-2">
              <CryingCat className="w-40 h-40 sm:w-48 sm:h-48" showPleadingText={true} />
              <TeddyBear mode="crying" className="w-40 h-40 sm:w-48 sm:h-48" />
            </div>

            {/* HUGE High-Contrast Headline */}
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-deep-pink font-serif tracking-tight mt-6 text-center leading-tight filter drop-shadow-sm"
            >
              {forgiveness.noFlow.step2.text}
            </motion.h2>

            <p className="text-base sm:text-xl text-theme-text font-bold mt-3 max-w-md font-sans">
              {forgiveness.noFlow.step2.subtext}
            </p>

            <button
              onClick={() => setStage('no-step3')}
              className="mt-7 text-sm text-deep-pink underline underline-offset-4 font-bold cursor-pointer hover:scale-105 transition-transform relative z-30 pointer-events-auto"
            >
              (Please give me one tiny chance... 🥺)
            </button>
          </motion.div>
        )}

        {/* ================= STAGE 4: NO SEQUENCE STEP 3 (SECOND CHANCE: YES & YESSSS) ================= */}
        {/* Clear, bright, high-contrast, large touch-friendly buttons */}
        {stage === 'no-step3' && (
          <motion.div
            key="no-step3"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg bg-white/95 backdrop-blur-md p-8 sm:p-11 rounded-[2.5rem] shadow-romantic flex flex-col items-center text-center border-2 border-pastel-pink relative z-20"
          >
            {/* Crying Cat with pleading eyes */}
            <div className="mb-2 filter drop-shadow-md">
              <CryingCat className="w-44 h-44 sm:w-52 sm:h-52" showPleadingText={true} />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-theme-text font-serif mt-4 mb-2">
              {forgiveness.noFlow.step3.question}
            </h2>
            <p className="text-base sm:text-lg text-deep-pink font-bold mb-7 font-sans">
              I learned my lesson, I promise! 🥺❤️
            </p>

            {/* Two High-Contrast Buttons: YES and YESSSS (Elevated z-30, large touch targets) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-30 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px -10px rgba(232, 121, 169, 0.6)' }}
                whileTap={{ scale: 0.94 }}
                onClick={handleYes}
                className="w-full sm:w-1/2 py-4.5 px-6 rounded-full bg-gradient-to-r from-deep-pink via-[#FF527B] to-theme-pink text-white font-extrabold text-xl shadow-cute-lg flex items-center justify-center gap-2 cursor-pointer transition-transform pointer-events-auto"
              >
                <span>{forgiveness.noFlow.step3.yesBtn1}</span>
                <Heart className="w-5 h-5 fill-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px -10px rgba(196, 161, 232, 0.6)' }}
                whileTap={{ scale: 0.94 }}
                onClick={handleYes}
                className="w-full sm:w-1/2 py-4.5 px-6 rounded-full bg-gradient-to-r from-soft-purple to-deep-pink text-white font-extrabold text-xl shadow-cute-lg flex items-center justify-center gap-2 cursor-pointer transition-transform animate-pulse pointer-events-auto"
              >
                <span>{forgiveness.noFlow.step3.yesBtn2}</span>
                <Sparkles className="w-5 h-5 fill-white" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 5: YES CELEBRATION IMMEDIATE POPUP ================= */}
        {stage === 'yes-celebrating' && (
          <motion.div
            key="yes-celebration"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.35 }}
            className="w-full max-w-lg glass-panel p-8 sm:p-12 rounded-[2.5rem] shadow-romantic flex flex-col items-center border-4 border-pastel-pink text-center relative z-20"
          >
            {/* Joyful dancing teddy bear */}
            <div className="mb-4 filter drop-shadow-md">
              <TeddyBear mode="dancing" className="w-48 h-48 sm:w-60 sm:h-60" />
            </div>

            {/* Celebration Heading */}
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="text-3xl sm:text-5xl font-black text-deep-pink font-serif tracking-tight leading-tight"
            >
              {forgiveness.celebrationPopup}
            </motion.h2>

            <p className="text-base sm:text-lg text-theme-text font-bold mt-3 font-sans">
              Taking you to your special surprise... 💖✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
