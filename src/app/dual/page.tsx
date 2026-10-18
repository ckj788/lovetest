'use client';
import { useState } from 'react';
import { QuizShell } from '../../components/ui/QuizShell';
import { DualLanding } from '../../components/dual/DualLanding';
import { DualQuestionView } from '../../components/dual/DualQuestionView';
import { DualInviteScreen } from '../../components/dual/DualInviteScreen';
import { DualResultView } from '../../components/dual/DualResultView';
import { DualMode } from '../../types/dual';
import { TALKING_STAGE_QUESTIONS, COUPLES_QUESTIONS, calculateDualResult } from '../../data/dualQuestions';
import { trackEvent } from '../../lib/analytics';
export default function DualPage() {
    const [step, setStep] = useState<'landing' | 'quiz' | 'handoff' | 'result'>('landing'), [mode, setMode] = useState<DualMode>('talking_stage'), [role, setRole] = useState<'partner1' | 'partner2'>('partner1'), [index, setIndex] = useState(0), [p1, setP1] = useState<Record<number, string>>({}), [p2, setP2] = useState<Record<number, string>>({});
    const questions = mode === 'talking_stage' ? TALKING_STAGE_QUESTIONS : COUPLES_QUESTIONS, q = questions[index], answers = role === 'partner1' ? p1 : p2;
    const reset = () => { setStep('landing'); setIndex(0); setP1({}); setP2({}); setRole('partner1'); };
    const next = () => { trackEvent('question_answered', { mode: mode === 'talking_stage' ? 'duo_talking' : 'duo_couples', question_number: index + 1 }); if (index < 5)
        setIndex(index + 1);
    else {
        setStep(role === 'partner1' ? 'handoff' : 'result');
        if (role === 'partner2')
            trackEvent('quiz_completed', { mode: mode === 'talking_stage' ? 'duo_talking' : 'duo_couples' });
    } window.scrollTo({ top: 0, behavior: 'instant' }); };
    return <QuizShell mode="duo">{step === 'landing' && <DualLanding selectedMode={mode} onSelectMode={setMode} onStart={() => { setStep('quiz'); trackEvent('quiz_started', { mode: mode === 'talking_stage' ? 'duo_talking' : 'duo_couples' }); }}/>}{step === 'quiz' && <><DualQuestionView question={q} currentIndex={index} totalQuestions={6} partnerRole={role} selectedOptionId={answers[q.id]} onSelectOption={id => role === 'partner1' ? setP1({ ...p1, [q.id]: id }) : setP2({ ...p2, [q.id]: id })} onNext={next} onBack={() => { if (index > 0)
        setIndex(index - 1);
    else if (role === 'partner1')
        setStep('landing');
    else
        setStep('handoff'); }}/><p className="below-note">Answers stay in this tab until you leave or clear them. <button className="text-button" onClick={reset}>Clear answers</button></p></>}{step === 'handoff' && <DualInviteScreen mode={mode} onAnswerAsPartner2={() => { setRole('partner2'); setIndex(0); setStep('quiz'); }}/>}{step === 'result' && <DualResultView result={calculateDualResult(mode, p1, p2)} onReset={reset}/>}</QuizShell>;
}
