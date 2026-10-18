'use client';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { trackEvent } from '../../lib/analytics';
export function SafeShareCard({ title, symbol, mode, caption, path }: {
    title: string;
    symbol: string;
    mode: 'solo' | 'duo_talking' | 'duo_couples' | 'friend';
    caption: string;
    path: string;
}) {
    const ref = useRef<HTMLDivElement>(null), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
    async function download() { if (!ref.current)
        return; setBusy(true); try {
        const url = await toPng(ref.current, { pixelRatio: 3, backgroundColor: '#FDF8E2' });
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mixedsigns-' + (mode === 'friend' ? 'bestie' : 'pattern') + '.png';
        a.click();
        trackEvent('share_card_generated', { mode });
        setMessage('Your card is ready. Individual answers and scripts aren’t included.');
    }
    catch {
        setMessage('Image download is unavailable. You can share the quiz link instead.');
    }
    finally {
        setBusy(false);
    } }
    async function share() { const url = window.location.origin + path + '?ref=' + mode + '-card'; try {
        if (navigator.share)
            await navigator.share({ title: 'mixedsigns', text: 'A little less guessing. A little more clarity.', url });
        else {
            await navigator.clipboard.writeText(url);
            setMessage('Public quiz link copied. No answers are included.');
        }
        trackEvent('share_clicked', { mode });
    }
    catch {
        setMessage('Sharing cancelled or unavailable. Public quiz: ' + window.location.origin + path);
    } }
    return <section className="share-section"><div><span className="eyebrow">KEEP THE LESSON. SHARE THE PATTERN.</span><h2>A little perspective<br />for the group chat.</h2><p>This card includes only the summary you see here. Individual answers and private scripts stay out of the image.</p><div className="share-actions"><button className="primary-button" onClick={download} disabled={busy}>{busy ? 'Creating…' : 'Download card ↓'}</button><button className="secondary-button" onClick={share}>Share quiz ↗</button></div><p role="status" className="small-copy">{message}</p></div><div ref={ref} className="share-preview"><span className="eyebrow">✿ mixedsigns</span><span className="share-emoji" aria-hidden="true">{symbol}</span><h3>{title}</h3><p>{caption}</p><span className="small-copy">A little less guessing. A little more clarity.</span></div></section>;
}
