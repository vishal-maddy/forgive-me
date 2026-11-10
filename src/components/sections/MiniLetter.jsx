import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, Heart } from 'lucide-react';
import TeddyBear from '../characters/TeddyBear';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function MiniLetter({ onNext }) {
  const { miniLetter } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sounds.playChime();
    setIsOpen(true);
  };

  const handleNext = () => {
    sounds.playPop();
    onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 min-h-screen py-16 px-4 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pastel-pink/80 border border-deep-pink/30 text-xs font-semibold text-deep-pink mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-deep-pink" />
            <span>Almost At The Question</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-theme-text font-serif tracking-tight">
            {miniLetter.heading}
          </h2>
          <p className="text-sm sm:text-base text-theme-text/80 mt-2 font-sans font-medium">
            {miniLetter.subheading}
          </p>
        </div>

        {/* Closed Envelope view */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            {/* Cute Teddy Bear peeking */}
            <div className="mb-2 filter drop-shadow-md">
              <TeddyBear mode="holding-heart" className="w-40 h-40 sm:w-48 sm:h-48" />
            </div>

            {/* Envelope Card */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpen}
              className="w-76 sm:w-84 h-48 rounded-3xl bg-gradient-to-br from-[#FFE4EE] via-[#FFD6E7] to-[#E9D5FF] border-4 border-white envelope-shadow cursor-pointer flex flex-col items-center justify-center p-5 relative group overflow-hidden"
            >
              <div 
                className="absolute top-0 inset-x-0 h-28 bg-[#FFAEC8] border-b-2 border-white/60 origin-top group-hover:-translate-y-1 transition-transform duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-deep-pink to-[#FF527B] border-2 border-white shadow-md flex items-center justify-center mb-1">
                <Heart className="w-7 h-7 fill-white text-white animate-pulse" />
              </div>
              <p className="relative z-10 text-xs font-bold text-deep-pink mt-2 tracking-wide bg-white/90 px-3 py-1 rounded-full shadow-sm">
                {miniLetter.closedHint}
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 35px -10px rgba(232, 121, 169, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="mt-7 inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF6B95] to-soft-purple text-white font-bold text-base shadow-cute cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{miniLetter.buttonText}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* REVEALED LETTER VIEW */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="w-full bg-[#FFFDF9] rounded-3xl p-7 sm:p-11 shadow-romantic border-2 border-pastel-pink/70 relative lined-paper text-left"
            >
              {/* Cute Washi Tape Decor */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-alt rounded-sm opacity-95 z-20" />

              {/* Decorative Corner Flowers */}
              <div className="absolute top-4 right-4 text-2xl select-none opacity-40 pointer-events-none">
                🌸
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-handwritten text-2xl sm:text-3xl text-theme-text font-bold leading-relaxed pt-2">
                {miniLetter.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15 }}
                    className={idx === miniLetter.paragraphs.length - 1 ? "text-deep-pink font-extrabold text-3xl sm:text-4xl pt-3" : ""}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Closing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-right font-handwritten"
              >
                <p className="text-xl text-theme-text/80">{miniLetter.closing}</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-deep-pink mt-1">
                  {miniLetter.signature}
                </p>
              </motion.div>

              {/* Action Button Inside Revealed Card */}
              <div className="mt-10 text-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 35px -10px rgba(232, 121, 169, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-deep-pink via-[#FF6B95] to-soft-purple text-white font-bold text-lg shadow-cute cursor-pointer transition-all"
                >
                  <span>{miniLetter.buttonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.section>
  );
}
