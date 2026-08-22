"use strict";
(function(){
if(window.__privStaticMidtermTab)return;window.__privStaticMidtermTab=true;
if(typeof TABS!=='undefined'&&TABS.indexOf('midterm')<0){var ai=TABS.indexOf('author');TABS.splice(ai>-1?ai:TABS.length,0,'midterm');}
var authorBtn=document.querySelector('.tabbtn[data-tab="author"]');
var btn=document.querySelector('.tabbtn[data-tab="midterm"]');
if(!btn){
  btn=document.createElement('button');btn.className='tabbtn';btn.dataset.tab='midterm';btn.textContent='MIDTERM';
  if(authorBtn&&authorBtn.parentNode)authorBtn.parentNode.insertBefore(btn,authorBtn);else{var nav=document.querySelector('.navin');if(nav)nav.appendChild(btn);}
  btn.addEventListener('click',function(){if(typeof go==='function')go('midterm');});
}
var main=document.getElementById('main'),sec=document.getElementById('midterm');
if(!sec&&main){
  sec=document.createElement('section');sec.className='tab';sec.id='midterm';
  var frame=document.createElement('iframe');
  frame.title='Privacy Technologies Midterm Notes';
  frame.src='./midterm-pack.html?v=20260822openbook';
  frame.style.cssText='display:block;width:100%;height:calc(100vh - 50px);min-height:720px;border:0;background:var(--bg)';
  frame.addEventListener('load',function(){
    try{
      var d=frame.contentDocument||frame.contentWindow.document;
      if(!d||d.getElementById('privOpenBookAddon'))return;
      var s=d.createElement('script');s.id='privOpenBookAddon';s.src='./midterm-downloads.js?v=20260822openbook';s.async=false;(d.body||d.documentElement).appendChild(s);
    }catch(e){console.error(e);}
  });
  sec.appendChild(frame);
  var author=document.getElementById('author');if(author)main.insertBefore(sec,author);else main.appendChild(sec);
}
})();