import { timiCalculator } from './cardiology/timi';
import { graceCalculator } from './cardiology/grace';
import { chads2vascCalculator } from './cardiology/chads2vasc';
import { nihssCalculator } from './neurology/nihss';
import { hasBledCalculator } from './cardiology/hasBled';
import { framinghamDiabetesCalculator } from './endocrinology/framinghamDiabetes';
import { news2Calculator } from './emergency/NEWS2';
import { fourScoreCalculator } from './neurology/fourScore';
import { asaCalculator } from './anesthesiology/asa';
import { meldCalculator } from './gastroenterology/meld';
import { paduaScoreCalculator } from './hematology/padua';

export const medicalCalculators = [
  timiCalculator,
  graceCalculator,
  chads2vascCalculator,
  nihssCalculator,
  hasBledCalculator,
  framinghamDiabetesCalculator,
  news2Calculator,
  fourScoreCalculator,
  asaCalculator,
  meldCalculator,
  paduaScoreCalculator
];