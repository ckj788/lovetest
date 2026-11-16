const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const load=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.ts']=load;require.extensions['.tsx']=load;
const {wrapCardText,createShareCardImage}=require('../src/lib/shareCardImage.ts');
test('export text wraps long names, unspaced text and newlines without losing content',()=>{
 for(const text of ['A very long friendship pattern name','超长测试名称没有空格仍然应该可以换行','averylongwordwithoutanyspaces','First line\nSecond line']){
  const lines=wrapCardText(text,12,value=>Array.from(value).length);
  assert.ok(lines.every(line=>Array.from(line).length<=12));assert.equal(lines.join('').replace(/\s/g,''),text.replace(/\s/g,''));
 }
});
test('flower markup contains vector paths without external images, filters or a background rectangle',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{BrandFlower}=require('../src/components/ui/BrandFlower.tsx');
 const markup=renderToStaticMarkup(React.createElement(BrandFlower,{size:900}));
 assert.match(markup,/<path/);assert.match(markup,/fill-rule="evenodd"/);assert.doesNotMatch(markup,/<image|<filter|<rect|\.png|NaN|Infinity/);
});
test('export creates an actual PNG blob from explicit summary fields without reading report DOM',async()=>{
 const written=[],oldDoc=global.document,oldPath=global.Path2D;
 const context={fillRect(){},strokeRect(){},save(){},translate(){},scale(){},fill(){},restore(){},measureText:s=>({width:s.length*22}),fillText:s=>written.push(s)};
 const canvas={getContext:()=>context,toBlob:callback=>callback(new Blob(['png'],{type:'image/png'}))};
 global.document={createElement:tag=>{assert.equal(tag,'canvas');return canvas;}};global.Path2D=class{};
 try{const image=await createShareCardImage({title:'Your pattern',caption:'Public summary',symbol:'✳'});assert.equal(image.type,'image/png');assert.equal(canvas.width,1080);assert.equal(canvas.height,1920);assert.ok(written.includes('Your pattern'));assert.ok(written.includes('Public summary'));}
 finally{global.document=oldDoc;global.Path2D=oldPath;}
});
