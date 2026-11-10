import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Mail, ChevronRight } from 'lucide-react';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function Apology({ onNext, onGoToForgiveness }) {
  const { apology } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState(1); // 1 or 2

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      sounds.playChime();
      setIsOpen(true);
    }
  };

  const handleNextLetter = () => {
    sounds.playChime();
    setActiveLetter(2);
    // Smoothly scroll to the top of the letter container if needed
    const container = document.getElementById('letter-scroll-area');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevLetter = () => {
    sounds.playPop();
    setActiveLetter(1);
    const container = document.getElementById('letter-scroll-area');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinish = () => {
    sounds.playPop();
    if (onNext) onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pastel-pink/80 border border-deep-pink/30 text-xs font-semibold text-deep-pink mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-deep-pink" />
            <span>Handwritten Apology Letters</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-theme-text font-serif tracking-tight max-w-xl mx-auto leading-tight">
            {apology.heading}
          </h2>
          <p className="text-sm sm:text-base text-theme-text/80 mt-2 font-sans font-medium">
            {!isOpen ? apology.subheading : "Two letters written straight from my heart..."}
          </p>
        </motion.div>

        {/* Envelope & Letters Container */}
        <div className="relative w-full flex flex-col items-center">
          {!isOpen ? (
            /* ================= CLOSED ENVELOPE WITH WAX SEAL ================= */
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenEnvelope}
              className="w-full max-w-md h-72 sm:h-80 rounded-3xl bg-gradient-to-br from-[#FFE4EE] via-[#FFD6E7] to-[#E9D5FF] border-4 border-white envelope-shadow cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-6 select-none group"
            >
              {/* Envelope Flap Triangles with 3D Depth */}
              <div 
                className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FFAEC8] to-[#FF9EBC] border-b-2 border-white/70 transition-transform origin-top group-hover:-translate-y-1.5 duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
              <div 
                className="absolute bottom-0 inset-x-0 h-40 bg-pastel-pink/50 border-t border-white/40"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
              />

              {/* Stacked Letters Peeking hint inside flap */}
              <div className="absolute top-12 w-48 h-8 bg-white/70 rounded-t-lg border border-pastel-pink/50 shadow-sm transform -rotate-1 group-hover:-translate-y-2 transition-transform duration-300" />
              <div className="absolute top-14 w-52 h-8 bg-[#FFFDF9]/90 rounded-t-lg border border-pastel-pink/60 shadow-sm transform rotate-1 group-hover:-translate-y-1 transition-transform duration-300" />

              {/* Realistic Crimson Wax Seal with Heart Relief */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#B2224A] via-[#E82A5E] to-[#FF4D7E] border-4 border-[#FFF5B8]/80 shadow-wax flex items-center justify-center transform transition-transform group-hover:scale-110 active:scale-90 duration-300">
                <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center bg-black/10">
                  <Heart className="w-8 h-8 fill-white text-white filter drop-shadow-sm animate-pulse" />
                </div>
              </div>

              {/* Tag below seal */}
              <div className="relative z-10 mt-5 px-5 py-1.5 rounded-full bg-white/95 text-xs font-bold text-deep-pink tracking-wider shadow-sm flex items-center gap-2 border border-pastel-pink/40">
                <Mail className="w-3.5 h-3.5" />
                <span>TAP TO UNSEAL BOTH LETTERS 💌</span>
              </div>
            </motion.div>
          ) : (
            /* ================= REVEALED LETTERS WITH SMOOTH PAGE TURN ================= */
            <div className="w-full flex flex-col items-center">
              {/* Progress Indicator: Letter 1 of 2 or Letter 2 of 2 */}
              <div className="flex items-center justify-between w-full max-w-lg mb-4 px-2">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-pastel-pink text-xs font-bold text-deep-pink shadow-sm">
                  <span>{activeLetter === 1 ? apology.letter1.badge : apology.letter2.badge}</span>
                </div>

                {/* Mini Dots Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveLetter(1)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeLetter === 1 ? 'w-6 bg-deep-pink' : 'w-2.5 bg-pastel-pink hover:bg-theme-pink'
                    }`}
                    title="Letter 1"
                  />
                  <button
                    onClick={() => setActiveLetter(2)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeLetter === 2 ? 'w-6 bg-deep-pink' : 'w-2.5 bg-pastel-pink hover:bg-theme-pink'
                    }`}
                    title="Letter 2"
                  />
                </div>
              </div>

              {/* Main Letter Scrollable Box */}
              <AnimatePresence mode="wait">
                {activeLetter === 1 ? (
                  /* ================= LETTER 1: A LETTER FROM MY HEART ================= */
                  <motion.div
                    key="letter-1"
                    initial={{ opacity: 0, x: -30, rotate: -1 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -40, rotate: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-[#FFFDF9] rounded-[2.5rem] p-6 sm:p-10 shadow-romantic border-2 border-pastel-pink/80 relative lined-paper overflow-hidden"
                  >
                    {/* Washi Tape Header */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape rounded-sm opacity-95 z-20" />

                    {/* Decorative Corner Flowers & Accents */}
                    <div className="absolute top-4 left-4 text-2xl select-none opacity-40 pointer-events-none">
                      🌸
                    </div>
                    <div className="absolute bottom-6 right-5 text-2xl select-none opacity-40 pointer-events-none">
                      🌷
                    </div>

                    {/* Airmail Stamp */}
                    <div className="absolute top-5 right-5 w-14 h-16 border-2 border-dashed border-deep-pink/50 rounded-lg flex flex-col items-center justify-center bg-pastel-pink/30 rotate-6 shadow-sm">
                      <span className="text-xl">💌</span>
                      <span className="text-[10px] font-black text-deep-pink tracking-tight">NO. 1</span>
                    </div>

                    {/* Scrollable Letter Body */}
                    <div 
                      id="letter-scroll-area"
                      className="max-h-[62vh] sm:max-h-[68vh] overflow-y-auto pr-2 sm:pr-4 pt-4 space-y-4"
                    >
                      {/* Letter 1 Title & Greeting */}
                      <div className="mb-4">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-deep-pink bg-pastel-pink/70 px-3 py-1 rounded-full inline-block mb-2">
                          Letter 1 of 2
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-black text-theme-text tracking-tight">
                          {apology.letter1.title}
                        </h3>
                        <p className="font-handwritten text-3xl text-deep-pink font-bold mt-2">
                          {apology.letter1.greeting}
                        </p>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-deep-pink to-transparent mt-1.5 rounded-full" />
                      </div>

                      {/* Paragraphs */}
                      <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-theme-text font-bold leading-relaxed">
                        {apology.letter1.paragraphs.map((p, idx) => (
                          <p key={idx} className={idx === apology.letter1.paragraphs.length - 1 ? "text-deep-pink text-2xl sm:text-3xl font-extrabold pt-2" : ""}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Sincere Closing */}
                      <div className="mt-8 text-right font-handwritten pt-4 border-t border-pastel-pink/40">
                        <p className="text-xl text-theme-text/80">{apology.letter1.closing}</p>
                        <p className="text-3xl sm:text-4xl font-extrabold text-deep-pink mt-1">
                          {apology.letter1.signee}
                        </p>
                      </div>

                      {/* Bottom Button to Advance to Letter 2 */}
                      <div className="pt-6 pb-2 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 20px 35px -10px rgba(232, 121, 169, 0.5)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleNextLetter}
                          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF6B95] to-soft-purple text-white font-bold text-lg shadow-cute cursor-pointer transition-all"
                        >
                          <span>{apology.letter1.buttonText}</span>
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* ================= LETTER 2: ONE MORE THING I WANT YOU TO KNOW ================= */
                  <motion.div
                    key="letter-2"
                    initial={{ opacity: 0, x: 30, rotate: 1 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: 40, rotate: -1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-[#FDFBFF] rounded-[2.5rem] p-6 sm:p-10 shadow-romantic border-2 border-lavender relative lined-paper overflow-hidden"
                  >
                    {/* Washi Tape Header (Lavender style) */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-alt rounded-sm opacity-95 z-20" />

                    {/* Corner Botanical / Heart Accents */}
                    <div className="absolute top-4 right-4 text-2xl select-none opacity-40 pointer-events-none">
                      🌸
                    </div>
                    <div className="absolute bottom-6 left-5 text-2xl select-none opacity-40 pointer-events-none">
                      💖
                    </div>

                    {/* Special Stamp for Letter 2 */}
                    <div className="absolute top-5 right-5 w-14 h-16 border-2 border-dashed border-soft-purple/70 rounded-lg flex flex-col items-center justify-center bg-lavender/30 -rotate-3 shadow-sm">
                      <span className="text-xl">💌</span>
                      <span className="text-[10px] font-black text-soft-purple tracking-tight">NO. 2</span>
                    </div>

                    {/* Scrollable Letter 2 Body */}
                    <div 
                      id="letter-scroll-area"
                      className="max-h-[62vh] sm:max-h-[68vh] overflow-y-auto pr-2 sm:pr-4 pt-4 space-y-4"
                    >
                      {/* Letter 2 Header */}
                      <div className="mb-4">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-soft-purple bg-lavender/70 px-3 py-1 rounded-full inline-block mb-2">
                          Letter 2 of 2
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-black text-theme-text tracking-tight">
                          {apology.letter2.title}
                        </h3>
                        <p className="font-handwritten text-3xl text-deep-pink font-bold mt-2">
                          {apology.letter2.greeting}
                        </p>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-soft-purple to-transparent mt-1.5 rounded-full" />
                      </div>

                      {/* Paragraphs */}
                      <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-theme-text font-bold leading-relaxed">
                        {apology.letter2.paragraphs.map((p, idx) => {
                          const isBigQuestion = p.includes("PLEASE FORGIVE YOUR IDIOT");
                          return (
                            <p 
                              key={idx} 
                              className={isBigQuestion 
                                ? "text-deep-pink text-3xl sm:text-4xl font-extrabold py-3 text-center sm:text-left tracking-wide" 
                                : ""
                              }
                            >
                              {p}
                            </p>
                          );
                        })}
                      </div>

                      {/* Sincere Closing */}
                      <div className="mt-8 text-right font-handwritten pt-4 border-t border-lavender/60">
                        <p className="text-xl text-theme-text/80">{apology.letter2.closing}</p>
                        <p className="text-3xl sm:text-4xl font-extrabold text-deep-pink mt-1">
                          {apology.letter2.signee}
                        </p>
                      </div>

                      {/* Action Buttons at the Bottom of Letter 2 */}
                      <div className="pt-8 pb-3 flex flex-col items-center gap-3">
                        {/* Primary Button: Continues to Photo Memories Gallery */}
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(232, 121, 169, 0.6)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleFinish}
                          className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF527B] to-soft-purple text-white font-extrabold text-lg sm:text-xl shadow-cute cursor-pointer transition-all w-full sm:w-auto"
                        >
                          <span>{apology.letter2.buttonText}</span>
                          <Heart className="w-5 h-5 fill-white animate-pulse" />
                        </motion.button>

                        {/* Back to Letter 1 Button */}
                        <div className="mt-1">
                          <button
                            onClick={handlePrevLetter}
                            className="text-xs font-semibold text-theme-text/70 hover:text-deep-pink underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{apology.letter2.prevButtonText}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
