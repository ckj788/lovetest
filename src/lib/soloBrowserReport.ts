import {calculateQuizResult} from '../utils/calculator';
import {analyzeSoloResult} from '../data/soloAnalysis';
import type {Answers} from './reports';
import { checkoutAvailability } from './checkoutConfig';

export function soloBrowserReport(answers: Answers) {
    const result = calculateQuizResult(answers);
    const analysis = analyzeSoloResult(result);
    return {
        ...checkoutAvailability(),
        browserOnly: true, storage: 'browser' as const, mode: 'solo' as const, role: 'owner' as const,
        completed: true, paid: false, unlocked: false, price: 799, expiresAt: Date.now() + 30 * 86400000,
        preview: { name: result.pattern.name, emoji: result.pattern.emoji, summary: analysis.headline, action: analysis.previewAction },
    };
}
