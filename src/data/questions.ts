import { Question, Archetype } from '../types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "When you stop texting first, what do they (he/she) do?",
    subtitle: "Dimension: Natural Attraction & Subconscious Motivation",
    type: 'single',
    options: [
      {
        id: 'q1_a',
        label: "**Double-texts within hours** with a real topic or funny meme. Can't help reaching out.",
        weights: { attraction: 25, investment: 20, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q1_b',
        label: "**Reaches out in 1–2 days** asking 'wyd' or sharing random life updates.",
        weights: { attraction: 20, investment: 15, commitment: 15, exclusivity: 10 }
      },
      {
        id: 'q1_c',
        label: "**Likes your story / post**, but leaves your actual DMs on read.",
        weights: { attraction: 10, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q1_d',
        label: "**Complete crickets.** If you don't initiate, you basically don't exist.",
        weights: { attraction: 2, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 2,
    title: "How do plans with them (he/she) actually get made?",
    subtitle: "Dimension: Time & Effort / Intentionality",
    type: 'single',
    options: [
      {
        id: 'q2_a',
        label: "**Plans 2–3 days ahead**, picks a real spot, & handles the details without games.",
        weights: { attraction: 20, investment: 25, commitment: 20, exclusivity: 20 }
      },
      {
        id: 'q2_b',
        label: "**Spontaneous last-minute hangouts**, but the vibe is always great when together.",
        weights: { attraction: 18, investment: 15, commitment: 10, exclusivity: 10 }
      },
      {
        id: 'q2_c',
        label: "**You initiate 90% of dates.** They agree, but are just along for the ride.",
        weights: { attraction: 10, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q2_d',
        label: "**Late night 'u up?' texts** or only links up at group parties/bars.",
        weights: { attraction: 12, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 3,
    title: "What is their (he/she) day-to-day texting energy?",
    subtitle: "Dimension: Mental Real Estate & Communication Consistency",
    type: 'single',
    options: [
      {
        id: 'q3_a',
        label: "**Fast replies or heads-up.** Keeps you updated seamlessly without leaving you guessing.",
        weights: { attraction: 25, investment: 22, commitment: 22, exclusivity: 22 }
      },
      {
        id: 'q3_b',
        label: "**Dry during work hours**, but gives main-character energy late at night.",
        weights: { attraction: 20, investment: 15, commitment: 12, exclusivity: 12 }
      },
      {
        id: 'q3_c',
        label: "**Hot & cold whiplash.** Texts 100 mph on Tuesday, ghosts until Friday.",
        weights: { attraction: 15, investment: 8, commitment: 3, exclusivity: 4 }
      },
      {
        id: 'q3_d',
        label: "**One-word dry answers**, dry emojis, and zero conversational effort.",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 4,
    title: "When you vent about a rough day, how do they (he/she) react?",
    subtitle: "Dimension: Emotional Capacity & Empathy",
    type: 'single',
    options: [
      {
        id: 'q4_a',
        label: "**Listens intently and comforts you**, offering genuine emotional support and solutions.",
        weights: { attraction: 20, investment: 25, commitment: 22, exclusivity: 20 }
      },
      {
        id: 'q4_b',
        label: "**Gives 2 sentences of sympathy**, then immediately turns the topic back to themselves.",
        weights: { attraction: 12, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q4_c',
        label: "**Replies with a generic emoji** ('that sucks 🥺') and changes the subject quickly.",
        weights: { attraction: 8, investment: 3, commitment: 2, exclusivity: 2 }
      },
      {
        id: 'q4_d',
        label: "**Leaves heavy topics on read**, only resurfacing when things are light or flirty.",
        weights: { attraction: 5, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 5,
    title: "【BEHAVIOR CHECKLIST】Which of these have they (he/she) ACTUALLY done?",
    subtitle: "Select all that apply (More receipts = higher algorithm precision)",
    type: 'multi',
    options: [
      {
        id: 'q5_1',
        label: "**Remembered a tiny micro-detail** you mentioned offhand and brought it up later",
        weights: { attraction: 5, investment: 5, commitment: 4, exclusivity: 4 }
      },
      {
        id: 'q5_2',
        label: "**Shifted personal schedule** just to see you or help you out",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_3',
        label: "**Introduced / soft-launched you** to close friends, roommates, or inner circle",
        weights: { attraction: 4, investment: 4, commitment: 6, exclusivity: 6 }
      },
      {
        id: 'q5_4',
        label: "**Brought food, medicine, or care** when you were down or sick",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_5',
        label: "**Brought up future plans** (trips, events, concerts) 1–3 months out",
        weights: { attraction: 4, investment: 4, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q5_6',
        label: "**None of the above** (Ouch, zero receipts).",
        weights: { attraction: 0, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 6,
    title: "Where do you exist in their (he/she) public/social ecosystem?",
    subtitle: "Dimension: Commitment Intent & Public Ownership",
    type: 'single',
    options: [
      {
        id: 'q6_a',
        label: "**Hard launch energy.** Everyone in their close circle knows who you are.",
        weights: { attraction: 25, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q6_b',
        label: "**Soft launch status.** Their best friends know about you, but not their main feed.",
        weights: { attraction: 18, investment: 12, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q6_c',
        label: "**Top secret.** You only exist behind closed doors or private DMs.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q6_d',
        label: "**Gatekeeper mode.** They actively avoid personal topics and hide their social life.",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 7,
    title: "What's the roster situation? (Exclusivity & Boundaries)",
    subtitle: "Dimension: Exclusive Focus & Roster Management",
    type: 'single',
    options: [
      {
        id: 'q7_a',
        label: "**Strict loyal boundaries.** Made it clear they are only focused on you.",
        weights: { attraction: 20, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q7_b',
        label: "**Feels exclusive**, but you haven't officially had 'The Talk' (DTR).",
        weights: { attraction: 15, investment: 12, commitment: 12, exclusivity: 18 }
      },
      {
        id: 'q7_c',
        label: "**Flirty with others on social media**, giving you subtle trust issues.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 6 }
      },
      {
        id: 'q7_d',
        label: "**Active roster energy.** Pretty sure you're one of multiple options in rotation.",
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
        label: "**Steady escalation:** Deeper conversations, more dates, heading toward official.",
        weights: { attraction: 25, investment: 25, commitment: 25, exclusivity: 22 }
      },
      {
        id: 'q8_b',
        label: "**Rollercoaster:** Insane initial spark that plateaued into uncertainty.",
        weights: { attraction: 22, investment: 12, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_c',
        label: "**Spinning wheels:** Cozy situationship where nobody makes a move.",
        weights: { attraction: 15, investment: 10, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_d',
        label: "**The slow fade:** Replies getting drier, plans getting flakier.",
        weights: { attraction: 5, investment: 2, commitment: 2, exclusivity: 2 }
      }
    ]
  }
];

export const ARCHETYPES: Archetype[] = [
  // 1. THE SLOW BURNER
  {
    id: 'slow_burner',
    name: 'The Slow Burner',
    subtitle: 'They (he/she) probably like you more than they know how to show — but liking you and defining the relationship are moving at different speeds.',
    tag: 'Steady Growth · Balanced Dynamics',
    emoji: '🐢',
    color: '#504E76',
    gradient: 'from-[#504E76] to-[#C4C3E3]',
    description: 'They do not love-bomb you or text 24/7, but their actions are steady. Their feelings are developing quietly through consistency rather than dramatic chaos.',
    gapAnalysis: 'Balanced Dynamic: Natural Attraction and Commitment Intent are climbing steadily in parallel with zero destabilizing drops.',
    report: {
      hook: "They (he/she) probably like you more than they know how to show — but liking you and defining the relationship are moving at different speeds.",
      summaryHighlights: [
        "Strongest signal: Natural Attraction (High genuine curiosity & emotional pull).",
        "Consistency > Intensity: Smaller, quieter actions instead of fake promises.",
        "Core conflict: Enough intimacy to feel important, but not quite enough structure to feel secure."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Consistency and intensity are not the same thing.",
          paragraphs: [
            "They (he/she) do not seem like someone who is trying to overwhelm you.",
            "There is no strong pattern of love-bombing, exaggerated promises, or intense attention followed by disappearance.",
            "Instead, their interest appears through smaller, quieter behaviors: showing up, remembering things, maintaining contact, making time, and allowing closeness to develop without constantly forcing escalation.",
            "Someone can text you all day and still invest very little. Someone else can communicate less frequently but reliably appear when it matters. Your dynamic leans closer to the second pattern."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "Intimacy without structure breeds anxiety.",
          paragraphs: [
            "Because the relationship is giving you enough intimacy to feel important, but not quite enough structure to feel secure.",
            "You are not asking: 'Do they care about me at all?'",
            "You are asking: 'If they care this much, what exactly are we becoming?'",
            "Their behavior currently translates to: Interest → YES. Emotional investment → YES. Willingness to keep building → LIKELY. Clear relational decision → STILL DEVELOPING."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "A moderate gap represents caution, not deceit.",
          paragraphs: [
            "Your Natural Attraction score sits above Commitment Intent, but the gap is balanced compared to toxic avoidant dynamics.",
            "Their feelings are developing faster than their willingness to define them.",
            "That happens when someone takes longer to translate emotion into commitment, or when they are protective of their peace.",
            "However: 'They are just slow' must never become an excuse you use forever. Slow movement is healthy only while there is still movement."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Look for commitment signals over chemistry proofs.",
          paragraphs: [
            "Stop asking: 'Do they like me?' (Your score already proves they do).",
            "Start asking: 'Is their behavior gradually becoming more intentional?'",
            "Watch whether they create real plans instead of vague suggestions, make room for you in their life, and take small risks to make their intentions clearer.",
            "Those are commitment signals. And they matter far more now than another affectionate text or another moment of chemistry."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Give the connection room to breathe and lead.",
          paragraphs: [
            "Do not suddenly pull away or manufacture fake jealousy. And do not over-compensate simply because uncertainty makes you anxious."
          ],
          bullets: [
            "Day 1–3: Hold your center. Stop doing extra mental work to turn ambiguous moments into proof.",
            "Day 4–5: Keep being warm and responsive, but let them take the initiative to set up your next in-person plan.",
            "Day 6–7: Notice if their investment naturally increases without you prompting it. If intimacy deepens while structure stays frozen, the meaning changes."
          ]
        }
      ],
      bottomLine: [
        "This does not look like a partner (man/woman) who feels nothing. It also does not look like a partner who has fully decided what they are building.",
        "You do not need more evidence of chemistry. You need evidence of direction.",
        "Because eventually, the question is no longer: 'Do they feel something?' It becomes: 'Is what they feel strong enough to change what they do?'"
      ],
      socialQuote: "You do not need more evidence of chemistry. You need evidence of direction.",
      shareSummary: "Steady connection with real emotional pull, currently waiting for behavioral decisiveness."
    },
    unlockedInsights: {
      whyNotAdvancing: "They are cautious and want to be 100% sure before taking big steps. This is deliberate maturity, not cold hesitation.",
      seriousVsAmbiguous: "Genuine intent paired with slow, measured execution. High reliability once committed.",
      exclusivitySignals: "Focused and loyal in their actions. Zero active roster energy detected.",
      actionGuide7Days: [
        "Be patient: Do not mistake a measured pace for a lack of interest.",
        "Give them room to initiate: Let them lead the scheduling of your next date.",
        "Maintain your own magnetic life: Keep your personal goals, hobbies, and friends vibrant."
      ]
    }
  },

  // 2. THE CHEMISTRY TRAP
  {
    id: 'chemistry_trap',
    name: 'The Chemistry Trap',
    subtitle: 'They (he/she) love the electric high of you — but liking you and choosing you are two entirely different decisions in their head.',
    tag: 'Delulu Zone · High Chemistry / Low DTR',
    emoji: '🔥',
    color: '#F1642E',
    gradient: 'from-[#F1642E] to-[#FCDD9D]',
    description: 'You share insane chemistry and late-night banter, but the second the dynamic requires real effort or a DTR, they pull back into comfortable ambiguity.',
    gapAnalysis: 'Severe Delulu Gap: High Natural Attraction sits on top of lagging Commitment Intent. They enjoy partner privileges without relationship accountability.',
    report: {
      hook: "They are addicted to the high of your chemistry — but you are giving full partner privileges on a perpetual free trial.",
      summaryHighlights: [
        "Intense initial spark paired with zero structural momentum.",
        "High dopamine banter that evaporates when real effort is required.",
        "Core conflict: They want your attention, but refuse to give up single freedom."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Chemistry without commitment is high-stakes entertainment.",
          paragraphs: [
            "When you are together, the energy is undeniable. Mutual attraction, playful banter, and magnetic body language come effortlessly.",
            "Yet, during ordinary weekdays, plans remain vague, communication turns sporadic, and conversations avoid real relationship topics.",
            "Their actions reflect genuine enjoyment of the chemistry, but observable behavior shows no active effort to translate attraction into relationship structure.",
            "Intense chemistry is an emotional state; commitment is a behavioral decision. Confusing the two creates perpetual uncertainty."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "The dopamine highs are keeping you focused on potential rather than patterns.",
          paragraphs: [
            "Because the in-person highs feel electric, it is easy to assume that commitment hesitation is just 'bad timing' or 'fear of vulnerability.'",
            "However, analyzing their private thoughts will not change their observable behavior.",
            "Whatever their private feelings are, their actions demonstrate an observable pattern: high enthusiasm for private closeness, but low urgency for shared responsibility."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "A massive Attraction–Commitment disconnect.",
          paragraphs: [
            "Your results show a substantial gap between Natural Attraction and actual Commitment Intent.",
            "The dynamic provides regular validation and intimacy, but lacks the intentional planning required for relationship progression.",
            "When partner-level access is granted without structural definition, the dynamic naturally remains in comfortable ambiguity."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Stop tracking flirts. Start tracking concrete initiative.",
          paragraphs: [
            "Stop asking: 'Do they feel the spark when we are together?' (Your scores already confirm they do).",
            "Start asking: 'Are they willing to make advance plans, publicly acknowledge this connection, and respect boundaries?'",
            "Observable behavior will quickly reveal whether someone is ready to invest or merely enjoying the spark."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Require structural effort.",
          paragraphs: [
            "Do not start an emotional argument. Calmly shift your posture from passive availability to structured standards."
          ],
          bullets: [
            "Day 1–2: Stop propping up the conversation. Let communication settle at their unprompted baseline.",
            "Day 3–4: Respond warmly to check-ins, but decline vague or last-minute hangouts.",
            "Day 5–7: Deliver the alignment script outlined below. Require advance planning and public clarity."
          ]
        }
      ],
      bottomLine: [
        "Don't read their mind. Read the pattern.",
        "High chemistry is common; consistent behavioral alignment is rare. Measure whether the spark translates into intentional, structured effort.",
        "When you stop over-functioning to preserve the spark, reality will clearly show whether they are ready to step forward."
      ],
      socialQuote: "Don't read their mind. Read the pattern. Measure whether chemistry translates into structural commitment.",
      shareSummary: "High chemical spark with lagging commitment. Time to test for real forward momentum."
    },
    unlockedInsights: {
      whyNotAdvancing: "They get 100% of your intimacy and emotional focus with 0% relational responsibility. They have no incentive to change.",
      seriousVsAmbiguous: "Classic 'Right Spark, Zero Execution'. They like having you around, but avoid the work of a partnership.",
      exclusivitySignals: "Keeps their public status ambiguous while monopolizing your private time.",
      actionGuide7Days: [
        "Enforce 0 text firsts for 7 consecutive days.",
        "Decline all spontaneous late-night hangouts with polite grace.",
        "Require clear, advance-planned dates in public settings."
      ]
    }
  },

  // 3. THE SITUATIONSHIP
  {
    id: 'situationship',
    name: 'The Situationship',
    subtitle: 'Couples perks, zero commitment. You are trapped in a comfortable gray zone that serves their convenience, not your future.',
    tag: 'Undefined Gray Zone · High Comfort / Low DTR',
    emoji: '🌫️',
    color: '#C4C3E3',
    gradient: 'from-[#C4C3E3] to-[#504E76]',
    description: 'You do everything real couples do, but you cannot introduce them as your partner. You are stuck in a cozy purgatory where ambiguity reigns.',
    gapAnalysis: 'Commitment Deficit: The comfort level is 90%, but the structural momentum is 30%. They avoid DTR because the current setup costs them nothing.',
    report: {
      hook: "You do everything couples do, but you cannot call them yours. They are comfortable in the gray zone because ambiguity serves them, not you.",
      summaryHighlights: [
        "High comfort and routine intimacy without any public accountability.",
        "The talking stage has expired into a permanent holding pattern.",
        "Core conflict: They want relationship benefits without accepting relationship boundaries."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Comfort is the ultimate trap of the modern talking stage.",
          paragraphs: [
            "You have inside jokes, favorite spots together, and regular quality time. To any outsider, you look like a devoted couple.",
            "Yet, whenever the topic of the future, exclusivity, or defining the relationship comes up, the room turns quiet or they give the classic 'Let's just see where things go.'",
            "The dynamic functions with high emotional intimacy, but carefully avoids structural accountability.",
            "The dangerous part about a situationship is that it feels cozy enough to keep you from leaving, but ambiguous enough to keep you perpetually uncertain."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "You are waiting for time to do the work that clear standards must do.",
          paragraphs: [
            "You tell yourself: 'If we just spend another month together, the bond will naturally become official.'",
            "However, waiting passively inside an undefined dynamic rarely creates progression; it simply establishes the undefined status as the normal baseline.",
            "Their current behavior allows them to receive closeness and comfort without making the relationship more defined."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "Lagging commitment masked by daily routine.",
          paragraphs: [
            "Your scores reveal high habitual investment paired with near-zero forward momentum.",
            "Whatever their private intentions are, the observable pattern is the same: intimacy is increasing faster than commitment.",
            "When emotional availability is consistently granted without relational clarity, the dynamic naturally settles into comfortable stagnation.",
            "Observing this pattern objectively is not a defeat; it is the foundation for making clear, dignified choices about your time."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Look for boundary respect, not just routine company.",
          paragraphs: [
            "Stop asking: 'Did we have a sweet time together last night?'",
            "Start asking: 'Is this dynamic moving toward exclusivity, or is it spinning its wheels in the same gray loop?'",
            "Notice how they react when you communicate your standards or create healthy personal space.",
            "Observable behavior will always reveal whether someone is prepared to step up when clarity is invited."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Shift from passive waiting to active boundary setting.",
          paragraphs: [
            "You cannot negotiate commitment by staying silent. A healthy relationship requires both people to be willing to define what they are building."
          ],
          bullets: [
            "Day 1–3: Stop over-functioning. Stop propping up the dynamic with extra initiation or scheduling effort.",
            "Day 4–5: Reinvest attention into your personal priorities, social circles, and independent goals.",
            "Day 6–7: Have the calm, low-pressure alignment conversation outlined below. If they resist clarity, step back with dignity."
          ]
        }
      ],
      bottomLine: [
        "Don't read their mind. Read the pattern.",
        "When a connection creates emotional closeness without structural clarity, reality will clarify the dynamic the moment you communicate your standards.",
        "Stop analyzing private feelings in secret. Start tracking observable forward movement in daylight."
      ],
      socialQuote: "Don't read their mind. Read the pattern. Measure whether intimacy translates into intentional commitment.",
      shareSummary: "Comfortable gray zone with zero structural progress. Time for clear alignment or a dignified exit."
    },
    unlockedInsights: {
      whyNotAdvancing: "They have achieved a perfect equilibrium: relationship intimacy with single freedom. They have no urgency to disrupt this.",
      seriousVsAmbiguous: "Enjoys present companionship while explicitly avoiding future accountability.",
      exclusivitySignals: "Practically exclusive out of routine, but technically single whenever convenient.",
      actionGuide7Days: [
        "Immediately pull back on 24/7 availability and emotional caretaker duties.",
        "Initiate a direct, non-confrontational conversation regarding your relationship goals.",
        "Prepare to walk away if they offer another round of vague promises."
      ]
    }
  },

  // 4. THE BREADCRUMBER
  {
    id: 'breadcrumber',
    name: 'The Breadcrumber',
    subtitle: 'They throw you micro-doses of attention to keep you from walking away, but never enough to actually build something real.',
    tag: 'Breadcrumb Loop · Severe Investment Deficit',
    emoji: '🪵',
    color: '#FCDD9D',
    gradient: 'from-[#FCDD9D] to-[#F1642E]',
    description: 'Whenever you start moving on, they pop up with a story reply or a random emoji. As soon as you warm up, they disappear again.',
    gapAnalysis: 'Severe Investment Deficit: They pay in zero-cost digital crumbs while consuming your genuine emotional energy.',
    report: {
      hook: "Intermittent attention creates high emotional anxiety. Observable patterns show low-cost digital check-ins with near-zero structural momentum.",
      summaryHighlights: [
        "Sporadic digital pings (story reactions, memes, late-night 'wyd').",
        "Communication drops off when advance planning or emotional depth is requested.",
        "Core pattern: Keeping the connection warm without investing real effort."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Low-cost check-ins without real-world momentum.",
          paragraphs: [
            "They react to social posts or send brief messages, but actual conversations remain brief and unstructured.",
            "Contact occurs just frequently enough to maintain familiarity, but stops short of regular dates or future planning.",
            "The observable pattern shows low-cost check-ins that preserve contact without generating real-world momentum.",
            "Whatever their private motivation, the dynamic functions to maintain familiarity without accepting relationship responsibility."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "Intermittent reinforcement creates behavioral doubt.",
          paragraphs: [
            "Unpredictable pacing makes it difficult to distinguish between temporary busy periods and chronic lack of intent.",
            "Each warm interaction briefly revives hope that the connection is about to stabilize.",
            "Look at observable metrics: How many advance dates have they planned? How consistent is their communication across an entire week?",
            "Digital reactions require zero logistical sacrifice and cannot be used as evidence of commitment readiness."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "An observable investment deficit.",
          paragraphs: [
            "Your score reveals a significant imbalance between your emotional responsiveness and their actual investment of time and logistical effort.",
            "They maintain passive access to your attention without allocating dedicated space in their schedule.",
            "A connection cannot mature into a relationship when effort remains strictly reactive.",
            "Setting a standard for consistency is the only way to test whether this dynamic has real potential."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Ignore digital pings. Measure tangible presence.",
          paragraphs: [
            "Stop asking: 'Why did they send that reaction or meme?'",
            "Start asking: 'Does this interaction come with a confirmed time, date, and physical presence?'",
            "Observable behavior will always reveal whether someone is prepared to invest or simply checking in out of convenience."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Calibrate to observable effort.",
          paragraphs: [
            "The most effective way to test an inconsistent dynamic is to stop rewarding low-effort communication."
          ],
          bullets: [
            "Day 1–2: Stop initiating contact and cease responding to low-cost digital reactions.",
            "Day 3–4: When they reach out with a casual text, respond politely but do not carry the conversation.",
            "Day 5–7: Deliver the alignment script. Require clear, advance plans or step back completely."
          ]
        }
      ],
      bottomLine: [
        "Don't read their mind. Read the pattern.",
        "Intermittent attention is an observable pattern, not an enigma to decipher. Measure whether communication is paired with reliable execution.",
        "When you stop responding to low-cost digital pings, reality will quickly reveal whether they are prepared to invest real effort."
      ],
      socialQuote: "Don't read their mind. Read the pattern. Measure whether digital presence translates into real-world commitment.",
      shareSummary: "Intermittent attention with lagging investment. Time to require consistency or step back."
    },
    unlockedInsights: {
      whyNotAdvancing: "They hoard your attention for validation. They have no desire to commit, but want to ensure nobody else has you.",
      seriousVsAmbiguous: "Boredom-driven ego check. Zero relational intent.",
      exclusivitySignals: "You are one of multiple active tabs open in their rotation.",
      actionGuide7Days: [
        "Cut off replies to dry 'wyd' and late-night emoji reactions.",
        "Demand high-quality communication or withdraw completely.",
        "Recognize that intermittent attention is a red flag, not passion."
      ]
    }
  },

  // 5. THE QUIETLY SERIOUS ONE
  {
    id: 'quietly_serious',
    name: 'The Quietly Serious One',
    subtitle: 'No games, no confusion. Their (he/she) actions match their words because someone with real intentions never makes you guess.',
    tag: 'Main Character Match · Elite Alignment',
    emoji: '💖',
    color: '#A3B565',
    gradient: 'from-[#A3B565] to-[#504E76]',
    description: 'Their actions match their words. They show up consistently, integrate you into their world, and respect your boundaries without mental games.',
    gapAnalysis: 'Elite Alignment: Natural Attraction and Commitment Intent are in high harmony. Minimal mind games detected in their behavioral profile.',
    report: {
      hook: "No games, no confusion. Their actions match their words because someone with real intentions never makes you guess.",
      summaryHighlights: [
        "High score alignment across Natural Attraction, Time & Effort, Commitment Intent, and Exclusive Focus.",
        "Reliable execution: Promises made are promises kept.",
        "Core reality: They are genuinely preparing the runway to make things official."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Clarity is the ultimate romantic green flag.",
          paragraphs: [
            "They do not play the 3-day texting game. They reach out because they genuinely want to hear about your day.",
            "They plan real dates with advance notice, remember the little things you like, and introduce you to their inner circle without hesitation.",
            "There is no emotional whiplash here. Their behavior today matches their behavior from two weeks ago.",
            "This is what emotional maturity looks like: steady, intentional, and calm."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "Peace can feel unfamiliar if you are used to chaos.",
          paragraphs: [
            "If your past relationships were full of drama, ghosting, and mixed signals, a healthy connection can feel almost 'too calm.'",
            "You might find yourself waiting for the other shoe to drop, looking for hidden red flags that do not exist.",
            "Do not confuse peace with a lack of passion. Healthy love does not make your nervous system panic.",
            "They are giving you a safe container to be yourself. Learn to receive it with open hands."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "High harmony across all core dimensions.",
          paragraphs: [
            "Your scores show high, synchronized alignment between their Natural Attraction and their Commitment Intent levels.",
            "They are not delaying because they are keeping other options open; they are simply taking the time to build a solid foundation.",
            "They treat the connection with respect because they see long-term value in who you are.",
            "This is the rare dynamic where your vulnerability will be met with protection rather than exploitation."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Nurture the momentum through mutual appreciation.",
          paragraphs: [
            "Stop analyzing their every word for hidden traps.",
            "Start asking: 'How can I meet their consistency with my own warmth and authentic presence?'",
            "Notice how easily conversations flow and how simple it is to resolve minor disagreements.",
            "When a partner (man/woman) wants to build a future with you, everything feels light, aligned, and progressive."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Reciprocate, appreciate, and allow the relationship to blossom.",
          paragraphs: [
            "Do not over-think. Match their genuine effort with your authentic enthusiasm."
          ],
          bullets: [
            "Day 1–3: Let them know their effort is seen and appreciated. A simple 'I loved the dinner spot you picked' goes a long way.",
            "Day 4–5: Plan a fun, collaborative activity where you can share stories and build shared memories.",
            "Day 6–7: Create a natural, low-pressure opening for the official conversation. Let them know you value exclusivity."
          ]
        }
      ],
      bottomLine: [
        "When someone (man/woman) wants you, you will never have to translate their behavior for your group chat.",
        "You have found a connection rooted in clarity, respect, and mutual desire.",
        "Hold onto your high standards, cherish the peace, and step forward into a relationship that honors you."
      ],
      socialQuote: "When someone wants to be in your life, you will never have to translate their behavior for your friends. Clarity is the ultimate green flag.",
      shareSummary: "High alignment with genuine emotional maturity. A rare, high-quality match moving toward official."
    },
    unlockedInsights: {
      whyNotAdvancing: "They are not delaying out of hesitation; they are creating the right romantic moment to ask you out officially.",
      seriousVsAmbiguous: "100% Serious Intent. High emotional stability and clear behavior logic.",
      exclusivitySignals: "You are the sole focus of their attention. Zero active roster energy.",
      actionGuide7Days: [
        "Reciprocate positive signals: Let them know their effort is seen and valued.",
        "Create low-pressure openings to have the final official DTR conversation.",
        "Continue living your own rich, magnetic life alongside them."
      ]
    }
  }
];
