const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
process.env.NODE_ENV='test';
for(const key of ['UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','KV_REST_API_URL','KV_REST_API_TOKEN'])delete process.env[key];
const load=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.ts']=load;require.extensions['.tsx']=load;
const {createReport,authorize,submitGuest,reportView,saveReport}=require('../src/lib/reports.ts'),{removeRecord}=require('../src/lib/storage.ts');
const answers=Object.fromEntries(Array.from({length:8},(_,i)=>[i+1,'fr_q'+(i+1)+'_a']));
const request=(path,token)=>new Request('http://localhost'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});
async function cleanup(r){for(const key of ['report:'+r.id,'report-token:'+r.ownerToken,'report-token:'+r.guestToken])await removeRecord(key);}

test('checkout rejects unfinished Bestie before constructing Stripe, then permits only the initiator',async()=>{
 const calls=[];let constructed=0;const stripePath=require.resolve('stripe');require('stripe');const original=require.cache[stripePath].exports;
 class MockStripe{constructor(){constructed++;this.checkout={sessions:{create:async options=>{calls.push(options);return{id:'cs_mock_ready',url:'https://checkout.example.test/ready'};}}};}}
 require.cache[stripePath].exports=MockStripe;
 process.env.STRIPE_SECRET_KEY='sk_test_mock_only';process.env.STRIPE_WEBHOOK_SECRET='whsec_mock_only';process.env.APP_URL='https://example.test';
 const {POST}=require('../src/app/api/checkout/route.ts');const r=await createReport('friend',answers);
 try{
  const early=await POST(request('/api/checkout',r.ownerToken));assert.equal(early.status,409);assert.equal((await early.json()).code,'REPORT_NOT_READY');assert.equal(constructed,0);assert.equal(calls.length,0);
  const unchanged=(await authorize(r.ownerToken)).record;assert.equal(unchanged.checkoutId,undefined);assert.equal(unchanged.paid,false);
  await submitGuest(r.guestToken,answers);
  assert.equal((await POST(request('/api/checkout',r.guestToken))).status,403);assert.equal(constructed,0);
  assert.equal((await POST(request('/api/checkout',r.ownerToken))).status,200);assert.equal(calls.length,1);assert.equal(calls[0].line_items[0].quantity,1);assert.equal(calls[0].line_items[0].price_data.unit_amount,999);
  const awaitingConfirmation=(await authorize(r.ownerToken)).record;assert.equal(awaitingConfirmation.paid,false);assert.equal(reportView(awaitingConfirmation,'guest').unlocked,false);
 }finally{await cleanup(r);require.cache[stripePath].exports=original;delete process.env.STRIPE_SECRET_KEY;delete process.env.STRIPE_WEBHOOK_SECRET;delete process.env.APP_URL;}
});

test('preview endpoint cannot bypass completion or ownership and opens both views only after the owner unlocks',async()=>{
 const before=process.env.NODE_ENV;process.env.NODE_ENV='development';const {POST}=require('../src/app/api/reports/preview/route.ts');const r=await createReport('friend',answers);
 try{
  const early=await POST(request('/api/reports/preview',r.ownerToken));assert.equal(early.status,409);assert.equal((await early.json()).code,'REPORT_NOT_READY');assert.equal((await authorize(r.ownerToken)).record.previewUnlocked,undefined);
  await submitGuest(r.guestToken,answers);assert.equal((await POST(request('/api/reports/preview',r.guestToken))).status,403);
  assert.equal(reportView((await authorize(r.ownerToken)).record,'owner').full,undefined);
  const opened=await POST(request('/api/reports/preview',r.ownerToken));assert.equal(opened.status,200);assert.equal((await opened.json()).unlocked,true);
  const stored=(await authorize(r.ownerToken)).record;assert.equal(stored.paid,false);assert.equal(stored.checkoutId,undefined);assert.equal(reportView(stored,'guest').unlocked,true);
 }finally{process.env.NODE_ENV=before;await cleanup(r);}
});

test('the return endpoint verifies the saved Stripe session before unlocking Solo',async()=>{
 const stripePath=require.resolve('stripe');const original=require.cache[stripePath].exports;
 const answers={1:'q1_a',2:'q2_a',3:'q3_a',4:'q4_a',5:['q5_1'],6:'q6_a',7:'q7_a',8:'q8_a'};
 const r=await createReport('solo',answers),intent='pi_'+r.id;
 r.checkoutId='cs_saved';await saveReport(r);
 const proof={id:r.checkoutId,amount_total:799,currency:'usd',mode:'payment',status:'complete',payment_status:'paid',payment_intent:intent,metadata:{reportId:r.id,mode:'solo'}};
 let session={...proof,status:'open',payment_status:'unpaid'},lookups=0;
 require.cache[stripePath].exports=class {
  checkout={sessions:{retrieve:async id=>{assert.equal(id,'cs_saved');lookups++;return session;}}};
 };
 process.env.STRIPE_SECRET_KEY='sk_test_mock_only';
 const {POST}=require('../src/app/api/checkout/confirm/route.ts');
 const verify=token=>POST(request('/api/checkout/confirm',token));
 try{
  assert.equal((await verify('invalid')).status,403);assert.equal(lookups,0);
  assert.equal((await (await verify(r.ownerToken)).json()).unlocked,false);
  session={...proof,amount_total:1};assert.equal((await verify(r.ownerToken)).status,503);
  assert.equal((await authorize(r.ownerToken)).record.paid,false);
  session=proof;assert.equal((await (await verify(r.ownerToken)).json()).unlocked,true);
  assert.equal((await (await verify(r.ownerToken)).json()).unlocked,true);assert.equal(lookups,3);
 }finally{await cleanup(r);await removeRecord('payment-report:'+intent);require.cache[stripePath].exports=original;delete process.env.STRIPE_SECRET_KEY;}
});

test('legacy paid reports preserve their shared entitlement while waiting for the second answer set',async()=>{
 const r=await createReport('friend',answers);try{r.paid=true;await saveReport(r);assert.equal(reportView(r,'owner').unlocked,false);const completed=await submitGuest(r.guestToken,answers);assert.equal(completed.unlocked,true);assert.equal(reportView((await authorize(r.ownerToken)).record,'owner').unlocked,true);}finally{await cleanup(r);}
});

test('waiting, ready-owner and ready-guest screens show the correct purchase responsibility',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{ReportGate}=require('../src/components/ReportGate.tsx'),{FriendHandoff}=require('../src/components/friend/FriendHandoff.tsx');
 const view={mode:'friend',role:'owner',completed:false,paid:false,unlocked:false,price:999,expiresAt:Date.now()+10000,preview:{name:'Taking shape',summary:'Both people need to finish.'}};
 const render=v=>renderToStaticMarkup(React.createElement(ReportGate,{view:v,busy:false,error:'',onCheckout(){},onRefresh(){}}));
 assert.doesNotMatch(render(view),/Unlock our full report/);
 assert.match(render({...view,completed:true}),/Unlock our full report — \$9\.99/);
 const guest=render({...view,completed:true,role:'guest'});assert.doesNotMatch(guest,/Unlock our full report/);assert.match(guest,/Waiting for the initiator to unlock/);
 const waiting=renderToStaticMarkup(React.createElement(FriendHandoff,{role:'owner',invite:'https://example.test/friend#access=test',price:999}));assert.match(waiting,/Copy my invitation/);assert.match(waiting,/\$9\.99 total for both/);assert.match(waiting,/No payment is needed until both people finish/);
 const solo=render({...view,mode:'solo',completed:true,price:799});assert.match(solo,/Unlock my full read — \$7\.99/);
});
