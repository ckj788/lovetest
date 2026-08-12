export type Dimension = 'attraction' | 'investment' | 'commitment' | 'exclusivity';

export interface OptionWeights {
  attraction: number;  // 0 - 25
  investment: number;  // 0 - 25
  commitment: number;  // 0 - 25
  exclusivity: number; // 0 - 25
}

export interface Option {
  id: string;
  label: string;
  description?: string;
  weights: OptionWeights;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi';
  options: Option[];
}

export interface Archetype {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  emoji: string;
  color: string;
  gradient: string;
  description: string;
  gapAnalysis: string;
  unlockedInsights: {
    whyNotAdvancing: string;
    seriousVsAmbiguous: string;
    exclusivitySignals: string;
    actionGuide7Days: string[];
  };
}

export interface QuizResultData {
  scores: Record<Dimension, number>;
  totalScore: number;
  gap: number; // Attraction - Commitment
  archetype: Archetype;
  freeSummary: string;
}
