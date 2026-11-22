const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
process.env.NODE_ENV='test';delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,f);
const {createReport,authorize,reportView,saveReport,submitGuest,validAnswers}=require('../src/lib/reports.ts');
const {removeRecord}=require('../src/lib/storage.ts');
const {FRIEND_QUESTIONS}=require('../src/data/dualQuestions.ts');
const a=Object.fromEntries(FRIEND_QUESTIONS.map(q=>[q.id,q.options[0].id])),b=Object.fromEntries(FRIEND_QUESTIONS.map(q=>[q.id,q.options[1].id]));
async function cleanup(r){for(const key of ['report:'+r.id,'report-token:'+r.ownerToken,'report-token:'+r.guestToken])await removeRecord(key);}
test('eight own answers required; guesses and extra questions rejected',()=>{assert.equal(validAnswers('friend',a),true);assert.equal(validAnswers('friend',{...a,9:'extra'}),false);assert.equal(validAnswers('friend',{...a,8:'unknown'}),false);assert.equal(validAnswers('friend',{...a,8:['fr_q8_a']}),false);});
test('independent links hide answers, require both completion and payment, and restore',async()=>{const r=await createReport('friend',a);try{assert.notEqual(r.ownerToken,r.guestToken);assert.equal((await authorize(r.ownerToken)).role,'owner');assert.equal((await authorize(r.guestToken)).role,'guest');assert.equal(await authorize('bad-token'),null);let guest=reportView(r,'guest');assert.equal(guest.full,undefined);assert.equal(guest.inviteToken,undefined);assert.ok(!JSON.stringify(guest).includes('Stay in, order food'));r.paid=true;await saveReport(r);assert.equal(reportView(r,'owner').unlocked,false);guest=await submitGuest(r.guestToken,b);assert.equal(guest.unlocked,true);assert.equal(guest.full.matches,0);assert.equal((await authorize(r.ownerToken)).record.guestAnswers[1],b[1]);const restored=reportView((await authorize(r.ownerToken)).record,'owner');assert.equal(restored.full.rows.length,8);await submitGuest(r.guestToken,a);assert.equal((await authorize(r.guestToken)).record.guestAnswers[1],b[1]);r.guestAnswers=b;r.paid=false;assert.equal(reportView(r,'guest').full,undefined);r.paid=true;r.refunded=true;assert.equal(reportView(r,'owner').full,undefined);}finally{await cleanup(r);}});
test('wrong-role submission and expired links fail',async()=>{const r=await createReport('friend',a);try{await assert.rejects(()=>submitGuest(r.ownerToken,b));r.expiresAt=Date.now()-1;await saveReport(r);assert.equal(await authorize(r.guestToken),null);}finally{await cleanup(r);}});
test('solo preview never contains scripts, raw answers or seven-day plan',async()=>{const answers={1:'q1_a',2:'q2_a',3:'q3_a',4:'q4_a',5:['q5_1'],6:'q6_a',7:'q7_a',8:'q8_a'};const r=await createReport('solo',answers);try{const free=reportView(r,'owner');assert.equal(free.unlocked,false);assert.equal(free.full,undefined);assert.doesNotMatch(JSON.stringify(free),/exactScript|sevenDayPlan|q1_a/);r.paid=true;assert.equal(reportView(r,'owner').full.pattern.name,'Mutual Momentum');}finally{await cleanup(r);}});

test('signed webhooks handle pending payments, paid retries, and full refunds arriving in either order',async()=>{
 const Stripe=require('stripe'),stripe=new Stripe('sk_test_local_only');
 process.env.STRIPE_SECRET_KEY='sk_test_local_only';process.env.STRIPE_WEBHOOK_SECRET='whsec_local_only';
 const {POST}=require('../src/app/api/stripe/webhook/route.ts');
 const r=await createReport('friend',a),refunded=await createReport('friend',a);
 const intent='pi_'+r.id,refundedIntent='pi_'+refunded.id;
 const deliver=(type,object,signed=true)=>{
  const payload=JSON.stringify({type,data:{object}});
  const signature=stripe.webhooks.generateTestHeaderString({payload,secret:'whsec_local_only'});
  return POST(new Request('http://localhost/api/stripe/webhook',{method:'POST',body:payload,headers:signed?{'stripe-signature':signature}:{}}));
 };
 const checkout=(report,payment_intent)=>({id:report.checkoutId,metadata:{reportId:report.id,mode:'friend'},status:'complete',payment_status:'paid',amount_total:999,currency:'usd',mode:'payment',payment_intent});
 const event='checkout.session.completed';
 try{
  r.checkoutId='cs_expected';r.guestAnswers=b;refunded.checkoutId='cs_other';await saveReport(r);await saveReport(refunded);
  const session=checkout(r,intent);
  assert.equal((await deliver(event,session,false)).status,400);
  assert.equal((await deliver(event,{...session,id:'cs_wrong'})).status,500);
  assert.equal((await deliver(event,{...session,payment_status:'unpaid'})).status,200);
  assert.equal((await authorize(r.ownerToken)).record.paid,false);
  assert.equal((await deliver(event,session)).status,200);
  assert.equal((await deliver(event,session)).status,200);
  assert.equal(reportView((await authorize(r.guestToken)).record,'guest').unlocked,true);
  assert.equal((await deliver('charge.refunded',{payment_intent:intent,refunded:false})).status,200);
  assert.equal(reportView((await authorize(r.guestToken)).record,'guest').unlocked,true);
  assert.equal((await deliver('charge.refunded',{payment_intent:intent,refunded:true})).status,200);
  assert.equal((await deliver(event,session)).status,200);
  assert.equal(reportView((await authorize(r.guestToken)).record,'guest').unlocked,false);
  assert.equal((await deliver('charge.refunded',{payment_intent:refundedIntent,refunded:true})).status,200);
  assert.equal((await deliver(event,checkout(refunded,refundedIntent))).status,200);
  const final=(await authorize(refunded.ownerToken)).record;
  assert.equal(final.refunded,true);assert.equal(final.paid,false);
 }finally{
  await cleanup(r);await cleanup(refunded);
  for(const value of [intent,refundedIntent]){await removeRecord('payment-report:'+value);await removeRecord('payment-refunded:'+value);}
  delete process.env.STRIPE_SECRET_KEY;delete process.env.STRIPE_WEBHOOK_SECRET;
 }
});

test('local preview requires both answers, stays separate from payment, and is ignored in production',async()=>{const {unlockPreview,ReportNotReadyError}=require('../src/lib/reports.ts');const r=await createReport('friend',a);const before=process.env.NODE_ENV;try{process.env.NODE_ENV='development';await assert.rejects(()=>unlockPreview(r.guestToken));await assert.rejects(()=>unlockPreview(r.ownerToken),ReportNotReadyError);assert.equal((await authorize(r.ownerToken)).record.previewUnlocked,undefined);let view=await submitGuest(r.guestToken,b);assert.equal(view.unlocked,false);view=await unlockPreview(r.ownerToken);assert.equal(view.previewUnlocked,true);assert.equal(view.paid,false);assert.equal(view.unlocked,true);const stored=(await authorize(r.ownerToken)).record;assert.equal(stored.paid,false);assert.equal(stored.checkoutId,undefined);assert.equal(reportView(stored,'owner').full.rows.length,8);assert.equal(reportView(stored,'guest').unlocked,true);process.env.NODE_ENV='production';assert.equal(reportView(stored,'owner').unlocked,false);assert.equal(reportView(stored,'owner').full,undefined);await assert.rejects(()=>unlockPreview(r.ownerToken));const {POST}=require('../src/app/api/reports/preview/route.ts');assert.equal((await POST(new Request('http://localhost/api/reports/preview',{method:'POST'}))).status,404);}finally{process.env.NODE_ENV=before;await cleanup(r);}});

test('unpaid completed friendship preview excludes the expanded analysis',async()=>{const r=await createReport('friend',a);try{r.guestAnswers=b;for(const role of ['owner','guest']){const free=JSON.stringify(reportView(r,role));assert.doesNotMatch(free,/person1Need|sevenDayPlan|patternEvidence|responseGuide|conversationStarter|checkpoint|recommendation|findings|rankedQuestions/);}r.paid=true;const full=reportView(r,'owner').full;assert.equal(full.sevenDayPlan.length,7);assert.equal(full.scripts.length,5);}finally{await cleanup(r);}});
