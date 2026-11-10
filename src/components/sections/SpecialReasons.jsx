import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, X, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Sparkle } from 'lucide-react';
import { siteConfig } from '../../data/content';
import { sounds } from '../audio/SoundEffects';

export default function SpecialReasons({ onNext }) {
  const { specialReasons } = siteConfig;
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [isBottleOpen, setIsBottleOpen] = useState(false);

  const handleNext = () => {
    sounds.playPop();
    onNext();
  };

  const handlePhotoClick = (index) => {
    sounds.playPop();
    setActivePhotoIndex(index);
  };

  const closePhotoModal = () => {
    sounds.playPop();
    setActivePhotoIndex(null);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    sounds.playPop();
    setActivePhotoIndex((prev) => 
      prev === 0 ? specialReasons.cards.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    sounds.playPop();
    setActivePhotoIndex((prev) => 
      prev === specialReasons.cards.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenBottle = () => {
    sounds.playChime();
    setIsBottleOpen(true);
  };

  const handleCloseBottle = () => {
    sounds.playPop();
    setIsBottleOpen(false);
  };

  // Scattered polaroid rotations & subtle scrapbook pastel tape tints
  const polaroidRotations = [
    'rotate-[-3deg] hover:rotate-[-1deg]',
    'rotate-[2.5deg] hover:rotate-[0.5deg]',
    'rotate-[-2deg] hover:rotate-[0deg]',
    'rotate-[3deg] hover:rotate-[1deg]'
  ];
  const tapeColors = ['washi-tape', 'washi-tape-alt', 'washi-tape', 'washi-tape-alt'];
  const stickerIcons = ['🌸', '✨', '🎀', '💖'];

  const currentPhoto = activePhotoIndex !== null ? specialReasons.cards[activePhotoIndex] : null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 min-h-screen py-20 px-4 flex flex-col items-center justify-center max-w-5xl mx-auto"
    >
      {/* Editorial Section Heading */}
      <div className="text-center mb-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pink/80 border border-deep-pink/30 text-xs font-semibold text-deep-pink mb-3 shadow-sm"
        >
          <Camera className="w-3.5 h-3.5 text-deep-pink" />
          <span>Interactive Polaroid Memories</span>
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black text-theme-text font-serif tracking-tight leading-tight">
          {specialReasons.heading}
        </h2>
        <p className="text-sm sm:text-base text-theme-text/80 mt-2 font-sans font-medium">
          {specialReasons.subtitle}
        </p>

        {/* Romantic Decorative Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4 text-xs font-handwritten text-deep-pink font-bold">
          <span className="bg-white/80 px-3.5 py-1 rounded-full border border-pastel-pink shadow-sm">
            ✨ Little moments, big memories ❤️
          </span>
          <span className="bg-white/80 px-3.5 py-1 rounded-full border border-lavender shadow-sm">
            🌸 Some smiles are unforgettable
          </span>
          <span className="bg-white/80 px-3.5 py-1 rounded-full border border-pastel-pink shadow-sm">
            📸 Our little collection of happiness
          </span>
        </div>
      </div>

      {/* Floating Message in a Bottle Callout */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenBottle}
        className="mb-10 cursor-pointer bg-gradient-to-r from-white/90 via-pastel-pink/50 to-white/90 backdrop-blur-md px-5 py-3 rounded-full border-2 border-deep-pink/40 shadow-romantic flex items-center gap-3 group transition-all"
      >
        {/* Glowing Bottle Icon */}
        <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-sky-100 to-white flex items-center justify-center shadow-sm border border-sky-200 group-hover:rotate-12 transition-transform duration-300">
          <span className="text-xl">🧴</span>
          <Heart className="w-2.5 h-2.5 fill-deep-pink text-deep-pink absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div className="text-left">
          <span className="text-xs font-bold text-deep-pink block font-sans">
            Psst... Secret Message In A Bottle! ✨
          </span>
          <span className="text-[11px] text-theme-text/70 font-medium">
            Tap the floating bottle to unroll a special note
          </span>
        </div>
      </motion.div>

      {/* Scattered Polaroid Cards Collage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 sm:gap-11 w-full mb-14">
        {specialReasons.cards.map((card, idx) => {
          const isLandscape = card.id === 3;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.7 }}
              whileHover={{ 
                scale: 1.035, 
                boxShadow: '0 25px 50px -10px rgba(232, 121, 169, 0.4)',
                transition: { duration: 0.25 } 
              }}
              onClick={() => handlePhotoClick(idx)}
              className={`relative bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 pb-7 sm:pb-8 shadow-paper border-2 border-slate-100/90 transition-all cursor-pointer group ${polaroidRotations[idx % 4]} ${
                isLandscape ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''
              }`}
            >
              {/* Scrapbook Washi Tape Header */}
              <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 ${tapeColors[idx % 4]} rounded-sm z-10`} />

              {/* Little Corner Sticker */}
              <div className="absolute top-2.5 right-3 text-2xl z-10 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                {stickerIcons[idx % stickerIcons.length]}
              </div>

              {/* Photo Frame Container (Polaroid style) */}
              <div 
                className={`relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner mb-4 ${
                  isLandscape ? 'h-72 sm:h-96 w-full' : 'h-80 sm:h-96 w-full'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.altText}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isLandscape ? 'object-center' : 'object-top'
                  }`}
                  loading="lazy"
                />

                {/* Photo Pill Tag */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{card.tag}</span>
                </div>

                {/* Tap to Zoom Overlay */}
                <div className="absolute inset-0 bg-deep-pink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none duration-300">
                  <div className="bg-white/95 backdrop-blur-md text-deep-pink text-xs font-bold px-4 py-2 rounded-full shadow-cute flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                    <span>View full photo 💗</span>
                  </div>
                </div>
              </div>

              {/* Handwritten Polaroid Bottom Margin */}
              <div className="px-2 pt-1 text-center">
                <p className="font-handwritten text-2xl sm:text-3xl text-theme-text font-bold leading-snug">
                  "{card.quote}"
                </p>
                <span className="text-xs font-sans font-semibold text-deep-pink/80 mt-1 block">
                  — {card.caption}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button at bottom of gallery: "Okay... one last question 🥺" */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(232, 121, 169, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-deep-pink via-[#FF527B] to-soft-purple text-white font-extrabold text-lg sm:text-xl shadow-cute cursor-pointer transition-all"
      >
        <span>{specialReasons.buttonText}</span>
        <Heart className="w-5 h-5 fill-white animate-pulse" />
      </motion.button>

      {/* ================= LIGHTBOX MODAL WITH PREV/NEXT ================= */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePhotoModal}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] p-4 sm:p-7 max-w-xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative border-4 border-pastel-pink flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={closePhotoModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pastel-pink/80 text-deep-pink flex items-center justify-center hover:bg-pastel-pink transition-colors cursor-pointer z-20 shadow-sm"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-deep-pink border border-pastel-pink shadow-md flex items-center justify-center hover:bg-pastel-pink hover:text-white transition-all cursor-pointer z-20"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-deep-pink border border-pastel-pink shadow-md flex items-center justify-center hover:bg-pastel-pink hover:text-white transition-all cursor-pointer z-20"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Photo Display (Full Aspect Ratio Uncropped) */}
              <div className="rounded-2xl overflow-hidden max-h-[62vh] w-full flex items-center justify-center bg-slate-50 mb-4 border border-pastel-pink/40 shadow-inner p-1">
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.altText}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {/* Photo Caption & Counter */}
              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs font-bold text-deep-pink bg-pastel-pink/60 px-3 py-1 rounded-full">
                    {activePhotoIndex + 1} of {specialReasons.cards.length}
                  </span>
                  <span className="text-xs font-semibold text-theme-text/60">
                    {currentPhoto.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-theme-text font-serif mb-1">
                  {currentPhoto.caption}
                </h3>
                <p className="font-handwritten text-2xl text-deep-pink font-bold">
                  "{currentPhoto.quote}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SECRET MESSAGE IN A BOTTLE MODAL ================= */}
      <AnimatePresence>
        {isBottleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseBottle}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFDF9] rounded-[2.5rem] p-7 sm:p-10 max-w-lg w-full shadow-2xl relative border-4 border-pastel-pink/80 lined-paper text-center overflow-hidden"
            >
              {/* Bottle Header Illustration */}
              <div className="mb-3 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-pastel-pink/50 flex items-center justify-center text-3xl shadow-sm border border-pastel-pink">
                  🧴
                </div>
              </div>

              <span className="text-xs uppercase font-extrabold tracking-wider text-deep-pink bg-pastel-pink/70 px-3.5 py-1 rounded-full inline-block mb-3">
                {specialReasons.bottleMessage.tag}
              </span>

              {/* Scroll Content */}
              <div className="my-4">
                <p className="font-handwritten text-2xl sm:text-3xl text-theme-text font-bold leading-relaxed">
                  "{specialReasons.bottleMessage.text}"
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseBottle}
                className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-deep-pink to-soft-purple text-white font-bold text-base shadow-cute cursor-pointer"
              >
                <span>{specialReasons.bottleMessage.buttonText}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
