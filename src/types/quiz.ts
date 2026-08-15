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

export interface ReportSection {
  tag: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FullArchetypeReport {
  hook: string;
  summaryHighlights: string[];
  sections: ReportSection[];
  bottomLine: string[];
  socialQuote: string;
  shareSummary: string;
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
  report: FullArchetypeReport;
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
