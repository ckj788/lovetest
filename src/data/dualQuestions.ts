import { DualQuestion, DualMode, DualResultData, DualComparisonItem } from '../types/dual';
export const TALKING_STAGE_QUESTIONS: DualQuestion[] = [
  {
    "id": 1,
    "category": "Current Definition",
    "title": "Which description feels closest to what this connection is today?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q1_a",
        "label": "Casual and intentionally low-pressure.",
        "shortLabel": "Casual and intentionally low-pressure."
      },
      {
        "id": "ts_q1_b",
        "label": "Intentionally exploring a relationship.",
        "shortLabel": "Intentionally exploring a relationship."
      },
      {
        "id": "ts_q1_c",
        "label": "Emotionally close, but still undefined.",
        "shortLabel": "Emotionally close, but still undefined."
      },
      {
        "id": "ts_q1_d",
        "label": "I’m genuinely unsure because we haven’t discussed it.",
        "shortLabel": "I’m genuinely unsure because we haven’t discussed it."
      }
    ]
  },
  {
    "id": 2,
    "category": "Desired Next Step",
    "title": "What would you most like to happen in the next 4–8 weeks?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q2_a",
        "label": "Keep it casual and open.",
        "shortLabel": "Keep it casual and open."
      },
      {
        "id": "ts_q2_b",
        "label": "Become exclusive without rushing a public label.",
        "shortLabel": "Become exclusive without rushing a public label."
      },
      {
        "id": "ts_q2_c",
        "label": "Define this as an official relationship.",
        "shortLabel": "Define this as an official relationship."
      },
      {
        "id": "ts_q2_d",
        "label": "Slow down and reassess whether this is right.",
        "shortLabel": "Slow down and reassess whether this is right."
      }
    ]
  },
  {
    "id": 3,
    "category": "Exclusivity Understanding",
    "title": "What do you believe the current exclusivity agreement is?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q3_a",
        "label": "Explicitly exclusive.",
        "shortLabel": "Explicitly exclusive."
      },
      {
        "id": "ts_q3_b",
        "label": "Probably exclusive, but never clearly discussed.",
        "shortLabel": "Probably exclusive, but never clearly discussed."
      },
      {
        "id": "ts_q3_c",
        "label": "Explicitly non-exclusive.",
        "shortLabel": "Explicitly non-exclusive."
      },
      {
        "id": "ts_q3_d",
        "label": "Unclear or possibly understood differently.",
        "shortLabel": "Unclear or possibly understood differently."
      }
    ]
  },
  {
    "id": 4,
    "category": "Effort Perception",
    "title": "How does the effort of keeping this connection moving feel to you?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q4_a",
        "label": "Balanced.",
        "shortLabel": "Balanced."
      },
      {
        "id": "ts_q4_b",
        "label": "I initiate more.",
        "shortLabel": "I initiate more."
      },
      {
        "id": "ts_q4_c",
        "label": "They initiate more.",
        "shortLabel": "They initiate more."
      },
      {
        "id": "ts_q4_d",
        "label": "Mostly spontaneous, with no stable pattern.",
        "shortLabel": "Mostly spontaneous, with no stable pattern."
      }
    ]
  },
  {
    "id": 5,
    "category": "Integration",
    "title": "How integrated does this connection feel in everyday life?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q5_a",
        "label": "Naturally part of friends, routines, and future plans.",
        "shortLabel": "Naturally part of friends, routines, and future plans."
      },
      {
        "id": "ts_q5_b",
        "label": "Some integration, but still mostly private.",
        "shortLabel": "Some integration, but still mostly private."
      },
      {
        "id": "ts_q5_c",
        "label": "Mostly one-on-one and separate from everyday life.",
        "shortLabel": "Mostly one-on-one and separate from everyday life."
      },
      {
        "id": "ts_q5_d",
        "label": "Too early—or we both intentionally prefer privacy.",
        "shortLabel": "Too early—or we both intentionally prefer privacy."
      }
    ]
  },
  {
    "id": 6,
    "category": "Hidden Friction",
    "title": "What is your biggest unspoken hesitation right now?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "ts_q6_a",
        "label": "I’m afraid I care more.",
        "shortLabel": "I’m afraid I care more."
      },
      {
        "id": "ts_q6_b",
        "label": "I’m worried about losing independence or moving too fast.",
        "shortLabel": "I’m worried about losing independence or moving too fast."
      },
      {
        "id": "ts_q6_c",
        "label": "I’m unsure whether our lifestyles or future plans fit.",
        "shortLabel": "I’m unsure whether our lifestyles or future plans fit."
      },
      {
        "id": "ts_q6_d",
        "label": "I need more consistency or trust before moving forward.",
        "shortLabel": "I need more consistency or trust before moving forward."
      },
      {
        "id": "ts_q6_e",
        "label": "I feel ready; I’m waiting for a safe opening.",
        "shortLabel": "I feel ready; I’m waiting for a safe opening."
      }
    ]
  }
];
export const COUPLES_QUESTIONS: DualQuestion[] = [
  {
    "id": 1,
    "category": "Support Language",
    "title": "When you’re stressed, what kind of support helps most?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q1_a",
        "label": "Quiet physical closeness",
        "shortLabel": "Quiet physical closeness"
      },
      {
        "id": "cp_q1_b",
        "label": "Listening and emotional validation",
        "shortLabel": "Listening and emotional validation"
      },
      {
        "id": "cp_q1_c",
        "label": "Practical help",
        "shortLabel": "Practical help"
      },
      {
        "id": "cp_q1_d",
        "label": "Time alone before reconnecting",
        "shortLabel": "Time alone before reconnecting"
      }
    ]
  },
  {
    "id": 2,
    "category": "Relationship Energy",
    "title": "How does the relationship feel lately?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q2_a",
        "label": "Connected and playful",
        "shortLabel": "Connected and playful"
      },
      {
        "id": "cp_q2_b",
        "label": "Loving but predictable",
        "shortLabel": "Loving but predictable"
      },
      {
        "id": "cp_q2_c",
        "label": "I’m craving more intentional romance",
        "shortLabel": "I’m craving more intentional romance"
      },
      {
        "id": "cp_q2_d",
        "label": "Temporarily quieter because of external stress",
        "shortLabel": "Temporarily quieter because of external stress"
      }
    ]
  },
  {
    "id": 3,
    "category": "Conflict Recovery",
    "title": "After a disagreement, what helps you reconnect?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q3_a",
        "label": "Talking immediately",
        "shortLabel": "Talking immediately"
      },
      {
        "id": "cp_q3_b",
        "label": "Taking a defined break, then returning",
        "shortLabel": "Taking a defined break, then returning"
      },
      {
        "id": "cp_q3_c",
        "label": "Receiving reassurance before discussing details",
        "shortLabel": "Receiving reassurance before discussing details"
      },
      {
        "id": "cp_q3_d",
        "label": "Naming the issue directly and agreeing on one next step",
        "shortLabel": "Naming the issue directly and agreeing on one next step"
      }
    ]
  },
  {
    "id": 4,
    "category": "Appreciation",
    "title": "What would help you feel more appreciated right now?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q4_a",
        "label": "More initiative and thoughtful planning",
        "shortLabel": "More initiative and thoughtful planning"
      },
      {
        "id": "cp_q4_b",
        "label": "More verbal appreciation",
        "shortLabel": "More verbal appreciation"
      },
      {
        "id": "cp_q4_c",
        "label": "More affection and physical closeness",
        "shortLabel": "More affection and physical closeness"
      },
      {
        "id": "cp_q4_d",
        "label": "More curiosity about my inner world",
        "shortLabel": "More curiosity about my inner world"
      }
    ]
  },
  {
    "id": 5,
    "category": "Togetherness",
    "title": "What balance of independence and couple time feels best?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q5_a",
        "label": "Current balance feels right",
        "shortLabel": "Current balance feels right"
      },
      {
        "id": "cp_q5_b",
        "label": "More personal space",
        "shortLabel": "More personal space"
      },
      {
        "id": "cp_q5_c",
        "label": "More focused one-on-one time",
        "shortLabel": "More focused one-on-one time"
      },
      {
        "id": "cp_q5_d",
        "label": "More shared experiences outside our routine",
        "shortLabel": "More shared experiences outside our routine"
      }
    ]
  },
  {
    "id": 6,
    "category": "Shared Priority",
    "title": "What should this relationship prioritize over the next 12 months?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "cp_q6_a",
        "label": "A major practical commitment",
        "shortLabel": "A major practical commitment"
      },
      {
        "id": "cp_q6_b",
        "label": "More fun, novelty, and romance",
        "shortLabel": "More fun, novelty, and romance"
      },
      {
        "id": "cp_q6_c",
        "label": "Better conflict and communication habits",
        "shortLabel": "Better conflict and communication habits"
      },
      {
        "id": "cp_q6_d",
        "label": "Supporting individual goals while staying connected",
        "shortLabel": "Supporting individual goals while staying connected"
      }
    ]
  }
];
export const FRIEND_QUESTIONS: DualQuestion[] = [
  {
    "id": 1,
    "category": "Free Saturday",
    "title": "You both suddenly get a completely free Saturday. What sounds best?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q1_a",
        "label": "Stay in, order food, and talk for hours",
        "shortLabel": "Stay in, order food, and talk for hours"
      },
      {
        "id": "fr_q1_b",
        "label": "Try something new and slightly chaotic",
        "shortLabel": "Try something new and slightly chaotic"
      },
      {
        "id": "fr_q1_c",
        "label": "Go out with the full group",
        "shortLabel": "Go out with the full group"
      },
      {
        "id": "fr_q1_d",
        "label": "Make a detailed plan for a proper day trip",
        "shortLabel": "Make a detailed plan for a proper day trip"
      }
    ]
  },
  {
    "id": 2,
    "category": "Texting Rhythm",
    "title": "What does a healthy friendship texting rhythm look like to you?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q2_a",
        "label": "Daily updates and constant memes",
        "shortLabel": "Daily updates and constant memes"
      },
      {
        "id": "fr_q2_b",
        "label": "A few meaningful check-ins each week",
        "shortLabel": "A few meaningful check-ins each week"
      },
      {
        "id": "fr_q2_c",
        "label": "Disappear for days, return like nothing happened",
        "shortLabel": "Disappear for days, return like nothing happened"
      },
      {
        "id": "fr_q2_d",
        "label": "Mostly talk when making plans",
        "shortLabel": "Mostly talk when making plans"
      }
    ]
  },
  {
    "id": 3,
    "category": "Support",
    "title": "When you’re having a terrible day, what do you want first?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q3_a",
        "label": "Let me vent—don’t fix it yet",
        "shortLabel": "Let me vent—don’t fix it yet"
      },
      {
        "id": "fr_q3_b",
        "label": "Give me practical advice",
        "shortLabel": "Give me practical advice"
      },
      {
        "id": "fr_q3_c",
        "label": "Distract me with humor or an activity",
        "shortLabel": "Distract me with humor or an activity"
      },
      {
        "id": "fr_q3_d",
        "label": "Give me space, then check back later",
        "shortLabel": "Give me space, then check back later"
      }
    ]
  },
  {
    "id": 4,
    "category": "Last-Minute Plan",
    "title": "Your friend sends “be ready in 20 minutes.” What’s your honest reaction?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q4_a",
        "label": "Already putting my shoes on",
        "shortLabel": "Already putting my shoes on"
      },
      {
        "id": "fr_q4_b",
        "label": "Interested, but I need details",
        "shortLabel": "Interested, but I need details"
      },
      {
        "id": "fr_q4_c",
        "label": "I need at least a few hours’ notice",
        "shortLabel": "I need at least a few hours’ notice"
      },
      {
        "id": "fr_q4_d",
        "label": "Absolutely not—schedule me properly",
        "shortLabel": "Absolutely not—schedule me properly"
      }
    ]
  },
  {
    "id": 5,
    "category": "Conflict Repair",
    "title": "If something feels off between you, what should happen?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q5_a",
        "label": "Talk immediately",
        "shortLabel": "Talk immediately"
      },
      {
        "id": "fr_q5_b",
        "label": "Cool down, then talk later that day",
        "shortLabel": "Cool down, then talk later that day"
      },
      {
        "id": "fr_q5_c",
        "label": "Send a message first because face-to-face feels intense",
        "shortLabel": "Send a message first because face-to-face feels intense"
      },
      {
        "id": "fr_q5_d",
        "label": "Use humor to reopen the connection, then discuss it",
        "shortLabel": "Use humor to reopen the connection, then discuss it"
      }
    ]
  },
  {
    "id": 6,
    "category": "Friendship Closeness",
    "title": "What makes a friendship feel truly close to you?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q6_a",
        "label": "Knowing I can tell them anything",
        "shortLabel": "Knowing I can tell them anything"
      },
      {
        "id": "fr_q6_b",
        "label": "Showing up when life gets hard",
        "shortLabel": "Showing up when life gets hard"
      },
      {
        "id": "fr_q6_c",
        "label": "Having ridiculous shared experiences",
        "shortLabel": "Having ridiculous shared experiences"
      },
      {
        "id": "fr_q6_d",
        "label": "Feeling accepted even after long periods apart",
        "shortLabel": "Feeling accepted even after long periods apart"
      }
    ]
  },
  {
    "id": 7,
    "category": "Friendship Future",
    "title": "Which future sounds most like your friendship?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q7_a",
        "label": "Still sending each other nonsense at age 80",
        "shortLabel": "Still sending each other nonsense at age 80"
      },
      {
        "id": "fr_q7_b",
        "label": "Taking a major trip together",
        "shortLabel": "Taking a major trip together"
      },
      {
        "id": "fr_q7_c",
        "label": "Being part of each other’s chosen family",
        "shortLabel": "Being part of each other’s chosen family"
      },
      {
        "id": "fr_q7_d",
        "label": "Living separate lives but always finding our way back",
        "shortLabel": "Living separate lives but always finding our way back"
      }
    ]
  },
  {
    "id": 8,
    "category": "Friendship Role",
    "title": "What role do you usually play in the friendship?",
    "subtitle": "Answer independently. Both people must finish before answers can be compared.",
    "options": [
      {
        "id": "fr_q8_a",
        "label": "The planner",
        "shortLabel": "The planner"
      },
      {
        "id": "fr_q8_b",
        "label": "The emotional support department",
        "shortLabel": "The emotional support department"
      },
      {
        "id": "fr_q8_c",
        "label": "The chaos generator",
        "shortLabel": "The chaos generator"
      },
      {
        "id": "fr_q8_d",
        "label": "The responsible emergency contact",
        "shortLabel": "The responsible emergency contact"
      }
    ]
  }
];

// Explicit symmetric matrices compare preferences, rather than treating every difference as conflict.
export const TALKING_MATRICES: number[][][] = [
 [[3,1,2,1],[1,3,2,1],[2,2,3,1],[1,1,1,2]],
 [[3,1,0,2],[1,3,2,1],[0,2,3,1],[2,1,1,3]],
 [[3,1,0,1],[1,2,1,1],[0,1,3,1],[1,1,1,2]],
 [[3,1,1,1],[1,0,3,1],[1,3,0,1],[1,1,1,2]],
 [[3,2,1,2],[2,3,2,2],[1,2,3,2],[2,2,2,2]],
 [[2,1,1,2,2],[1,2,2,2,1],[1,2,2,2,2],[2,2,2,2,2],[2,1,2,2,3]]
];
export const COUPLE_MATRICES: number[][][] = [
 [[3,2,2,1],[2,3,2,1],[2,2,3,2],[1,1,2,3]],
 [[3,2,2,2],[2,3,2,2],[2,2,3,2],[2,2,2,3]],
 [[3,1,2,2],[1,3,2,2],[2,2,3,2],[2,2,2,3]],
 [[3,2,2,2],[2,3,2,2],[2,2,3,2],[2,2,2,3]],
 [[3,2,2,2],[2,3,1,2],[2,1,3,2],[2,2,2,3]],
 [[3,2,2,2],[2,3,2,2],[2,2,3,2],[2,2,2,3]]
];
export function dualQuestionScore(mode:DualMode, question:number, a:number, b:number):0|1|2|3 {
 return ((mode==='talking_stage'?TALKING_MATRICES:COUPLE_MATRICES)[question-1]?.[a]?.[b] ?? 1) as 0|1|2|3;
}
export function calculateDualResult(mode:DualMode,p1Answers:Record<number,string>,p2Answers:Record<number,string>):DualResultData {
 const questions=mode==='talking_stage'?TALKING_STAGE_QUESTIONS:COUPLES_QUESTIONS;
 const comparisonMatrix: DualComparisonItem[]=questions.map(q=>{
  const a=q.options.findIndex(o=>o.id===p1Answers[q.id]),b=q.options.findIndex(o=>o.id===p2Answers[q.id]);
  const score=dualQuestionScore(mode,q.id,a,b);
  const categoryBucket=score===3?'shared_agreement':score===2?'complementary_difference':score===1?'needs_conversation':'hidden_gap';
  const insightText=mode==='talking_stage'&&q.id===4&&score===3&&a!==b?'Your perspectives describe the same person taking more initiative. That is agreement about the pattern, even if the workload needs discussion.':score===3?'You described an aligned preference or a shared understanding. Check that it still works for both of you.':score===2?'These answers can coexist. Ask how each preference could be supported in practice.':score===1?'You may need a clearer shared agreement here. Neither preference is automatically wrong.':'These answers describe a substantial expectation gap. Talk about what each of you actually wants before assuming agreement.';
  return {questionId:q.id,questionTitle:q.title,category:q.category,p1AnswerId:p1Answers[q.id],p1Label:q.options[a]?.label||'Not answered',p2AnswerId:p2Answers[q.id],p2Label:q.options[b]?.label||'Not answered',score,alignmentLevel:score===3?'exact':score===2?'complementary':score===1?'discussion_needed':'mismatch',categoryBucket,insightText};
 });
 const by=(bucket:string)=>comparisonMatrix.filter(c=>c.categoryBucket===bucket).map(c=>c.category);
 const sharedAgreements=by('shared_agreement'),complementaryDifferences=by('complementary_difference'),needsConversation=by('needs_conversation'),hiddenExpectationGaps=by('hidden_gap');
 return {mode,synergyScore:Math.round(comparisonMatrix.reduce((sum,c)=>sum+c.score,0)/18*100),synergyTier:{name:'Two perspectives, one conversation',badge:'A snapshot',tagline:'Alignment is a starting point, not a prediction.',description:'Compare the patterns and make room for each person’s preferences.'},isPaid:false,p1Answers,p2Answers,sharedAgreements,complementaryDifferences,needsConversation,hiddenExpectationGaps,comparisonMatrix,conversationCards:comparisonMatrix.filter(c=>c.score<3).slice(0,3).map(c=>({tag:c.category,title:'Make room for both perspectives',prompt:'When you chose your answer about '+c.category.toLowerCase()+', what were you hoping I would understand? What is one thing we could try that works for both of us?',whyItWorks:'It asks for context and a practical step without deciding who is right.'})),freeHighlights:{synergyScore:0,exactMatches:sharedAgreements.length,complementaryCount:complementaryDifferences.length,discussionCount:needsConversation.length+hiddenExpectationGaps.length,topSharedStrength:sharedAgreements[0]||'A chance to learn something new',topFrictionAlert:hiddenExpectationGaps[0]||needsConversation[0]||'Keep comparing expectations'}};
}
export function calculateFriendResult(p1:Record<number,string>,g1:Record<number,string>,p2:Record<number,string>,g2:Record<number,string>){
 const agreement=FRIEND_QUESTIONS.filter(q=>p1[q.id]===p2[q.id]).length;
 const correct1=FRIEND_QUESTIONS.filter(q=>g1[q.id]===p2[q.id]).length;
 const correct2=FRIEND_QUESTIONS.filter(q=>g2[q.id]===p1[q.id]).length;
 const known=correct1+correct2;
 const lowFrequency=['fr_q2_c','fr_q2_d'].includes(p1[2])&&['fr_q2_c','fr_q2_d'].includes(p2[2]);
 const name=lowFrequency&&known>=8?'Low-Maintenance Legends':agreement>=6&&known>=12?'Same Braincell':agreement<=3&&known>=10?'Chaos Coordinators':agreement<=3&&p1[4]!==p2[4]&&known>=6?'Golden Retriever × Black Cat':known<=5?'New Lore Loading':'Plot-Twist Besties';
 return {name,agreement,correct1,correct2,alignment:Math.round(agreement/8*100),mindReader:Math.round(known/16*100),shared:FRIEND_QUESTIONS.find(q=>p1[q.id]===p2[q.id]),difference:FRIEND_QUESTIONS.find(q=>p1[q.id]!==p2[q.id])};
}
