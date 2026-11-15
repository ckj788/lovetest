import type { QuizResultData } from '../../types/quiz';
import { premiumSignals } from '../../data/premiumGuidance';

export function SignalMap({result}:{result:QuizResultData}) {
 const signals=premiumSignals(result),center=120,radius=86;
 const point=(i:number,r:number)=>{const angle=(i*60-90)*Math.PI/180;return [center+Math.cos(angle)*r,center+Math.sin(angle)*r];};
 const polygon=(r:number)=>signals.map((_,i)=>point(i,r).join(',')).join(' ');
 const known=signals.every(s=>s.value!==null);
 return <div className="design-paper premium-map"><svg viewBox="0 0 240 240" role="img" aria-label="Six-signal map of the behaviors you reported. Unknown signals are marked separately below.">{[.25,.5,.75,1].map(scale=><polygon key={scale} points={polygon(radius*scale)} fill="none" stroke="#c4c3e3" strokeWidth="1"/>)}{signals.map((s,i)=><line key={s.id} x1={center} y1={center} x2={point(i,radius)[0]} y2={point(i,radius)[1]} stroke="#c4c3e3"/>)}{known&&<polygon points={signals.map((s,i)=>point(i,radius*s.value!/100).join(',')).join(' ')} fill="#d64c242b" stroke="#d64c24" strokeWidth="2"/>}{signals.map((s,i)=>s.value===null?<circle key={s.id} cx={point(i,radius)[0]} cy={point(i,radius)[1]} r="4" fill="none" stroke="#504e76"/>:<circle key={s.id} cx={point(i,radius*s.value/100)[0]} cy={point(i,radius*s.value/100)[1]} r="4" fill="#d64c24"/>)}{signals.map((s,i)=><text key={s.id} x={point(i,radius+20)[0]} y={point(i,radius+20)[1]+4} textAnchor="middle" fontSize="10" fill="#504e76">{i+1}</text>)}</svg><ol>{signals.map((s,i)=><li key={s.id}><span>{i+1}. {s.label}</span><strong>{s.band}</strong></li>)}</ol><p className="small-copy">A visual summary of reported behavior, not a measure of attraction or a prediction. Missing evidence is never treated as zero.</p></div>;
}
