import { Question, SetupQuestion } from '../types/quiz';
export const DIMENSION_LABELS = {"initiative":"Initiative","reliability":"Reliability","emotionalAvailability":"Emotional availability","realLifeIntegration":"Real-life integration","clarity":"Clarity & alignment","momentum":"Momentum"};
export const SETUP_QUESTIONS: SetupQuestion[] = [
  {
    "id": "duration",
    "title": "How long have you been seeing or talking to this person?",
    "options": [
      {
        "id": "under_2_weeks",
        "label": "Less than 2 weeks"
      },
      {
        "id": "2_8_weeks",
        "label": "2–8 weeks"
      },
      {
        "id": "2_6_months",
        "label": "2–6 months"
      },
      {
        "id": "over_6_months",
        "label": "More than 6 months"
      }
    ]
  },
  {
    "id": "outcome",
    "title": "What do you personally want from this connection?",
    "options": [
      {
        "id": "casual",
        "label": "Something casual"
      },
      {
        "id": "exclusive",
        "label": "Exclusive dating"
      },
      {
        "id": "committed",
        "label": "A committed relationship"
      },
      {
        "id": "unsure",
        "label": "I’m still figuring that out"
      }
    ]
  }
];
export const QUIZ_QUESTIONS: Question[] = [
  {
    "id": 1,
    "dimensionName": "Initiative",
    "title": "Over the last 30 days, who usually starts meaningful conversations?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q1_a",
        "label": "It feels balanced. We both initiate and bring real topics into the conversation.",
        "weights": {
          "initiative": 100
        }
      },
      {
        "id": "q1_b",
        "label": "They initiate less often, but when they do, it’s thoughtful and intentional.",
        "weights": {
          "initiative": 70
        }
      },
      {
        "id": "q1_c",
        "label": "I start most conversations. They respond warmly but rarely restart the connection themselves.",
        "weights": {
          "initiative": 30
        }
      },
      {
        "id": "q1_d",
        "label": "If I don’t initiate, contact usually stops.",
        "weights": {
          "initiative": 0
        }
      },
      {
        "id": "q1_e",
        "label": "It’s too early to tell.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  },
  {
    "id": 2,
    "dimensionName": "Planning and follow-through",
    "title": "How do plans between you usually happen?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q2_a",
        "label": "Plans are made at least a few days ahead, and they reliably follow through.",
        "weights": {
          "reliability": 100
        }
      },
      {
        "id": "q2_b",
        "label": "Plans are often last-minute, but they usually show up and are present.",
        "weights": {
          "reliability": 70
        }
      },
      {
        "id": "q2_c",
        "label": "I suggest most plans. They agree, but rarely create the next opportunity.",
        "weights": {
          "reliability": 40
        }
      },
      {
        "id": "q2_d",
        "label": "Contact is mostly late-night, convenience-based, or frequently cancelled.",
        "weights": {
          "reliability": 0
        }
      },
      {
        "id": "q2_e",
        "label": "We haven’t had enough opportunities to make plans yet.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  },
  {
    "id": 3,
    "dimensionName": "Communication reliability",
    "title": "Which pattern best describes your communication?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q3_a",
        "label": "Consistent and clear. If they’re unavailable, they usually communicate that.",
        "weights": {
          "reliability": 100
        }
      },
      {
        "id": "q3_b",
        "label": "Lower-frequency but predictable. I generally know what to expect.",
        "weights": {
          "reliability": 85
        }
      },
      {
        "id": "q3_c",
        "label": "Intense bursts followed by unexplained silence.",
        "weights": {
          "reliability": 15
        }
      },
      {
        "id": "q3_d",
        "label": "Mostly short replies, reactions, or low-effort check-ins.",
        "weights": {
          "reliability": 25
        }
      },
      {
        "id": "q3_e",
        "label": "Their current circumstances make the pattern hard to judge.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  },
  {
    "id": 4,
    "dimensionName": "Emotional availability",
    "title": "When you share something vulnerable or difficult, what usually happens?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q4_a",
        "label": "They listen, ask follow-up questions, and remember what mattered later.",
        "weights": {
          "emotionalAvailability": 100
        }
      },
      {
        "id": "q4_b",
        "label": "They care, but their response is brief or quickly becomes practical advice.",
        "weights": {
          "emotionalAvailability": 65
        }
      },
      {
        "id": "q4_c",
        "label": "They deflect, minimize it, or shift the focus back to themselves.",
        "weights": {
          "emotionalAvailability": 20
        }
      },
      {
        "id": "q4_d",
        "label": "They avoid vulnerable conversations and return only when things feel light.",
        "weights": {
          "emotionalAvailability": 0
        }
      },
      {
        "id": "q4_e",
        "label": "I haven’t shared enough vulnerable moments to know.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  },
  {
    "id": 5,
    "dimensionName": "Observable receipts",
    "title": "Which of these have actually happened in the last 30 days? Select all that apply.",
    "subtitle": "Select all that apply. Choose insufficient opportunity or none on its own.",
    "type": "multi",
    "options": [
      {
        "id": "q5_1",
        "label": "They remembered a small detail and brought it up later.",
        "weights": {
          "emotionalAvailability": 80
        }
      },
      {
        "id": "q5_2",
        "label": "They adjusted their schedule without being pressured.",
        "weights": {
          "initiative": 85
        }
      },
      {
        "id": "q5_3",
        "label": "They introduced me to someone important in their real life.",
        "weights": {
          "realLifeIntegration": 85
        }
      },
      {
        "id": "q5_4",
        "label": "They showed up with practical care when I needed help.",
        "weights": {
          "emotionalAvailability": 100
        }
      },
      {
        "id": "q5_5",
        "label": "They made a concrete future plan at least a few weeks ahead.",
        "weights": {
          "momentum": 90
        }
      },
      {
        "id": "q5_6",
        "label": "They acknowledged a mistake and tried to repair it.",
        "weights": {
          "reliability": 90
        }
      },
      {
        "id": "q5_7",
        "label": "We haven’t had enough opportunities for these yet.",
        "weights": {
          "isTooEarly": true
        }
      },
      {
        "id": "q5_8",
        "label": "None of these have happened.",
        "weights": {}
      }
    ]
  },
  {
    "id": 6,
    "dimensionName": "Real-life integration",
    "title": "How present are you in each other’s real lives?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q6_a",
        "label": "People close to us know, and we naturally appear in each other’s everyday life.",
        "weights": {
          "realLifeIntegration": 100
        }
      },
      {
        "id": "q6_b",
        "label": "A few people know, but most parts of our lives are still separate.",
        "weights": {
          "realLifeIntegration": 65
        }
      },
      {
        "id": "q6_c",
        "label": "The connection happens mainly in private, with little access to their normal routine.",
        "weights": {
          "realLifeIntegration": 25
        }
      },
      {
        "id": "q6_d",
        "label": "They actively conceal, deny, or contradict the connection around others.",
        "weights": {
          "realLifeIntegration": 0
        }
      },
      {
        "id": "q6_e",
        "label": "It’s too early—or we’re both naturally private.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  },
  {
    "id": 7,
    "dimensionName": "Exclusivity and boundaries",
    "title": "What has actually been agreed about exclusivity?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q7_a",
        "label": "We explicitly agreed to be exclusive, and behavior matches the agreement.",
        "weights": {
          "clarity": 100
        }
      },
      {
        "id": "q7_b",
        "label": "We discussed it, but our expectations or timelines are not fully aligned.",
        "weights": {
          "clarity": 55
        }
      },
      {
        "id": "q7_c",
        "label": "We haven’t discussed it. Exclusivity is mostly an assumption.",
        "weights": {
          "clarity": 20
        }
      },
      {
        "id": "q7_d",
        "label": "They say we’re exclusive, but observable behavior contradicts that.",
        "weights": {
          "clarity": 0
        }
      },
      {
        "id": "q7_e",
        "label": "We explicitly agreed to stay non-exclusive, and that works for both of us.",
        "weights": {
          "clarity": 100
        }
      }
    ]
  },
  {
    "id": 8,
    "dimensionName": "Momentum",
    "title": "Compared with 30 days ago, where is this connection going?",
    "subtitle": "Choose the pattern that happened most often.",
    "type": "single",
    "options": [
      {
        "id": "q8_a",
        "label": "Toward more clarity and reliable next steps.",
        "weights": {
          "momentum": 100
        }
      },
      {
        "id": "q8_b",
        "label": "Mostly steady, but without meaningful movement.",
        "weights": {
          "momentum": 50
        }
      },
      {
        "id": "q8_c",
        "label": "Repeating the same hot-and-cold cycle.",
        "weights": {
          "momentum": 15
        }
      },
      {
        "id": "q8_d",
        "label": "Gradually fading: less effort, fewer plans, weaker follow-through.",
        "weights": {
          "momentum": 0
        }
      },
      {
        "id": "q8_e",
        "label": "It’s too early to identify a trajectory.",
        "weights": {
          "isTooEarly": true
        }
      }
    ]
  }
];
