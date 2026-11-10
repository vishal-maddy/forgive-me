import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { sounds } from './SoundEffects';

export default function FloatingMusicPlayer() {
  const [audioState, setAudioState] = useState({
    isPlayingMusic: false,
    isMuted: false,
    volume: 0.6
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = sounds.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    sounds.playPop();
    sounds.toggleMusic();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    sounds.playPop();
    sounds.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    sounds.setVolume(val);
  };

  const toggleExpand = () => {
    sounds.playPop();
    setIsExpanded((prev) => !prev);
  };

  const { isPlayingMusic, isMuted, volume } = audioState;
  const isActuallyAudible = isPlayingMusic && !isMuted && volume > 0;

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* Floating Animated Music Notes while playing */}
      <AnimatePresence>
        {isActuallyAudible && (
          <div className="absolute -top-8 left-6 pointer-events-none z-10">
            <span className="absolute animate-float-note text-deep-pink font-bold text-sm" style={{ animationDelay: '0s' }}>
              ♪
            </span>
            <span className="absolute animate-float-note text-soft-purple font-bold text-base" style={{ animationDelay: '0.6s', left: '16px' }}>
              ♫
            </span>
            <span className="absolute animate-float-note text-[#FF6B95] font-bold text-xs" style={{ animationDelay: '1.2s', left: '-8px' }}>
              ♩
            </span>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-panel rounded-full sm:rounded-3xl p-2 sm:p-3 shadow-romantic border-2 border-pastel-pink/80 bg-white/90 backdrop-blur-md flex items-center gap-3 transition-all duration-300"
      >
        {/* Animated Vinyl Disc */}
        <div 
          onClick={handleTogglePlay}
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full cursor-pointer flex-shrink-0 flex items-center justify-center shadow-md group"
          title={isPlayingMusic ? "Pause music" : "Play music"}
        >
          {/* Vinyl Grooves Body */}
          <div 
            className={`w-full h-full rounded-full bg-gradient-to-tr from-[#2A1B24] via-[#4A2838] to-[#1E1219] p-1 flex items-center justify-center transition-transform duration-500 ${
              isActuallyAudible ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            {/* Vinyl inner groove lines */}
            <div className="w-full h-full rounded-full border border-white/20 p-1 flex items-center justify-center">
              {/* Pink Heart Center Label */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-deep-pink to-[#FF80B5] flex items-center justify-center border border-white/60">
                <Heart className="w-2.5 h-2.5 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Hover Play/Pause Overlay indicator */}
          <div className="absolute inset-0 rounded-full bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {isPlayingMusic ? (
              <Pause className="w-4 h-4 text-white fill-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Expanded View: Track Details, Equalizer & Volume */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 overflow-hidden pr-1"
            >
              {/* Track Name & Equalizer */}
              <div className="flex flex-col min-w-[100px] sm:min-w-[125px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-theme-text truncate font-serif">
                    Our Love Song 💗
                  </span>
                  {/* Jumping Equalizer bars */}
                  {isActuallyAudible ? (
                    <div className="flex items-end gap-[2px] h-3.5 mb-0.5">
                      <span className="w-1 bg-deep-pink rounded-full animate-eq-1" />
                      <span className="w-1 bg-soft-purple rounded-full animate-eq-2" />
                      <span className="w-1 bg-deep-pink rounded-full animate-eq-3" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-theme-text/50 font-medium">paused</span>
                  )}
                </div>

                <span className="text-[10px] text-deep-pink font-semibold truncate font-sans">
                  {isPlayingMusic ? (isMuted ? "Muted 🔇" : "Sweet Lullaby 🎵") : "Click Play to listen"}
                </span>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-deep-pink to-theme-pink text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                title={isPlayingMusic ? "Pause" : "Play"}
              >
                {isPlayingMusic ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              {/* Mute Button */}
              <button
                onClick={handleToggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="w-7 h-7 rounded-full bg-pastel-pink/60 text-deep-pink hover:bg-pastel-pink flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-theme-text/60" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Smooth Volume Slider (shown on desktop or when toggled) */}
              <div 
                className="hidden sm:flex items-center gap-1.5 w-16"
                title={`Volume: ${Math.round(volume * 100)}%`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-pastel-pink rounded-lg appearance-none cursor-pointer accent-deep-pink"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Toggle Button (Collapse / Expand) */}
        <button
          onClick={toggleExpand}
          className="text-theme-text/50 hover:text-deep-pink p-1 rounded-full transition-colors cursor-pointer"
          title={isExpanded ? "Collapse player" : "Expand player"}
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg] sm:rotate-0" />
          ) : (
            <Music className="w-3.5 h-3.5 text-deep-pink" />
          )}
        </button>
      </motion.div>
    </div>
  );
}

