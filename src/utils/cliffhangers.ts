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
            'Their behavior reflects genuine passion with emotional pacing caution. They are not faking their attraction or stringing you along; they are taking time to ensure emotional safety before fully committing.',
          signals: [
            'Follow-through on real conversations: Beyond late-night banter, they show curiosity about your real values and vulnerable moments.',
            'Measured escalation: They slow down when conversations get intense, not to disappear, but to keep the connection grounded.'
          ],
          actionRecommendation:
            'Maintain emotional consistency. Give them space to initiate without applying artificial pressure, allowing the bond to progress safely.'
        };
      }
      return {
        pathKey: 'B',
        pathTitle: 'Path B — Addictive Ambiguity',
        verdictSummary:
          'Your scores reveal that this dynamic is operating primarily on intense dopamine and convenience. They enjoy the romantic privileges and validation of your presence, but actively avoid relational accountability.',
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
            'This connection is moving slowly, but it is moving forward. Their measured pace is built on steady observation and genuine care rather than emotional hesitation.',
          signals: [
            'Unwavering reliability: Even if text frequency is modest, they consistently show up when it matters and remember the little details.',
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
          'Their steady presence has settled into an easy routine. They appreciate your company and warmth, but lack the urgency to escalate this dynamic into an official relationship.',
        signals: [
          'Predictable contact with stagnant escalation: You share pleasant check-ins, but there is zero momentum toward introducing you to their inner circle.',
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
            'Your connection is evolving through natural depth and unhurried comfort. They are not intentionally dodging commitment, but allowing the bond to solidify before making it official.',
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
          'Your dynamic has settled into the classic situationship plateau. They enjoy 100% of couple intimacy and emotional support, but are comfortable keeping the arrangement undefined to avoid commitment obligations.',
        signals: [
          'Intimacy without accountability: You spend couple-level time together, but topics about exclusivity or the future are met with deflection or silence.',
          'Convenience over sacrifice: They readily enjoy your presence on their terms, but show zero willingness to make personal compromises to secure you.'
        ],
        actionRecommendation:
          'Stop giving full partner access on an undefined free trial. Enforce clear personal boundaries and prepare for the DTR conversation outlined in Day 7.'
      };
    }

    case 'breadcrumber': {
      const isPathA = scores.investment >= 40 && scores.commitment >= 35;
      if (isPathA) {
        return {
          pathKey: 'A',
          pathTitle: 'Path A — Emotional Hesitation',
          verdictSummary:
            'Their hot-and-cold pattern stems from personal emotional overwhelm or protective hesitation rather than calculating manipulation.',
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
          'You are experiencing tactical ego-hoarding. They drop zero-cost digital crumbs (story likes, late-night emojis, random texts) to keep you on reserve without any intention to invest real effort.',
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
            'They have already committed to you in their mind. Their actions reflect high integrity, steady investment, and emotional maturity as they prepare to make the relationship official.',
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
          'They are fully prepared to commit, but hold deep respect for your boundaries and are quietly waiting for a clear mutual cue from you before taking the formal leap.',
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
