import { Question, Archetype } from '../types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "When you stop texting first, what does he do?",
    subtitle: "Dimension: Raw Attraction & Subconscious Motivation",
    type: 'single',
    options: [
      {
        id: 'q1_a',
        label: "Double-texts within hours with a real topic or funny meme. He can't help himself.",
        weights: { attraction: 25, investment: 20, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q1_b',
        label: "Reaches out in 1–2 days asking 'wyd' or sharing random life updates.",
        weights: { attraction: 20, investment: 15, commitment: 15, exclusivity: 10 }
      },
      {
        id: 'q1_c',
        label: "Likes your IG story, but leaves your actual DMs on read.",
        weights: { attraction: 10, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q1_d',
        label: "Crickets. If you don't initiate, you basically don't exist.",
        weights: { attraction: 2, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 2,
    title: "How do plans with him actually get made?",
    subtitle: "Dimension: Genuine Effort & Intentionality",
    type: 'single',
    options: [
      {
        id: 'q2_a',
        label: "Plans 2–3 days ahead, picks a real spot, & handles the details without games.",
        weights: { attraction: 20, investment: 25, commitment: 20, exclusivity: 20 }
      },
      {
        id: 'q2_b',
        label: "Spontaneous last-minute hangouts, but the vibe is always great when together.",
        weights: { attraction: 18, investment: 15, commitment: 10, exclusivity: 10 }
      },
      {
        id: 'q2_c',
        label: "You initiate 90% of dates. He agrees, but he's just along for the ride.",
        weights: { attraction: 10, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q2_d',
        label: "Late night 'u up?' texts or only links up at group parties/bars.",
        weights: { attraction: 12, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 3,
    title: "What is his day-to-day texting energy?",
    subtitle: "Dimension: Mental Real Estate & Communication Consistency",
    type: 'single',
    options: [
      {
        id: 'q3_a',
        label: "Fast replies or lets you know when he's busy. Keeps you updated seamlessly.",
        weights: { attraction: 25, investment: 22, commitment: 22, exclusivity: 22 }
      },
      {
        id: 'q3_b',
        label: "Dry during work hours, but gives main-character energy late at night.",
        weights: { attraction: 20, investment: 15, commitment: 12, exclusivity: 12 }
      },
      {
        id: 'q3_c',
        label: "Hot & cold. Texts 100 mph on Tuesday, ghosts until Friday.",
        weights: { attraction: 15, investment: 8, commitment: 3, exclusivity: 4 }
      },
      {
        id: 'q3_d',
        label: "One-word answers, dry emojis, zero conversational effort.",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 4,
    title: "When you vent about a rough day, how does he react?",
    subtitle: "Dimension: Emotional Capacity & Empathy",
    type: 'single',
    options: [
      {
        id: 'q4_a',
        label: "Listens intently, offers genuine comfort, and tries to help fix it.",
        weights: { attraction: 20, investment: 25, commitment: 22, exclusivity: 20 }
      },
      {
        id: 'q4_b',
        label: "Gives 2 sentences of sympathy, then turns the topic back to himself.",
        weights: { attraction: 12, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q4_c',
        label: "Replies with generic 'that sucks 🥺' and changes the subject immediately.",
        weights: { attraction: 8, investment: 3, commitment: 2, exclusivity: 2 }
      },
      {
        id: 'q4_d',
        label: "Leaves heavy topics on read and only responds when things are light/flirty.",
        weights: { attraction: 5, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 5,
    title: "【BEHAVIOR CHECKLIST】Which of these has he ACTUALLY done?",
    subtitle: "Select all that apply (More receipts = higher algorithm precision)",
    type: 'multi',
    options: [
      {
        id: 'q5_1',
        label: "Remembered a tiny micro-detail you mentioned offhand and brought it up later",
        weights: { attraction: 5, investment: 5, commitment: 4, exclusivity: 4 }
      },
      {
        id: 'q5_2',
        label: "Shifted his own personal schedule just to see you or help you out",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_3',
        label: "Soft-launched or introduced you to his close friends, roommates, or circle",
        weights: { attraction: 4, investment: 4, commitment: 6, exclusivity: 6 }
      },
      {
        id: 'q5_4',
        label: "Brought you food/medicine or provided real help when you were down/sick",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_5',
        label: "Brought up future plans (trips, events, concerts) 1–3 months out",
        weights: { attraction: 4, investment: 4, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q5_6',
        label: "None of the above (Ouch).",
        weights: { attraction: 0, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 6,
    title: "Where do you exist in his public/social ecosystem?",
    subtitle: "Dimension: Commitment & Public Ownership",
    type: 'single',
    options: [
      {
        id: 'q6_a',
        label: "Hard launch energy. Everyone in his circle knows who you are.",
        weights: { attraction: 25, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q6_b',
        label: "Soft launch. His best friends know about you, but not his main story.",
        weights: { attraction: 18, investment: 12, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q6_c',
        label: "Top Secret. You only exist behind closed doors or private DMs.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q6_d',
        label: "Gatekeeper. He actively avoids personal topics and hides his social life.",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 7,
    title: "What's the roster situation? (Exclusivity & Boundaries)",
    subtitle: "Dimension: Exclusivity & Roster Management",
    type: 'single',
    options: [
      {
        id: 'q7_a',
        label: "Strict boundaries. Made it clear he's only focused on you.",
        weights: { attraction: 20, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q7_b',
        label: "Feels exclusive, but you haven't officially had 'The Talk' (DTR).",
        weights: { attraction: 15, investment: 12, commitment: 12, exclusivity: 18 }
      },
      {
        id: 'q7_c',
        label: "Flirty with girls on IG/Snapchat, giving you slight trust issues.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 6 }
      },
      {
        id: 'q7_d',
        label: "Active roster energy. Pretty sure you're one of 3 options.",
        weights: { attraction: 8, investment: 2, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 8,
    title: "Looking back at the past 30 days, what's the trajectory?",
    subtitle: "Dimension: Relationship Dynamics & Future Momentum",
    type: 'single',
    options: [
      {
        id: 'q8_a',
        label: "Steady Escalation: Deeper chats, more dates, heading toward official.",
        weights: { attraction: 25, investment: 25, commitment: 25, exclusivity: 22 }
      },
      {
        id: 'q8_b',
        label: "Rollercoaster: Insane initial spark, now stuck in a plateau.",
        weights: { attraction: 22, investment: 12, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_c',
        label: "Spinning Wheels: Cozy situationship, nobody is making a move.",
        weights: { attraction: 15, investment: 10, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_d',
        label: "The Slow Fade: Replies getting drier, plans getting flakier.",
        weights: { attraction: 5, investment: 2, commitment: 2, exclusivity: 2 }
      }
    ]
  }
];

export const ARCHETYPES: Archetype[] = [
  {
    id: 'chemistry_trap',
    name: 'The Chemistry Trap',
    subtitle: 'He loves the high of you. He doesn\'t love the responsibility.',
    tag: 'Delulu Zone (Attraction: 88% | Commitment: 42%)',
    emoji: '🔥',
    color: '#FF6B8B',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    description: 'You have insane chemistry and banter, but the second things require real effort or a DTR (Define The Relationship), he pulls back into the fog.',
    gapAnalysis: 'Major Disconnect Detected: Attraction (88%) vs Commitment (42%) reveals a 46-point gap. "Liking you" and "choosing you" are two different things in his head right now.',
    unlockedInsights: {
      whyNotAdvancing: "He's getting 100% of your attention with 0% accountability. You're giving wifey treatment on a free trial, so he has zero incentive to upgrade.",
      seriousVsAmbiguous: "Classic 'Right Spark, Wrong Effort'. He likes you enough to keep you around, but not enough to lock you down.",
      exclusivitySignals: "He keeps his options open just in case, but you currently get his prime time.",
      actionGuide7Days: [
        "Stop initiating: 0 text firsts for the next 7 days.",
        "Match his energy: Be warm when he texts, but stop giving free emotional labor.",
        "Create scarcity: Let him realize you are a prize, not a permanent waiting room.",
        "The Test: See if he plans a real date with a time & place within 72 hours."
      ]
    }
  },
  {
    id: 'quietly_serious',
    name: 'The Quietly Serious One',
    subtitle: 'No games, no mystery. He\'s actually building something real.',
    tag: 'Main Character Match (High Alignment)',
    emoji: '💖',
    color: '#00BFA5',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    description: 'His actions match his words. He shows up consistently, soft-launches you to his world, and respects your time without mental games.',
    gapAnalysis: 'Elite Alignment: Attraction (92%) & Commitment (88%) are in perfect sync. Zero mind games detected in his algorithm.',
    unlockedInsights: {
      whyNotAdvancing: "He’s not delaying—he’s just waiting for the right romantic moment to ask you out officially.",
      seriousVsAmbiguous: "100% Serious Intent. High emotional maturity and clear behavior logic.",
      exclusivitySignals: "You're the only one on his screen. Zero active roster energy.",
      actionGuide7Days: [
        "Reciprocate positive signals: Let him know his effort is seen and valued.",
        "Create the opening: Give him a low-pressure opportunity to drop the DTR question.",
        "Keep your magnetic life: Hold onto your own goals, friends, and hobbies."
      ]
    }
  },
  {
    id: 'breadcrumber',
    name: 'The Breadcrumber',
    subtitle: 'He gives you just enough crumbs to keep you from walking away.',
    tag: 'Breadcrumb Loop (Investment: 32%)',
    emoji: '🪵',
    color: '#FFB300',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    description: 'Whenever you start moving on, he pops up with a random story reply or fire emoji. As soon as you get warm, he vanishes again.',
    gapAnalysis: 'Severe Investment Deficit: Investment score is only 32%. He’s paying in cheap words while you’re paying in real emotion.',
    unlockedInsights: {
      whyNotAdvancing: "He’s hoarding your attention for ego validation. He doesn't want to commit, but he doesn't want anyone else to have you either.",
      seriousVsAmbiguous: "Boredom & ego boost. Zero intent to build a relationship.",
      exclusivitySignals: "You are one of multiple tabs open in his browser.",
      actionGuide7Days: [
        "Cut off low-effort replies: Ignore dry 'wyd' texts and random story likes.",
        "Demand high quality: Only engage if he proposes a concrete, real-life date.",
        "Reclaim your energy: Remember that breadcrumbs will never make a meal."
      ]
    }
  },
  {
    id: 'situationship',
    name: 'The Situationship',
    subtitle: 'Couples perks, zero commitment. Trapped in the gray zone.',
    tag: 'Undefined Bonding (Attraction: 78% | Commitment: 38%)',
    emoji: '🌫️',
    color: '#7C4DFF',
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    description: 'You do everything couples do, but you can\'t post him or call him your boyfriend. You\'re stuck in a comfortable purgatory.',
    gapAnalysis: 'Attraction (78%) is high, but Commitment (38%) is lagging. He enjoys the boyfriend benefits without the boyfriend title.',
    unlockedInsights: {
      whyNotAdvancing: "Why buy the book when the preview is unlimited? He has no urgency to change a setup that benefits him.",
      seriousVsAmbiguous: "Enjoying the present, avoiding the future.",
      exclusivitySignals: "Technically single, practically exclusive—until it\'s inconvenient.",
      actionGuide7Days: [
        "Pull back girlfriend privileges: Stop being available 24/7.",
        "Have 'The Talk' (DTR): Gently but firmly set your boundary on what you\'re looking for.",
        "Be willing to walk: You can\'t win a situationship by waiting it out."
      ]
    }
  },
  {
    id: 'slow_burner',
    name: 'The Slow Burner',
    subtitle: 'Slow motion, high devotion. He takes his time, but it\'s real.',
    tag: 'Steady Growth (Balanced Dynamics)',
    emoji: '🐢',
    color: '#448AFF',
    gradient: 'from-blue-500 via-sky-500 to-cyan-500',
    description: 'He isn\'t love-bombing you or texting 24/7, but every promise he makes, he keeps. The flame is low, but the foundation is solid.',
    gapAnalysis: 'Balanced & Stable: Scores are climbing steadily across all 4 dimensions.',
    unlockedInsights: {
      whyNotAdvancing: "He\'s cautious and wants to be 100% sure before taking big steps. This is maturity, not hesitation.",
      seriousVsAmbiguous: "Genuine intent, slow execution.",
      exclusivitySignals: "Loyal and focused on building trust.",
      actionGuide7Days: [
        "Be patient: Don\'t mistake a slow pace for lack of interest.",
        "Create shared experiences: Plan activities that require teamwork & deep conversation.",
        "Show vulnerability: Let him see your soft side to deepen the bond."
      ]
    }
  }
];
