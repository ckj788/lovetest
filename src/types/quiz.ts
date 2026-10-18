export type SoloDimension =
  | 'initiative'
  | 'reliability'
  | 'emotionalAvailability'
  | 'realLifeIntegration'
  | 'clarity'
  | 'momentum';

export type SoloPatternId =
  | 'mutual_momentum'
  | 'slow_consistent'
  | 'comfortable_limbo'
  | 'chemistry_gap'
  | 'hot_cold_loop'
  | 'one_sided_momentum'
  | 'not_enough_data';

export interface SoloOptionWeights {
  initiative?: number;
  reliability?: number;
  emotionalAvailability?: number;
  realLifeIntegration?: number;
  clarity?: number;
  momentum?: number;
  isTooEarly?: boolean;
}

export interface Option {
  id: string;
  label: string;
  weights: SoloOptionWeights;
}

export interface Question {
  id: number;
  dimensionName?: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi';
  options: Option[];
}

export interface SetupQuestion {
  id: 'duration' | 'outcome';
  title: string;
  subtitle?: string;
  options: { id: string; label: string }[];
}

export interface ScriptItem {
  type: 'soft' | 'clear' | 'boundary';
  title: string;
  tone: string;
  exactScript: string;
  whenToUse: string;
}

export interface ResponseDecoderOption {
  type: 'green' | 'yellow' | 'red';
  title: string;
  sampleQuote: string;
  whatItMeans: string;
  recommendedAction: string;
}

export interface DayStep {
  day: number;
  title: string;
  instruction: string;
  focus: string;
}

export interface GroundedPattern {
  id: SoloPatternId;
  name: string;
  tagline: string;
  color: string;
  gradient: string;
  emoji: string;
  corePattern: string;
  whatThisSuggests: string;
  whatThisDoesNotProve: string;
  alternativeExplanation: string;
  strongestSignal: string;
  keyLimitation: string;
  immediateAction: string;
  sevenDayPlan: DayStep[];
  scripts: {
    soft: ScriptItem;
    clear: ScriptItem;
    boundary: ScriptItem;
  };
  responseDecoders: ResponseDecoderOption[];
  retakeCheckpoint: string;
}

export interface UserEvidenceItem {
  questionTitle: string;
  userAnswerLabel: string;
  insight: string;
}

export interface QuizResultData {
  pattern: GroundedPattern;
  dimensionScores: Record<SoloDimension, number | null>; // null means no evidence
  evidence: UserEvidenceItem[];
  setupAnswers?: {
    duration?: string;
    outcome?: string;
  };
  userAnswers: Record<number, string | string[]>;
  resultId: string;
  isPaid: boolean;
  isInsufficientData: boolean;
}
