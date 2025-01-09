import { TimerConfig } from '../../../types/emergency';

export function createTimer(config: TimerConfig) {
  return {
    ...config,
    start: () => {
      // Timer implementation
    },
    stop: () => {
      // Timer implementation
    },
    reset: () => {
      // Timer implementation
    }
  };
}