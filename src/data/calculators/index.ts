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
import { wellsPECalculator } from './pulmonology/wells-pe';
import { crusadeCalculator } from './cardiology/crusade';
import { sofaCalculator } from './critical-care/sofa';
import { childPughCalculator } from './hepatology/childPugh';
import { apache2Calculator } from './critical-care/apache2';

/**
 * A collection of medical calculator functions used within the MedixAI application.
 * 
 * Includes the following calculators:
 * - TIMI Calculator
 * - GRACE Calculator
 * - CHADS2-VASc Calculator
 * - NIHSS Calculator
 * - HAS-BLED Calculator
 * - Framingham Diabetes Calculator
 * - NEWS2 Calculator
 * - Four Score Calculator
 * - ASA Calculator
 * - MELD Calculator
 * - Padua Score Calculator
 * - Wells PE Calculator
 * - Crusade Calculator
 * - SOFA Calculator
 * - Child-Pugh Calculator
 * - Apache II Calculator
 */
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
  paduaScoreCalculator,
  wellsPECalculator,
  crusadeCalculator,
  sofaCalculator,
  childPughCalculator,
  apache2Calculator
];