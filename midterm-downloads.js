"use strict";
(function(){
if(window.__privOpenBookDownloads)return;window.__privOpenBookDownloads=true;

var hero=document.querySelector('.hero');
var eyebrow=document.querySelector('.eyebrow');
var h1=document.querySelector('h1');
var lede=hero&&hero.querySelector('.lede');
var scope=document.querySelector('.scope');
var source=document.querySelector('.sourceNote');
var tools=document.querySelector('.tools');
var print=document.getElementById('print');
if(eyebrow)eyebrow.textContent='// ISNE 269497 · MIDTERM';
if(h1)h1.textContent='Privacy Technologies · Midterm Notes';
if(lede)lede.textContent='Topics 1–3';
if(scope)scope.innerHTML='<b>MIDTERM · OPEN BOOK</b><br>Topics 1–3';
if(source)source.remove();
if(print)print.remove();

var rename={
 '30-Second Exam Lookup Map':'Quick Reference',
 'Professor Discussion Questions — Ready Answers':'Lecture Discussion Questions',
 'Calculation Master Section':'Calculations',
 'Master Comparison & Scenario Decoder':'Comparisons and Scenarios',
 'Lecture Case File — Exact Facts to Recognise':'Case Studies',
 'Answer Templates — What to Write':'Answer Structures',
 'Final 5-Minute Check Before Exam':'Final Checklist'
};
document.querySelectorAll('h2').forEach(function(x){if(rename[x.textContent.trim()])x.textContent=rename[x.textContent.trim()];});
document.querySelectorAll('.prof').forEach(function(x){x.innerHTML=x.innerHTML.replace(/<b>Exam answer:<\/b>\s*/gi,'').replace(/<b>Professor’s conclusion:<\/b>/gi,'<b>Conclusion:</b>');});
document.querySelectorAll('.key').forEach(function(x){if(/Professor/i.test(x.textContent))x.textContent=x.textContent.replace(/Professor.?s\s*/i,'');});

var st=document.createElement('style');
st.textContent='.openBookFiles{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:14px 0 18px;padding:13px 15px;border:1px solid color-mix(in srgb,var(--gr) 42%,var(--line));border-left:3px solid var(--gr);border-radius:0 10px 10px 0;background:var(--p)}.openBookFiles b{display:block;color:var(--gr);font:800 11px var(--mono);letter-spacing:1px}.openBookFiles span{color:var(--dim);font-size:13px}.obActions{display:flex;gap:7px;flex-wrap:wrap}.obActions button{border:1px solid var(--line);background:var(--p2);color:var(--ink);border-radius:7px;padding:8px 11px;font:800 10px var(--mono);cursor:pointer}.obActions button:hover{border-color:var(--cy);color:var(--cy)}.obActions button:disabled{opacity:.55;cursor:wait}@media(max-width:700px){.openBookFiles{align-items:flex-start;flex-direction:column}}';
document.head.appendChild(st);
var bar=document.createElement('div');bar.className='openBookFiles';
bar.innerHTML='<div><b>OPEN BOOK · MIDTERM</b><span>Complete Topics 1–3 notes</span></div><div class="obActions"><button id="dlPdf">PDF · COMPLETE NOTES</button><button id="dlWord">WORD · COMPLETE NOTES</button></div>';
if(tools)tools.parentNode.insertBefore(bar,tools);else if(hero)hero.appendChild(bar);

var cache=null;
async function notes(){
 if(cache)return cache;
 var out=[];
 for(var i=1;i<=5;i++){
  var r=await fetch('./downloads/complete-notes-'+i+'.txt?v=20260822b');
  if(!r.ok)throw new Error('notes part '+i);
  out.push(await r.text());
 }
 cache=out.join('');return cache;
}
function save(blob,name){var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1500);}
function xml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function cleanAscii(s){return String(s).replace(/[–—−]/g,'-').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/≈/g,'~').replace(/≤/g,'<=').replace(/≥/g,'>=').replace(/Σ/g,'sum').replace(/₂/g,'2').replace(/→/g,'->').replace(/·/g,'-').normalize('NFKD').replace(/[^\x20-\x7E\n]/g,'');}

function makePdf(text){
 text=cleanAscii(text);
 var lines=[],max=102;
 text.split(/\n/).forEach(function(raw){raw=raw.trimEnd();if(!raw){lines.push('');return;}while(raw.length>max){var k=raw.lastIndexOf(' ',max);if(k<35)k=max;lines.push(raw.slice(0,k));raw=raw.slice(k).trimStart();}lines.push(raw);});
 var pages=[],cur=[];lines.forEach(function(l){if(cur.length>=66){pages.push(cur);cur=[];}cur.push(l);});if(cur.length)pages.push(cur);
 var objs=[null],pageIds=[],contentIds=[];function add(s){objs.push(s);return objs.length-1;}
 var catalog=add(''),pagesId=add(''),font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'),bold=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
 pages.forEach(function(pg){var content='';var y=806;pg.forEach(function(line){var head=/^(TOPIC|QUICK INDEX|CORE FORMULAS|COMPARISON TABLES|CASE STUDIES|LECTURE DISCUSSION|PRACTICE QUESTIONS|GLOSSARY|Final check list|Calculation and table-reading)/i.test(line);var f=head?'F2':'F1',sz=head?11:8.2;var esc=line.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');content+='BT /'+f+' '+sz+' Tf 42 '+y+' Td ('+esc+') Tj ET\n';y-=11.5;});var cid=add('<< /Length '+content.length+' >>\nstream\n'+content+'endstream');var pid=add('');contentIds.push(cid);pageIds.push(pid);});
 objs[pagesId]='<< /Type /Pages /Count '+pageIds.length+' /Kids ['+pageIds.map(function(x){return x+' 0 R'}).join(' ')+'] >>';
 pageIds.forEach(function(pid,i){objs[pid]='<< /Type /Page /Parent '+pagesId+' 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 '+font+' 0 R /F2 '+bold+' 0 R >> >> /Contents '+contentIds[i]+' 0 R >>';});
 objs[catalog]='<< /Type /Catalog /Pages '+pagesId+' 0 R >>';
 var pdf='%PDF-1.4\n',offs=[0];for(var i=1;i<objs.length;i++){offs[i]=pdf.length;pdf+=i+' 0 obj\n'+objs[i]+'\nendobj\n';}var x=pdf.length;pdf+='xref\n0 '+objs.length+'\n0000000000 65535 f \n';for(var j=1;j<objs.length;j++)pdf+=String(offs[j]).padStart(10,'0')+' 00000 n \n';pdf+='trailer\n<< /Size '+objs.length+' /Root '+catalog+' 0 R >>\nstartxref\n'+x+'\n%%EOF';return new Blob([pdf],{type:'application/pdf'});
}

var crcTable=null;function crc32(bytes){if(!crcTable){crcTable=[];for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=(c&1)?0xEDB88320^(c>>>1):c>>>1;crcTable[n]=c>>>0;}}var c=0xFFFFFFFF;for(var i=0;i<bytes.length;i++)c=crcTable[(c^bytes[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0;}
function le16(n){return new Uint8Array([n&255,(n>>>8)&255]);}function le32(n){return new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);}
function join(arr){var n=arr.reduce(function(a,b){return a+b.length},0),o=new Uint8Array(n),p=0;arr.forEach(function(b){o.set(b,p);p+=b.length});return o;}
function zip(files){var enc=new TextEncoder(),locals=[],centrals=[],offset=0,count=0;Object.keys(files).forEach(function(name){count++;var nb=enc.encode(name),data=enc.encode(files[name]),crc=crc32(data);var lh=join([le32(0x04034b50),le16(20),le16(0),le16(0),le16(0),le16(0),le32(crc),le32(data.length),le32(data.length),le16(nb.length),le16(0),nb,data]);locals.push(lh);var ch=join([le32(0x02014b50),le16(20),le16(20),le16(0),le16(0),le16(0),le16(0),le32(crc),le32(data.length),le32(data.length),le16(nb.length),le16(0),le16(0),le16(0),le16(0),le32(0),le32(offset),nb]);centrals.push(ch);offset+=lh.length;});var central=join(centrals),local=join(locals),end=join([le32(0x06054b50),le16(0),le16(0),le16(count),le16(count),le32(central.length),le32(local.length),le16(0)]);return join([local,central,end]);}
function makeDocx(text){
 var paras=text.split(/\n/).map(function(line){var head=/^(TOPIC|QUICK INDEX|CORE FORMULAS|COMPARISON TABLES|CASE STUDIES|LECTURE DISCUSSION|PRACTICE QUESTIONS|GLOSSARY|Final check list|Calculation and table-reading)/i.test(line);var tabs=line.indexOf(' | ')>-1;var v=xml(line.replace(/ \| /g,'\t'));return '<w:p><w:pPr>'+(head?'<w:pStyle w:val="Heading1"/>':'')+'</w:pPr><w:r><w:rPr>'+(tabs?'<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/><w:sz w:val="18"/>':'')+'</w:rPr><w:t xml:space="preserve">'+v+'</w:t></w:r></w:p>';}).join('');
 var files={
 '[Content_Types].xml':'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>',
 '_rels/.rels':'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
 'word/document.xml':'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paras+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="900" w:right="900" w:bottom="900" w:left="900"/></w:sectPr></w:body></w:document>',
 'word/styles.xml':'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="21"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style></w:styles>'};
 return new Blob([zip(files)],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}
async function go(kind,btn){var old=btn.textContent;btn.disabled=true;btn.textContent='PREPARING…';try{var t=await notes();if(kind==='pdf')save(makePdf(t),'Privacy_Technologies_Midterm_Complete_Notes.pdf');else save(makeDocx(t),'Privacy_Technologies_Midterm_Complete_Notes.docx');}catch(e){console.error(e);alert('Could not prepare the notes file. Refresh and try again.');}finally{btn.disabled=false;btn.textContent=old;}}
document.getElementById('dlPdf').onclick=function(){go('pdf',this)};document.getElementById('dlWord').onclick=function(){go('word',this)};
})();
