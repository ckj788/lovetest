'use client';
export function FriendHandoff({role,invite='',copied='',onCopy,onStart,disabled=false,notice,price=999,access=false}:{role:'owner'|'guest';invite?:string;copied?:string;onCopy?:()=>void;onStart?:()=>void;disabled?:boolean;notice?:React.ReactNode;price?:number;access?:boolean}) {
 if(role==='guest')return <section className="design-handoff">
  <p className="eyebrow design-eyebrow"><img src="/design/status-dot.svg" width="7" height="7" alt=""/>YOU’VE BEEN SUMMONED</p><div className="guest-avatars" aria-hidden="true"><span>✿</span><span>?</span></div>
  <h1>Your bestie<br/>already answered.<br/><em>Your turn.</em></h1><p>8 questions about how you do friendship. Then you both get a free snapshot. The initiator can unlock the full report once you both finish.</p>
  <ul className="design-paper guest-checklist"><li><span>✓</span>Takes 2 minutes, no sign-up</li><li><span>✓</span>Your answers stay separate until both finish and the full report is unlocked.</li><li><span>✓</span>Your friend handles the shared unlock after you both finish. You won’t be asked to pay.</li></ul>
  {notice}<button className="primary-button design-cta" onClick={onStart} disabled={disabled}>Start my 8 questions<span>↗</span></button><p className="design-pullquote">Not a romance test. Just you two, finally explained.</p>
 </section>;
 return <section className="design-handoff">
  <div className="handoff-steps" aria-label="Invitation progress"><b>✓</b><span>You answered</span><span>—</span><b>2</b><span>Send your link</span><span>—</span><b>3</b><span>Reveal</span></div>
  <h1>Now send your link.<br/><em>No peeking.</em></h1><p>{access?'Your shared unlock is saved. Send your friend the invitation so they can finish their eight questions and open the report for both of you.':'First, let your bestie answer their eight questions. You’ll both get a free snapshot; then you can choose to unlock the full report for both of you.'}</p>
  <div className="handoff-link"><input aria-label="Friend invitation link" readOnly value={invite} onFocus={e=>e.target.select()}/><button onClick={onCopy}>Copy</button></div><button className="primary-button design-cta" onClick={onCopy}>Copy my invitation<span>↗</span></button><p role="status" className="small-copy">{copied}</p>
  <div className="design-paper tint-0 handoff-message"><p className="eyebrow">MESSAGE PREVIEW</p><blockquote>I need your answers for this. 8 questions, 2 min, don’t overthink it 👀</blockquote></div>
  <div className="design-paper handoff-waiting"><h2><span className="coral">○</span> Waiting on your bestie…</h2><p>Your eight answers are saved. This page checks for their completion automatically.</p>
   <p>{access?'Your shared unlock is already saved. The full report opens for both of you when your friend finishes; no further payment is needed.':<>Full report: ${(price/100).toFixed(2)} total for both of you. No payment is needed until both people finish.</>}</p>
   {notice}<p>Keep your own private report link in this tab’s address bar to return. The invitation above is for your friend.</p>
  </div>
  <p className="gate-storage">Private access lasts 30 days from the start of the test.</p>
 </section>;
}
