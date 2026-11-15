import { generateSecureToken, generateSessionId, getRecord, putRecord, exclusive } from './storage';
import { QUIZ_QUESTIONS } from '../data/questions';
import { FRIEND_QUESTIONS } from '../data/dualQuestions';
import {calculateFriendReport} from '../data/friendPatterns';
import { calculateQuizResult } from '../utils/calculator';
import { analyzeSoloResult } from '../data/soloAnalysis';
export type Answers = Record<number, string | string[]>;
export interface ReportRecord {
    id: string;
    mode: 'solo' | 'friend';
    ownerToken: string;
    guestToken: string;
    answers: Answers;
    guestAnswers?: Answers;
    paid: boolean;
    previewUnlocked?: boolean;
    createdAt: number;
    expiresAt: number;
    price: number;
    checkoutId?: string;
    checkoutUrl?: string;
    paymentIntent?: string;
    refunded?: boolean;
}
export function validAnswers(mode: string, answers: unknown): answers is Answers {
    if (!answers || typeof answers !== 'object' || Array.isArray(answers) || Object.keys(answers).length !== 8)
        return false;
    return (mode === 'solo' ? QUIZ_QUESTIONS : FRIEND_QUESTIONS).every(q => { const a = (answers as Answers)[q.id]; if ('type' in q && q.type === 'multi') {
        if (!Array.isArray(a) || !a.length || new Set(a).size !== a.length)
            return false;
        if (a.some(x => x === 'q5_7' || x === 'q5_8') && a.length !== 1)
            return false;
        return a.every(x => q.options.some(o => o.id === x));
    } return typeof a === 'string' && q.options.some(o => o.id === a); });
}
export async function saveReport(r: ReportRecord) { await putRecord('report:' + r.id, r, Math.max(1, Math.ceil((r.expiresAt - Date.now()) / 1000))); }
export async function createReport(mode: 'solo' | 'friend', answers: Answers) { const r: ReportRecord = { id: generateSessionId(), mode, ownerToken: generateSecureToken(), guestToken: generateSecureToken(), answers, paid: false, createdAt: Date.now(), expiresAt: Date.now() + 30 * 86400000, price: mode === 'solo' ? 799 : 999 }; await saveReport(r); await putRecord('report-token:' + r.ownerToken, r.id); if (mode === 'friend')
    await putRecord('report-token:' + r.guestToken, r.id); return r; }
export async function authorize(token: string) { if (!/^[a-f0-9]{48}$/.test(token))
    return null; const id = await getRecord<string>('report-token:' + token); const r = id ? await getRecord<ReportRecord>('report:' + id) : null; if (!r || r.expiresAt <= Date.now() || ![r.ownerToken, r.guestToken].includes(token))
    return null; return { record: r, role: token === r.ownerToken ? 'owner' as const : 'guest' as const }; }
// Preview grants never write payment or Stripe entitlement fields.
export const previewModeEnabled = () => process.env.NODE_ENV === 'development';
export class ReportNotReadyError extends Error {
 constructor(){super('Both people need to finish their eight questions before the shared report can be unlocked.');this.name='ReportNotReadyError';}
}
export function requireCompletedReport(record:ReportRecord){
 if(record.mode==='friend'&&!record.guestAnswers)throw new ReportNotReadyError();
}
export async function unlockPreview(token:string){
 if(!previewModeEnabled())throw new Error('Preview unlock is unavailable');
 const auth=await authorize(token);if(!auth||auth.role!=='owner')throw new Error('Only the initiator can unlock this preview');
 return exclusive('report:'+auth.record.id,async()=>{const fresh=await authorize(token);if(!fresh)throw new Error('Report expired');requireCompletedReport(fresh.record);fresh.record.previewUnlocked=true;await saveReport(fresh.record);return reportView(fresh.record,'owner');});
}
export const friendReport = calculateFriendReport;
export function reportView(r: ReportRecord, role: 'owner' | 'guest') {
    const completed = r.mode === 'solo' || !!r.guestAnswers;
    const previewUnlocked=previewModeEnabled()&&r.previewUnlocked===true;
    const unlocked = ((r.paid && !r.refunded)||previewUnlocked) && completed;
    const base = { previewMode:previewModeEnabled(), previewUnlocked, mode: r.mode, role, completed, paid: r.paid && !r.refunded, unlocked, price: r.price, expiresAt: r.expiresAt, inviteToken: role === 'owner' && r.mode === 'friend' ? r.guestToken : undefined };
    if (r.mode === 'solo') {
        const result = calculateQuizResult(r.answers);
        const analysis=analyzeSoloResult(result);
        return { ...base, preview: { name: result.pattern.name, emoji: result.pattern.emoji, summary: analysis.headline, action: analysis.previewAction }, full: unlocked ? result : undefined };
    }
    const full = completed ? friendReport(r.answers, r.guestAnswers!) : undefined;
    return { ...base, preview: { name: full?.name || 'Your friendship reveal is taking shape', summary: completed ? full!.previewSummary : 'Eight answers from you. Eight from your friend. One shared report.' }, full: unlocked ? full : undefined };
}
export async function submitGuest(token: string, answers: Answers) { const auth = await authorize(token); if (!auth || auth.role !== 'guest' || auth.record.mode !== 'friend')
    throw new Error('Invalid invitation'); return exclusive('report:' + auth.record.id, async () => { const fresh = await authorize(token); if (!fresh)
    throw new Error('Invitation expired'); if (!fresh.record.guestAnswers) {
    fresh.record.guestAnswers = answers;
    await saveReport(fresh.record);
} return reportView(fresh.record, 'guest'); }); }
