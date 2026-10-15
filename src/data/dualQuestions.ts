import { DualQuestion, DualMode, DualResultData, DualComparisonItem } from '../types/dual';

export const TALKING_STAGE_QUESTIONS: DualQuestion[] = [
  {
    id: 1,
    title: "How would you honestly describe what the two of you have right now?",
    subtitle: "Dimension: Current Dynamic & Definition",
    category: "Dynamic Reality",
    options: [
      {
        id: "ts_q1_a",
        label: "Deliberately getting to know each other with the clear goal of dating exclusively.",
        shortLabel: "Dating toward exclusivity",
        tag: "Intentional"
      },
      {
        id: "ts_q1_b",
        label: "Highly affectionate and close, but without an official title or public definition yet.",
        shortLabel: "Affectionate without title",
        tag: "Comfortable"
      },
      {
        id: "ts_q1_c",
        label: "A magnetic, high-chemistry connection that can run hot and cold from week to week.",
        shortLabel: "High chemistry / Fluctuating",
        tag: "Passionate"
      },
      {
        id: "ts_q1_d",
        label: "A relaxed, low-pressure dynamic where nobody is asking for heavy commitments.",
        shortLabel: "Casual / Low-pressure",
        tag: "Open"
      }
    ]
  },
  {
    id: 2,
    title: "What is your honest understanding regarding exclusivity between you two?",
    subtitle: "Dimension: Roster & Exclusivity Boundaries",
    category: "Exclusivity",
    options: [
      {
        id: "ts_q2_a",
        label: "I consider us exclusively focused on each other. I'm not entertaining anyone else.",
        shortLabel: "100% Focused on them",
        tag: "Exclusive"
      },
      {
        id: "ts_q2_b",
        label: "We haven't explicitly said the words yet, so technically both of us still have individual freedom.",
        shortLabel: "Unspoken freedom",
        tag: "Ambiguous"
      },
      {
        id: "ts_q2_c",
        label: "I assume neither of us is seeing others, but I would feel nervous directly bringing it up.",
        shortLabel: "Assumed exclusivity",
        tag: "Hesitant"
      },
      {
        id: "ts_q2_d",
        label: "I'm keeping my options open until someone explicitly asks to be official.",
        shortLabel: "Keeping options open",
        tag: "Guarded"
      }
    ]
  },
  {
    id: 3,
    title: "Who carries the bulk of the momentum when making plans and keeping in touch?",
    subtitle: "Dimension: Effort & Initiative Balance",
    category: "Initiative",
    options: [
      {
        id: "ts_q3_a",
        label: "It feels 50/50. Both of us step up and suggest plans with equal enthusiasm.",
        shortLabel: "Balanced 50/50",
        tag: "Reciprocal"
      },
      {
        id: "ts_q3_b",
        label: "I tend to initiate 70%+ of texts and dates; they usually say yes and come along.",
        shortLabel: "I carry the effort",
        tag: "Over-functioning"
      },
      {
        id: "ts_q3_c",
        label: "They reach out frequently, while I often wait for their lead before responding.",
        shortLabel: "They lead the momentum",
        tag: "Reactive"
      },
      {
        id: "ts_q3_d",
        label: "Everything is spontaneous or last-minute. Almost nothing is scheduled in advance.",
        shortLabel: "Purely spontaneous",
        tag: "Ad-hoc"
      }
    ]
  },
  {
    id: 4,
    title: "If the vibe stays this good, what is your ideal timeline for making things official?",
    subtitle: "Dimension: Commitment Horizon",
    category: "Timeline",
    options: [
      {
        id: "ts_q4_a",
        label: "Within the next 2 to 4 weeks. I value relational clarity and don't like prolonged limbo.",
        shortLabel: "2–4 Weeks (Soon)",
        tag: "Fast Track"
      },
      {
        id: "ts_q4_b",
        label: "2 to 3 months. I need steady consistency over time to verify mutual safety.",
        shortLabel: "2–3 Months (Paced)",
        tag: "Measured"
      },
      {
        id: "ts_q4_c",
        label: "No rigid schedule. Let it develop naturally without applying artificial milestone pressure.",
        shortLabel: "Organic / No rush",
        tag: "Organic"
      },
      {
        id: "ts_q4_d",
        label: "I'm not in a place to commit to an official title in the foreseeable future.",
        shortLabel: "Not ready for titles",
        tag: "Not Ready"
      }
    ]
  },
  {
    id: 5,
    title: "How integrated is this connection into your real daily life and inner circle?",
    subtitle: "Dimension: Public Transparency & Status",
    category: "Integration",
    options: [
      {
        id: "ts_q5_a",
        label: "My closest friends know all about them, and I'd gladly bring them around my people.",
        shortLabel: "Open & Integrated",
        tag: "Transparent"
      },
      {
        id: "ts_q5_b",
        label: "People know I'm seeing someone, but I keep details private until things are 100% locked down.",
        shortLabel: "Private until locked",
        tag: "Cautious"
      },
      {
        id: "ts_q5_c",
        label: "This connection exists mostly behind closed doors, late at night, or in private 1-on-1s.",
        shortLabel: "1-on-1 Bubble",
        tag: "Compartmentalized"
      },
      {
        id: "ts_q5_d",
        label: "I haven't told many people because I'm still not sure where this is going.",
        shortLabel: "Undisclosed",
        tag: "Guarded"
      }
    ]
  },
  {
    id: 6,
    title: "If you had to be 100% honest, what is your biggest unspoken hesitation right now?",
    subtitle: "Dimension: Unspoken Friction",
    category: "Hidden Hesitation",
    options: [
      {
        id: "ts_q6_a",
        label: "Worrying that I care or invest more than they do, and getting hurt if I show it.",
        shortLabel: "Fear of caring more",
        tag: "Vulnerability"
      },
      {
        id: "ts_q6_b",
        label: "Worrying that locking down an official relationship will take away my freedom and autonomy.",
        shortLabel: "Fear of losing freedom",
        tag: "Autonomy"
      },
      {
        id: "ts_q6_c",
        label: "Wondering if our lifestyle, career pacing, or logistical reality can actually align long-term.",
        shortLabel: "Logistical / Long-term fit",
        tag: "Practical"
      },
      {
        id: "ts_q6_d",
        label: "Honestly, zero hesitations. I'm just waiting for a safe moment to bring it up.",
        shortLabel: "Zero doubts, waiting on cues",
        tag: "Ready"
      }
    ]
  }
];

export const COUPLES_QUESTIONS: DualQuestion[] = [
  {
    id: 1,
    title: "When you are stressed or emotionally drained, what gesture makes you feel most loved?",
    subtitle: "Dimension: Core Love Language",
    category: "Love Language",
    options: [
      {
        id: "cp_q1_a",
        label: "Physical holding, quiet cuddles, and wordless physical presence.",
        shortLabel: "Physical affection & closeness",
        tag: "Touch"
      },
      {
        id: "cp_q1_b",
        label: "Listening to me vent without immediately jumping to give practical advice.",
        shortLabel: "Active empathetic listening",
        tag: "Validation"
      },
      {
        id: "cp_q1_c",
        label: "Stepping in to solve a chore, cook a meal, or take something off my plate.",
        shortLabel: "Acts of service & relief",
        tag: "Support"
      },
      {
        id: "cp_q1_d",
        label: "Giving me peaceful alone time to recharge before coming back together.",
        shortLabel: "Personal space to recharge",
        tag: "Space"
      }
    ]
  },
  {
    id: 2,
    title: "How would you honestly rate the current balance between passion and routine?",
    subtitle: "Dimension: Romance & Spark Health",
    category: "Intimacy Spark",
    options: [
      {
        id: "cp_q2_a",
        label: "Flourishing. We still have deep sexual chemistry and flirtation throughout the week.",
        shortLabel: "High chemistry & playfulness",
        tag: "Thriving"
      },
      {
        id: "cp_q2_b",
        label: "Comfortable and loving, but we've drifted into a slightly predictable roommate routine.",
        shortLabel: "Comfortable roommate pattern",
        tag: "Routine Rut"
      },
      {
        id: "cp_q2_c",
        label: "I feel an unmet craving for more spontaneous dates, passion, and intentional courtship.",
        shortLabel: "Craving more courtship",
        tag: "Unmet Desire"
      },
      {
        id: "cp_q2_d",
        label: "Currently going through a quiet lull due to work/stress, but our core bond is solid.",
        shortLabel: "Temporary stress lull",
        tag: "Resilient"
      }
    ]
  },
  {
    id: 3,
    title: "When tension or disagreement happens between you two, what is your default impulse?",
    subtitle: "Dimension: Conflict Style & Repair",
    category: "Conflict Style",
    options: [
      {
        id: "cp_q3_a",
        label: "I want to talk through it immediately. Lingering unresolved tension gives me anxiety.",
        shortLabel: "Resolve immediately",
        tag: "Anxious Resolve"
      },
      {
        id: "cp_q3_b",
        label: "I need to withdraw and cool down for a few hours before having a rational conversation.",
        shortLabel: "Cool off in private first",
        tag: "De-escalate"
      },
      {
        id: "cp_q3_c",
        label: "I often swallow minor annoyances to keep the peace until I reach a boiling point.",
        shortLabel: "Swallow annoyance to keep peace",
        tag: "Conflict Avoidant"
      },
      {
        id: "cp_q3_d",
        label: "I state my feelings directly and plainly, expecting mutual accountability without drama.",
        shortLabel: "Direct & grounded repair",
        tag: "Secure Repair"
      }
    ]
  },
  {
    id: 4,
    title: "What is one thing you quietly wish your partner would do more of without having to ask?",
    subtitle: "Dimension: Secret Unmet Wish",
    category: "Secret Need",
    options: [
      {
        id: "cp_q4_a",
        label: "Plan thoughtful surprises or date nights that I don't have to organize myself.",
        shortLabel: "Surprise date planning",
        tag: "Initiative"
      },
      {
        id: "cp_q4_b",
        label: "Express vocal appreciation, compliments, and notice the small things I do.",
        shortLabel: "Words of appreciation",
        tag: "Affirmation"
      },
      {
        id: "cp_q4_c",
        label: "Initiate physical intimacy and romantic touch more enthusiastically.",
        shortLabel: "More physical initiation",
        tag: "Desire"
      },
      {
        id: "cp_q4_d",
        label: "Ask deeper questions about my dreams, inner thoughts, and emotional world.",
        shortLabel: "Deeper emotional curiosity",
        tag: "Depth"
      }
    ]
  },
  {
    id: 5,
    title: "How aligned do you feel on personal independence vs couple time?",
    subtitle: "Dimension: Boundaries & Togetherness",
    category: "Independence",
    options: [
      {
        id: "cp_q5_a",
        label: "Near perfect. We have our own friends and passions while remaining deeply united.",
        shortLabel: "Balanced autonomy & unity",
        tag: "Interdependent"
      },
      {
        id: "cp_q5_b",
        label: "I sometimes feel smothered and wish we had more individual breathing room.",
        shortLabel: "Wanting more space",
        tag: "Suffocated"
      },
      {
        id: "cp_q5_c",
        label: "I sometimes feel lonely and wish we had more quality 1-on-1 focus without phones.",
        shortLabel: "Craving phone-free 1-on-1s",
        tag: "Disconnected"
      },
      {
        id: "cp_q5_d",
        label: "We juggle it reasonably well, but it requires continuous gentle negotiation.",
        shortLabel: "Work in progress",
        tag: "Negotiating"
      }
    ]
  },
  {
    id: 6,
    title: "Looking at the next 12 to 24 months, what is your #1 relational priority?",
    subtitle: "Dimension: Future Horizon Alignment",
    category: "Shared Vision",
    options: [
      {
        id: "cp_q6_a",
        label: "Solidifying major life steps (moving in together, engagement, or long-term financial plan).",
        shortLabel: "Major structural milestone",
        tag: "Commitment"
      },
      {
        id: "cp_q6_b",
        label: "Rekindling romance, fun, and adventurous travel to keep our spark magnetic.",
        shortLabel: "Rekindling adventure & spark",
        tag: "Adventure"
      },
      {
        id: "cp_q6_c",
        label: "Improving emotional communication and ending recurring unproductive arguments.",
        shortLabel: "Healing communication loops",
        tag: "Repair"
      },
      {
        id: "cp_q6_d",
        label: "Supporting each other's individual careers and ambitions while staying a peaceful anchor.",
        shortLabel: "Peaceful career sanctuary",
        tag: "Support"
      }
    ]
  }
];

export const MOCK_PARTNER_RESPONSES: Record<DualMode, Record<number, string>> = {
  talking_stage: {
    1: 'ts_q1_b', // Partner 2 thinks: "Affectionate without title"
    2: 'ts_q2_b', // Partner 2 thinks: "Unspoken freedom"
    3: 'ts_q3_a', // Partner 2 thinks: "Balanced 50/50"
    4: 'ts_q4_c', // Partner 2 thinks: "Organic / No rush" (A timeline gap with someone who wants 2-4 weeks!)
    5: 'ts_q5_a', // Partner 2 thinks: "Open & Integrated"
    6: 'ts_q6_a'  // Partner 2 secretly fears: "Fear of caring more"
  },
  couples: {
    1: 'cp_q1_b', // Partner 2 needs: "Active empathetic listening"
    2: 'cp_q2_b', // Partner 2 thinks: "Comfortable roommate pattern"
    3: 'cp_q3_b', // Partner 2 conflict style: "Cool off in private first"
    4: 'cp_q4_a', // Partner 2's secret wish: "Surprise date planning"
    5: 'cp_q5_c', // Partner 2 feels: "Craving phone-free 1-on-1s"
    6: 'cp_q6_b'  // Partner 2 priority: "Rekindling adventure & spark"
  }
};

export function calculateDualResult(
  mode: DualMode,
  p1Answers: Record<number, string>,
  p2Answers: Record<number, string>
): DualResultData {
  const questions = mode === 'talking_stage' ? TALKING_STAGE_QUESTIONS : COUPLES_QUESTIONS;

  let matchCount = 0;
  const comparisonMatrix: DualComparisonItem[] = [];

  questions.forEach((q) => {
    const p1OptId = p1Answers[q.id];
    const p2OptId = p2Answers[q.id];

    const p1Option = q.options.find((o) => o.id === p1OptId) || q.options[0];
    const p2Option = q.options.find((o) => o.id === p2OptId) || q.options[1];

    const isMatch = p1OptId === p2OptId;
    if (isMatch) matchCount++;

    let insightText = '';
    if (isMatch) {
      insightText = `Pure Alignment: You both independently selected '${p1Option.shortLabel}', confirming a strong shared baseline in this area.`;
    } else {
      insightText = `Divergent Perception: Partner 1 sees this through '${p1Option.shortLabel}', while Partner 2 experiences it as '${p2Option.shortLabel}'. Neither is 'wrong'—this reflects different pacing and emotional vantage points.`;
    }

    comparisonMatrix.push({
      questionId: q.id,
      questionTitle: q.title,
      category: q.category,
      p1AnswerId: p1OptId,
      p1Label: p1Option.label,
      p2AnswerId: p2OptId,
      p2Label: p2Option.label,
      isMatch,
      insightText
    });
  });

  // Calculate Synergy Score (base 55 + matches * 7.5, max 96)
  const synergyScore = Math.min(96, Math.max(48, Math.round(55 + matchCount * 7.2)));
  const gapCount = questions.length - matchCount;

  // Synergies & Blind Alignments
  const blindAlignments: string[] = [];
  const blindGaps: string[] = [];

  if (mode === 'talking_stage') {
    blindAlignments.push(
      "High Foundation Respect: Both of you acknowledge high natural chemistry and prioritize genuine time together over superficial flings."
    );
    blindAlignments.push(
      "Shared Vulnerability Reserve: Neither partner is deliberately trying to mislead the other; both are protecting their emotional safety."
    );

    blindGaps.push(
      "Timeline & Exclusivity Pacing: One partner is ready to establish clear boundaries sooner, while the other prefers unstructured observation."
    );
    blindGaps.push(
      "Initiative Perception Gap: There is a discrepancy between who feels they are driving plans vs who feels they are merely accommodating."
    );
  } else {
    blindAlignments.push(
      "Core Commitment Security: Both of you view the foundational bond as enduring, with zero desire to abandon the relationship."
    );
    blindAlignments.push(
      "Shared Desire for Reconnection: Both partners independently recognize that the routine has grown predictable and want more intentional spark."
    );

    blindGaps.push(
      "Conflict Processing Speed: One partner needs immediate verbal resolution, while the other requires quiet withdrawal to regulate first."
    );
    blindGaps.push(
      "Secret Unmet Need: You differ on the primary emotional currency that makes you feel cherished during daily life."
    );
  }

  // Conversation Cards
  const conversationCards = mode === 'talking_stage'
    ? [
        {
          tag: "CARD 1 · THE GENTLE OPENER",
          title: "The Zero-Defense Reality Check",
          prompt: "“Looking at how we both answered Q1, what was going through your head when you described our current dynamic?”",
          whyItWorks: "Bypasses defensiveness by focusing on the quiz prompt rather than an accusatory 'what are we?' confrontation."
        },
        {
          tag: "CARD 2 · THE TIMELINE ALIGNMENT",
          title: "Aligning the Pace Without Pressure",
          prompt: "“We had slightly different answers on pacing. If we took all pressure off, what does a pace that feels genuinely safe for both of us look like?”",
          whyItWorks: "Validates both the need for clarity and the need for emotional safety, eliminating winner-versus-loser dynamics."
        },
        {
          tag: "CARD 3 · THE VULNERABILITY BRIDGE",
          title: "Revealing the Unspoken Hesitation",
          prompt: "“In the last question, we both revealed quiet hesitations. If I promise not to take it personally, what's your biggest real hesitation about getting closer?”",
          whyItWorks: "Creates psychological safety to address real roadblocks (fear of hurt, past baggage, career timing) before resentment builds."
        }
      ]
    : [
        {
          tag: "CARD 1 · THE LOVE DIAL",
          title: "Decoding the Real Love Currency",
          prompt: "“In Q1 and Q4, you mentioned wanting more [their selected need]. Tell me about a specific time recently when you wished I had done that?”",
          whyItWorks: "Gives concrete behavioral examples instead of vague relationship complaints."
        },
        {
          tag: "CARD 2 · THE REPAIR CODE",
          title: "How to Fight Better Next Time",
          prompt: "“When we get into tension, I tend to react with [your style] and you need [their style]. How can we signal a 20-minute pause without either of us feeling abandoned?”",
          whyItWorks: "Pre-agrees on a de-escalation protocol before the next emotional trigger happens."
        },
        {
          tag: "CARD 3 · THE 12-MONTH REIGNITE",
          title: "Our Next Season Together",
          prompt: "“If we could completely redesign one routine in our week to feel more like dates when we first met, what would you want us to do?”",
          whyItWorks: "Reframes routine fatigue into a shared creative project for the upcoming season."
        }
      ];

  const synergyTier = synergyScore >= 80
    ? {
        name: "Deep Synergy Tier",
        badge: "✨ HIGH HARMONY",
        tagline: "Strong Intuitive Alignment with Targeted Pacing Nuance",
        description: "Your responses reflect exceptional emotional resonance. The minor discrepancies between you are logistical pacing details rather than fundamental value conflicts."
      }
    : {
        name: "Dynamic Potential Tier",
        badge: "⚡ HIGH CHARGE / PACING GAP",
        tagline: "Powerful Core Attraction with Critical Communication Blindspots",
        description: "The underlying connection is vibrant, but unexpressed expectations are creating silent friction. Bridging these specific gaps will transform uncertainty into grounded mutual trust."
      };

  return {
    mode,
    synergyScore,
    synergyTier,
    p1Answers,
    p2Answers,
    blindAlignments,
    blindGaps,
    comparisonMatrix,
    conversationCards,
    freeHighlights: {
      synergyScore,
      matchCount,
      gapCount,
      topSharedStrength: blindAlignments[0],
      topFrictionAlert: blindGaps[0]
    }
  };
}
