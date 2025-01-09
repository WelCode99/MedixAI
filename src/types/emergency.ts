import { z } from 'zod';

export type EmergencyProtocolType = 
  | 'acls'
  | 'sepsis'
  | 'stroke'
  | 'ami'
  | 'trauma'
  | 'anaphylaxis'
  | 'status-epilepticus'
  | 'heart-failure'
  | 'dka'
  | 'intoxication';

export type TimerType = 'countdown' | 'stopwatch' | 'interval';

export interface TimerConfig {
  type: TimerType;
  duration?: number; // in seconds
  interval?: number; // for interval timers
  alert?: boolean;
  sound?: boolean;
}

export interface MedicationDose {
  drug: string;
  dose: string;
  route: string;
  frequency?: string;
  maxDose?: string;
  notes?: string;
}

export interface ProtocolStep {
  id: string;
  order: number;
  title: string;
  description: string;
  shortDescription?: string;
  timeframe?: string;
  timer?: TimerConfig;
  medications?: MedicationDose[];
  criticalAction: boolean;
  requiresConfirmation: boolean;
  alternatives?: string[];
  references?: string[];
  nextSteps?: string[]; // IDs of possible next steps
  imageUrl?: string;
}

export interface EmergencyProtocol {
  id: string;
  type: EmergencyProtocolType;
  title: string;
  description: string;
  category: string;
  steps: ProtocolStep[];
  initialStepId: string;
  version: string;
  lastUpdated: Date;
  source: string;
  evidenceLevel: 'A' | 'B' | 'C';
  references: string[];
}

export const medicationDoseSchema = z.object({
  drug: z.string(),
  dose: z.string(),
  route: z.string(),
  frequency: z.string().optional(),
  maxDose: z.string().optional(),
  notes: z.string().optional()
});

export const protocolStepSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  timeframe: z.string().optional(),
  timer: z.object({
    type: z.enum(['countdown', 'stopwatch', 'interval']),
    duration: z.number().optional(),
    interval: z.number().optional(),
    alert: z.boolean().optional(),
    sound: z.boolean().optional()
  }).optional(),
  medications: z.array(medicationDoseSchema).optional(),
  criticalAction: z.boolean(),
  requiresConfirmation: z.boolean(),
  alternatives: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
  nextSteps: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional()
});

export const emergencyProtocolSchema = z.object({
  id: z.string(),
  type: z.enum([
    'acls',
    'sepsis',
    'stroke',
    'ami',
    'trauma',
    'anaphylaxis',
    'status-epilepticus'
  ]),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  steps: z.array(protocolStepSchema),
  initialStepId: z.string(),
  version: z.string(),
  lastUpdated: z.date(),
  source: z.string(),
  evidenceLevel: z.enum(['A', 'B', 'C']),
  references: z.array(z.string())
});