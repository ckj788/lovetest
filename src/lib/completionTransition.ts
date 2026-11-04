// Keep a brief reveal beat after a successful request; failed requests return immediately.
export async function completeAfter<T>(request:Promise<T>,minimumMs=2100,now=()=>Date.now(),wait=(ms:number)=>new Promise<void>(resolve=>setTimeout(resolve,ms))):Promise<T>{const started=now();const result=await request;const remaining=minimumMs-(now()-started);if(remaining>0)await wait(remaining);return result;}
export type CompletionKind='solo'|'friend-invite'|'friend-result';
export const COMPLETION_COPY={
 solo:{eyebrow:'YOUR EIGHT ANSWERS',title:'A little perspective is taking shape.',subtitle:'Organizing the behaviors you shared into a pattern you can reflect on.',notes:['Your reported behavior','Room for uncertainty','A grounded next step']},
 'friend-invite':{eyebrow:'YOUR SIDE OF THE STORY',title:'One perspective. A little curiosity.',subtitle:'Preparing your private invitation. Your friend’s perspective comes next.',notes:['Your own preferences','An independent invitation','A shared reveal after both finish']},
 'friend-result':{eyebrow:'TWO PERSPECTIVES, TOGETHER',title:'Your friendship has a story.',subtitle:'Bringing both sets of answers together, with room for what you share and what makes you different.',notes:['The habits you share','The differences worth understanding','A conversation to take with you']}
} as const;
