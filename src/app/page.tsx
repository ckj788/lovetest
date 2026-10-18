'use client';
import { useEffect, useState } from 'react';
import { QuizShell } from '../components/ui/QuizShell';
import { ChoiceQuestion } from '../components/ui/ChoiceQuestion';
import { QuizLanding } from '../components/QuizLanding';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResult } from '../components/QuizResult';
import { QUIZ_QUESTIONS, SETUP_QUESTIONS } from '../data/questions';
import { calculateQuizResult, toggleMultiAnswer } from '../utils/calculator';
import { trackEvent } from '../lib/analytics';
import type { QuizResultData } from '../types/quiz';
const STORAGE = 'mixedsigns_solo_v2';
interface Progress {
    step: 'quiz' | 'result';
    index: number;
    answers: Record<number, string | string[]>;
    setup: NonNullable<QuizResultData['setupAnswers']>;
    savedAt: number;
}
export default function Home() {
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing'), [index, setIndex] = useState(0), [answers, setAnswers] = useState<Record<number, string | string[]>>({}), [setup, setSetup] = useState<NonNullable<QuizResultData['setupAnswers']>>({}), [resume, setResume] = useState<Progress | null>(null), [storageError, setStorageError] = useState(false), [ready, setReady] = useState(false);
    useEffect(() => { trackEvent('home_view', { mode: 'solo' }); try {
        const raw = localStorage.getItem(STORAGE);
        if (raw) {
            const p = JSON.parse(raw);
            if (p.savedAt > Date.now() - 7 * 86400000 && p.index >= 0 && p.index <= 9 && (p.step === 'quiz' || p.step === 'result') && p.answers && p.setup)
                setResume(p);
            else
                localStorage.removeItem(STORAGE);
        }
    }
    catch { } setReady(true); }, []);
    useEffect(() => { if (!ready || step === 'landing')
        return; try {
        localStorage.setItem(STORAGE, JSON.stringify({ step, index, answers, setup, savedAt: Date.now() }));
    }
    catch {
        setStorageError(true);
    } }, [ready, step, index, answers, setup]);
    const start = () => { setStep('quiz'); setIndex(0); setAnswers({}); setSetup({}); setResume(null); trackEvent('mode_selected', { mode: 'solo' }); trackEvent('quiz_started', { mode: 'solo' }); };
    const reset = () => { try {
        localStorage.removeItem(STORAGE);
    }
    catch { } setResume(null); setStep('landing'); setIndex(0); setAnswers({}); setSetup({}); };
    const next = () => { trackEvent('question_answered', { mode: 'solo', question_number: index + 1 }); if (index < 9)
        setIndex(index + 1);
    else {
        setStep('result');
        trackEvent('quiz_completed', { mode: 'solo' }, 'solo-complete-' + Date.now());
    } window.scrollTo({ top: 0, behavior: 'instant' }); };
    const back = () => { if (index > 0)
        setIndex(index - 1);
    else
        setStep('landing'); };
    const result = step === 'result' ? calculateQuizResult(answers, setup) : null;
    return <QuizShell>{step === 'landing' && <>{resume && <div className="resume-bar"><span>{resume.step === 'result' ? 'Your last result is ready.' : 'You have an unfinished reflection.'}</span><button className="text-button" onClick={() => { setAnswers(resume.answers); setSetup(resume.setup); setIndex(resume.index); setStep(resume.step); setResume(null); }}>Resume →</button><button className="text-button" onClick={reset}>Clear</button></div>}<QuizLanding onStart={start}/></>}{step === 'quiz' && <>{index < 2 ? <ChoiceQuestion title={SETUP_QUESTIONS[index].title} subtitle="A little context first. This answer does not add or subtract points." options={SETUP_QUESTIONS[index].options} selected={setup[SETUP_QUESTIONS[index].id] || ''} onChange={id => setSetup({ ...setup, [SETUP_QUESTIONS[index].id]: id })} onNext={next} onBack={back} index={index} total={10} eyebrow="BEFORE WE BEGIN"/> : <QuizQuestion question={QUIZ_QUESTIONS[index - 2]} currentIndex={index - 2} totalQuestions={8} selectedAnswers={answers[QUIZ_QUESTIONS[index - 2].id] || (index === 6 ? [] : '')} onSelectOption={id => { const q = QUIZ_QUESTIONS[index - 2]; setAnswers({ ...answers, [q.id]: q.type === 'multi' ? toggleMultiAnswer((answers[q.id] as string[]) || [], id) : id }); }} onNext={next} onPrev={back}/>}<p className="below-note">Saved only in this browser for up to 7 days. <button className="text-button" onClick={reset}>Clear my progress</button></p>{storageError && <p role="status" className="below-note">Your browser cannot save progress. Keep this tab open to finish.</p>}</>}{step === 'result' && result && <QuizResult result={result} onReset={reset}/>}</QuizShell>;
}
