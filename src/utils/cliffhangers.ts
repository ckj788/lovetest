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
          title: "Path A: High Attraction With Pacing Caution",
          description: "Intense mutual feelings, but holding back to test emotional safety."
        },
        optionB: {
          title: "Path B: Addictive Chemistry Kept Undefined",
          description: "Enjoys the electric dynamic, but intentionally avoids relational accountability."
        },
        evidenceTeaser: "Your answers contain 2 specific signals pointing directly toward one of them.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Reveal My Path & Next Move — $3.99",
        modal: {
          headline: "So... Are They Actually Going To Commit?",
          subtitle: "You already know the spark is real. Your answers reveal whether this connection has real relationship potential — or is being kept in an undefined holding pattern.",
          offerTitle: "Unlock Your Full Behavioral Diagnosis & Action Plan",
          bullets: [
            "The 2 signals revealing their true intentions behind the spark",
            "What would prove they're ready to step up into exclusivity",
            "Your step-by-step 7-day action playbook to regain leverage",
            "Word-for-word scripts to establish boundaries without pushing them away"
          ],
          cta: "Reveal My Path & Next Move — $3.99"
        }
      };

    case 'slow_burner': // 乌龟 🐢
      return {
        tagline: "Consistent presence. Lingering commitment hesitation.",
        subSummary: "They clearly value your connection — but there is a meaningful gap between daily warmth and defining the relationship.",
        headline: "Is This Deliberate Emotional Pacing — Or Comfortable Stagnation?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A: Genuinely Taking Things Slowly",
          description: "Real emotional intent, but deliberately pacing the connection before defining it."
        },
        optionB: {
          title: "Path B: Comfortable Leaving It Undefined",
          description: "Enjoys your warmth and company, but comfortable letting things stay uncommitted."
        },
        evidenceTeaser: "Your answers contain 2 specific signals that distinguish genuine patience from quiet comfort.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Reveal My Path & Next Move — $3.99",
        modal: {
          headline: "Is This Moving Slowly — Or Going Nowhere?",
          subtitle: "They show up consistently, but they won't escalate. Your answers reveal whether they're genuinely cautious — or simply comfortable where things are.",
          offerTitle: "Unlock Your Full Behavioral Diagnosis & Action Plan",
          bullets: [
            "The 2 signals revealing whether this pace is patience or hesitation",
            "The exact behavioral test that proves if they're ready to commit",
            "Your step-by-step 7-day action playbook to shift the dynamic",
            "Word-for-word scripts to get clarity without chasing or pressure"
          ],
          cta: "Reveal My Path & Next Move — $3.99"
        }
      };

    case 'situationship': // 迷雾 🌫️
      return {
        tagline: "Relationship-level intimacy. Zero relational clarity.",
        subSummary: "You share couple routines, emotional depth, and daily closeness — but the dynamic remains carefully open-ended.",
        headline: "Are You Nearing Commitment — Or Trapped In The Gray Area?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A: Organic Escalation",
          description: "A genuine bond naturally finding its rhythm before formally defining the boundaries."
        },
        optionB: {
          title: "Path B: A Protected Comfort Zone",
          description: "A convenient, affectionate dynamic actively maintained without commitment responsibility."
        },
        evidenceTeaser: "Your answers contain 2 specific signals that reveal whether this dynamic will escalate or stay stuck.",
        lockQuestion: "Which one are you actually in?",
        ctaText: "Reveal My Path & Next Move — $3.99",
        modal: {
          headline: "Are You Building Something — Or Just Stuck In Routine?",
          subtitle: "You already act like partners in private. Your answers reveal whether they're quietly preparing for commitment — or protecting an undefined arrangement.",
          offerTitle: "Unlock Your Full Behavioral Diagnosis & Action Plan",
          bullets: [
            "The 2 signals revealing whether they see a real future with you",
            "The exact test that proves if they will step up or walk away",
            "Your step-by-step 7-day action playbook to break the stalemate",
            "Word-for-word scripts to get a clear answer without issuing an ultimatum"
          ],
          cta: "Reveal My Path & Next Move — $3.99"
        }
      };

    case 'breadcrumber': // 木头/残渣 🪵
      return {
        tagline: "Sharp dopamine spikes. Unpredictable quiet periods.",
        subSummary: "Magnetic and warm when present — but inconsistent enough to leave you second-guessing where you actually stand.",
        headline: "Is This Personal Overwhelm — Or Calculated Intermittent Warmth?",
        lead: "Your behavioral scores point to one of two very different situations:",
        optionA: {
          title: "Path A: Emotional Hesitation & Capacity",
          description: "Someone wrestling with their own emotional bandwidth and protective pacing."
        },
        optionB: {
          title: "Path B: Strategic Orbiting & Validation",
          description: "Periodic bursts of attention designed to keep you interested without real investment."
        },
        evidenceTeaser: "Your answers contain 2 specific signals that reveal what actually drives their hot-and-cold cycle.",
        lockQuestion: "Which pattern are they actually running?",
        ctaText: "Reveal My Path & Next Move — $3.99",
        modal: {
          headline: "Why Do They Disappear The Second Things Feel Real?",
          subtitle: "They give you just enough warmth to keep you holding on. Your answers reveal whether this is guarded hesitation — or keeping you on reserve.",
          offerTitle: "Unlock Your Full Behavioral Diagnosis & Action Plan",
          bullets: [
            "The 2 signals exposing their true availability and intent",
            "The behavioral test that proves if they value you or just the attention",
            "Your step-by-step 7-day action playbook to regain your power",
            "Word-for-word scripts to end mixed signals without chasing"
          ],
          cta: "Reveal My Path & Next Move — $3.99"
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
          title: "Path A: Quiet Preparation",
          description: "A partner who has already chosen you and is timing the formal commitment."
        },
        optionB: {
          title: "Path B: Waiting For Reassurance",
          description: "Ready to commit, but cautious of overstepping without clear mutual cues."
        },
        evidenceTeaser: "Your answers contain 2 specific signals revealing their exact readiness to make this official.",
        lockQuestion: "What is their actual readiness to make this official?",
        ctaText: "Reveal My Path & Next Move — $3.99",
        modal: {
          headline: "Are They Waiting On You — Or Ready To Make It Official?",
          subtitle: "The signs are overwhelmingly positive. Your answers reveal their exact readiness level and how to guide this into a defined, secure commitment.",
          offerTitle: "Unlock Your Full Behavioral Diagnosis & Action Plan",
          bullets: [
            "The 2 signals confirming they have already chosen you",
            "What would prove they're 100% ready for the formal label",
            "Your step-by-step 7-day action playbook to transition smoothly",
            "Word-for-word scripts to invite commitment with zero awkwardness"
          ],
          cta: "Reveal My Path & Next Move — $3.99"
        }
      };
  }
}
