export interface FriendOption {
  id: string;
  label: string;
  shortLabel: string;
}

export interface FriendQuestion {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  options: FriendOption[];
}

export type FriendArchetypeId =
  | 'same_braincell'
  | 'chaos_coordinators'
  | 'golden_black_cat'
  | 'low_maintenance_legends'
  | 'plot_twist_besties'
  | 'new_lore_loading';

export interface FriendArchetype {
  id: FriendArchetypeId;
  name: string;
  tagline: string;
  emoji: string;
  description: string;
  dynamics: string;
  friendshipChallenge: string;
}

export interface FriendComparisonItem {
  questionId: number;
  questionTitle: string;
  p1Self: string;
  p1GuessOfP2: string;
  p2Self: string;
  p2GuessOfP1: string;
  isSelfMatch: boolean;
  p1GuessedCorrectly: boolean;
  p2GuessedCorrectly: boolean;
  insight: string;
}

export interface FriendResultData {
  sessionId: string;
  alignmentScore: number; // 0 - 100 (% of self answers that align)
  mindReaderScore: number; // 0 - 100 (% of guesses that were accurate)
  totalCorrectGuesses: number; // out of 16 (8 from P1, 8 from P2)
  archetype: FriendArchetype;
  strongestAgreement: {
    questionTitle: string;
    sharedChoice: string;
    detail: string;
  };
  funniestDifference: {
    questionTitle: string;
    p1Choice: string;
    p2Choice: string;
    detail: string;
  };
  comparisons: FriendComparisonItem[];
  friendshipChallenge: string;
  p1Answers: {
    self: Record<number, string>;
    guess: Record<number, string>;
  };
  p2Answers: {
    self: Record<number, string>;
    guess: Record<number, string>;
  };
}
