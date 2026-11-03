'use client';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
export interface Choice {id:string;label:string}
const useVisualEffect=typeof window!=='undefined'?useLayoutEffect:useEffect;
type Phase='enter'|'idle'|'selected'|'exit'|'exit-back'|'enter-back';
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export function ChoiceQuestion({title,subtitle,options,selected,onChange,onNext,onBack,index,total,eyebrow,multi=false,nextLabel='Continue',disabled=false}:{title:string;subtitle?:string;options:Choice[];selected:string|string[];onChange:(id:string)=>void;onNext:(id?:string)=>void|Promise<void>;onBack:()=>void;index:number;total:number;eyebrow?:string;multi?:boolean;nextLabel?:string;disabled?:boolean}){
 const heading=useRef<HTMLLegendElement>(null),wrap=useRef<HTMLDivElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null),entryTimer=useRef<ReturnType<typeof setTimeout>|null>(null),locked=useRef(false),generation=useRef(0),direction=useRef<'forward'|'back'>('forward');
 const [phase,setPhase]=useState<Phase>('enter');
 useVisualEffect(()=>{
  generation.current++;locked.current=false;setPhase(direction.current==='back'?'enter-back':'enter');
  heading.current?.focus({preventScroll:true});
  const frame=wrap.current,header=document.querySelector('.site-header');
  if(frame){const top=frame.getBoundingClientRect().top,headerBottom=header?.getBoundingClientRect().bottom||0;if(top<headerBottom||top>window.innerHeight*.5)frame.scrollIntoView({behavior:reducedMotion()?'instant':'smooth',block:'start'});}
  entryTimer.current=setTimeout(()=>setPhase('idle'),reducedMotion()?0:350);
  return()=>{generation.current++;if(timer.current)clearTimeout(timer.current);if(entryTimer.current)clearTimeout(entryTimer.current);};
 },[title,index]);
 const hasSelection=Array.isArray(selected)?selected.length>0:!!selected;
 const advancing=phase==='selected'||phase==='exit'||phase==='exit-back';
 function advance(id?:string){
  if(disabled||locked.current)return;locked.current=true;direction.current='forward';if(entryTimer.current)clearTimeout(entryTimer.current);const current=generation.current;
  const leave=()=>{setPhase('exit');timer.current=setTimeout(async()=>{try{await onNext(id);}finally{if(generation.current===current){locked.current=false;setPhase('enter');}}},reducedMotion()?0:160);};
  if(id){setPhase('selected');timer.current=setTimeout(leave,reducedMotion()?0:150);}else leave();
 }
 function select(id:string){if(disabled||locked.current)return;onChange(id);if(!multi)advance(id);}
 function back(){
  if(disabled)return;if(timer.current)clearTimeout(timer.current);if(entryTimer.current)clearTimeout(entryTimer.current);generation.current++;locked.current=true;direction.current='back';setPhase('exit-back');const current=generation.current;
  timer.current=setTimeout(()=>{onBack();if(generation.current===current){locked.current=false;setPhase('enter-back');}},reducedMotion()?0:160);
 }
 return <div ref={wrap} className="question-wrap" data-transition={phase}><div className="question-progress"><span key={title} className="question-step-label">{eyebrow||'YOUR SITUATION'}</span><span>{index+1} <span className="muted">/ {total}</span></span></div><div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={index+1} aria-valuemin={0} aria-valuemax={total}><div style={{width:((index+1)/total*100)+'%'}}/></div><form key={title} onSubmit={e=>{e.preventDefault();if(multi&&hasSelection)advance();}} className="question-card" aria-busy={advancing||disabled}><fieldset disabled={disabled||advancing}><legend ref={heading} tabIndex={-1} className="question-title">{title}</legend><p className="question-helper">{subtitle||'Think about the last 30 days, or your last 5 meaningful interactions.'}</p><div className="choice-list">{options.map((option,i)=>{const checked=Array.isArray(selected)?selected.includes(option.id):selected===option.id;return <label className={'choice '+(checked?'selected':'')} style={{'--choice-index':i} as CSSProperties} key={option.id}><input type={multi?'checkbox':'radio'} name="answer" value={option.id} checked={checked} onChange={()=>select(option.id)} onClick={()=>{if(!multi&&checked)select(option.id);}}/><span className="choice-letter" aria-hidden="true">{String.fromCharCode(65+i)}</span><span className="choice-copy">{option.label}</span><span className="choice-check" aria-hidden="true">{checked?'✓':''}</span></label>;})}</div></fieldset><div className="question-actions"><button type="button" className="text-button" disabled={disabled||phase==='exit-back'} onClick={back}>← Back</button><span className="selection-note" aria-live="polite">{multi?'Select all that apply':advancing?'Moving to the next question…':'Select an answer to continue automatically'}</span>{multi&&<button type="submit" className="primary-button" disabled={!hasSelection||disabled||advancing}>{nextLabel} <span aria-hidden="true">→</span></button>}</div></form><p className="below-note">{multi?'Select all that apply, then confirm to continue.':'Select one answer to continue automatically. You can go back to change it.'}</p></div>;
}
