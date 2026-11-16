'use client';
import { useEffect, useState } from 'react';
import { createShareCardImage } from '../../lib/shareCardImage';
import { trackEvent } from '../../lib/analytics';
export function SafeShareCard({ title, symbol, mode, caption, path }: {
    title: string;
    symbol: string;
    mode: 'solo' | 'duo_talking' | 'duo_couples' | 'friend';
    caption: string;
    path: string;
}) {
    const [busy, setBusy] = useState(false), [message, setMessage] = useState('');
    const [output, setOutput] = useState<{url:string;file:File}|null>(null);
    useEffect(()=>()=>{if(output)URL.revokeObjectURL(output.url);},[output]);
    async function download() {
        if(busy)return;
        setBusy(true);setMessage('');
        try {
            const blob=await createShareCardImage({title,caption,symbol});
            const filename='mixedsigns-'+(mode==='friend'?'bestie':'pattern')+'.png';
            const file=new File([blob],filename,{type:'image/png'}),url=URL.createObjectURL(blob);
            setOutput({url,file});
            const link=document.createElement('a');link.href=url;link.download=filename;
            document.body.appendChild(link);link.click();link.remove();
            setMessage('Your PNG is ready. If it did not save, open the image below and press and hold to save it.');
            trackEvent('share_card_generated',{mode});
        } catch {
            setMessage('Could not create the image. Please try again, or share the public quiz link.');
        } finally {setBusy(false);}
    }
    async function shareImage(){
        if(!output)return;
        try{await navigator.share({files:[output.file],title:'mixedsigns'});}
        catch(error){if(!(error instanceof DOMException&&error.name==='AbortError'))setMessage('Open the PNG below to save or share it.');}
    }
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
    return <section className="share-section"><div><span className="eyebrow">KEEP THE LESSON. SHARE THE PATTERN.</span><h2>A little perspective<br />for the group chat.</h2><p>This card includes only the summary you see here. Individual answers and private scripts stay out of the image.</p><div className="share-actions"><button className="primary-button" onClick={download} disabled={busy}>{busy ? 'Creating…' : 'Download card ↓'}</button><button className="secondary-button" onClick={share}>Share quiz ↗</button></div><p role="status" className="small-copy">{message}</p>{output&&<div className="share-save-options"><a className="secondary-button" href={output.url} target="_blank" rel="noopener noreferrer">Open PNG to save ↗</a>{typeof navigator!=='undefined'&&navigator.canShare?.({files:[output.file]})&&<button className="secondary-button" onClick={shareImage}>Save or share image ↗</button>}</div>}</div><div className="share-preview"><span className="eyebrow">✿ mixedsigns</span><span className="share-emoji" aria-hidden="true">{symbol}</span><h3>{title}</h3><p>{caption}</p><span className="small-copy">A little less guessing. A little more clarity.</span></div></section>;
}
