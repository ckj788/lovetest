export type DualMode = 'talking_stage' | 'couples';

export type DualPartnerRole = 'partner1' | 'partner2';

export interface DualOption {
  id: string;
  label: string;
  shortLabel: string;
  tag?: string;
  icon?: string;
}

export interface DualQuestion {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  options: DualOption[];
}

export interface DualComparisonItem {
  questionId: number;
  questionTitle: string;
  category: string;
  p1AnswerId: string;
  p1Label: string;
  p2AnswerId: string;
  p2Label: string;
  isMatch: boolean;
  insightText: string;
}

export interface DualConversationCard {
  tag: string;
  title: string;
  prompt: string;
  whyItWorks: string;
}

export interface DualSynergyTier {
  name: string;
  badge: string;
  tagline: string;
  description: string;
}

export interface DualResultData {
  mode: DualMode;
  synergyScore: number;
  synergyTier: DualSynergyTier;
  p1Answers: Record<number, string>;
  p2Answers: Record<number, string>;
  blindAlignments: string[];
  blindGaps: string[];
  comparisonMatrix: DualComparisonItem[];
  conversationCards: DualConversationCard[];
  freeHighlights: {
    synergyScore: number;
    matchCount: number;
    gapCount: number;
    topSharedStrength: string;
    topFrictionAlert: string;
  };
}
