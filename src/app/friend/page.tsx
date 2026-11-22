'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { QuizShell } from '../../components/ui/QuizShell';
import { ChoiceQuestion } from '../../components/ui/ChoiceQuestion';
import { FriendHandoff } from '../../components/friend/FriendHandoff';
import { BestieLanding } from '../../components/friend/BestieLanding';
import { FriendReport } from '../../components/friend/FriendReport';
import {QuizCalculating} from '../../components/QuizCalculating';
import { ReportGate } from '../../components/ReportGate';
import { FRIEND_QUESTIONS } from '../../data/dualQuestions';
import { useReport } from '../../lib/useReport';
import { FriendFull } from '../../types/report';
import { friendDraftKey, parseFriendDraft } from '../../lib/friendDraft';
import { reportRequest } from '../../lib/reportRequest';
export default function FriendPage() {
    const report = useReport('friend');
    const [started, setStarted] = useState(false), [index, setIndex] = useState(0), [answers, setAnswers] = useState<Record<number, string>>({}), [copied, setCopied] = useState('');
    const [loadedDraft, setLoadedDraft] = useState(''), [resume, setResume] = useState(false);
    const [service, setService] = useState<'checking' | 'ready' | 'unavailable'>('checking'), [serviceError, setServiceError] = useState('');
    const draftKey = report.ready ? friendDraftKey(report.token) : '';
    useEffect(() => {
        if (!draftKey || loadedDraft === draftKey) return;
        let draft = null;
        try { draft = parseFriendDraft(localStorage.getItem(draftKey)); } catch { }
        setAnswers(draft?.answers || {}); setIndex(draft?.index || 0); setResume(!!draft);
        setLoadedDraft(draftKey);
    }, [draftKey, loadedDraft]);
    useEffect(() => {
        if (!started || !draftKey || loadedDraft !== draftKey) return;
        try { localStorage.setItem(draftKey, JSON.stringify({index, answers, savedAt: Date.now()})); } catch { }
    }, [started, draftKey, loadedDraft, index, answers]);
    const checkService = useCallback(async () => {
        setService('checking'); setServiceError('');
        try { await reportRequest('/api/reports/availability', {cache:'no-store'}); setService('ready'); }
        catch (error) { setService('unavailable'); setServiceError(error instanceof Error ? error.message : 'Friend invitations are temporarily unavailable.'); }
    }, []);
    useEffect(() => { void checkService(); }, [checkService]);
    const view = report.view;
    const q = FRIEND_QUESTIONS[index];
    const answering = started && (!view || view.role === 'guest' && !view.completed);
    const full = view?.full as FriendFull | undefined;
    const invite = view?.inviteToken && typeof window !== 'undefined' ? location.origin + '/friend#access=' + view.inviteToken : '';
    async function next(optionId?:string) { if (report.busy)
        return; if (index < 7)
        setIndex(index + 1);
    else {
        const finalAnswers = optionId ? {...answers, [q.id]:optionId} : answers;
        // Save before the request so even a reload during a failed submission retains question 8.
        try { localStorage.setItem(draftKey, JSON.stringify({index, answers:finalAnswers, savedAt:Date.now()})); } catch { }
        if (await report.submit(finalAnswers, view?.role === 'guest' ? report.token : undefined)) {
            try { localStorage.removeItem(draftKey); } catch { }
            setResume(false); setStarted(false);
        }
    } }
    function reset() { try { localStorage.removeItem(draftKey); } catch { } report.clear(); setStarted(false); setAnswers({}); setIndex(0); setResume(false); setCopied(''); }
    const serviceNotice = service === 'unavailable' && <div className="notice" role="alert"><p>{serviceError}</p><button className="secondary-button" onClick={()=>void checkService()}>Retry connection ↻</button></div>;
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
        { setResume(Object.keys(answers).length > 0); setStarted(false); } }} index={index} total={8} eyebrow={(view?.role === 'guest' ? 'YOUR FRIEND INVITED YOU' : 'YOUR FRIENDSHIP') + ' · ' + q.category.toUpperCase()} nextLabel={index === 7 ? 'Save my answers' : 'Continue'}/><p role="status" className="below-note">{report.busy ? 'Saving your answers…' : 'Eight questions. Just your own perspective.'}</p>{report.error && <div className="notice" role="alert"><p>{report.error}</p>{index===7&&<button className="primary-button" disabled={report.busy} onClick={()=>void next()}>Retry my result →</button>}</div>}</> : view ? <div className="result-wrap">{view.role === 'guest' && !view.completed ? <FriendHandoff role="guest" notice={serviceNotice} disabled={service!=='ready'||loadedDraft!==draftKey} onStart={()=>setStarted(true)}/> : <>{view.role === 'owner' && invite && !view.completed ? <FriendHandoff role="owner" invite={invite} copied={copied} onCopy={copy} price={view.price} access={view.paid} notice={<>{report.error&&<p className="notice" role="alert">{report.error}</p>}<button className="secondary-button" onClick={report.refresh}>Refresh report status ↻</button></>}/> : view.unlocked && full ? <FriendReport result={full}/> : <ReportGate view={view} busy={report.busy} error={report.error} paymentNotice={report.paymentNotice} onCheckout={report.checkout} onRefresh={report.refresh}/>}</>}<div className="result-end"><Link className="secondary-button" href="/">Try the Solo reflection →</Link><button className="text-button" onClick={reset}>Start a new friendship test</button></div></div> : report.token ? <div className="handoff-card"><p role="status">{report.error || 'Opening your private invitation…'}</p><button className="secondary-button" onClick={report.refresh}>Retry</button><button className="text-button" onClick={reset}>Start again</button></div> : <BestieLanding onStart={()=>setStarted(true)} onClear={reset} resume={resume} checking={service==='checking'} disabled={service!=='ready'||loadedDraft!==draftKey} notice={serviceNotice}/>} </QuizShell>;
}
