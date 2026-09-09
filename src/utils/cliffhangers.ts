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
        tagline: "Strong natural attraction. Sharp commitment gap.",
        subSummary: "There is unmistakable chemistry between you — but their behavior isn't matching the spark.",
        headline: "Is This High Attraction Moving Guardedly — Or Undefined By Choice?",
        lead: `Your ${gapPoints}-point gap usually points to one of two very different situations:`,
        optionA: {
          title: "Path A: High Attraction with Pacing Caution",
          description: "A connection that's moving slowly and guardedly — but genuinely developing."
        },
        optionB: {
          title: "Path B: Intense Chemistry Kept Undefined",
          description: "A connection that feels electric — but may be intentionally kept without accountability."
        },
        evidenceTeaser: "Your answers contain 2 signals that strongly point toward one of them.",
        lockQuestion: "🔒 Which one are you actually in?",
        ctaText: "Find Out Which One + What To Do Next →",
        modal: {
          headline: "So... Are They Actually Going to Commit?",
          subtitle: "You already know the attraction is there. Your answers reveal whether this looks like a slow burn — or a connection they're comfortable keeping undefined.",
          offerTitle: "Find Out What's Really Keeping This Stuck",
          bullets: [
            "The 2 signals revealing their real intentions",
            "What would prove they're ready to commit",
            "Exactly what to do over the next 7 days",
            "What to say next — without chasing or forcing “the talk”"
          ],
          cta: "Show Me What To Do Next — $3.99"
        }
      };

    case 'slow_burner': // 乌龟 🐢
      return {
        tagline: "Steady consistency. Lagging relational momentum.",
        subSummary: "The dynamic is stable and respectful — but the pace is creating quiet uncertainty.",
        headline: "Is This Slow, Deliberate Investment — Or Comfortable Stagnation?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A: Deliberate Emotional Investment",
          description: "A measured pace built on real, steady observation and cautious care."
        },
        optionB: {
          title: "Path B: A Low-Urgency Routine",
          description: "A comfortable connection that enjoys your presence without urgency to make it official."
        },
        evidenceTeaser: "Your answers contain 2 signals that distinguish genuine patience from quiet comfort.",
        lockQuestion: "🔒 Which one are you actually in?",
        ctaText: "Find Out Which One + What To Do Next →",
        modal: {
          headline: "Is This Just Moving Slowly — Or Going Nowhere?",
          subtitle: "They show up consistently, but they won't escalate. Your answers reveal whether they're genuinely cautious — or simply comfortable where things are.",
          offerTitle: "Find Out What's Really Behind Their Slow Pace",
          bullets: [
            "The 2 signals distinguishing healthy patience from avoidance",
            "The exact behavioral shift that proves they're ready to commit",
            "Exactly what to do over the next 7 days",
            "What to say next — without chasing or forcing “the talk”"
          ],
          cta: "Show Me What To Do Next — $3.99"
        }
      };

    case 'situationship': // 迷雾 🌫️
      return {
        tagline: "High daily intimacy. Zero structural clarity.",
        subSummary: "You share couple routines and closeness — but the dynamic remains carefully open-ended.",
        headline: "Are You Approaching Commitment — Or Trapped In A Gray Area?",
        lead: "Your intimacy vs commitment scores reveal a split between two possibilities:",
        optionA: {
          title: "Path A: Organic Escalation",
          description: "A deep, unforced bond naturally finding its rhythm before officially defining the boundaries."
        },
        optionB: {
          title: "Path B: A Protected Comfort Zone",
          description: "A convenient, affectionate dynamic actively maintained to avoid relational accountability."
        },
        evidenceTeaser: "Your answers contain 2 signals that reveal whether this dynamic will escalate or stay stuck.",
        lockQuestion: "🔒 Which one are you actually in?",
        ctaText: "Find Out Which One + What To Do Next →",
        modal: {
          headline: "Are You Building Something — Or Just Killing Time?",
          subtitle: "You already act like partners in private. Your answers reveal whether they're quietly preparing for commitment — or protecting an undefined arrangement.",
          offerTitle: "Find Out What's Keeping This in the Gray Area",
          bullets: [
            "The 2 signals revealing whether they see a real future with you",
            "The test that proves if they will fight to keep you or let you go",
            "Exactly what to do over the next 7 days to shift the dynamic",
            "What to say next — to get clarity without issuing an ultimatum"
          ],
          cta: "Show Me What To Do Next — $3.99"
        }
      };

    case 'breadcrumber': // 木头/残渣 🪵
      return {
        tagline: "Sharp dopamine spikes. Unpredictable quiet periods.",
        subSummary: "Magnetic and warm when present — but inconsistent enough to leave you overthinking.",
        headline: "Is This Personal Avoidance — Or Calculated Intermittent Attention?",
        lead: "Your behavioral tracking reveals a pattern that splits into two possibilities:",
        optionA: {
          title: "Path A: Emotional Hesitation & Overwhelm",
          description: "Someone wrestling with their own emotional availability and protective pacing."
        },
        optionB: {
          title: "Path B: Strategic Orbiting",
          description: "A pattern of periodic contact designed to keep you interested without real investment."
        },
        evidenceTeaser: "Your answers contain 2 signals that reveal what actually drives their hot-and-cold cycle.",
        lockQuestion: "🔒 Which pattern are they actually running?",
        ctaText: "Find Out Which One + What To Do Next →",
        modal: {
          headline: "Why Do They Disappear The Second Things Feel Real?",
          subtitle: "They give you just enough warmth to keep you holding on. Your answers reveal whether this is guarded hesitation — or keeping you on reserve.",
          offerTitle: "Find Out What's Driving Their Hot & Cold Cycle",
          bullets: [
            "The 2 signals exposing their true availability and intent",
            "What will immediately prove if they value you or just the validation",
            "Exactly what to do over the next 7 days to regain your power",
            "What to text next — to end mixed signals without chasing"
          ],
          cta: "Show Me What To Do Next — $3.99"
        }
      };

    case 'quietly_serious': // 爱心 💖
    default:
      return {
        tagline: "High behavioral alignment. Rare emotional consistency.",
        subSummary: "Actions match words across key indicators — leaving you wondering when the next step happens.",
        headline: "Are They Preparing To Step Up — Or Waiting For Your Green Light?",
        lead: "Your behavioral scores point to one of two final transition phases:",
        optionA: {
          title: "Path A: Quiet Preparation",
          description: "A mature partner who has already chosen you and is timing the formal commitment."
        },
        optionB: {
          title: "Path B: Waiting For Reassurance",
          description: "A respectful partner ready to commit, but cautious of overstepping without clear mutual cues."
        },
        evidenceTeaser: "Your answers contain 2 signals revealing their exact readiness to make this official.",
        lockQuestion: "🔒 What is their actual readiness to make this official?",
        ctaText: "Find Out Which One + What To Do Next →",
        modal: {
          headline: "Are They Waiting On You — Or Ready To Make It Official?",
          subtitle: "The signs are overwhelmingly strong. Your answers reveal their exact readiness level and how to guide this into a defined, secure commitment.",
          offerTitle: "Find Out How to Seal This Into a Full Commitment",
          bullets: [
            "The 2 signals confirming they have already chosen you",
            "What would prove they're 100% ready for the label",
            "Exactly what to do over the next 7 days to transition smoothly",
            "What to say next — to invite commitment with zero awkwardness"
          ],
          cta: "Show Me What To Do Next — $3.99"
        }
      };
  }
}
