import { DIMENSION_LABELS, QUIZ_QUESTIONS } from './questions';
import type { QuizResultData, SoloDimension } from '../types/quiz';

export const SIGNAL_GUIDANCE: Record<SoloDimension, { meaning:string; healthy:string; watch:string }> = {
 initiative:{meaning:'Who creates chances to connect is one observable part of shared effort. Frequency alone does not establish affection.',healthy:'Both can initiate in ways that fit their capacity, without keeping a secret tally.',watch:'After discussing the balance, notice whether each person takes responsibility for a concrete plan.'},
 reliability:{meaning:'Kept plans and clear updates make expectations easier to trust. One reliable area does not establish commitment in every area.',healthy:'Plans have details, changes are communicated, and a cancellation comes with a realistic alternative.',watch:'Compare what was agreed with what happened, including how changes were handled.'},
 emotionalAvailability:{meaning:'A response to an ordinary difficult moment can tell you about the support available in this connection.',healthy:'Both people can ask for listening, practical help, or space, and state their limits.',watch:'Notice whether the response fits the support you actually asked for, rather than an unspoken expectation.'},
 realLifeIntegration:{meaning:'Everyday inclusion is one kind of investment. Work, privacy, culture, and how long you have known each other can affect it.',healthy:'You understand each other’s boundaries around friends, routines, privacy, and shared time.',watch:'Ask what kind of ordinary inclusion is comfortable. Public visibility is not the only evidence of care.'},
 clarity:{meaning:'A shared understanding is more informative than assuming you both mean the same thing by closeness.',healthy:'Both can state what they want, including a mutually agreed casual or non-exclusive arrangement.',watch:'After asking directly, notice whether you have a workable shared expectation or still need to clarify a specific point.'},
 momentum:{meaning:'Direction means changes you can name, rather than intensity or speed. A steady arrangement can be right when both want it.',healthy:'Any next step is freely chosen, realistic, and wanted by both people.',watch:'Look for follow-through on the step you actually agreed, rather than a deadline the other person never accepted.'},
};
export const signalBand=(value:number|null)=>value===null?'Not enough evidence':value>=70?'More consistent':value>=40?'Mixed evidence':'Less consistent';

export function premiumSignals(result:QuizResultData) {
 return (Object.keys(DIMENSION_LABELS) as SoloDimension[]).map(id=>({
  id,label:DIMENSION_LABELS[id],value:result.dimensionScores[id],band:signalBand(result.dimensionScores[id]),...SIGNAL_GUIDANCE[id],
  evidence:QUIZ_QUESTIONS.flatMap(q=>{
   const raw=result.userAnswers[q.id],ids=Array.isArray(raw)?raw:[raw];
   const options=q.options.filter(o=>ids.includes(o.id)&&(o.weights[id]!==undefined||o.weights.isTooEarly));
   // Unknown answers are attached only to the question's own dimensions.
   const relevant=q.options.some(o=>o.weights[id]!==undefined);
   return relevant&&options.length?[{question:q.title,answer:options.map(o=>o.label).join(' ')}]:[];
  }),
 }));
}

export function premiumPaths(result:QuizResultData) {
 const p=result.pattern;
 return [
  {id:'soft',title:'Lean in',fit:'You want to learn more and there is room for a realistic next step.',action:p.immediateAction,script:p.scripts.soft.exactScript,watch:'Notice whether the step works for both of you. More intensity is not the same as more information.'},
  {id:'clear',title:'Name it',fit:'A direct comparison of expectations would help you decide what works for you.',action:'Choose a calm moment. Describe the behavior you noticed, then ask what kind of connection each of you wants.',script:p.scripts.clear.exactScript,watch:p.strongestSignal},
  {id:'boundary',title:'Step back',fit:'The current arrangement does not meet your needs, or a stated agreement is repeatedly ignored.',action:'State the limit you control and the contact or investment you can realistically offer.',script:p.scripts.boundary.exactScript,watch:'Stepping back is a boundary, not a tactic to make someone chase you.'},
 ];
}
