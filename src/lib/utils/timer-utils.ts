import { TimerConfig } from '../../types/emergency';

export function createTimer(config: TimerConfig) {
  let interval: NodeJS.Timeout | null = null;
  let remainingTime = config.duration || 0;

  const start = () => {
    if (interval) return;
    
    interval = setInterval(() => {
      if (config.type === 'countdown') {
        remainingTime--;
        if (remainingTime <= 0) {
          stop();
          if (config.alert) {
            playAlert();
          }
        }
      }
    }, 1000);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const reset = () => {
    stop();
    remainingTime = config.duration || 0;
  };

  const playAlert = () => {
    if (config.sound) {
      // Only try to play sound if browser supports it
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.5;

        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          context.close();
        }, 200);
      } catch (err) {
        console.warn('Audio playback not supported');
      }
      audio.play().catch(console.error);
    }
  };

  return {
    start,
    stop,
    reset,
    getRemainingTime: () => remainingTime
  };
}