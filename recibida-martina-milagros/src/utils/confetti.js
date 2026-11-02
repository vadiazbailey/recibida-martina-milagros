import confetti from 'canvas-confetti';

/**
 * Palette inspired by Argentine sky blue (celeste), psychopedagogy celebration, and celebratory gold
 */
const CELESTE_PALETTE = ['#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd', '#ffffff', '#fbbf24', '#f59e0b'];

/**
 * Creates custom star and sparkles canvas confetti
 */
export function fireCelesteCelebration() {
  const duration = 6000;
  const end = Date.now() + duration;

  // Initial burst from center
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: CELESTE_PALETTE,
    shapes: ['circle', 'square'],
    scalar: 1.2
  });

  // Star bursts
  confetti({
    particleCount: 50,
    spread: 120,
    origin: { y: 0.5 },
    colors: ['#fbbf24', '#ffffff', '#38bdf8'],
    shapes: ['star'],
    scalar: 1.5
  });

  // Cannon intervals from left and right
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    // Left cannon
    confetti({
      startVelocity: 35,
      spread: 70,
      ticks: 200,
      origin: { x: 0.1, y: 0.7 },
      colors: CELESTE_PALETTE,
      shapes: ['circle', 'star'],
      scalar: 1.1
    });

    // Right cannon
    confetti({
      startVelocity: 35,
      spread: 70,
      ticks: 200,
      origin: { x: 0.9, y: 0.7 },
      colors: CELESTE_PALETTE,
      shapes: ['circle', 'star'],
      scalar: 1.1
    });
  }, 400);
}

/**
 * Grand finale celebration for when the party starts
 */
export function firePartyCelebration() {
  const duration = 8000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // fireworks effect from random positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: CELESTE_PALETTE
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#ffffff']
    });
  }, 350);
}

/**
 * Synthesizes a gentle celebratory triumphant chime using Web Audio API
 * No external mp3 file needed; works seamlessly in modern browsers!
 */
export function playCelebrationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Notes: C5, E5, G5, C6 (Arpeggio fanfare)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + index * 0.15;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });
  } catch {
    // Graceful fallback if user hasn't interacted with DOM yet
  }
}
