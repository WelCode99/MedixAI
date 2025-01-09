import { EmergencyProtocol } from '../../../types/emergency';

export type ProtocolType = 
  | 'acls'
  | 'sepsis'
  | 'stroke'
  | 'ami'
  | 'trauma'
  | 'anaphylaxis'
  | 'status-epilepticus'
  | 'heart-failure'
  | 'dka'
  | 'intoxication'
  | 'arrhythmias'
  | 'hypertension'
  | 'metabolic';

export type { EmergencyProtocol };