const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,f);
const {parseFriendDraft,friendDraftKey}=require('../src/lib/friendDraft.ts');
const answers=Object.fromEntries(Array.from({length:8},(_,i)=>[i+1,`fr_q${i+1}_a`]));
const now=Date.now(),raw=changes=>JSON.stringify({index:7,answers,savedAt:now,...changes});
test('failed final submissions restore all eight answers; invitations keep separate drafts',()=>{
 assert.deepEqual(parseFriendDraft(raw(),now),{index:7,answers});assert.notEqual(friendDraftKey(''),friendDraftKey('guest-a'));assert.notEqual(friendDraftKey('guest-a'),friendDraftKey('guest-b'));
 assert.equal(parseFriendDraft(raw({answers:{1:'fr_q1_a'}}),now).index,1);
});
test('expired, malformed, future and invalid answer drafts are not reused',()=>{
 for(const value of ['{bad',raw({savedAt:now-7*86400000}),raw({savedAt:now+10000}),raw({index:8}),raw({answers:{...answers,8:'fr_q1_a'}})])assert.equal(parseFriendDraft(value,now),null);
});
