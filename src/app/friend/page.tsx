'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QuizShell } from '../../components/ui/QuizShell';
import { ChoiceQuestion } from '../../components/ui/ChoiceQuestion';
import { FriendReport } from '../../components/friend/FriendReport';
import {QuizCalculating} from '../../components/QuizCalculating';
import { ReportGate } from '../../components/ReportGate';
import { FRIEND_QUESTIONS } from '../../data/dualQuestions';
import { useReport } from '../../lib/useReport';
import { FriendFull } from '../../types/report';
export default function FriendPage() {
    const report = useReport('friend');
    const [started, setStarted] = useState(false), [index, setIndex] = useState(0), [answers, setAnswers] = useState<Record<number, string>>({}), [copied, setCopied] = useState('');
    const view = report.view;
    const q = FRIEND_QUESTIONS[index];
    const answering = started && (!view || view.role === 'guest' && !view.completed);
    const full = view?.full as FriendFull | undefined;
    const invite = view?.inviteToken && typeof window !== 'undefined' ? location.origin + '/friend#access=' + view.inviteToken : '';
    async function next(optionId?:string) { if (report.busy)
        return; if (index < 7)
        setIndex(index + 1);
    else if (await report.submit(optionId?{...answers,[q.id]:optionId}:answers, view?.role === 'guest' ? report.token : undefined))
        setStarted(false); }
    function reset() { report.clear(); setStarted(false); setAnswers({}); setIndex(0); setCopied(''); }
    async function copy() { try {
        await navigator.clipboard.writeText(invite);
        setCopied('Invitation copied. Send this link to your friend.');
    }
    catch {
        setCopied('Copy is unavailable. Select and copy the invitation below.');
    } }
    return <QuizShell mode="friend">{report.completionKind?<QuizCalculating kind={report.completionKind}/>:answering ? <><ChoiceQuestion title={q.title} subtitle="Choose your own preference. Your friend answers independently, and detailed comparisons open only after purchase and both people finish." options={q.options} selected={answers[q.id] || ''} onChange={id => { if (!report.busy)
        setAnswers({ ...answers, [q.id]: id }); }} onNext={next} disabled={report.busy} onBack={() => { if (report.busy)
        return; if (index)
        setIndex(index - 1);
    else
        setStarted(false); }} index={index} total={8} eyebrow={(view?.role === 'guest' ? 'YOUR FRIEND INVITED YOU' : 'YOUR FRIENDSHIP') + ' · ' + q.category.toUpperCase()} nextLabel={index === 7 ? 'Save my answers' : 'Continue'}/><p role="status" className="below-note">{report.busy ? 'Saving your answers…' : 'Eight questions. Just your own perspective.'}</p>{report.error && <p className="notice" role="alert">{report.error}</p>}</> : view ? <div className="result-wrap">{view.role === 'guest' && !view.completed ? <div className="handoff-card"><span className="handoff-flower">✳</span><p className="eyebrow">YOUR FRIEND HAS FINISHED</p><h1>Your turn.<br /><span className="hero-serif">No peeking.</span></h1><p>Answer eight questions for yourself. Your friend’s answers stay private until both people finish and the shared report is purchased.</p><p className="small-copy">Your friend handles the one-time purchase. You won’t be asked to pay. Both people can view the completed report.</p><button className="primary-button" onClick={() => setStarted(true)}>Answer my 8 questions →</button></div> : <>{view.role === 'owner' && invite && !view.completed && <section className="handoff-card"><span className="handoff-flower">✳</span><p className="eyebrow">YOUR EIGHT ANSWERS ARE IN</p><h1>Send it to<br /><span className="hero-serif">your bestie.</span></h1><p>1. Send this invitation. 2. Purchase the shared report below. 3. When your friend finishes, the reveal opens for both of you.</p><input className="choice w-full" aria-label="Friend invitation link" readOnly value={invite} onFocus={e => e.target.select()}/><button className="secondary-button" onClick={copy}>Copy invitation link ↗</button><p role="status" className="small-copy">{copied}</p><p className="small-copy">This invitation is for your friend. Your own private report link stays in this tab’s address bar—save it to return.</p></section>}{view.unlocked && full ? <FriendReport result={full}/> : <ReportGate view={view} busy={report.busy} error={report.error} onCheckout={report.checkout} onRefresh={report.refresh}/>}</>}<div className="result-end"><Link className="secondary-button" href="/">Try the Solo reflection →</Link><button className="text-button" onClick={reset}>Start a new friendship test</button></div></div> : report.token ? <div className="handoff-card"><p role="status">{report.error || 'Opening your private invitation…'}</p><button className="secondary-button" onClick={report.refresh}>Retry</button><button className="text-button" onClick={reset}>Start again</button></div> : <div className="duo-landing bestie-landing"><span className="bestie-flower">✳</span><p className="eyebrow">8 QUESTIONS EACH · TWO PERSPECTIVES</p><h1>Same braincell.<br /><span className="hero-serif">Or new lore?</span></h1><p className="duo-intro">How well do your friendship habits fit?<br />Answer for yourself. Invite your bestie. Discover what makes your dynamic yours.</p><div className="bestie-how"><div><span>01</span><h2>Your 8 answers</h2><p>Choose your own preferences.</p></div><div><span>02</span><h2>Invite & unlock</h2><p>Send their link. One purchase covers both.</p></div><div><span>03</span><h2>The reveal</h2><p>Your friend finishes. Your shared report opens.</p></div></div><div className="notice">Each person answers 8 questions independently on their own device. A brief snapshot is free. The person who starts the test can purchase the full reveal for $9.99. Both answers and payment confirmation are required to open the full report.</div><button className="primary-button hero-cta" onClick={() => setStarted(true)}>Start My 8 Questions <span>↗</span></button></div>}</QuizShell>;
}
