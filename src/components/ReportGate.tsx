'use client';
import Link from 'next/link';
import { ReportView } from '../types/report';
import { SafeShareCard } from './ui/SafeShareCard';

export function ReportGate({view,busy,error,onCheckout,onRefresh}:{view:ReportView;busy:boolean;error:string;onCheckout:()=>void;onRefresh:()=>void}) {
 const friend=view.mode==='friend',access=view.paid||view.previewUnlocked;
 const canPurchase=view.role==='owner'&&(!friend||view.completed);
 const price=(view.price/100).toFixed(2);
 const benefits=friend?['All eight side-by-side reveals, with both perspectives','Your shared strengths and the differences worth understanding','Five adaptable messages, including an opening for each of you','One answer-based first step and a seven-day shared plan']:['How your answers combine into a specific priority','Six signal interpretations with your actual answer evidence','A focused action and a seven-day plan for your situation','Three adaptable messages and clear follow-through criteria'];
 const explanation=access
  ? view.completed?'Refresh to open your unlocked report.':'Your shared unlock is saved. The full report opens for both people when your friend finishes.'
  : friend
   ? view.completed
    ? view.role==='owner'?'Your report is ready. Unlock once to open the full report for both of you immediately.':'Your report is ready. The person who started the test can unlock it once for both of you.'
    : 'Both people need to finish before the initiator can unlock the full report.'
   : 'Your free result shows the pattern. The full read helps you choose what to do next, with words you can make your own.';
 return <div className="design-gate">
  <section className="result-hero"><p className="eyebrow design-eyebrow"><img src="/design/status-dot.svg" width="7" height="7" alt=""/>{view.completed?(friend?'YOU BOTH FINISHED':'YOUR PATTERN'):'YOUR ANSWERS ARE SAVED'}</p>{!friend&&<span className="result-emoji" aria-hidden="true">✿</span>}<h1>{view.preview.name}</h1><p className="result-tagline">{view.preview.summary}</p><p className="small-copy">{friend?'Eight preferences each. One shared perspective to explore.':'Based on your 8 answers, not their private thoughts.'}</p></section>
  {view.preview.action&&<section className="today-card gate-move"><p className="eyebrow">YOUR MOVE TODAY · FREE</p><h2>{view.preview.action}</h2></section>}
  <section className="design-paper gate-tease"><p className="eyebrow">{friend?'YOUR SHARED STORY':'BEYOND THE SNAPSHOT'}</p>{(friend?['Your friendship habits','Where your expectations differ','Your next conversation']:['Your reported behavior','Your next seven days','The words to use']).map(label=><div key={label}><span aria-hidden="true">◇</span>{label}<span className="placeholder-line" aria-hidden="true"/></div>)}<p className="small-copy">The details stay in your full {friend?'duo report':'read'}.</p></section>
  <section className="design-paper gate-unlock">
   <p className="eyebrow">{view.previewUnlocked?'PREVIEW UNLOCKED':view.paid?'PURCHASE CONFIRMED':'THE NEXT CHAPTER'}</p>
   <h2>{access?<>Your unlock is saved.<br/><em>{view.completed?'Your report is ready.':'Waiting for your bestie.'}</em></>:friend?<>{view.completed?'Your report is ready.':'Waiting for your bestie.'}<br/><em>One unlock. Both of you.</em></>:<>Your pattern has a<br/><em>next chapter.</em></>}</h2>
   <p>{explanation}</p><ul>{benefits.map(t=><li key={t}><span aria-hidden="true">◇</span>{t}</li>)}</ul>
   {!access&&canPurchase&&<><button className="primary-button design-cta" disabled={busy} onClick={onCheckout}>{busy?(view.previewMode?'Unlocking your preview…':'Opening secure checkout…'):(friend?'Unlock our full report — $':'Unlock my full read — $')+price}<span aria-hidden="true">↗</span></button><p className="small-copy">{view.previewMode?'Preview mode · Click to unlock · No payment collected':'One-time payment · No subscription'}</p></>}
   {view.role==='guest'&&!access&&<p className="small-copy">Waiting for the initiator to unlock. One purchase opens the full report for both of you; you won’t be asked to pay.</p>}
   {friend&&!view.completed&&<p className="small-copy">Full report: ${price} total for both. The initiator can unlock after both people finish.</p>}
  </section>
  <p className="gate-storage">{view.storage==='browser'?'Saved in this browser for up to 30 days. Clearing browser data removes access.':'Private access lasts 30 days from the start of the test.'} <Link href="/refunds" className="underline">Refund policy</Link> · <Link href="/privacy" className="underline">Privacy</Link></p>
  <button className="secondary-button" onClick={onRefresh}>Refresh report status ↻</button>{error&&<p className="notice" role="alert">{error}</p>}
  {view.completed&&<SafeShareCard title={view.preview.name} symbol={friend?'✳':'✿'} mode={friend?'friend':'solo'} caption={view.preview.summary} path={friend?'/friend':'/'}/>}
  <p className="small-copy">{friend?'A playful comparison of preferences, not a measure of friendship quality.':'A self-reflection tool. Not a diagnosis or a prediction.'}</p>
 </div>;
}
