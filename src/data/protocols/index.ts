import { aclsCardiacArrest } from './acls-cardiac-arrest';
import { sepsisProtocol } from './sepsis';
import { strokeProtocol } from './stroke';
import { amiProtocol } from './ami';
import { anaphylaxisProtocol } from './anaphylaxis';
import { statusEpilepticusProtocol } from './status-epilepticus';
import { palsProtocol } from './pals';
import { eclampsiaProtocol } from './eclampsia';
import { traumaProtocol } from './trauma';
import { heartFailureProtocol } from './heart-failure';
import { dkaProtocol } from './dka';
import { intoxicationProtocol } from './intoxication';
import { pulmonaryEmbolismProtocol } from './pulmonary-embolism';
import { upperGiBleedingProtocol } from './upper-gi-bleeding';
import { lowerGiBleedingProtocol } from './lower-gi-bleeding';
import { arrhythmiasProtocol } from './arrhythmias';
import { hypertensiveCrisisProtocol } from './hypertensive-crisis';
import { hypoglycemiaProtocol } from './hypoglycemia';

export const emergencyProtocols = [
  aclsCardiacArrest,
  sepsisProtocol,
  strokeProtocol,
  amiProtocol,
  anaphylaxisProtocol,
  statusEpilepticusProtocol,
  palsProtocol,
  eclampsiaProtocol,
  traumaProtocol,
  heartFailureProtocol,
  dkaProtocol,
  intoxicationProtocol,
  pulmonaryEmbolismProtocol,
  upperGiBleedingProtocol,
  lowerGiBleedingProtocol,
  arrhythmiasProtocol,
  hypertensiveCrisisProtocol,
  hypoglycemiaProtocol
];