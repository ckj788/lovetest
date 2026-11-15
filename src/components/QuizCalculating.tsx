'use client';
import {BrandFlower} from './ui/BrandFlower';
import {useEffect} from 'react';
import {COMPLETION_COPY,CompletionKind} from '../lib/completionTransition';
export function QuizCalculating({kind='solo'}:{kind?:CompletionKind}){
 const copy=COMPLETION_COPY[kind];
 useEffect(()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},[]);
 return <section className="completion-wrap" aria-busy="true" role="status" aria-live="polite"><div className="completion-card soft-card"><div className="completion-art" aria-hidden="true"><div className="completion-orbit"/><div className="completion-orbit completion-orbit-inner"/><BrandFlower className="completion-flower" size={64}/><span className="completion-petal petal-one">✦</span><span className="completion-petal petal-two">✦</span><span className="completion-petal petal-three">✦</span></div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="completion-description">{copy.subtitle}</p><div className="completion-notes" aria-hidden="true">{copy.notes.map((note,i)=><div className="completion-note" style={{animationDelay:(i*140)+'ms'}} key={note}><span>✧</span>{note}</div>)}</div><div className="completion-track" aria-hidden="true"><span/></div><p className="small-copy">A pattern to explore. A little more clarity.</p></div></section>;
}
