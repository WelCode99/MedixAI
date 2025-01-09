import { timiCalculator } from './cardiology/timi';
import { graceCalculator } from './cardiology/grace';
import { chads2vascCalculator } from './cardiology/chads2vasc';
import { nihssCalculator } from './neurology/nihss';

export const medicalCalculators = [
  timiCalculator,
  graceCalculator,
  chads2vascCalculator,
  nihssCalculator
];