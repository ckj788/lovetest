const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const load=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.ts']=load;require.extensions['.tsx']=load;
const {analyzeFriendAnswers}=require('../src/data/friendAnalysis.ts'),{calculateFriendReport}=require('../src/data/friendPatterns.ts'),{FRIEND_QUESTIONS}=require('../src/data/dualQuestions.ts');
const base=Object.fromEntries(FRIEND_QUESTIONS.map(q=>[q.id,q.options[0].id]));
const answers=(q,n)=>({...base,[q]:FRIEND_QUESTIONS[q-1].options[n].id});

test('every question covers four shared choices and all six distinct unordered pairs',()=>{
 for(const q of FRIEND_QUESTIONS){const pairReads=new Set(),sharedActions=new Set();
  for(let x=0;x<4;x++)for(let y=0;y<4;y++){
   const a=answers(q.id,x),b=answers(q.id,y),before=JSON.stringify([a,b]);const r=analyzeFriendAnswers(a,b),row=r.rows[q.id-1];
   assert.equal(JSON.stringify([a,b]),before);assert.equal(row.a,q.options[x].label);assert.equal(row.b,q.options[y].label);
   assert.equal(row.same,x===y);assert.ok(row.opportunity&&row.agreement&&row.person1Need&&row.person2Need);
   if(x<y)pairReads.add(row.agreement);if(x===y)sharedActions.add(row.agreement);
   const swapped=analyzeFriendAnswers(b,a),other=swapped.rows[q.id-1];
   assert.equal(other.agreement,row.agreement);assert.equal(other.opportunity,row.opportunity);assert.equal(other.person1Need,row.person2Need);
   assert.equal(swapped.recommendation.action,r.recommendation.action);assert.equal(swapped.recommendation.questionId,r.recommendation.questionId);
   assert.equal(swapped.scripts[0].text,r.scripts[1].text);assert.equal(swapped.scripts[1].text,r.scripts[0].text);
  }
  assert.equal(pairReads.size,6,'distinct pair advice for Q'+q.id);assert.equal(sharedActions.size,4,'shared-choice advice for Q'+q.id);
 }
});

test('same broad type can recommend different actions with synchronized scripts and plans',()=>{
 const a=calculateFriendReport(base,answers(2,2)),b=calculateFriendReport(base,answers(4,3));
 assert.equal(a.id,b.id);assert.notEqual(a.recommendation.questionId,b.recommendation.questionId);assert.notEqual(a.recommendation.action,b.recommendation.action);assert.notEqual(a.scripts[0].text,b.scripts[0].text);
 for(const r of [a,b]){assert.equal(r.sevenDayPlan[3].action,r.recommendation.action);assert.equal(r.sevenDayPlan[5].action,r.recommendation.progress);assert.equal(r.responseGuide[1].action,r.recommendation.unresolved);assert.equal(r.sevenDayPlan.length,7);assert.equal(r.scripts.length,5);}
});

test('a related answer changes conversation priority without changing the type or guessing behavior',()=>{
 const repairOnly={...base,5:'fr_q5_b'},withReassurance={...repairOnly,7:'fr_q7_c'};
 const a=calculateFriendReport(base,repairOnly),b=calculateFriendReport(base,withReassurance);
 assert.equal(a.id,b.id);assert.equal(a.recommendation.questionId,5);assert.equal(b.recommendation.questionId,7);
 assert.ok(b.findings.some(f=>f.id==='same_rhythm_different_reassurance'));
 assert.deepEqual(b.recommendation.evidence.map(e=>e.questionId),[2,7]);
 assert.match(b.recommendation.reason,/hypothetical|preferred/);
});

test('combination findings and recommendation evidence quote both actual selections',()=>{
 let seed=7183;const next=()=>{seed=(seed*1664525+1013904223)>>>0;return seed;};
 // Use different bit ranges, avoiding the short cycle in a generator's low bits.
 for(let n=0;n<160;n++){
  const a={},b={};for(const q of FRIEND_QUESTIONS){a[q.id]=q.options[(next()>>>16)%4].id;b[q.id]=q.options[(next()>>>16)%4].id;}
  const r=analyzeFriendAnswers(a,b);assert.deepEqual(analyzeFriendAnswers(a,b),r);
  for(const ref of [...r.findings.flatMap(f=>f.evidence),...r.recommendation.evidence]){const q=FRIEND_QUESTIONS[ref.questionId-1];assert.equal(ref.person1,q.options.find(o=>o.id===a[q.id]).label);assert.equal(ref.person2,q.options.find(o=>o.id===b[q.id]).label);}
  assert.equal(new Set(r.sevenDayPlan.map(d=>d.day)).size,7);assert.ok(r.scripts[0].text.includes(r.rows[r.recommendation.questionId-1].person2Need));
 }
});

test('all six cross-question findings have concrete reachable preference combinations',()=>{
 const fixtures=[
  ['contact_and_return',{2:'fr_q2_c',7:'fr_q7_c'},[2,7]],
  ['same_rhythm_different_reassurance',{7:'fr_q7_c'},[2,7]],
  ['support_and_repair',{3:'fr_q3_b',5:'fr_q5_b'},[3,5]],
  ['activity_and_notice',{1:'fr_q1_b',4:'fr_q4_d'},[1,4]],
  ['same_activity_different_notice',{4:'fr_q4_d'},[1,4]],
  ['closeness_and_capacity',{6:'fr_q6_b',8:'fr_q8_d'},[6,8]],
 ];
 for(const [id,changes,questions]of fixtures){const r=analyzeFriendAnswers(base,{...base,...changes}),finding=r.findings.find(f=>f.id===id);assert.ok(finding,id);assert.deepEqual(finding.evidence.map(e=>e.questionId),questions);}
});

test('all shared choices remain distinct from demonstrated behavior and relationship quality',()=>{
 const r=analyzeFriendAnswers(base,base);assert.equal(r.differences.length,0);assert.equal(r.recommendation.questionId,6);
 assert.match(r.recommendation.reason,/do not establish/);assert.match(r.method,/stated preference/);assert.match(r.sevenDayPlan[0].action,/has not established/);
 assert.doesNotMatch(JSON.stringify(r),/100% compatible|perfect friendship|accuracy rate/i);
 const support=analyzeFriendAnswers(base,answers(3,1));assert.match(support.rows[2].opportunity,/does not establish what either person currently gives/);
});

test('six chapter report visibly retains eight analyses, five scripts, and seven days',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{PremiumFriendReport}=require('../src/components/report/PremiumFriendReport.tsx');
 const r=calculateFriendReport(base,answers(3,1)),html=renderToStaticMarkup(React.createElement(PremiumFriendReport,{result:r}));
 assert.equal((html.match(/class="premium-chapter"/g)||[]).length,6);assert.equal((html.match(/data-question="/g)||[]).length,8);assert.equal((html.match(/class="premium-script design-paper"/g)||[]).length,5);
 assert.equal((html.match(/<span>Day /g)||[]).length,7);assert.equal((html.match(/friend-recommendation/g)||[]).length,1);
 for(const row of r.rows)assert.ok(html.includes(row.agreement.replaceAll('&','&amp;').replaceAll("'",'&#x27;').replaceAll('"','&quot;')));
});
