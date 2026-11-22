'use client';
import { useEffect, useState } from 'react';
import { QuizShell } from '../components/ui/QuizShell';
import { QuizLanding } from '../components/DesignLanding';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResult } from '../components/QuizResult';
import {QuizCalculating} from '../components/QuizCalculating';
import { ReportGate } from '../components/ReportGate';
import { QUIZ_QUESTIONS } from '../data/questions';
import { useReport } from '../lib/useReport';
import { QuizResultData } from '../types/quiz';
const STORAGE = 'mixedsigns_solo_v3';
export default function Home() {
    const report = useReport('solo');
    const [step, setStep] = useState<'landing' | 'quiz'>('landing'), [index, setIndex] = useState(0), [answers, setAnswers] = useState<Record<number, string | string[]>>({}), [resume, setResume] = useState(false);
    useEffect(() => { try {
        const raw = JSON.parse(localStorage.getItem(STORAGE) || 'null');
        if (raw && raw.savedAt > Date.now() - 7 * 86400000 && raw.index >= 0 && raw.index < 8) {
            setAnswers(raw.answers);
            setIndex(raw.index);
            setResume(true);
        }
    }
    catch { } }, []);
    useEffect(() => { if (step === 'quiz')try{localStorage.setItem(STORAGE, JSON.stringify({ index, answers, savedAt: Date.now() }));}catch{} }, [step, index, answers]);
    function clearDraft() { setStep('landing'); setIndex(0); setAnswers({}); setResume(false); try{localStorage.removeItem(STORAGE);}catch{} window.scrollTo(0, 0); }
    function reset() { report.clear(); clearDraft(); }
    async function next(optionId?:string) { if (index < 7)
        setIndex(index + 1);
    else if (await report.submit(optionId?{...answers,[QUIZ_QUESTIONS[index].id]:optionId}:answers)) {
        setStep('landing');
        try{localStorage.removeItem(STORAGE);}catch{}
        setResume(false);
    } }
    const q = QUIZ_QUESTIONS[index];
    const landing = <>
        {resume && <div className="resume-bar"><span>Your unfinished reflection is saved.</span><button className="text-button" onClick={() => setStep('quiz')}>Resume →</button><button className="text-button" onClick={clearDraft}>Clear</button></div>}
        {report.hasSavedSoloReport && <div className="resume-bar">
            <button className="text-button" onClick={report.openSavedSoloReport}>Open my saved report →</button>
        </div>}
        <QuizLanding onStart={() => { setIndex(0); setAnswers({}); setStep('quiz'); }}/>
    </>;
    return <QuizShell>{report.completionKind?<QuizCalculating kind={report.completionKind}/>:report.view ? <>{report.view.unlocked && report.view.full ? <QuizResult result={report.view.full as QuizResultData} onReset={reset}/> : <div className="result-wrap"><ReportGate view={report.view} busy={report.busy} error={report.error} paymentNotice={report.paymentNotice} onCheckout={report.checkout} onRefresh={report.refresh}/><div className="result-end"><button className="text-button" onClick={reset}>Start a new reflection</button></div></div>}</> : (report.token || report.browserOnly) ? <div className="handoff-card"><p role="status">{report.error || 'Loading your private report…'}</p><button className="secondary-button" onClick={report.refresh}>Retry</button><button className="text-button" onClick={reset}>Start again</button></div> : step === 'landing' ? landing : <><QuizQuestion question={q} currentIndex={index} totalQuestions={8} selectedAnswers={answers[q.id] || (q.type === 'multi' ? [] : '')} onSelectOption={id => { if (report.busy)
        return; if (q.type === 'single')
        setAnswers({ ...answers, [q.id]: id });
    else {
        const current = (answers[q.id] as string[]) || [];
        const selected = current.includes(id) ? current.filter(x => x !== id) : (id === 'q5_7' || id === 'q5_8') ? [id] : [...current.filter(x => x !== 'q5_7' && x !== 'q5_8'), id];
        setAnswers({ ...answers, [q.id]: selected });
    } }} onNext={next} disabled={report.busy} onPrev={() => { if (!report.busy)
        index ? setIndex(index - 1) : setStep('landing'); }}/><p className="below-note" role="status">{report.busy ? 'Saving your eight answers…' : '8 questions. No extra setup.'}</p>{report.error && <div className="notice" role="alert"><p>{report.error}</p>{index===7&&<button className="primary-button" disabled={report.busy} onClick={()=>void next()}>Retry my result →</button>}</div>}</>}</QuizShell>;
}
