import { premiumPaths, premiumSignals } from './premiumGuidance';
import { analyzeSoloResult } from './soloAnalysis';
import type { QuizResultData, ScriptItem } from '../types/quiz';
export type ReadGoal='recommended'|ScriptItem['type'];
export function focusedSoloRead(result:QuizResultData,goal:ReadGoal='recommended'){
 const analysis=analyzeSoloResult(result),rec=analysis.recommendation,recommended=rec.tone;
 const selected=goal==='recommended'?recommended:goal;
 const base=premiumPaths(result).find(p=>p.id===selected)!;
 const script=analysis.scripts.find(s=>s.type===selected)!;
 return {analysis,signals:premiumSignals(result),evidence:result.evidence.slice(0,3),recommended,selected,
  path:{...base,title:goal==='recommended'?rec.title:base.title,fit:rec.caution},
  action:goal==='recommended'?rec.action:base.action,reason:goal==='recommended'?rec.reason:base.fit,
  script,observe:goal==='recommended'?rec.observe:selected==='boundary'?'Notice whether the limit you stated is respected. You control your own time and contact.':rec.observe,
  alternatives:premiumPaths(result).filter(p=>p.id!==selected)};
}
