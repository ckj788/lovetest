import { Dimension, QuizResultData, Archetype } from '../types/quiz';
import { QUIZ_QUESTIONS, ARCHETYPES } from '../data/questions';

export function calculateQuizResult(userAnswers: Record<number, string | string[]>): QuizResultData {
  const rawScores: Record<Dimension, number> = {
    attraction: 0,
    investment: 0,
    commitment: 0,
    exclusivity: 0,
  };

  // Max possible scores for normalization
  const maxPossibleScores: Record<Dimension, number> = {
    attraction: 160,
    investment: 140,
    commitment: 140,
    exclusivity: 140,
  };

  // Calculate accumulated weights from user selected option(s)
  QUIZ_QUESTIONS.forEach((q) => {
    const answer = userAnswers[q.id];
    if (!answer) return;

    if (q.type === 'single' && typeof answer === 'string') {
      const option = q.options.find((o) => o.id === answer);
      if (option) {
        (Object.keys(option.weights) as Dimension[]).forEach((dim) => {
          rawScores[dim] += option.weights[dim];
        });
      }
    } else if (q.type === 'multi' && Array.isArray(answer)) {
      answer.forEach((optId) => {
        const option = q.options.find((o) => o.id === optId);
        if (option) {
          (Object.keys(option.weights) as Dimension[]).forEach((dim) => {
            rawScores[dim] += option.weights[dim];
          });
        }
      });
    }
  });

  // Normalize scores to 0 - 100
  const normalizedScores: Record<Dimension, number> = {
    attraction: Math.min(100, Math.round((rawScores.attraction / maxPossibleScores.attraction) * 100)),
    investment: Math.min(100, Math.round((rawScores.investment / maxPossibleScores.investment) * 100)),
    commitment: Math.min(100, Math.round((rawScores.commitment / maxPossibleScores.commitment) * 100)),
    exclusivity: Math.min(100, Math.round((rawScores.exclusivity / maxPossibleScores.exclusivity) * 100)),
  };

  const gap = normalizedScores.attraction - normalizedScores.commitment;
  const totalScore = Math.round(
    normalizedScores.attraction * 0.3 +
    normalizedScores.investment * 0.25 +
    normalizedScores.commitment * 0.25 +
    normalizedScores.exclusivity * 0.2
  );

  // Archetype matching logic
  let archetype: Archetype;

  if (totalScore >= 75 && normalizedScores.commitment >= 70) {
    archetype = ARCHETYPES.find((a) => a.id === 'quietly_serious') || ARCHETYPES[1];
  } else if (gap >= 25 && normalizedScores.attraction >= 65) {
    archetype = ARCHETYPES.find((a) => a.id === 'chemistry_trap') || ARCHETYPES[0];
  } else if (normalizedScores.investment <= 40 && normalizedScores.attraction >= 50) {
    archetype = ARCHETYPES.find((a) => a.id === 'breadcrumber') || ARCHETYPES[2];
  } else if (normalizedScores.attraction >= 60 && normalizedScores.commitment <= 50) {
    archetype = ARCHETYPES.find((a) => a.id === 'situationship') || ARCHETYPES[3];
  } else {
    archetype = ARCHETYPES.find((a) => a.id === 'slow_burner') || ARCHETYPES[4];
  }

  let freeSummary = '';
  if (gap > 20) {
    freeSummary = `High natural attraction (${normalizedScores.attraction}/100) paired with lagging commitment (${normalizedScores.commitment}/100)—exposing a major ${gap}-point Delulu Gap!`;
  } else if (totalScore >= 75) {
    freeSummary = `They (he/she) show high, consistent attraction across all behavioral metrics, actively moving this dynamic toward an official relationship.`;
  } else {
    freeSummary = `The dynamic is currently in an observation phase. Attraction and effort are present, but key exclusivity signals require testing.`;
  }

  return {
    scores: normalizedScores,
    totalScore,
    gap,
    archetype,
    freeSummary,
  };
}
