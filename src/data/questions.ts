import { Question, Archetype } from '../types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "当你不主动发起聊天时，他通常会做何反应？",
    subtitle: "检测维度：好感度 (Attraction) 与 行为主动性",
    type: 'single',
    options: [
      {
        id: 'q1_a',
        label: "很快主动来找我，且会开启具体的谈资或话题",
        weights: { attraction: 25, investment: 20, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q1_b',
        label: "隔 1~2 天会主动发消息，问在干嘛或分享日常",
        weights: { attraction: 20, investment: 15, commitment: 15, exclusivity: 10 }
      },
      {
        id: 'q1_c',
        label: "偶尔点赞/回复动态，但极少主动开启新对话",
        weights: { attraction: 10, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q1_d',
        label: "基本不会，几乎每次都是我重新开启对话",
        weights: { attraction: 2, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 2,
    title: "你们通常是怎么发起并完成见面的？",
    subtitle: "检测维度：真实投入度 (Investment) 与 规划意愿",
    type: 'single',
    options: [
      {
        id: 'q2_a',
        label: "他会提前 2~3 天规划具体时间地点，并主动买单/安排行程",
        weights: { attraction: 20, investment: 25, commitment: 20, exclusivity: 20 }
      },
      {
        id: 'q2_b',
        label: "双方都有提，临时决定居多，但见面过程氛围很好",
        weights: { attraction: 18, investment: 15, commitment: 10, exclusivity: 10 }
      },
      {
        id: 'q2_c',
        label: "大多是我提出来的，他会配合，但很少主动策划约会",
        weights: { attraction: 10, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q2_d',
        label: "深夜或临时“顺路”约见，或者只限于特定场合（如聚会/酒吧）",
        weights: { attraction: 12, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 3,
    title: "他平时日常联系与回复消息的模式更接近哪一种？",
    subtitle: "检测维度：心智占用率与关系稳定性",
    type: 'single',
    options: [
      {
        id: 'q3_a',
        label: "有空就秒回，忙时会提前说明“在忙晚点回复”，保持报备",
        weights: { attraction: 25, investment: 22, commitment: 22, exclusivity: 22 }
      },
      {
        id: 'q3_b',
        label: "白天回复频率一般，但晚上会持续长聊或语音打字",
        weights: { attraction: 20, investment: 15, commitment: 12, exclusivity: 12 }
      },
      {
        id: 'q3_c',
        label: "忽冷忽热，热的时候秒回，冷的时候消失大半天没有任何音讯",
        weights: { attraction: 15, investment: 8, commitment: 3, exclusivity: 4 }
      },
      {
        id: 'q3_d',
        label: "字数极少（嗯/好/表情包），很少延展话题",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 2 }
      }
    ]
  },
  {
    id: 4,
    title: "当你分享情绪压力或生活琐事时，他通常怎么回应？",
    subtitle: "检测维度：共情深度与情感共鸣",
    type: 'single',
    options: [
      {
        id: 'q4_a',
        label: "认真倾听，给出情绪安抚，甚至主动帮忙想解决方案",
        weights: { attraction: 20, investment: 25, commitment: 22, exclusivity: 20 }
      },
      {
        id: 'q4_b',
        label: "会安慰几句，但很快把话题切回他自己感兴趣的事情上",
        weights: { attraction: 12, investment: 8, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q4_c',
        label: "用敷衍的通俗词回复（如“别想太多/摸摸”），随后话题中断",
        weights: { attraction: 8, investment: 3, commitment: 2, exclusivity: 2 }
      },
      {
        id: 'q4_d',
        label: "经常选择性忽视这类消息，只选择轻松/调侃的话题回复",
        weights: { attraction: 5, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 5,
    title: "【行为捕捉多选题】在你们相处中，他真实做过哪些事情？",
    subtitle: "可多选（选得越多代表行为证据越充足，测试准确度显著提升）",
    type: 'multi',
    options: [
      {
        id: 'q5_1',
        label: "记得我随口提过的小偏好/小习惯，并在后续行动中兑现",
        weights: { attraction: 5, investment: 5, commitment: 4, exclusivity: 4 }
      },
      {
        id: 'q5_2',
        label: "为了见我或帮我解决问题，主动调整过他自己的原定行程",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_3',
        label: "把我介绍给他的核心朋友、同事或身边熟悉的人认识",
        weights: { attraction: 4, investment: 4, commitment: 6, exclusivity: 6 }
      },
      {
        id: 'q5_4',
        label: "在我生病/低谷/需要实际帮助时，提供过具体的物质或行动支持",
        weights: { attraction: 4, investment: 6, commitment: 5, exclusivity: 4 }
      },
      {
        id: 'q5_5',
        label: "主动讨论过未来 1~3 个月的出行计划或共同愿景",
        weights: { attraction: 4, investment: 4, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q5_6',
        label: "以上均没有发生过",
        weights: { attraction: 0, investment: 0, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 6,
    title: "在他当前的生活与社交圈里，你感觉自己处于什么位置？",
    subtitle: "检测维度：承诺意愿 (Commitment) 与 关系公开度",
    type: 'single',
    options: [
      {
        id: 'q6_a',
        label: "极其公开，朋友圈或社交圈里能明显感到我的专属痕迹",
        weights: { attraction: 25, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q6_b',
        label: "部分公开，极少数好友知道我的存在，但尚未正式融入圈子",
        weights: { attraction: 18, investment: 12, commitment: 15, exclusivity: 15 }
      },
      {
        id: 'q6_c',
        label: "相对隐秘，好像只限于两个人私下接触，外界完全感知不到",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 5 }
      },
      {
        id: 'q6_d',
        label: "感觉他对我有所隐藏，甚至刻意避开社交圈与隐私话题",
        weights: { attraction: 5, investment: 2, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 7,
    title: "关于排他关系（是否有其他异性）与界限感，最符合你们的是？",
    subtitle: "检测维度：排他专注度 (Exclusivity)",
    type: 'single',
    options: [
      {
        id: 'q7_a',
        label: "界限感极强，主动与异性保持距离，且表达过非你莫属的意思",
        weights: { attraction: 20, investment: 20, commitment: 25, exclusivity: 25 }
      },
      {
        id: 'q7_b',
        label: "感觉目前没有其他人，但也没有正式探讨过“排他性承诺”",
        weights: { attraction: 15, investment: 12, commitment: 12, exclusivity: 18 }
      },
      {
        id: 'q7_c',
        label: "社交圈异性较多且互动较密，偶尔会引发我的安全感焦虑",
        weights: { attraction: 12, investment: 5, commitment: 5, exclusivity: 6 }
      },
      {
        id: 'q7_d',
        label: "有迹象表明他同时与其他人保持着暧昧或聊天关系",
        weights: { attraction: 8, investment: 2, commitment: 0, exclusivity: 0 }
      }
    ]
  },
  {
    id: 8,
    title: "回顾过去一个月，你们关系的发展趋势最像哪一种？",
    subtitle: "检测维度：综合动态趋势 (Relationship Dynamics)",
    type: 'single',
    options: [
      {
        id: 'q8_a',
        label: "稳步升温：交流深度与见面频次都在持续增加，向正式关系迈进",
        weights: { attraction: 25, investment: 25, commitment: 25, exclusivity: 22 }
      },
      {
        id: 'q8_b',
        label: "过山车式：高爆激情后进入平台期，氛围很好但推进卡住",
        weights: { attraction: 22, investment: 12, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_c',
        label: "原地打转：维持在舒适的暧昧区间，谁也没有往前跨一步",
        weights: { attraction: 15, investment: 10, commitment: 8, exclusivity: 10 }
      },
      {
        id: 'q8_d',
        label: "逐渐降温：主动性明显变弱，聊天开始敷衍，出现疏远迹象",
        weights: { attraction: 5, investment: 2, commitment: 2, exclusivity: 2 }
      }
    ]
  }
];

export const ARCHETYPES: Archetype[] = [
  {
    id: 'chemistry_trap',
    name: 'The Chemistry Trap · 激情陷阱型',
    subtitle: '对他而言：你极具吸引力，但他尚未准备好承担关系承诺',
    tag: '高好感 · 低承诺 (Attraction ≫ Commitment)',
    emoji: '🔥',
    color: '#FF6B8B',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    description: '你们之间有强烈的情感火花与聊天默契，他非常享受和你待在一起的感觉。但是，一旦涉及到“定义关系”或“长远责任”，他就会表现出模糊或回避。',
    gapAnalysis: '检测到显著落差：Attraction (88) 与 Commitment (42) 存在 46 分的鸿沟。这说明“喜欢你”和“准备选择你”在他心里目前是两码事。',
    unlockedInsights: {
      whyNotAdvancing: "他享受当下的低压浪漫，但害怕失去单身红利或承担感情义务。你给的安全感太足，让他觉得不推进也能享受你的好。",
      seriousVsAmbiguous: "处于【高度上头但享受暧昧】区间。他并非不喜欢你，而是觉得现状最符合他的利益最大化。",
      exclusivitySignals: "可能同时保持着低频的异性社交触角，但主要精力仍被你吸引。",
      actionGuide7Days: [
        "停止无条件的主动：未来 7 天内，不主动制造新的见面约会",
        "保持情绪高频但不提供情绪依附：聊天时热情回应，但不主动追问他的行程",
        "制造“可失去感”：让他意识到你不是无限期留在原地等待的选择",
        "观察核心指标：看他是否在 72 小时内主动发起具备时间地点的具体约会"
      ]
    }
  },
  {
    id: 'quietly_serious',
    name: 'The Quietly Serious One · 笃定真诚型',
    subtitle: '对他而言：你已经是明确的选择，正在踏实推进关系',
    tag: '高好感 · 高承诺 (High Alignment)',
    emoji: '💖',
    color: '#00BFA5',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    description: '恭喜！他的行为表现出极高的一致性。不论是日常报备、行动兑现还是社交圈公开，他都在用实际行动证明对你的重视。',
    gapAnalysis: '关系极度健康：Attraction (90) 与 Commitment (85) 保持同步稳步上升，不存在明显的暧昧摩擦。',
    unlockedInsights: {
      whyNotAdvancing: "他正在寻找一个合适的节点或浪漫仪式来向你正式表白，并非拖延。",
      seriousVsAmbiguous: "毫无疑问是【认真发展】模式，行为逻辑清晰可预测。",
      exclusivitySignals: "排他信号极强，社交圈已明确为你预留专属位置。",
      actionGuide7Days: [
        "继续给予正向情绪反馈：让他知道他的付出被你看见并赏识",
        "适度引导终局：在浪漫氛围中给他一个顺水推舟表白的机会",
        "保持自我节奏：不要因为关系确定而放弃自己的个人生活与兴趣"
      ]
    }
  },
  {
    id: 'breadcrumber',
    name: 'The Breadcrumber · 偶发喂食型',
    subtitle: '对他而言：低成本维持连接，偶尔给点甜头防止你离开',
    tag: '低投入 · 高忽冷忽热 (Breadcrumb Pattern)',
    emoji: '🪵',
    color: '#FFB300',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    description: '在你准备放弃或冷淡时，他就会突然出现发个点赞或温情消息；当你热情回应后，他又迅速淡化。你在经历了典型的“间歇性强化”。',
    gapAnalysis: '投入度极大短缺：Investment 仅为 32，依靠极低成本的聊天词汇维持联系。',
    unlockedInsights: {
      whyNotAdvancing: "他在用最低成本占用你的情感资源。他不需要付出真正的行动，就能获得你的关注。",
      seriousVsAmbiguous: "典型的【试探与余温维持】，没有任何认真推进的意图。",
      exclusivitySignals: "异性资源管理概率较高，你只是他的陪伴选项之一。",
      actionGuide7Days: [
        "实施彻底的“不回应策略”：对无意义的社交表情包或问候不予回复",
        "要求高质量互动：仅回应具备实质内容的邀约或深度沟通",
        "重新评估底线：明确告诉自己不要为语言甜头买单"
      ]
    }
  },
  {
    id: 'situationship',
    name: 'The Situationship · 模糊陪伴型',
    subtitle: '对他而言：舒适的陪伴者，但缺乏明确的关系定义',
    tag: '舒适区 · 缺失定义 (Defined-less Bonding)',
    emoji: '🌫️',
    color: '#7C4DFF',
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    description: '你们像极了情侣，一起吃饭、聊天甚至有亲密举动，但他从未在公然场合称你为“女友/男友”，关系卡在了一个舒适的灰色地带。',
    gapAnalysis: 'Attraction (75) 与 Commitment (35) 差距拉大，属于典型的“享受情侣红利但不承担情侣责任”。',
    unlockedInsights: {
      whyNotAdvancing: "他习惯了这种没有任何约束的舒适圈。没有危机感，他就没有动力去改变现状。",
      seriousVsAmbiguous: "处于【观望与享受当下】，缺乏临门一脚的勇气与责任感。",
      exclusivitySignals: "对外部异性保持开放态度，因为技术上你们“依然单身”。",
      actionGuide7Days: [
        "收回情侣专属特权：停止像女友一样照料他的情绪与生活",
        "开诚布公一次：在合适场合温和但坚定地提出对关系定义的期望",
        "做好随时离场的准备：只有不怕失去，才能赢得关系的主导权"
      ]
    }
  },
  {
    id: 'slow_burner',
    name: 'The Slow Burner · 慢热沉淀型',
    subtitle: '对他而言：推进虽然缓慢，但每一步都踏实有据',
    tag: '低调稳健 · 持续增温 (Steady Growth)',
    emoji: '🐢',
    color: '#448AFF',
    gradient: 'from-blue-500 via-sky-500 to-cyan-500',
    description: '他可能不够花言巧语，不会快速给你海誓山盟，但他每次答应你的事情都在兑现，关系就像熬粥一样慢慢变浓。',
    gapAnalysis: '维度发展均衡：虽然分数上升不剧烈，但四个维度曲线呈现一致向上倾斜。',
    unlockedInsights: {
      whyNotAdvancing: "他是谨慎型人格，需要较长时间建立信任与评估未来。",
      seriousVsAmbiguous: "非常【认真】，只是个人节奏偏慢。",
      exclusivitySignals: "非常专一，几乎没有乱七八糟的异性牵扯。",
      actionGuide7Days: [
        "给予耐心与信任：不要急于用通牒逼迫他加快步骤",
        "创造共同经历：多安排一些需要合作或深度交流的活动",
        "适度展示脆弱：让他看到你对他依赖的一面"
      ]
    }
  }
];
