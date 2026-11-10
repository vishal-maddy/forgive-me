/**
 * Sound Manager for Operation: Forgive Your Idiot
 * Uses Web Audio API for 100% reliable offline romantic music box & cute SFX,
 * while also supporting a local audio file placeholder (/audio/romantic_bgm.mp3).
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.bgmAudioElement = null;
    this.useSynthesizer = true;
    this.volume = 0.6;
    this.previousVolume = 0.6;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({
      isPlayingMusic: this.isPlayingMusic,
      isMuted: this.isMuted,
      volume: this.volume
    });
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb({
          isPlayingMusic: this.isPlayingMusic,
          isMuted: this.isMuted,
          volume: this.volume
        });
      } catch {}
    });
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Try setting up local audio element placeholder
    if (!this.bgmAudioElement) {
      try {
        const audio = new Audio('/audio/romantic_bgm.mp3');
        audio.loop = true;
        audio.volume = this.volume;
        audio.addEventListener('error', () => {
          // If local audio file not provided, safely fallback to synthesized music box
          this.useSynthesizer = true;
        });
        audio.addEventListener('canplaythrough', () => {
          this.useSynthesizer = false;
        });
        this.bgmAudioElement = audio;
      } catch {
        this.useSynthesizer = true;
      }
    }
  }

  toggleMusic() {
    this.init();
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    this.init();
    this.isMuted = false;
    this.isPlayingMusic = true;

    if (!this.useSynthesizer && this.bgmAudioElement) {
      this.bgmAudioElement.volume = this.volume;
      this.bgmAudioElement.play().catch(() => {
        this.useSynthesizer = true;
        this.startSynthMusic();
      });
    } else {
      this.startSynthMusic();
    }
    this.notify();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.pause();
      } catch {}
    }
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.notify();
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.volume = this.isMuted ? 0 : this.volume;
      } catch {}
    }
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.volume = this.isMuted ? 0 : this.volume;
      } catch {}
    }
    this.notify();
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.bgmAudioElement) {
      try {
        this.bgmAudioElement.volume = this.isMuted ? 0 : this.volume;
      } catch {}
    }
    this.notify();
  }

  /**
   * Romantic Music Box Synthesizer
   * Plays a sweet, dreamy lullaby melody (C - G/B - Am - F)
   */
  startSynthMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer);

    // Sweet romantic melody notes (Hz)
    // C4, E4, G4, C5, B4, G4, A4, C5, E5, F4, A4, C5
    const melody = [
      261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
      246.94, 293.66, 392.00, 493.88, 392.00, 293.66,
      220.00, 261.63, 329.63, 440.00, 329.63, 261.63,
      174.61, 220.00, 261.63, 349.23, 261.63, 220.00,
      261.63, 329.63, 523.25, 659.25, 587.33, 523.25,
      392.00, 440.00, 523.25, 659.25, 523.25, 392.00
    ];

    let step = 0;
    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic || this.isMuted || this.volume === 0) return;
      const freq = melody[step % melody.length];
      this.playMusicBoxNote(freq, 0.08);
      step++;
    }, 450);
  }

  playMusicBoxNote(freq, duration = 0.5) {
    if (!this.audioCtx || this.isMuted || this.volume === 0) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Sine wave with soft harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const targetGain = 0.12 * this.volume;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {}
  }

  // Cute Pop Sound on button click
  playPop() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Magical sparkle chime on envelope opening
  playChime() {
    if (this.isMuted) return;
    this.init();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.audioCtx) return;
          const now = this.audioCtx.currentTime;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.12 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now);
          osc.stop(now + 0.65);
        }, idx * 100);
      });
    } catch {}
  }

  // Sad gentle wah-wah for "NO" button
  playSad() {
    if (this.isMuted) return;
    this.init();
    try {
      const notes = [392.00, 369.99, 349.23, 311.13];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.audioCtx) return;
          const now = this.audioCtx.currentTime;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.08 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now);
          osc.stop(now + 0.5);
        }, idx * 180);
      });
    } catch {}
  }

  // Joyful Fanfare for "YES!" & Celebration
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    try {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.audioCtx) return;
          const now = this.audioCtx.currentTime;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.18 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now);
          osc.stop(now + 0.75);
        }, idx * 80);
      });
    } catch {}
  }
}

export const sounds = new SoundManager();
