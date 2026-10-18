import { QuizResultData, SoloDimension, SoloPatternId } from '../types/quiz';
import { QUIZ_QUESTIONS } from '../data/questions';
import { PATTERNS } from '../data/patterns';
export function toggleMultiAnswer(current: string[], id: string): string[] {
    if (current.includes(id))
        return current.filter(x => x !== id);
    if (id === 'q5_7' || id === 'q5_8')
        return [id];
    return [...current.filter(x => x !== 'q5_7' && x !== 'q5_8'), id];
}
export function calculateQuizResult(userAnswers: Record<number, string | string[]>, setupAnswers: QuizResultData['setupAnswers'] = {}): QuizResultData {
    const dimensions: SoloDimension[] = ['initiative', 'reliability', 'emotionalAvailability', 'realLifeIntegration', 'clarity', 'momentum'];
    const sums = Object.fromEntries(dimensions.map(d => [d, [] as number[]])) as Record<SoloDimension, number[]>;
    let unknown = 0;
    const evidence: QuizResultData['evidence'] = [];
    QUIZ_QUESTIONS.forEach(q => {
        const input = userAnswers[q.id], ids = Array.isArray(input) ? input : [input];
        const selected = q.options.filter(o => ids.includes(o.id));
        if (!selected.length || selected.some(o => o.weights.isTooEarly)) {
            unknown++;
            return;
        }
        // Each question contributes once per relevant dimension; receipts cannot overwhelm a dimension.
        dimensions.forEach(d => { const values = selected.flatMap(o => o.weights[d] === undefined ? [] : [o.weights[d]!]); if (values.length)
            sums[d].push(values.reduce((a, b) => a + b, 0) / values.length); });
        evidence.push({ questionTitle: q.title, userAnswerLabel: selected.map(o => o.label).join(' '), insight: 'You reported this behavior in your observation window. It is evidence of what happened, not proof of a private intention.' });
    });
    const scores = Object.fromEntries(dimensions.map(d => [d, sums[d].length ? Math.round(sums[d].reduce((a, b) => a + b, 0) / sums[d].length) : null])) as QuizResultData['dimensionScores'];
    const s = (d: SoloDimension) => scores[d] ?? 50;
    let id: SoloPatternId;
    if (unknown >= 3)
        id = 'not_enough_data';
    else if (userAnswers[3] === 'q3_c' || userAnswers[8] === 'q8_c')
        id = 'hot_cold_loop';
    else if (s('initiative') <= 35 && (userAnswers[2] === 'q2_c' || userAnswers[2] === 'q2_d' || userAnswers[8] === 'q8_d'))
        id = 'one_sided_momentum';
    else if (s('initiative') >= 65 && s('reliability') >= 75 && s('realLifeIntegration') >= 65 && s('clarity') >= 75 && s('momentum') >= 70)
        id = 'mutual_momentum';
    else if (s('reliability') >= 70 && userAnswers[8] === 'q8_a')
        id = 'slow_consistent';
    else if ((userAnswers[2] === 'q2_d' || userAnswers[2] === 'q2_b') && scores.realLifeIntegration !== null && s('realLifeIntegration') <= 35)
        id = 'chemistry_gap';
    else if (s('initiative') <= 35 && s('reliability') <= 45)
        id = 'one_sided_momentum';
    else
        id = 'comfortable_limbo';
    const priority = id === 'hot_cold_loop' ? [3, 8, 2] : id === 'one_sided_momentum' ? [1, 2, 8] : id === 'chemistry_gap' ? [2, 6, 7] : [8, 7, 1, 3];
    evidence.sort((a, b) => { const qa = QUIZ_QUESTIONS.find(q => q.title === a.questionTitle)!.id, qb = QUIZ_QUESTIONS.find(q => q.title === b.questionTitle)!.id; return (priority.indexOf(qa) < 0 ? 99 : priority.indexOf(qa)) - (priority.indexOf(qb) < 0 ? 99 : priority.indexOf(qb)); });
    return { pattern: PATTERNS.find(p => p.id === id)!, dimensionScores: scores, evidence: evidence.slice(0, 3), setupAnswers, userAnswers, resultId: 'local', isPaid: false, isInsufficientData: id === 'not_enough_data' };
}
