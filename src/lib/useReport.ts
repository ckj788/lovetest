'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import {completeAfter,CompletionKind} from './completionTransition';
import {reportRequest} from './reportRequest';
import { ReportView } from '../types/report';
import type { Answers } from './reports';

const SOLO_BROWSER_KEY = 'mixedsigns_solo_browser';
const SOLO_BROWSER_HASH = '#saved-report';
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
function readSoloBrowserAnswers(): Answers | null {
    try {
        const saved = JSON.parse(readLocal(SOLO_BROWSER_KEY) || 'null');
        return saved?.expiresAt > Date.now() && saved.answers ? saved.answers : null;
    } catch {
        return null;
    }
}
export function useReport(mode: 'solo' | 'friend') {
    const accessKey = 'mixedsigns_' + mode + '_access';
    const submission=useRef(0),submitting=useRef(false);
    const checkoutInProgress = useRef(false), confirming = useRef(false);
    const [completionKind,setCompletionKind]=useState<CompletionKind|null>(null);
    const [paymentNotice, setPaymentNotice] = useState('');
    const [hasSavedSoloReport, setHasSavedSoloReport] = useState(false);
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
    const confirmPayment = useCallback(async (access: string) => {
        if (confirming.current) return;
        confirming.current = true;
        setPaymentNotice('Checking your payment with Stripe…');
        try {
            const data: ReportView = await reportRequest('/api/checkout/confirm', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: access }),
            });
            setView(data);
            setError('');
            setPaymentNotice(data.paid || data.refunded ? '' : 'Waiting for Stripe to confirm payment. Refresh below to check again.');
        } catch {
            await refresh(access);
            setPaymentNotice('If you just paid, refresh the report to check your confirmation.');
        } finally {
            confirming.current = false;
        }
    }, [refresh]);
    const openReport = useCallback((access: string, checkoutStatus?: string | null) => {
        setToken(access);
        writeLocal(accessKey, access);
        if (checkoutStatus === 'returned') {
            void confirmPayment(access);
        } else {
            if (checkoutStatus === 'cancelled') setPaymentNotice('Checkout was closed. Your answers are saved, and you can try again.');
            void refresh(access);
        }
    }, [accessKey, confirmPayment, refresh]);
    const openSoloBrowserReport = useCallback((answers: Answers) => {
        setBrowserAnswers(answers);
        setError('');
        void reportRequest('/api/reports/solo-preview', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }),
        }).then(setView).catch(error => setError(error.message));
    }, []);
    useEffect(() => {
        const linkedAccess = new URLSearchParams(location.hash.slice(1)).get('access');
        const checkoutStatus = new URLSearchParams(location.search).get('checkout');
        const returningFromCheckout = checkoutStatus === 'returned' || checkoutStatus === 'cancelled';
        const savedAccess = readLocal(accessKey);
        const access = linkedAccess || (mode === 'friend' || returningFromCheckout ? savedAccess : '');
        if (mode === 'solo') {
            const savedAnswers = readSoloBrowserAnswers();
            setHasSavedSoloReport(!!(savedAccess || savedAnswers));
            if (!access && savedAnswers && location.hash === SOLO_BROWSER_HASH) openSoloBrowserReport(savedAnswers);
        }
        if (access) {
            if (!linkedAccess && returningFromCheckout) {
                history.replaceState(null, '', location.pathname + location.search + '#access=' + encodeURIComponent(access));
            }
            openReport(access, checkoutStatus);
        }
        setReady(true);
    }, [accessKey, mode, openReport, openSoloBrowserReport]);
    useEffect(() => {
        if (mode !== 'solo') return;
        const isReportHash = (hash: string) => hash === SOLO_BROWSER_HASH || new URLSearchParams(hash.slice(1)).has('access');
        function navigateReport(event: HashChangeEvent) {
            if (isReportHash(location.hash) || isReportHash(new URL(event.oldURL).hash)) location.reload();
        }
        window.addEventListener('hashchange', navigateReport);
        return () => window.removeEventListener('hashchange', navigateReport);
    }, [mode]);
    function openSavedSoloReport() {
        const access = readLocal(accessKey);
        if (access) {
            history.replaceState(null, '', location.pathname + '#access=' + encodeURIComponent(access));
            openReport(access);
            return;
        }
        const answers = readSoloBrowserAnswers();
        if (answers) {
            history.replaceState(null, '', location.pathname + SOLO_BROWSER_HASH);
            openSoloBrowserReport(answers);
        } else {
            setHasSavedSoloReport(false);
        }
    }
    useEffect(() => {
        if (!view?.paid && !view?.refunded) return;
        setPaymentNotice('');
        const url = new URL(location.href);
        if (url.searchParams.has('checkout')) {
            url.searchParams.delete('checkout');
            history.replaceState(null, '', url.pathname + url.search + url.hash);
        }
    }, [view?.paid, view?.refunded]);
    useEffect(() => { if (!token || !view || view.unlocked)
        return; const id = setInterval(() => { if (document.visibilityState === 'visible')
        void refresh(token); }, 8000); return () => clearInterval(id); }, [token, view, refresh]);
    async function submit(answers: Record<number, string | string[]>, guestToken?: string) { if(submitting.current)return false;submitting.current=true;const ticket=++submission.current;setCompletionKind(mode==='solo'?'solo':guestToken?'friend-result':'friend-invite');setBusy(true);setError('');try {
        const data=await completeAfter(reportRequest('/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,answers,token:guestToken})}),window.matchMedia('(prefers-reduced-motion: reduce)').matches?350:2100);
        if(ticket!==submission.current)return false;
        if(data.browserOnly){setBrowserAnswers(answers);setToken('');writeLocal(accessKey,'');writeLocal(SOLO_BROWSER_KEY,JSON.stringify({answers,unlocked:false,expiresAt:data.expiresAt}));history.replaceState(null,'',location.pathname+SOLO_BROWSER_HASH);setView(data);return true;}
        if(mode==='solo'){try{localStorage.removeItem(SOLO_BROWSER_KEY);}catch{}}
        const access = data.token || guestToken;
        setToken(access);
        writeLocal(accessKey, access);
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
    async function checkout() {
        if (!view?.checkoutAvailable || checkoutInProgress.current || confirming.current) return;
        checkoutInProgress.current = true;
        setBusy(true);
        setError('');
        setPaymentNotice('');
        try {
            let access = token;
            if (browserAnswers) {
                // Promote a device-only Solo result to a persisted report before accepting payment.
                const saved = await reportRequest('/api/reports', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mode: 'solo', answers: browserAnswers }),
                });
                if (!saved.token) throw new Error('Checkout is temporarily unavailable. Your answers are saved on this device. Please try again shortly.');
                access = saved.token;
                setToken(access);
                setBrowserAnswers(null);
                writeLocal(accessKey, access);
                history.replaceState(null, '', location.pathname + '#access=' + access);
                setView(saved);
            }
            const data = await reportRequest('/api/checkout', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: access }),
            });
            location.assign(data.url);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Checkout unavailable');
        } finally {
            checkoutInProgress.current = false;
            setBusy(false);
        }
    }
    function clear() { submission.current++;submitting.current=false;setCompletionKind(null);setBusy(false);try {
        localStorage.removeItem(accessKey);if(mode==='solo')localStorage.removeItem(SOLO_BROWSER_KEY);
    }
    catch { } setHasSavedSoloReport(false);setBrowserAnswers(null);setToken(''); setView(null); setError(''); setPaymentNotice(''); history.replaceState(null, '', location.pathname); }
    function refreshPaymentOrReport() {
        if (browserAnswers) return reportRequest('/api/reports/solo-preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:browserAnswers})}).then(setView).catch(e=>setError(e.message));
        if (new URLSearchParams(location.search).get('checkout') === 'returned') return confirmPayment(token);
        return refresh(token);
    }
    return { token, view, error, busy, ready, completionKind, paymentNotice, hasSavedSoloReport, browserOnly: browserAnswers !== null, openSavedSoloReport, submit, checkout, refresh: refreshPaymentOrReport, clear };
}
