import { FRIEND_QUESTIONS } from '../data/dualQuestions';

export type FriendAnswers = Record<number, string>;
export const friendDraftKey = (access: string) => 'mixedsigns_friend_draft_v1_' + (access || 'new');

export function parseFriendDraft(raw: string | null, now = Date.now()): { index: number; answers: FriendAnswers } | null {
    try {
        const draft = JSON.parse(raw || 'null');
        if (!draft || !Number.isInteger(draft.index) || draft.index < 0 || draft.index > 7 ||
            typeof draft.savedAt !== 'number' || draft.savedAt > now || draft.savedAt <= now - 7 * 86400000 ||
            !draft.answers || typeof draft.answers !== 'object' || Array.isArray(draft.answers)) return null;
        const answers: FriendAnswers = {};
        for (const question of FRIEND_QUESTIONS) {
            const answer = draft.answers[question.id];
            if (answer !== undefined) {
                if (typeof answer !== 'string' || !question.options.some(option => option.id === answer)) return null;
                answers[question.id] = answer;
            }
        }
        // Do not restore a position ahead of any unanswered question.
        const firstMissing = FRIEND_QUESTIONS.findIndex(question => !answers[question.id]);
        return { index: firstMissing < 0 ? draft.index : Math.min(draft.index, firstMissing), answers };
    } catch { return null; }
}
