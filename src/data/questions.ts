import { Question, Archetype } from '../types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "When you stop texting first, what does he do?",
    subtitle: "Dimension: Natural Attraction & Subconscious Motivation",
    type: 'single',
    options: [
      {
        id: 'q1_a',
        label: "**Double-texts within hours** with a real topic or funny meme. He can't help himself.",
        weights: { attraction: 25, investment: 20, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q1_b',
        label: "**Reaches out in 1–2 days** asking 'wyd' or sharing random life updates.",
        weights: { attraction: 20, investment: 15, commitment: 15, exclusivity: 10 }
      },
      {
        id: 'q1_c',
        label: "**Likes your IG story**, but leaves your actual DMs on read.",
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
    title: "How do plans with him actually get made?",
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
        label: "**You initiate 90% of dates.** He agrees, but he's just along for the ride.",
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
    title: "What is his day-to-day texting energy?",
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
    title: "When you vent about a rough day, how does he react?",
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
        label: "**Gives 2 sentences of sympathy**, then immediately turns the topic back to himself.",
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
    title: "【BEHAVIOR CHECKLIST】Which of these has he ACTUALLY done?",
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
        label: "**Shifted his personal schedule** just to see you or help you out",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_3',
        label: "**Introduced / soft-launched you** to his close friends, roommates, or circle",
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
    title: "Where do you exist in his public/social ecosystem?",
    subtitle: "Dimension: Commitment Intent & Public Ownership",
    type: 'single',
    options: [
      {
        id: 'q6_a',
        label: "**Hard launch energy.** Everyone in his close circle knows who you are.",
        weights: { attraction: 25, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q6_b',
        label: "**Soft launch status.** His best friends know about you, but not his main feed.",
        weights: { attraction: 18, investment: 12, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q6_c',
        label: "**Top secret.** You only exist behind closed doors or private DMs.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q6_d',
        label: "**Gatekeeper mode.** He actively avoids personal topics and hides his social life.",
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
        label: "**Strict loyal boundaries.** Made it clear he is only focused on you.",
        weights: { attraction: 20, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q7_b',
        label: "**Feels exclusive**, but you haven't officially had 'The Talk' (DTR).",
        weights: { attraction: 15, investment: 12, commitment: 12, exclusivity: 18 }
      },
      {
        id: 'q7_c',
        label: "**Flirty with others on IG/Snapchat**, giving you subtle trust issues.",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 6 }
      },
      {
        id: 'q7_d',
        label: "**Active roster energy.** Pretty sure you're one of 3 options in rotation.",
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
    subtitle: 'He probably likes you more than he knows how to show — but liking you and defining the relationship are moving at different speeds.',
    tag: 'Steady Growth · Balanced Dynamics',
    emoji: '🐢',
    color: '#504E76',
    gradient: 'from-[#504E76] to-[#C4C3E3]',
    description: 'He does not love-bomb you or text 24/7, but his actions are steady. His feelings are developing quietly through consistency rather than dramatic chaos.',
    gapAnalysis: 'Balanced Dynamic: Natural Attraction and Commitment Intent are climbing steadily in parallel with zero destabilizing drops.',
    report: {
      hook: "He probably likes you more than he knows how to show — but liking you and defining the relationship are moving at different speeds.",
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
            "He does not seem like someone who is trying to overwhelm you.",
            "There is no strong pattern of love-bombing, exaggerated promises, or intense attention followed by disappearance.",
            "Instead, his interest appears through smaller, quieter behaviors: showing up, remembering things, maintaining contact, making time, and allowing closeness to develop without constantly forcing escalation.",
            "Someone can text you all day and still invest very little. Someone else can communicate less frequently but reliably appear when it matters. Your dynamic leans closer to the second pattern."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "Intimacy without structure breeds anxiety.",
          paragraphs: [
            "Because the relationship is giving you enough intimacy to feel important, but not quite enough structure to feel secure.",
            "You are not asking: 'Does he care about me at all?'",
            "You are asking: 'If he cares this much, what exactly are we becoming?'",
            "His behavior currently translates to: Interest → YES. Emotional investment → YES. Willingness to keep building → LIKELY. Clear relational decision → STILL DEVELOPING."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "A moderate gap represents caution, not deceit.",
          paragraphs: [
            "Your Natural Attraction score sits above Commitment Intent, but the gap is balanced compared to toxic avoidant dynamics.",
            "His feelings are developing faster than his willingness to define them.",
            "That happens when someone takes longer to translate emotion into commitment, or when they are protective of their peace.",
            "However: 'He is just slow' must never become an excuse you use forever. Slow movement is healthy only while there is still movement."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Look for commitment signals over chemistry proofs.",
          paragraphs: [
            "Stop asking: 'Does he like me?' (Your score already proves he does).",
            "Start asking: 'Is his behavior gradually becoming more intentional?'",
            "Watch whether he creates real plans instead of vague suggestions, makes room for you in his life, and takes small risks to make his intentions clearer.",
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
            "Day 4–5: Keep being warm and responsive, but let him take the initiative to set up your next in-person plan.",
            "Day 6–7: Notice if his investment naturally increases without you prompting it. If intimacy deepens while structure stays frozen, the meaning changes."
          ]
        }
      ],
      bottomLine: [
        "This does not look like a man who feels nothing. It also does not look like a man who has fully decided what he is building.",
        "You do not need more evidence of chemistry. You need evidence of direction.",
        "Because eventually, the question is no longer: 'Does he feel something?' It becomes: 'Is what he feels strong enough to change what he does?'"
      ],
      socialQuote: "You do not need more evidence of chemistry. You need evidence of direction.",
      shareSummary: "Steady connection with real emotional pull, currently waiting for behavioral decisiveness."
    },
    unlockedInsights: {
      whyNotAdvancing: "He is cautious and wants to be 100% sure before taking big steps. This is deliberate maturity, not cold hesitation.",
      seriousVsAmbiguous: "Genuine intent paired with slow, measured execution. High reliability once committed.",
      exclusivitySignals: "Focused and loyal in his actions. Zero active roster energy detected.",
      actionGuide7Days: [
        "Be patient: Do not mistake a measured pace for a lack of interest.",
        "Give him room to initiate: Let him lead the scheduling of your next date.",
        "Maintain your own magnetic life: Keep your personal goals, hobbies, and friends vibrant."
      ]
    }
  },

  // 2. THE CHEMISTRY TRAP
  {
    id: 'chemistry_trap',
    name: 'The Chemistry Trap',
    subtitle: 'He loves the electric high of you — but liking you and choosing you are two entirely different decisions in his head.',
    tag: 'Delulu Zone · High Chemistry / Low DTR',
    emoji: '🔥',
    color: '#F1642E',
    gradient: 'from-[#F1642E] to-[#FCDD9D]',
    description: 'You share insane chemistry and 2 AM banter, but the second the dynamic requires real effort or a DTR, he pulls back into comfortable ambiguity.',
    gapAnalysis: 'Severe Delulu Gap: High Natural Attraction sits on top of lagging Commitment Intent. He enjoys girlfriend privileges without boyfriend accountability.',
    report: {
      hook: "He is addicted to the high of your chemistry — but you are giving wifey treatment on a perpetual free trial.",
      summaryHighlights: [
        "Intense initial spark paired with zero structural momentum.",
        "High dopamine banter that evaporates when real effort is required.",
        "Core conflict: He wants your attention, but he refuses to give up single perks."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Chemistry without commitment is high-stakes entertainment.",
          paragraphs: [
            "When you are together, the energy is undeniable. He stares into your eyes, sends flirty memes, and talks as if you are already his.",
            "Yet, when Monday rolls around, the plans are vague, the texts turn sporadic, and the conversation stays strictly surface-level.",
            "He is not confused about how attractive you are. He is simply comfortable receiving maximum emotional validation with zero obligation.",
            "You are confusing intense chemistry with deep compatibility. Chemistry is cheap; intentional effort is expensive."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "The dopamine highs are keeping you hooked on potential.",
          paragraphs: [
            "Because the highs feel so electric, you convince yourself that his lack of commitment is just 'bad timing' or 'him being scared of getting hurt.'",
            "You find yourself re-reading past texts and analyzing his playlist choices to find hidden proof that he cares.",
            "Here is the brutal truth: If a man treats you like an option, no amount of mental gymnastics will turn him into a partner.",
            "He likes you enough to keep you on his roster, but not enough to lock you down."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "A massive Attraction–Commitment disconnect.",
          paragraphs: [
            "Your results show a huge gap between his Natural Attraction and his actual Commitment Intent score.",
            "He enjoys the romantic perks—the intimacy, the late-night venting, the ego boost—while keeping one foot firmly outside the door.",
            "As long as you accept low-effort breadcrumbs, he has zero reason to upgrade to a committed relationship.",
            "Why would he buy the subscription when you give away the full access for free?"
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Stop tracking his flirts. Start tracking his sacrifices.",
          paragraphs: [
            "Stop asking: 'Does he feel the spark when we kiss?' (Of course he does).",
            "Start asking: 'Is he willing to change his schedule, publicly claim me, and define boundaries to keep me in his life?'",
            "Watch whether he plans dates 3 days in advance or only reaches out when he is bored at 11 PM.",
            "A man who is genuinely afraid of losing you will never leave the door wide open for someone else to take your hand."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Cut the free trial immediately.",
          paragraphs: [
            "Do not start an emotional fight. Simply reclaim your high-value boundaries with cool composure."
          ],
          bullets: [
            "Day 1–2: Stop initiating all texts and calls. Zero outreach.",
            "Day 3–4: If he texts dry 'wyd' or sends a meme, respond warmly after a few hours, but do not prolong the small talk.",
            "Day 5–7: The 72-Hour Test. If he wants to see you, require a concrete day, time, and public plan. Say no to last-minute couch hangs."
          ]
        }
      ],
      bottomLine: [
        "Stop building a home in someone else's waiting room.",
        "You do not need to prove your worth to someone who only values you when it is convenient.",
        "Chemistry gets people into a talking stage; character and commitment keep them there. Never settle for the first half without the second."
      ],
      socialQuote: "Chemistry without commitment is just high-stakes entertainment. Stop giving wifey privileges on a free trial.",
      shareSummary: "High chemical spark stuck in the Delulu Zone. Time to enforce boundaries or walk."
    },
    unlockedInsights: {
      whyNotAdvancing: "He gets 100% of your intimacy and emotional focus with 0% relational responsibility. He has no incentive to change.",
      seriousVsAmbiguous: "Classic 'Right Spark, Zero Execution'. He likes having you around, but avoids the work of a partnership.",
      exclusivitySignals: "Keeps his public status ambiguous while monopolizing your private time.",
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
    subtitle: 'Couples perks, zero commitment. You are trapped in a comfortable gray zone that serves his convenience, not your future.',
    tag: 'Undefined Gray Zone · High Comfort / Low DTR',
    emoji: '🌫️',
    color: '#C4C3E3',
    gradient: 'from-[#C4C3E3] to-[#504E76]',
    description: 'You do everything real couples do, but you cannot introduce him as your boyfriend. You are stuck in a cozy purgatory where ambiguity reigns.',
    gapAnalysis: 'Commitment Deficit: The comfort level is 90%, but the structural momentum is 30%. He avoids DTR because the current setup costs him nothing.',
    report: {
      hook: "You do everything couples do, but you cannot call him yours. He is comfortable in the gray zone because ambiguity serves him, not you.",
      summaryHighlights: [
        "High comfort and routine intimacy without any public accountability.",
        "The talking stage has expired into a permanent holding pattern.",
        "Core conflict: He wants girlfriend benefits without accepting boyfriend boundaries."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Comfort is the ultimate trap of the modern talking stage.",
          paragraphs: [
            "You have inside jokes, favorite restaurants together, and regular sleepovers. To any outsider, you look like a devoted couple.",
            "Yet, whenever the topic of the future, exclusivity, or defining the relationship comes up, the room turns quiet or he gives the classic 'Let's just see where things go.'",
            "He is not looking for a destination; he is enjoying an open-ended layover.",
            "The dangerous part about a situationship is that it feels cozy enough to keep you from leaving, but ambiguous enough to keep you perpetually anxious."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "You are waiting for time to do the work that boundaries must do.",
          paragraphs: [
            "You tell yourself: 'If we just spend another month together, he will realize he cannot live without me.'",
            "That is not how male psychology works in dating. A man decides very early on whether a woman is someone he will fight to lock down or someone he will comfortably keep in rotation.",
            "Waiting patiently inside an undefined dynamic does not create respect; it signals that your standards are negotiable.",
            "He is not confused. He is getting everything he wants on his terms."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "Lagging commitment masked by daily routine.",
          paragraphs: [
            "Your scores reveal high habitual investment paired with near-zero forward momentum.",
            "He is using your emotional availability to meet his need for companionship while preserving his freedom to walk away guilt-free at any second.",
            "The phrase 'I'm not ready for a relationship right now' always has an unsaid ending: '...with you.'",
            "Recognizing this is not a defeat; it is the moment you reclaim your power."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Look for boundary respect, not just routine company.",
          paragraphs: [
            "Stop asking: 'Did we have a sweet time together last night?'",
            "Start asking: 'Is this dynamic moving toward exclusivity, or is it spinning its wheels in the same gray loop?'",
            "Notice how he reacts when you mention your own standards or when you spend your weekends with other friends.",
            "A man who truly treasures you will secure your place in his life before someone else does."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Shift from passive waiting to active boundary setting.",
          paragraphs: [
            "You cannot negotiate commitment by staying silent. You must be willing to risk losing the situationship to gain a real relationship."
          ],
          bullets: [
            "Day 1–3: Withdraw girlfriend privileges. Stop cooking, organizing his life, or making yourself available at his beck and call.",
            "Day 4–5: Fill your calendar with your own ambitions, social events, and passions.",
            "Day 6–7: Have the calm, unapologetic DTR talk. State what you are building toward, and if he balks, walk away with head held high."
          ]
        }
      ],
      bottomLine: [
        "A man who wants you does not leave room for doubt.",
        "If you have to play detective to figure out where you stand, you are standing in the wrong place.",
        "You can never win a situationship by waiting it out. Choose clarity over comfortable confusion every single time."
      ],
      socialQuote: "You cannot negotiate commitment with someone who benefits from your lack of boundaries. Choose clarity over confusion.",
      shareSummary: "Comfortable gray zone with zero structural progress. Time for a definitive DTR or graceful exit."
    },
    unlockedInsights: {
      whyNotAdvancing: "He has achieved a perfect equilibrium: girlfriend intimacy with bachelor freedom. He has no urgency to disrupt this.",
      seriousVsAmbiguous: "Enjoys present companionship while explicitly avoiding future accountability.",
      exclusivitySignals: "Practically exclusive out of routine, but legally single whenever convenient.",
      actionGuide7Days: [
        "Immediately pull back on 24/7 availability and emotional caretaker duties.",
        "Initiate a direct, non-confrontational conversation regarding your relationship goals.",
        "Prepare to walk away if he offers another round of vague promises."
      ]
    }
  },

  // 4. THE BREADCRUMBER
  {
    id: 'breadcrumber',
    name: 'The Breadcrumber',
    subtitle: 'He throws you micro-doses of attention to keep you from walking away, but never enough to actually build something real.',
    tag: 'Breadcrumb Loop · Severe Investment Deficit',
    emoji: '🪵',
    color: '#FCDD9D',
    gradient: 'from-[#FCDD9D] to-[#F1642E]',
    description: 'Whenever you start moving on, he pops up with an IG story reply or a random fire emoji. As soon as you warm up, he disappears again.',
    gapAnalysis: 'Severe Investment Deficit: He pays in zero-cost digital crumbs while consuming your genuine emotional energy.',
    report: {
      hook: "He does not miss you; he misses the validation of knowing you are still waiting. Breadcrumbs will never make a meal.",
      summaryHighlights: [
        "Zero-effort digital pings (story likes, fire emojis, random 'wyd').",
        "Disappears the moment you ask for concrete plans or real presence.",
        "Core conflict: Keeping you on his bench as an emergency ego boost."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "You are dealing with minimum effort for maximum ego reward.",
          paragraphs: [
            "He likes your Instagram story within 3 minutes of posting, but leaves your actual text unanswered for two days.",
            "He pops into your notifications just often enough to make sure he is still on your mind, then vanishes before any real conversation can take place.",
            "This is not shyness. This is tactical ego hoarding.",
            "He does not want the responsibility of being with you, but he cannot stand the thought of you moving on to someone else."
          ]
        },
        {
          tag: "02 // WHY YOU ARE STILL UNSURE",
          title: "Intermittent reinforcement is the most addictive psychological trap.",
          paragraphs: [
            "Psychology proves that unpredictable rewards create the strongest chemical obsession. When someone is hot and cold, your brain craves the warm moments like a jackpot.",
            "Every time he drops a tiny crumb of attention, you think: 'See? He really does care!'",
            "Look at the scoreboard: How many real dates has he planned this month? How much actual time has he given you?",
            "Digital crumbs are not love. They are low-cost placeholders."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "Paying in pennies while demanding gold.",
          paragraphs: [
            "Your score reveals an alarming Investment Deficit. His Time & Effort score is at the floor compared to your emotional output.",
            "He is treating you like a backup tab in his browser—one he never closes, but never actually focuses on.",
            "You are investing deep emotional currency into someone who spends 3 seconds of thumb movement on you.",
            "The math will never work in your favor until you stop over-paying."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Ignore words and emojis. Measure physical presence.",
          paragraphs: [
            "Stop asking: 'Why did he send that flame emoji on my selfie?'",
            "Start asking: 'Does this interaction come with a date, time, and physical presence?'",
            "If an interaction costs him zero effort, it holds zero value.",
            "A high-value woman does not interpret breadcrumbs as an invitation to chase."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Starve the ego trap. Go completely silent.",
          paragraphs: [
            "The only way to break a breadcrumb loop is to stop providing the ego fuel he depends on."
          ],
          bullets: [
            "Day 1–2: Mute his stories and hide your own stories from his view. Stop checking who viewed your profile.",
            "Day 3–4: When he sends a low-effort DM or emoji, leave it on read or react with a simple like. Do not open a conversation.",
            "Day 5–7: Reinvest your precious attention into your real-world goals, friends, and men who know how to ask you out properly."
          ]
        }
      ],
      bottomLine: [
        "A man who loves you feeds your soul, not your anxiety.",
        "Take your name off his roster and watch how quickly the silence becomes your peace.",
        "You deserve a feast of consistency, devotion, and real effort. Stop settling for crumbs."
      ],
      socialQuote: "He does not miss you; he misses the validation of knowing you are still waiting. Breadcrumbs will never make a meal.",
      shareSummary: "Low-effort ego hoarding with zero genuine investment. Mute the noise and reclaim your peace."
    },
    unlockedInsights: {
      whyNotAdvancing: "He hoards your attention for validation. He has no desire to commit, but wants to ensure nobody else has you.",
      seriousVsAmbiguous: "Boredom-driven ego check. Zero relational intent.",
      exclusivitySignals: "You are one of multiple active tabs open in his rotation.",
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
    subtitle: 'No games, no confusion. His actions match his words because a man with real intentions never makes you guess.',
    tag: 'Main Character Match · Elite Alignment',
    emoji: '💖',
    color: '#A3B565',
    gradient: 'from-[#A3B565] to-[#504E76]',
    description: 'His actions match his words. He shows up consistently, integrates you into his world, and respects your boundaries without mental games.',
    gapAnalysis: 'Elite Alignment: Natural Attraction and Commitment Intent are in high harmony. Minimal mind games detected in his behavioral profile.',
    report: {
      hook: "No games, no confusion. His actions match his words because a man with real intentions never makes you guess.",
      summaryHighlights: [
        "High score alignment across Natural Attraction, Time & Effort, Commitment Intent, and Exclusive Focus.",
        "Reliable execution: Promises made are promises kept.",
        "Core reality: He is genuinely preparing the runway to make things official."
      ],
      sections: [
        {
          tag: "01 // WHAT IS ACTUALLY HAPPENING",
          title: "Clarity is the ultimate romantic green flag.",
          paragraphs: [
            "He does not play the 3-day texting game. He reaches out because he genuinely wants to hear about your day.",
            "He plans real dates with advance notice, remembers the little things you like, and introduces you to his inner circle without hesitation.",
            "There is no emotional whiplash here. His behavior today matches his behavior from two weeks ago.",
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
            "He is giving you a safe container to be yourself. Learn to receive it with open hands."
          ]
        },
        {
          tag: "03 // THE GAP BREAKDOWN",
          title: "High harmony across all core dimensions.",
          paragraphs: [
            "Your scores show high, synchronized alignment between his Natural Attraction and his Commitment Intent levels.",
            "He is not delaying because he is keeping other options open; he is simply taking the time to build a solid foundation.",
            "He treats the connection with respect because he sees long-term value in who you are.",
            "This is the rare dynamic where your vulnerability will be met with protection rather than exploitation."
          ]
        },
        {
          tag: "04 // THE QUESTION TO WATCH",
          title: "Nurture the momentum through mutual appreciation.",
          paragraphs: [
            "Stop analyzing his every word for hidden traps.",
            "Start asking: 'How can I meet his consistency with my own warmth and authentic presence?'",
            "Notice how easily conversations flow and how simple it is to resolve minor disagreements.",
            "When a man wants to build a future with you, everything feels light, aligned, and progressive."
          ]
        },
        {
          tag: "05 // 7-DAY ACTION BLUEPRINT",
          title: "Reciprocate, appreciate, and allow the relationship to blossom.",
          paragraphs: [
            "Do not over-think. Match his genuine effort with your authentic enthusiasm."
          ],
          bullets: [
            "Day 1–3: Let him know his effort is seen and appreciated. A simple 'I loved the dinner spot you picked' goes a long way.",
            "Day 4–5: Plan a fun, collaborative activity where you can share stories and build shared memories.",
            "Day 6–7: Create a natural, low-pressure opening for the official conversation. Let him know you value exclusivity."
          ]
        }
      ],
      bottomLine: [
        "When a man wants you, you will never have to translate his behavior for your group chat.",
        "You have found a connection rooted in clarity, respect, and mutual desire.",
        "Hold onto your high standards, cherish the peace, and step forward into a relationship that honors you."
      ],
      socialQuote: "When a man wants to be in your life, you will never have to translate his behavior for your friends. Clarity is the ultimate green flag.",
      shareSummary: "High alignment with genuine emotional maturity. A rare, high-quality match moving toward official."
    },
    unlockedInsights: {
      whyNotAdvancing: "He is not delaying out of hesitation; he is creating the right romantic moment to ask you out officially.",
      seriousVsAmbiguous: "100% Serious Intent. High emotional stability and clear behavior logic.",
      exclusivitySignals: "You are the sole focus of his attention. Zero active roster energy.",
      actionGuide7Days: [
        "Reciprocate positive signals: Let him know his effort is seen and valued.",
        "Create low-pressure openings to have the final official DTR conversation.",
        "Continue living your own rich, magnetic life alongside him."
      ]
    }
  }
];
