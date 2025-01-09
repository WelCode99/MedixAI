export type TimerType = 'countdown' | 'stopwatch' | 'interval';

export interface TimerAlert {
  threshold: number;
  message: string;
  sound?: boolean;
  repeat?: boolean;
}