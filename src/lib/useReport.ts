'use client';
import { useCallback, useEffect, useState } from 'react';
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
    const [token, setToken] = useState(''), [view, setView] = useState<ReportView | null>(null), [error, setError] = useState(''), [busy, setBusy] = useState(false), [ready, setReady] = useState(false);
    const refresh = useCallback(async (access: string) => { try {
        const res = await fetch('/api/reports', { headers: { Authorization: 'Bearer ' + access }, cache: 'no-store' });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.error);
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
    } setReady(true); }, [mode, refresh]);
    useEffect(() => { if (!token || !view || view.unlocked)
        return; const id = setInterval(() => { if (document.visibilityState === 'visible')
        void refresh(token); }, 8000); return () => clearInterval(id); }, [token, view, refresh]);
    async function submit(answers: Record<number, string | string[]>, guestToken?: string) { setBusy(true); setError(''); try {
        const res = await fetch('/api/reports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, answers, token: guestToken }) });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.error);
        const access = data.token || guestToken;
        setToken(access);
        writeLocal('mixedsigns_' + mode + '_access', access);
        history.replaceState(null, '', location.pathname + '#access=' + access);
        setView(data);
        return true;
    }
    catch (e) {
        setError(e instanceof Error ? e.message : 'Could not save answers');
        return false;
    }
    finally {
        setBusy(false);
    } }
    async function checkout() { setBusy(true); setError(''); try {
        const res = await fetch(view?.previewMode?'/api/reports/preview':'/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.error);
        if(view?.previewMode){setView(data);setBusy(false);window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}else location.assign(data.url);
    }
    catch (e) {
        setError(e instanceof Error ? e.message : 'Checkout unavailable');
        setBusy(false);
    } }
    function clear() { try {
        localStorage.removeItem('mixedsigns_' + mode + '_access');
    }
    catch { } setToken(''); setView(null); setError(''); history.replaceState(null, '', location.pathname); }
    return { token, view, error, busy, ready, submit, checkout, refresh: () => refresh(token), clear };
}
