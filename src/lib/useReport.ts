'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import {completeAfter,CompletionKind} from './completionTransition';
import {reportRequest} from './reportRequest';
import { ReportView } from '../types/report';
const readLocal = (key: string) => { try {
    return localStorage.getItem(key) || '';
}
catch {
    return '';
} };
const writeLocal = (key: string, value: string) => { try {
    localStorage.setItem(key, value);
}
catch { } };
export function useReport(mode: 'solo' | 'friend') {
    const submission=useRef(0),submitting=useRef(false);
    const [completionKind,setCompletionKind]=useState<CompletionKind|null>(null);
    useEffect(()=>()=>{submission.current++;submitting.current=false;},[]);
    const [token, setToken] = useState(''), [view, setView] = useState<ReportView | null>(null), [error, setError] = useState(''), [busy, setBusy] = useState(false), [ready, setReady] = useState(false),[browserAnswers,setBrowserAnswers]=useState<Record<number,string|string[]>|null>(null);
    const refresh = useCallback(async (access: string) => { try {
        const data=await reportRequest('/api/reports',{headers:{Authorization:'Bearer '+access},cache:'no-store'});
        setView(data);
        setError('');
    }
    catch (e) {
        setError(e instanceof Error ? e.message : 'Unable to load report');
    } }, []);
    useEffect(() => { const access = new URLSearchParams(location.hash.slice(1)).get('access') || readLocal('mixedsigns_' + mode + '_access') || ''; if (access) {
        setToken(access);
        writeLocal('mixedsigns_' + mode + '_access', access);
        void refresh(access);
    }
    else if(mode==='solo'){try{const saved=JSON.parse(readLocal('mixedsigns_solo_browser')||'null');if(saved&&saved.expiresAt>Date.now()){setBrowserAnswers(saved.answers);void reportRequest('/api/reports/solo-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:saved.answers,unlock:saved.unlocked})}).then(setView).catch(e=>setError(e.message));}}catch{}}
    setReady(true); }, [mode, refresh]);
    useEffect(() => { if (!token || !view || view.unlocked)
        return; const id = setInterval(() => { if (document.visibilityState === 'visible')
        void refresh(token); }, 8000); return () => clearInterval(id); }, [token, view, refresh]);
    async function submit(answers: Record<number, string | string[]>, guestToken?: string) { if(submitting.current)return false;submitting.current=true;const ticket=++submission.current;setCompletionKind(mode==='solo'?'solo':guestToken?'friend-result':'friend-invite');setBusy(true);setError('');try {
        const data=await completeAfter(reportRequest('/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,answers,token:guestToken})}),window.matchMedia('(prefers-reduced-motion: reduce)').matches?350:2100);
        if(ticket!==submission.current)return false;
        if(data.browserOnly){setBrowserAnswers(answers);setToken('');writeLocal('mixedsigns_solo_access','');writeLocal('mixedsigns_solo_browser',JSON.stringify({answers,unlocked:false,expiresAt:data.expiresAt}));history.replaceState(null,'',location.pathname);setView(data);return true;}
        if(mode==='solo'){try{localStorage.removeItem('mixedsigns_solo_browser');}catch{}}
        const access = data.token || guestToken;
        setToken(access);
        writeLocal('mixedsigns_' + mode + '_access', access);
        history.replaceState(null, '', location.pathname + '#access=' + access);
        setView(data);
        return true;
    }
    catch (e) {
        if(ticket===submission.current)setError(e instanceof Error ? e.message : 'Could not save answers');
        return false;
    }
    finally {
        if(ticket===submission.current){submitting.current=false;setBusy(false);setCompletionKind(null);}
    } }
    async function checkout() { setBusy(true); setError(''); try {
        if(browserAnswers){if(!view?.previewMode)throw new Error('Purchases are temporarily unavailable. Your free result and answers are saved; please try again later.');const data=await reportRequest('/api/reports/solo-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:browserAnswers,unlock:true})});setView(data);writeLocal('mixedsigns_solo_browser',JSON.stringify({answers:browserAnswers,unlocked:data.unlocked,expiresAt:data.expiresAt}));setBusy(false);window.scrollTo(0,0);return;}
        const data=await reportRequest(view?.previewMode?'/api/reports/preview':'/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
        if(view?.previewMode){setView(data);setBusy(false);window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}else location.assign(data.url);
    }
    catch (e) {
        setError(e instanceof Error ? e.message : 'Checkout unavailable');
        setBusy(false);
    } }
    function clear() { submission.current++;submitting.current=false;setCompletionKind(null);setBusy(false);try {
        localStorage.removeItem('mixedsigns_' + mode + '_access');if(mode==='solo')localStorage.removeItem('mixedsigns_solo_browser');
    }
    catch { } setBrowserAnswers(null);setToken(''); setView(null); setError(''); history.replaceState(null, '', location.pathname); }
    return { token, view, error, busy, ready, completionKind, submit, checkout, refresh: () => browserAnswers?reportRequest('/api/reports/solo-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:browserAnswers,unlock:view?.unlocked})}).then(setView).catch(e=>setError(e.message)):refresh(token), clear };
}
