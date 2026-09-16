export interface CliffhangerOption {
  title: string;
  description: string;
}

export interface ModalContent {
  headline: string;
  subtitle: string;
  offerTitle: string;
  bullets: string[];
  cta: string;
}

export interface ArchetypeCliffhanger {
  tagline: string;
  subSummary: string;
  headline: string;
  lead: string;
  optionA: CliffhangerOption;
  optionB: CliffhangerOption;
  evidenceTeaser: string;
  lockQuestion: string;
  ctaText: string;
  modal: ModalContent;
}

export function getArchetypeCliffhanger(
  archetypeId: string,
  gap: number,
  scores: { attraction: number; commitment: number; investment: number; exclusivity: number }
): ArchetypeCliffhanger {
  const gapPoints = Math.abs(gap);

  switch (archetypeId) {
    case 'chemistry_trap': // 火焰 🔥
      return {
        tagline: "High natural spark. Sharp commitment gap.",
        subSummary: "There is undeniable chemistry between you — but their commitment readiness lags far behind the attraction.",
        headline: "Is This High Attraction Moving Guardedly — Or Kept Undefined By Choice?",
        lead: `Your behavioral scores point to one of two very different situations:`,
        optionA: {
          title: "Path A — Paced Attraction",
          description: "High mutual passion moving guardedly to test emotional safety."
        },
        optionB: {
          title: "Path B — Addictive Ambiguity",
          description: "Intense and electric in private — but potentially lacking intention to commit."
        },
        evidenceTeaser: "Your answers contain 2 signals revealing what is really behind the spark.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Show Me Which One + What To Do — $3.99",
        modal: {
          headline: "So... Are They Actually Going To Commit?",
          subtitle: "You already know the spark is real. Your answers reveal whether this connection has real relationship potential — or is being kept in an undefined holding pattern.",
          offerTitle: "Find Out Which Path You're Actually On",
          bullets: [
            "The 2 signals revealing whether the spark has real relationship intent",
            "The test that proves if they will step up or keep things undefined",
            "Your step-by-step 7-day action playbook",
            "What to say to establish boundaries without chasing"
          ],
          cta: "Show Me Which One + What To Do — $3.99"
        }
      };

    case 'slow_burner': // 乌龟 🐢
      return {
        tagline: "Consistent presence. Lingering commitment hesitation.",
        subSummary: "They clearly value your connection — but there is a meaningful gap between daily warmth and defining the relationship.",
        headline: "Is This Deliberate Emotional Pacing — Or Comfortable Stagnation?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A — Deliberate Pacing",
          description: "A measured pace built on genuine observation and careful care."
        },
        optionB: {
          title: "Path B — Comfortable Low-Urgency",
          description: "Stable and warm — but potentially comfortable leaving things uncommitted."
        },
        evidenceTeaser: "Your answers contain 2 signals distinguishing genuine patience from quiet comfort.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Show Me Which One + What To Do — $3.99",
        modal: {
          headline: "Is This Moving Slowly — Or Going Nowhere?",
          subtitle: "They show up consistently, but they won't escalate. Your answers reveal whether they're genuinely cautious — or simply comfortable where things are.",
          offerTitle: "Find Out Which Path You're Actually On",
          bullets: [
            "The 2 signals revealing whether this pace is patience or hesitation",
            "The exact behavioral shift that proves they're ready to commit",
            "Your step-by-step 7-day action playbook",
            "What to say to invite clarity with zero awkwardness"
          ],
          cta: "Show Me Which One + What To Do — $3.99"
        }
      };

    case 'situationship': // 迷雾 🌫️
      return {
        tagline: "Relationship-level intimacy. Zero relational clarity.",
        subSummary: "You share couple routines, emotional depth, and daily closeness — but the dynamic remains carefully open-ended.",
        headline: "Are You Nearing Commitment — Or Trapped In The Gray Area?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A — Organic Escalation",
          description: "The connection is moving slowly, but showing signs of genuine progression."
        },
        optionB: {
          title: "Path B — Comfortable Stagnation",
          description: "Close and consistent — but potentially not progressing toward commitment."
        },
        evidenceTeaser: "Your answers contain 2 signals that strongly point toward one path.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Show Me Which One + What To Do — $3.99",
        modal: {
          headline: "Are You Building Something — Or Just Stuck In Routine?",
          subtitle: "You already act like partners in private. Your answers reveal whether they're quietly preparing for commitment — or protecting an undefined arrangement.",
          offerTitle: "Find Out Which Path You're Actually On",
          bullets: [
            "The 2 signals revealing whether they see a real future with you",
            "The exact behavior that would prove they're ready to move forward",
            "Your step-by-step 7-day action playbook",
            "What to say if nothing changes (word-for-word scripts)"
          ],
          cta: "Show Me Which One + What To Do — $3.99"
        }
      };

    case 'breadcrumber': // 木头/残渣 🪵
      return {
        tagline: "Sharp dopamine spikes. Unpredictable quiet periods.",
        subSummary: "Magnetic and warm when present — but inconsistent enough to leave you second-guessing where you actually stand.",
        headline: "Is This Personal Overwhelm — Or Calculated Intermittent Warmth?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A — Emotional Hesitation",
          description: "Guarded pacing driven by personal capacity or protective hesitance."
        },
        optionB: {
          title: "Path B — Intermittent Validation",
          description: "Warm when present — but potentially keeping you on reserve."
        },
        evidenceTeaser: "Your answers contain 2 signals exposing their true availability.",
        lockQuestion: "Which pattern are they actually running?",
        ctaText: "Show Me Which One + What To Do — $3.99",
        modal: {
          headline: "Why Do They Disappear The Second Things Feel Real?",
          subtitle: "They give you just enough warmth to keep you holding on. Your answers reveal whether this is guarded hesitation — or keeping you on reserve.",
          offerTitle: "Find Out Which Path You're Actually On",
          bullets: [
            "The 2 signals exposing their real intent behind hot-and-cold bursts",
            "The test that proves if they value you or just the attention",
            "Your step-by-step 7-day action playbook to regain leverage",
            "What to text next to end mixed signals without chasing"
          ],
          cta: "Show Me Which One + What To Do — $3.99"
        }
      };

    case 'quietly_serious': // 爱心 💖
    default:
      return {
        tagline: "High behavioral alignment. Rare emotional consistency.",
        subSummary: "Their actions match their words across key indicators — leaving you wondering when and how the next step happens.",
        headline: "Are They Preparing To Step Up — Or Waiting For Your Green Light?",
        lead: "Your behavioral scores point to one of two final transition phases:",
        optionA: {
          title: "Path A — Quiet Preparation",
          description: "Already committed in mind, currently timing the formal transition."
        },
        optionB: {
          title: "Path B — Waiting for Reassurance",
          description: "Ready to commit, but holding back for a clear green light from you."
        },
        evidenceTeaser: "Your answers contain 2 signals revealing their exact readiness.",
        lockQuestion: "Which stage are they actually at?",
        ctaText: "Show Me Which One + What To Do — $3.99",
        modal: {
          headline: "Are They Waiting On You — Or Ready To Make It Official?",
          subtitle: "The signs are overwhelmingly positive. Your answers reveal their exact readiness level and how to guide this into a defined, secure commitment.",
          offerTitle: "Find Out Which Path You're Actually On",
          bullets: [
            "The 2 signals confirming their real readiness to make it official",
            "What would prove they are 100% ready for the formal label",
            "Your step-by-step 7-day transition playbook",
            "What to say to seal the commitment naturally"
          ],
          cta: "Show Me Which One + What To Do — $3.99"
        }
      };
  }
}

export interface PathVerdict {
  pathKey: 'A' | 'B';
  pathTitle: string;
  verdictSummary: string;
  signals: string[];
  actionRecommendation: string;
}

export const OPTION_SUMMARIES: Record<string, string> = {
  q1_a: 'They reach out within hours with real topics or memes, actively keeping contact alive.',
  q1_b: 'They reach out every 1–2 days asking casual check-ins or sharing random life updates.',
  q1_c: 'They react to social posts/stories, but leave direct messages unanswered.',
  q1_d: 'They go completely silent unless you initiate contact first.',

  q2_a: 'Dates are planned 2–3 days in advance with real venues and reliable follow-through.',
  q2_b: 'Plans are usually spontaneous or last-minute, even when the time together feels great.',
  q2_c: 'You initiate roughly 90% of dates while they simply agree and come along for the ride.',
  q2_d: 'Hangouts occur mostly late at night or casually around party/bar settings.',

  q3_a: 'Texting is steady, transparent, and responsive without leaving you guessing.',
  q3_b: 'Their energy tends to show up more strongly late at night than during the day.',
  q3_c: 'Communication is erratic—high-frequency texting followed by sudden days of silence.',
  q3_d: 'Replies are dry, one-word responses with minimal conversational effort.',

  q4_a: 'They listen attentively and offer genuine emotional support when you are overwhelmed.',
  q4_b: 'They offer brief sympathy before turning the conversation back onto themselves.',
  q4_c: 'They reply with generic emojis and quickly steer away from emotional topics.',
  q4_d: 'They ignore vulnerable topics and only re-engage when things are light or playful.',

  q6_a: 'You have clear public status—their close friends and inner circle know who you are.',
  q6_b: 'Their closest friends know about you, but your dynamic is kept off their main feed.',
  q6_c: 'The connection remains mostly private behind closed doors or in private DMs.',
  q6_d: 'They actively gatekeep personal topics and compartmentalize their social circle.',

  q7_a: 'They have explicitly stated that they are solely focused on you.',
  q7_b: 'Things feel exclusive in practice, but you have never officially defined the relationship.',
  q7_c: 'They remain active and flirty with others publicly, leaving subtle doubt.',
  q7_d: 'Their behavior suggests you are one of several active options in rotation.',

  q8_a: 'The dynamic has been steadily escalating with deeper plans and momentum toward official status.',
  q8_b: 'The intense initial spark has plateaued into an unpredictable rollercoaster of uncertainty.',
  q8_c: 'You have settled into a cozy holding pattern where nobody takes the risk to escalate.',
  q8_d: 'The trajectory has been a slow fade with drier replies and increasing flakiness.',
};

export function getPathVerdict(
  archetypeId: string,
  scores: { attraction: number; commitment: number; investment: number; exclusivity: number },
  gap: number
): PathVerdict {
  switch (archetypeId) {
    case 'chemistry_trap': {
      const isPathA = scores.commitment >= 45 && Math.abs(gap) <= 25;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Paced Attraction',
          verdictSummary:
            'Their behavior is more consistent with genuine passion and emotional caution than calculated ambiguity. They are not faking their attraction; the observable pattern suggests they are taking deliberate steps to verify emotional safety before escalating into formal commitment.',
          signals: [
            'Follow-through on real conversations: Beyond late-night banter, they show genuine curiosity about your personal values.',
            'Grounded escalation: They slow down when intensity peaks to keep the connection grounded, rather than vanishing completely.'
          ],
          actionRecommendation:
            'Maintain emotional consistency. Give them space to initiate without applying artificial pressure, allowing the bond to progress safely.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Addictive Ambiguity',
        verdictSummary:
          'Your scores reveal that intense dopamine and convenience are driving this dynamic. Private chemistry is undeniable, but it has not translated into predictable planning or public accountability. Whatever their private intentions are, the observable pattern is the same: closeness is experienced as an intense event rather than an evolving commitment.',
        signals: [
          'High intimacy without structural effort: Flirtatious and magnetic in private, but consistently vague when planning advance, public dates.',
          'Monopolizing attention while preserving freedom: They expect deep emotional access from you while keeping their own life and options undefined.'
        ],
        actionRecommendation:
          'Withdraw partner privileges immediately. Enforce strict boundaries around last-minute plans and require concrete, intentional effort.'
      };
    }

    case 'slow_burner': {
      const isPathA = scores.commitment >= 45 || Math.abs(gap) <= 20;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Deliberate Pacing',
          verdictSummary:
            'This connection is moving slowly, but it is moving forward. Their measured pace is built on steady observation and genuine care rather than emotional hesitation or evasion.',
          signals: [
            'Unwavering reliability: Even if text frequency is modest, they consistently show up when it matters and remember key details.',
            'Gradual, unforced integration: They are slowly and deliberately carving out space for you in their routine without dramatic chaos.'
          ],
          actionRecommendation:
            'Do not mistake patience for disinterest. Continue being warm and responsive, but let them take the lead in planning your next steps.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Comfortable Low-Urgency',
        verdictSummary:
          'Their steady presence has settled into a comfortable routine. They appreciate your company and warmth, but observable actions show zero self-initiated momentum toward defining the relationship or introducing you to their broader world.',
        signals: [
          'Predictable contact with stagnant escalation: You share pleasant check-ins, but there is zero momentum toward public clarity.',
          'Passive availability: They are happy to hang out when you suggest it, but rarely take the initiative to lock down future plans.'
        ],
        actionRecommendation:
          'Stop over-functioning in this dynamic. Step back slightly to test whether they step up to close the distance or let the routine drift.'
      };
    }

    case 'situationship': {
      const isPathA = scores.commitment >= 45 || Math.abs(gap) <= 20;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Organic Escalation',
          verdictSummary:
            'Your answers indicate organic escalation rather than stagnant avoidance. The connection is developing at a measured pace where emotional disclosure and priority are growing consistently, suggesting that the lack of a formal label is due to unhurried pacing rather than resistance to commitment.',
          signals: [
            'Shared vulnerability: Your private interactions involve deep emotional disclosure and genuine mutual support, not just superficial fun.',
            'Increasing priority: They willingly shift personal schedules and consistently incorporate you into their weekly plans.'
          ],
          actionRecommendation:
            'Create a gentle, low-pressure opening to define relationship expectations. A clear, calm conversation will move this forward smoothly.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Comfortable Stagnation',
        verdictSummary:
          'Your answers are more consistent with comfortable stagnation than active progression. Their current behavior allows them to receive closeness, emotional support, and regular intimacy without making the relationship more defined. Whatever their private intentions are, the observable pattern is the same: intimacy is increasing faster than commitment.',
        signals: [
          'Intimacy without accountability: You spend couple-level time together, but topics about exclusivity or the future are met with deflection or silence.',
          'Convenience over sacrifice: They readily enjoy your presence on their terms, but show zero willingness to make personal compromises to secure you.'
        ],
        actionRecommendation:
          'Stop giving full partner access on an undefined free trial. Enforce clear personal boundaries and prepare for the alignment conversation outlined in Day 7.'
      };
    }

    case 'breadcrumber': {
      const isPathA = scores.investment >= 40 && scores.commitment >= 35;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Emotional Hesitation',
          verdictSummary:
            'Their irregular communication is more consistent with personal emotional overwhelm or protective hesitation than calculated manipulation. When they do engage, sincerity and attentiveness are observable.',
          signals: [
            'Genuine remorse after quiet periods: When they return, they acknowledge their absence honestly rather than acting as if nothing happened.',
            'Quality over frequency: When they do engage, the connection feels authentic and attentive rather than dry or perfunctory.'
          ],
          actionRecommendation:
            'Hold your ground calmly. Do not chase during quiet periods, and observe whether they gradually build capacity when given non-judgmental space.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Intermittent Validation',
        verdictSummary:
          'Your answers indicate an observable pattern of intermittent validation. Digital check-ins and late-night responsiveness remain active, but concrete date planning and emotional availability consistently drop off when real investment is required. The connection stays alive through low-cost pings without structural effort.',
        signals: [
          'Digital pings with zero follow-through: Quick to react to your social posts, but consistently unavailable for real, structured dates.',
          'Vanishing upon warmth: The second you respond with enthusiasm or ask where things stand, their attention sharply drops.'
        ],
        actionRecommendation:
          'Cut off the validation supply immediately. Stop replying to low-effort check-ins and demand high-quality communication or walk away.'
      };
    }

    case 'quietly_serious':
    default: {
      const isPathA = scores.commitment >= 55 || Math.abs(gap) <= 15;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Quiet Preparation',
          verdictSummary:
            'High behavioral integrity across all dimensions. Their actions and words align with rare consistency, indicating they have already prioritized you in their mind and are preparing the runway to make the relationship official.',
          signals: [
            'Flawless behavioral consistency: Words and actions align seamlessly. They never leave you guessing where you stand or what their intentions are.',
            'Structural inclusion: They naturally talk about future months and integrate you into their inner world without hesitation.'
          ],
          actionRecommendation:
            'Reciprocate their steady investment with authentic warmth. Let them know their reliability is seen, cherished, and valued.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Waiting for Reassurance',
        verdictSummary:
          'Deep alignment and mutual respect, with a slight hesitation stemming from caution around your boundaries. They are ready to commit, but are waiting for a clear mutual cue from you before taking the formal leap.',
        signals: [
          'Cautious respect: They eagerly lean in whenever you show warmth, but step back if they worry about moving too fast for you.',
          'Subtle exclusivity checks: They drop gentle hints about being off the market and watch your reactions closely.'
        ],
        actionRecommendation:
          'Give them the green light. A simple, reassuring statement confirming you are on the same page will unlock the official commitment.'
      };
    }
  }
}

export interface StructuredSignal {
  tag: string;
  toldUs1: string;
  andText?: string;
  butText: string;
  patternSuggests: string;
}

export function getPersonalizedSignals(
  archetypeId: string,
  userAnswers: Record<number, string | string[]> | undefined,
  scores: { attraction: number; commitment: number; investment: number; exclusivity: number },
  gap: number,
  pathKey: 'A' | 'B'
): { structuredSignals: StructuredSignal[]; conclusionText: string } {
  const answers = userAnswers || {};

  const defaultAnswers: Record<string, Record<number, string>> = {
    situationship: { 1: 'q1_a', 2: 'q2_b', 3: 'q3_b', 4: 'q4_b', 6: 'q6_c', 7: 'q7_b', 8: 'q8_c' },
    chemistry_trap: { 1: 'q1_a', 2: 'q2_d', 3: 'q3_b', 4: 'q4_c', 6: 'q6_c', 7: 'q7_c', 8: 'q8_b' },
    slow_burner: { 1: 'q1_b', 2: 'q2_c', 3: 'q3_a', 4: 'q4_a', 6: 'q6_b', 7: 'q7_b', 8: 'q8_c' },
    breadcrumber: { 1: 'q1_c', 2: 'q2_d', 3: 'q3_c', 4: 'q4_c', 6: 'q6_c', 7: 'q7_d', 8: 'q8_d' },
    quietly_serious: { 1: 'q1_a', 2: 'q2_a', 3: 'q3_a', 4: 'q4_a', 6: 'q6_a', 7: 'q7_a', 8: 'q8_a' },
  };

  const archDefaults = defaultAnswers[archetypeId] || defaultAnswers.situationship;

  const q1Key = (typeof answers[1] === 'string' ? answers[1] : archDefaults[1]) as string;
  const q2Key = (typeof answers[2] === 'string' ? answers[2] : archDefaults[2]) as string;
  const q3Key = (typeof answers[3] === 'string' ? answers[3] : archDefaults[3]) as string;
  const q6Key = (typeof answers[6] === 'string' ? answers[6] : archDefaults[6]) as string;
  const q7Key = (typeof answers[7] === 'string' ? answers[7] : archDefaults[7]) as string;
  const q8Key = (typeof answers[8] === 'string' ? answers[8] : archDefaults[8]) as string;

  const q1Text = OPTION_SUMMARIES[q1Key] || 'They reach out when convenient.';
  const q2Text = OPTION_SUMMARIES[q2Key] || 'Plans tend to happen spontaneously.';
  const q3Text = OPTION_SUMMARIES[q3Key] || 'Communication is active during off-hours.';
  const q6Text = OPTION_SUMMARIES[q6Key] || 'The connection remains mostly private.';
  const q7Text = OPTION_SUMMARIES[q7Key] || 'Exclusivity has never been formally resolved.';
  const q8Text = OPTION_SUMMARIES[q8Key] || 'The dynamic has settled into a comfortable routine.';

  if (pathKey === 'B') {
    return {
      structuredSignals: [
        {
          tag: 'SIGNAL #1 — Closeness vs Definition',
          toldUs1: q2Text,
          andText: q3Text,
          butText: `${q6Text.replace(/\.$/, '')}, while ${q7Text.toLowerCase()}`,
          patternSuggests: 'Closeness is growing significantly faster than relational clarity.'
        },
        {
          tag: 'SIGNAL #2 — Effort vs Escalation',
          toldUs1: q1Text,
          andText: undefined,
          butText: `${q8Text} That effort maintains daily familiarity, but isn\'t translating into forward momentum or structural progression.`,
          patternSuggests: 'Effort is maintaining the comfort of the connection, but not advancing it toward commitment.'
        }
      ],
      conclusionText:
        'Together, these two observable patterns from your specific answers are why your diagnosis leans toward Path B.'
    };
  } else {
    return {
      structuredSignals: [
        {
          tag: 'SIGNAL #1 — Reciprocity without Evasion',
          toldUs1: q1Text,
          andText: q2Text,
          butText: q6Text,
          patternSuggests: 'The connection demonstrates genuine trust and unhurried pacing rather than active avoidance.'
        },
        {
          tag: 'SIGNAL #2 — Baseline Consistency',
          toldUs1: q3Text,
          andText: undefined,
          butText: q8Text,
          patternSuggests: 'Their actions reflect steady execution, providing a secure foundation to invite clarity.'
        }
      ],
      conclusionText:
        'Together, these two observable patterns from your specific answers are why your diagnosis leans toward Path A.'
    };
  }
}

export function getProofTest(archetypeId: string, pathKey: 'A' | 'B') {
  switch (archetypeId) {
    case 'chemistry_trap':
      return {
        headline: 'THE PROOF TEST',
        timeframe: 'Over the next 7 days',
        coreRule:
          'Don\'t measure the intensity of your private banter or late-night chemistry. Measure whether they initiate structured, daylight forward movement.',
        checklist: [
          'They initiate plans at least 48 hours in advance rather than late-night spontaneous invites.',
          'They engage in vulnerable, grounded conversation without immediately deflecting back into flirty banter.',
          'They respond directly and calmly when asked about their intentions or exclusivity.',
          'Their communication remains consistent across 7 consecutive days without sudden disappearances.'
        ],
        pathASign:
          'What supports Path A: They welcome grounded pacing, respect boundaries around last-minute plans, and initiate daytime dates that require forethought.',
        pathBSign:
          'What strengthens Path B: They resist structure, send late-night check-ins to test your availability, but avoid locking down real forward-moving plans.'
      };

    case 'slow_burner':
      return {
        headline: 'THE PROOF TEST',
        timeframe: 'Over the next 7 days',
        coreRule:
          'Don\'t measure how polite or comfortable the routine feels. Measure whether they take unprompted initiative to close the emotional distance.',
        checklist: [
          'They initiate the next date or conversation without waiting for you to bridge the silence.',
          'They introduce a plan or topic that actively involves their personal world or friends.',
          'They lean in with increased responsiveness when you show authentic appreciation.',
          'They ask about your personal values, priorities, or relationship expectations.'
        ],
        pathASign:
          'What supports Path A: When you step back slightly from over-initiating, they naturally step forward to schedule plans and maintain contact.',
        pathBSign:
          'What strengthens Path B: If you stop initiating, the connection drifts into low-urgency silence, proving that the comfort was maintained primarily by your effort.'
      };

    case 'breadcrumber':
      return {
        headline: 'THE PROOF TEST',
        timeframe: 'Over the next 7 days',
        coreRule:
          'Don\'t measure low-cost digital pings (story likes, emojis, random memes). Measure whether they show up with real time, attention, and reliability.',
        checklist: [
          'They follow up a digital ping with a real, concrete invitation to spend quality time.',
          'They maintain steady communication for multiple days without disappearing abruptly.',
          'They offer an honest, accountable explanation if they had previously been distant.',
          'They demonstrate emotional presence when you communicate your preference for consistency.'
        ],
        pathASign:
          'What supports Path A: They acknowledge past inconsistencies with genuine accountability and demonstrate sustained communication without disappearing.',
        pathBSign:
          'What strengthens Path B: They send a low-cost ping (like or emoji), but vanish or give one-word replies the moment you suggest meeting up or having a real chat.'
      };

    case 'quietly_serious':
      return {
        headline: 'THE PROOF TEST',
        timeframe: 'Over the next 7 days',
        coreRule:
          'Don\'t look for dramatic speeches. Measure how readily they embrace clear relationship milestones when you provide an open door.',
        checklist: [
          'They enthusiastically confirm mutual exclusivity when you bring up being off the market.',
          'They naturally integrate you into upcoming weekend plans and personal schedules.',
          'They follow through on every single logistical promise made during the week.',
          'They express vulnerability about how much they value your presence and trust.'
        ],
        pathASign:
          'What supports Path A: They eagerly step through the open door, confirming their commitment and expressing relief that both of you are aligned.',
        pathBSign:
          'What strengthens Path B: They appreciate the reassurance but express mild situational caution, asking for a few weeks to finalize personal timing before the public label.'
      };

    case 'situationship':
    default:
      return {
        headline: 'THE PROOF TEST',
        timeframe: 'Over the next 7 days',
        coreRule:
          'Don\'t measure how affectionate or comfortable they are in private. Measure whether they create forward movement.',
        checklist: [
          'They initiate a real, unprompted conversation about where this dynamic is headed.',
          'They propose concrete, advance future plans that include you (not just last-minute hangouts).',
          'They respond clearly and directly—without deflection or jokes—when exclusivity or feelings come up.',
          'They tangibly adjust their communication or pacing after you express what you need.'
        ],
        pathASign:
          'What supports Path A: They respond to clarity with more clarity and concrete action (e.g., locking in exclusive dates, defining next steps).',
        pathBSign:
          'What strengthens Path B: They respond with affection, jokes, vague reassurance ("let\'s see where things go"), or temporary extra attention—with zero actual change in the relationship structure.'
      };
  }
}

export function getSevenDayPlaybook(archetypeId: string) {
  const baseSevenDays = [
    {
      day: 1,
      title: 'Stop Compensating',
      instruction:
        'Don\'t initiate extra check-ins, fill every conversational silence, or smooth over planning gaps. Let the connection rest at its natural baseline.',
      focus: 'Observe whether they naturally maintain contact without your effort propping it up.'
    },
    {
      day: 2,
      title: 'Match Their Effort',
      instruction:
        'Don\'t punish them, play games, or act cold. Simply stop carrying more than your share of the connection. Respond naturally, but don\'t manufacture momentum they aren\'t creating themselves.',
      focus: 'Stop compensating for missing effort.'
    },
    {
      day: 3,
      title: 'Reinvest In Yourself',
      instruction:
        'Make plans, work out, see friends, or spend time on something that has nothing to do with them. The goal isn\'t to make them miss you—it\'s to stop organizing your day around their attention.',
      focus: 'Reclaim your independent schedule and emotional center.'
    },
    {
      day: 4,
      title: 'Observe Initiative',
      instruction:
        'Pay close attention to who initiates next. Do they step up to make plans, check in meaningfully, or create momentum without you prompting them?',
      focus: 'Measure unprompted interest instead of compliant reactions.'
    },
    {
      day: 5,
      title: 'Define Your Baseline',
      instruction:
        'Get crystal clear on what you actually require to feel emotionally secure: intentional dating, mutual exclusivity, or a defined timeline.',
      focus: 'Know your minimum standard before opening the alignment conversation.'
    },
    {
      day: 6,
      title: 'Prepare Your Composure',
      instruction:
        'Review the script below. Internalize that asking for clarity is not needy—it is an adult standard. Eliminate any urge to send a panicked "what are we??" text.',
      focus: 'Approach the conversation with grounded self-respect, not desperation.'
    },
    {
      day: 7,
      title: 'The Alignment Conversation',
      instruction:
        'Deliver the script in person or during a calm phone call. Keep your tone warm, neutral, and steady. Then stop speaking and listen to their response.',
      focus: 'Create a clear fork in the road between real commitment and polite detachment.'
    }
  ];

  const scriptByArchetype: Record<string, { script: string; tip: string }> = {
    situationship: {
      script: '“I really like what we have, but I\'m looking for something that\'s actually moving toward a relationship. Is that what you\'re looking for with me?”',
      tip: 'Deliver this with warmth and zero edge. Once you say it, do NOT soften it or apologize. Stay silent and let them answer.'
    },
    chemistry_trap: {
      script: '“I love our chemistry, but I need consistency and intentional dating if we\'re seeing each other. Where is your head at regarding where this is going?”',
      tip: 'Do not let physical affection substitute for verbal clarity. Hold your ground with calm eye contact.'
    },
    slow_burner: {
      script: '“I\'ve really enjoyed getting to know you at our pace. I want to make sure we\'re headed in the same direction toward a relationship—is that where your head is at too?”',
      tip: 'Acknowledge that you appreciate their steady nature, but clearly state your standard for shared direction.'
    },
    breadcrumber: {
      script: '“I enjoy talking with you, but I need consistent communication and real plans if we\'re dating. If you\'re not in a place for that, let\'s just keep things friendly.”',
      tip: 'Do not argue or list past offenses. Offer a calm, clear choice between consistency and stepping back.'
    },
    quietly_serious: {
      script: '“I\'ve felt really secure and happy with how steady we\'ve been. I\'d love to make us officially exclusive—how does that feel to you?”',
      tip: 'They are likely waiting for your confirmation. A warm, encouraging tone will make the transition effortless.'
    }
  };

  const scriptInfo = scriptByArchetype[archetypeId] || scriptByArchetype.situationship;

  const responseDecoders = [
    {
      type: 'green' as const,
      title: 'GREEN — Active Progression',
      sampleQuote: '“Yes. I\'ve been thinking about that too. Let\'s talk about what that looks like.”',
      psychologicalMeaning:
        'They share your desire for clarity and feel relieved that the subject was brought up. They immediately engage in discussing next steps or exclusivity.',
      recommendedAction:
        'Acknowledge their honesty warmly. Agree on what mutual exclusivity means to both of you, and establish a clear shared cadence.'
    },
    {
      type: 'yellow' as const,
      title: 'YELLOW — Ambivalent or Unclear',
      sampleQuote: '“I really like you and love spending time with you, but I\'m just not in a place for labels right now.”',
      psychologicalMeaning:
        'Their answer does not currently match your desire for a defined relationship. Whatever the reason, they\'re not offering clear progression right now.',
      recommendedAction:
        'Do not debate or negotiate. Calmly state: "I understand. Since we\'re looking for different things right now, I need to step back from this dynamic." Then observe whether their actions step up.'
    },
    {
      type: 'red' as const,
      title: 'RED — Defensive Stagnation',
      sampleQuote: '“Why do we need to label this? Can\'t we just enjoy what we have and see where things go?”',
      psychologicalMeaning:
        'They\'re resisting the clarity you\'re asking for rather than engaging with it directly. That\'s evidence that the current dynamic is unlikely to change without a meaningful behavioral shift.',
      recommendedAction:
        'Walk away with full dignity intact. Do not engage in an argument. Their reaction has answered your question.'
    }
  ];

  return {
    sevenDayPlan: baseSevenDays,
    scriptHeadline: 'The Exact Low-Pressure Alignment Script',
    scriptContext: 'Deliver this when the vibe is pleasant and calm—never in the heat of an argument or late at night over text.',
    exactScript: scriptInfo.script,
    deliveryTip: scriptInfo.tip,
    responseDecoders
  };
}

