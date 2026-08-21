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
  sec.innerHTML='<iframe title="Privacy Midterm Master Pack" src="./midterm-pack.html?v=20260821f" style="display:block;width:100%;height:calc(100vh - 50px);min-height:720px;border:0;background:var(--bg)"></iframe>';
  var author=document.getElementById('author');if(author)main.insertBefore(sec,author);else main.appendChild(sec);
}
})();