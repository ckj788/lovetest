const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
process.env.NODE_ENV='production';
delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;
process.env.KV_REST_API_URL='https://redis.test.invalid';process.env.KV_REST_API_TOKEN='test-write-token';
process.env.DATA_ENCRYPTION_KEY='ab'.repeat(32);
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,f);
const records=new Map();let offline=false;
class RedisStub {
 constructor(config){assert.deepEqual(config,{url:'https://redis.test.invalid',token:'test-write-token'});}
 async set(key,value,options){if(offline)throw Error('redis unreachable');if(options?.nx&&records.has(key))return null;records.set(key,value);return 'OK';}
 async get(key){if(offline)throw Error('redis unreachable');return records.get(key)??null;}
 async eval(script,keys,args){if(records.get(keys[0])===args[0])records.delete(keys[0]);return 1;}
}
const Module=require('node:module'),originalLoad=Module._load;
Module._load=function(id,...args){return id==='@upstash/redis'?{Redis:RedisStub}:originalLoad.call(this,id,...args);};
const {POST,GET}=require('../src/app/api/reports/route.ts');
const {GET:availability}=require('../src/app/api/reports/availability/route.ts');
const {authorize,saveReport}=require('../src/lib/reports.ts');
const {redisCredentials}=require('../src/lib/storageConfig.ts');
Module._load=originalLoad;
const a=Object.fromEntries(Array.from({length:8},(_,i)=>[i+1,`fr_q${i+1}_a`]));
const b={...a,8:'fr_q8_d'};
const request=body=>new Request('http://localhost/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
const read=token=>GET(new Request('http://localhost/api/reports',{headers:{authorization:'Bearer '+token}}));

test('Vercel KV alias completes owner invitation, independent guest question 8, and owner refresh',async()=>{
 const check=await availability();assert.equal(check.status,200);assert.deepEqual(await check.json(),{available:true});assert.equal(records.size,0);
 const response=await POST(request({mode:'friend',answers:a}));assert.equal(response.status,200);const owner=await response.json();
 assert.equal(owner.role,'owner');assert.equal(owner.completed,false);assert.equal(owner.full,undefined);assert.notEqual(owner.token,owner.inviteToken);
 const guest=await (await read(owner.inviteToken)).json();assert.equal(guest.role,'guest');assert.equal(guest.completed,false);assert.equal(guest.inviteToken,undefined);assert.equal(guest.full,undefined);
 const submitted=await POST(request({mode:'friend',token:owner.inviteToken,answers:b}));assert.equal(submitted.status,200);assert.equal((await submitted.json()).completed,true);
 const restored=await (await read(owner.token)).json();assert.equal(restored.completed,true);assert.equal(restored.paid,false);assert.equal(restored.full,undefined);
 const auth=await authorize(owner.token);assert.equal(auth.record.guestAnswers[8],'fr_q8_d');
 // Emulate an existing verified entitlement, not a public checkout shortcut.
 auth.record.paid=true;await saveReport(auth.record);
 const [ownerFull,guestFull]=await Promise.all([read(owner.token).then(r=>r.json()),read(owner.inviteToken).then(r=>r.json())]);
 assert.equal(ownerFull.unlocked,true);assert.equal(guestFull.unlocked,true);assert.equal(ownerFull.full.rows.length,8);assert.deepEqual(ownerFull.full,guestFull.full);
 for(const value of records.values())assert.doesNotMatch(value,/fr_q8_d|ownerToken|guestAnswers/);
});

test('storage readiness rejects missing encryption and transient outages without exposing credentials',async()=>{
 const key=process.env.DATA_ENCRYPTION_KEY;delete process.env.DATA_ENCRYPTION_KEY;
 try{const res=await availability();assert.equal(res.status,503);assert.equal((await res.json()).code,'STORAGE_NOT_CONFIGURED');}finally{process.env.DATA_ENCRYPTION_KEY=key;}
 offline=true;try{const res=await availability();assert.equal(res.status,503);const body=await res.json();assert.equal(body.code,'STORAGE_UNAVAILABLE');assert.doesNotMatch(JSON.stringify(body),/test-write-token|redis.test.invalid|redis unreachable/);}finally{offline=false;}
});

test('Redis aliases require one complete pair and never select a read-only token',()=>{
 assert.equal(redisCredentials({UPSTASH_REDIS_REST_URL:'a',KV_REST_API_TOKEN:'b'}),null);
 assert.equal(redisCredentials({KV_REST_API_URL:'a',KV_REST_API_READ_ONLY_TOKEN:'b'}),null);
 assert.deepEqual(redisCredentials({UPSTASH_REDIS_REST_URL:'a',UPSTASH_REDIS_REST_TOKEN:'b',KV_REST_API_URL:'c',KV_REST_API_TOKEN:'d'}),{url:'a',token:'b'});
});
