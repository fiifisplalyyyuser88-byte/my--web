const paths={feed:'<rect x="3" y="2" width="17" height="19" rx="3"/><rect x="6" y="5" width="9" height="7" rx="1"/><path d="M6 16h9M20 9h2v12H8"/>',documents:'<rect x="4" y="2" width="16" height="20" rx="3"/><rect x="8" y="5" width="7" height="6" rx="1"/><path d="M8 15h8M8 18h8"/>',ai:'<rect x="2" y="2" width="20" height="20" rx="6"/><path d="m12 5 2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',services:'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="m14 4-7 9h5l-2 7 7-10h-5z"/>',menu:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="3"/><path d="M5 19c1-6 13-6 14 0"/>',arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',scan:'<path d="M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5M2 12h20"/>',trident:'<path d="M12 2v18m0-12L8 5v9l4 5 4-5V5l-4 3M4 4l2 14h12l2-14M8 22l4-3 4 3"/>',offline:'<path d="m5 2 14 20M12 3v4m-4 6h8M6 20l6-13 6 13M4 3l16 18"/><circle cx="12" cy="3" r="1"/>',search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',mail:'<rect x="2" y="4" width="20" height="16" rx="4"/><path d="m3 7 9 6 9-6"/>',key:'<circle cx="7" cy="12" r="4"/><path d="M11 12h11m-4 0v4m-3-4v2"/>',copy:'<rect x="8" y="8" width="13" height="13" rx="1"/><path d="M16 8V3H3v13h5"/>',files:'<path d="M8 3h7l5 5v10H8zM15 3v6h5M5 7H3v15h13v-2"/>',settings:'<path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z"/><circle cx="12" cy="12" r="3"/>',refresh:'<path d="M3 9a9 9 0 0 1 16-4l2 3M21 15a9 9 0 0 1-16 4l-2-3M3 3v6h6m12 12v-6h-6"/>',phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="18" r=".6"/>',chat:'<path d="M3 3h18v14H9l-5 4v-4H3zM7 7h10M7 11h7"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5m0 4v.1"/>',card:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',barcode:'<path d="M3 5v14M6 5v14M9 5v14m4-14v14m3-14v14m3-14v14m3-14v14"/>',tools:'<path d="m3 21 8-8M14 10l7-7a6 6 0 0 1-8 8L5 21l-3-3 10-9a6 6 0 0 1-8-7l4 4 3-3-4-4M15 15l6 6"/>',army:'<path d="M4 12c0-12 17-12 16 0l-16 5m6-3 3 7 3-1-2-7"/>',sim:'<path d="m4 7 6-5h10v20H4z"/><rect x="8" y="9" width="8" height="8" rx="1"/>',fitness:'<path d="M2 8v8m3-10v12m14-12v12m3-10v8M5 12h14M9 5v14m6-14v14"/>',signature:'<rect x="2" y="3" width="16" height="17" rx="4"/><path d="m10 18 9-9 3 3-9 9h-3zM6 7h6m-6 4h4"/>'};
const icon=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${paths[n]||paths.services}</svg>`;
const arrow=()=>`<span class="circle-arrow">${icon('arrow')}</span>`;
const content=document.querySelector('main'),phone=document.querySelector('.phone'),nav=document.querySelector('nav'),dialog=document.querySelector('dialog');
const tabs=[['feed','Стрічка'],['documents','Документи'],['ai','Дія.AI'],['services','Сервіси'],['menu','Меню']];
let current='feed',docIndex=0,toastTimer;
function modal(title,text='Це інтерактивний макет. Послуга доступна в офіційному застосунку Дія.'){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-text').textContent=text;dialog.showModal()}
function toast(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),2000)}
function rows(items,arrows=false){return `<div class="group">${items.map(([name,symbol])=>`<button class="row" data-action="${name}">${symbol?icon(symbol):''}<span>${name}</span>${arrows?arrow():''}</button>`).join('')}</div>`}
function feed(){return `<div class="feed"><h1>Привіт👋</h1><section class="resilience"><h2>Незламність</h2><p>Мапа укриттів, Пунктів незламності та<br>відділень Power Banking.<br>Заява про відсутній зв’язок.</p><div class="resilience-bottom"><div class="brands"><span>ϟ</span><span>◐</span><span>▥</span></div><button class="circle-arrow" data-action="Незламність" aria-label="Відкрити Незламність">${icon('arrow')}</button></div></section><div class="shortcuts">${[['Дія Сканер','scan'],['Військові<br>облігації','trident'],['Відсутній<br>зв’язок','offline']].map(([n,i])=>`<button class="shortcut" data-action="${n.replaceAll('<br>',' ')}"><span class="symbol">${icon(i)}</span>${n}</button>`).join('')}</div><button class="banner" data-action="Лінія дронів"><img src="drone-banner.jpg" alt="Лінія дронів. Змінити хід подій"></button><h2>Що нового?</h2><div class="news-track">${['Деякі послуги для ВПО в Дії будуть тимчасово недоступні','Оновлення сервісів у Дії','Новини цифрових послуг','Дія завжди поруч','Дізнавайтеся про нові можливості'].map((n,i)=>`<article class="news"><div class="news-art">${i===0?'🚧🛠️':'📱'}</div><div class="news-copy"><small>Сьогодні, 13:20</small><p>${n}</p></div></article>`).join('')}</div><div class="dots news-dots">${Array.from({length:5},(_,i)=>`<button class="${i===0?'selected':''}" data-news="${i}" aria-label="Новина ${i+1}"></button>`).join('')}</div><h2>Популярні послуги</h2>${rows([['Опитування'],['Заміна водійського посвідчення'],['Податки ФОП']],true)}</div>`}
const services=[['Допомога армії','army'],['Незламність','services'],['Дія.Картка','card'],['Військові облігації','trident'],['Лінія дронів','trident'],['Національний кешбек','barcode'],['Перенесення номера','sim'],['єВідновлення','tools'],['Дія.Підпис','signature'],['Спорт','fitness']];
function serviceCards(q=''){const found=services.filter(([n])=>n.toLowerCase().includes(q.toLowerCase()));return found.length?found.map(([n,i])=>`<button class="service" data-action="${n}"><span class="service-icon">${icon(i)}</span><span>${n}</span></button>`).join(''):'<p>Послуг не знайдено</p>'}
function servicePage(){return `<h1>Сервіси</h1><label class="search">${icon('search')}<input type="search" placeholder="Пошук" aria-label="Пошук сервісів"></label><div class="services-grid">${serviceCards()}</div>`}
function menu(){return `<div class="menu"><h1>Меню</h1><p class="version">Версія Дії: 4.38.0.2894</p>${rows([['Зробити підпис','key']])}${rows([['Повідомлення','mail']])}${rows([['Дія.Підпис','key'],['Історія підписань','files']])}${rows([['Налаштування','settings'],['Оновити застосунок','refresh'],['Підключені пристрої','phone']])}${rows([['Служба підтримки','chat'],['Копіювати номер пристрою','copy'],['Питання та відповіді','help']])}<span class="demo-caption">Макет інтерфейсу</span></div>`}
const docNames=['єДокумент','Картка платника податків','Паспорт громадянина України','Студентський квиток','Свідоцтво про базову середню освіту'];
function documentCard(index){if(index===2)return passportCard();const i=index>2?index-1:index;let body='',footer='';if(i===0){body='<div class="doc-main"><img src="portrait-id.jpg" alt="Фото власника єДокумента"><div><p>Дата<br>народження:<span>29.11.2007</span></p><p>РНОКПП:<span>23488123323</span></p></div></div>';footer='<div class="name">АФИНОВ<br>МАКСИМ<br>АНДРІЙОВИЧ</div>'}if(i===1){body='<div class="doc-body"><h2>РНОКПП</h2><p class="person">АФИНОВ<br>МАКСИМ<br>АНДРІЙОВИЧ</p><p>Дата народження:<span>29.11.2007</span></p></div>';footer='<span class="number">431233859321</span><button class="copy" data-copy="723812930282" aria-label="Копіювати номер">'+icon('copy')+'</button>'}if(i===2){body='<div class="doc-main"><img src="portrait-student.jpg" alt="Фото власника студентського квитка"><div><p>Номер:<span>ТА22709639</span></p><p>Дійсний до:<span>30.06.2030</span></p><p>Форма навчання:<span>денна</span></p></div></div>';footer='<div class="name">Афинов<br>МАКСИМ<br>АНДРІЙОВИЧ</div>'}if(i===3){body='<div class="doc-body"><p>Ліцей №2 "Подільський" Полтавської міської ради</p><p>Дата видачі:<span>05.06.2026</span></p></div>';footer='<span class="number">ТА 56221420</span><button class="copy" data-copy="ТА 56221420" aria-label="Копіювати номер">'+icon('copy')+'</button>'}const front=`<span class="demo-mark"></span><h2>${docNames[index]}</h2>${body}<div class="ticker"><span>${i===0?'Документ діє під час воєнного стану. Ой у лузі червона калина.':'Документ оновлено о 14:40 | 02.10.2026 • Документ оновлено о 14:40 | 02.10.2026 •'}</span></div><div class="doc-footer">${footer}<button class="more" data-document="${index}" aria-label="Дії з документом">···</button></div>`;if(i!==0)return `<article class="document" aria-label="${docNames[index]}">${front}</article>`;return `<article class="document document-flippable" aria-label="єДокумент"><div class="document-inner"><div class="document-face document-front">${front}<button class="flip-trigger" data-flip="back" aria-label="Показати QR-код єДокумента"></button></div><div class="document-face document-back" inert><span class="demo-mark"></span><img class="demo-qr" src="demo-qr.svg" alt="QR-код"><button class="flip-trigger" data-flip="front" aria-label="Повернутися до єДокумента"></button></div></div></article>`}
function documents(){return `<div class="document-track" tabindex="0" aria-label="Карусель документів">${docNames.map((_,i)=>documentCard(i)).join('')}</div><div class="dots document-dots">${docNames.map((n,i)=>`<button data-doc="${i}" class="${i===docIndex?'selected':''}" aria-label="${n}"></button>`).join('')}<button disabled aria-label="Інші документи"></button></div>`}
function updateDoc(i){docIndex=i;if(i!==0)phone.removeAttribute('data-flipped');else if(document.querySelector('.document-flippable.flipped'))phone.dataset.flipped='true';phone.dataset.doc=i;document.querySelectorAll('[data-doc]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.doc)===i))}

function goToDoc(index,animate=true){
 const track=document.querySelector('.document-track');if(!track)return;
 const cards=track.querySelectorAll('.document');index=Math.max(0,Math.min(cards.length-1,index));
 cancelAnimationFrame(track._animation);
 const target=Math.max(0,Math.min(track.scrollWidth-track.clientWidth,cards[index].offsetLeft-(track.clientWidth-cards[index].offsetWidth)/2));
 const start=track.scrollLeft,distance=target-start;
 if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){track.scrollLeft=target;updateDoc(index);return}
 const began=performance.now();
 function frame(now){const t=Math.min(1,(now-began)/380);track.scrollLeft=start+distance*(1-Math.pow(1-t,3));if(t<1)track._animation=requestAnimationFrame(frame);else updateDoc(index)}
 track._animation=requestAnimationFrame(frame);
}
function setupDocumentSwipe(track){
 let gesture=null,suppressClickUntil=0;
 track.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||!e.isPrimary||e.button!==0)return;
  cancelAnimationFrame(track._animation);
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,start:track.scrollLeft,index:docIndex,time:performance.now(),dragging:false};
 });
 track.addEventListener('pointermove',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(!gesture.dragging){
   if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){gesture=null;return}
   if(Math.abs(dx)<8)return;
   gesture.dragging=true;track.setPointerCapture(e.pointerId);track.classList.add('dragging');
  }
  e.preventDefault();track.scrollLeft=gesture.start-dx;
 },{passive:false});
 function finish(e,cancelled=false){
  if(!gesture||gesture.id!==e.pointerId)return;
  const g=gesture;gesture=null;track.classList.remove('dragging');
  if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);
  if(!g.dragging)return;
  suppressClickUntil=performance.now()+450;
  const dx=e.clientX-g.x,elapsed=Math.max(1,performance.now()-g.time);
  const advance=!cancelled&&(Math.abs(dx)>35||Math.abs(dx)/elapsed>.35);
  goToDoc(g.index+(advance?(dx<0?1:-1):0));
 }
 track.addEventListener('pointerup',e=>finish(e));track.addEventListener('pointercancel',e=>finish(e,true));
 track.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopPropagation()}},true);
 let touchStart=null;
 track.addEventListener('touchstart',e=>{cancelAnimationFrame(track._animation);const t=e.touches[0];touchStart=t?{x:t.clientX,y:t.clientY}:null},{passive:true});
 track.addEventListener('touchmove',e=>{const t=e.touches[0];if(t&&touchStart&&Math.abs(t.clientX-touchStart.x)>8)suppressClickUntil=performance.now()+700},{passive:true});
 track.addEventListener('touchend',()=>{touchStart=null},{passive:true});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goToDoc(docIndex+(e.key==='ArrowRight'?1:-1))}});
 track.querySelectorAll('img').forEach(img=>img.draggable=false);
}


let backgroundFrame=0;
const backgroundPalettes=[
 [['#75b8b1','#52b8d0','#a6accb'],['#d6b5ca','#dbddba','#c6b4d9']],
 [['#63b3af','#55b9d0','#bca6d0'],['#75bbb9','#97b8d7','#cdb4d8']],
 [['#b5add5','#a8c7df','#f7f5ae'],['#c5b0d8','#87c5dc','#e6edae']],
 [['#a2b7db','#8ec4df','#f1f794'],['#b9bdd9','#8bc6d4','#e8eeab']]
];
function blendColor(a,b,t){
 const x=a.replace('#',''),y=b.replace('#','');
 return '#'+[0,2,4].map(i=>Math.round(parseInt(x.slice(i,i+2),16)*(1-t)+parseInt(y.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
}
function startDocumentBackground(){
 cancelAnimationFrame(backgroundFrame);const reduced=matchMedia('(prefers-reduced-motion: reduce)');let last=0;
 const frames=[['#75b8b1','#52b8d0','#a6accb'],['#d6b5ca','#97b8d7','#dbddba'],['#b5add5','#a8c7df','#f7f5ae'],['#63b3af','#55b9d0','#bca6d0']];
 function frame(now){if(current!=='documents')return;backgroundFrame=requestAnimationFrame(frame);if(document.hidden||now-last<32)return;last=now;
 const phase=reduced.matches?0:(now/10000)%frames.length;const a=Math.floor(phase),b=(a+1)%frames.length,t=(1-Math.cos((phase-a)*Math.PI))/2;
 for(let i=0;i<3;i++)phone.style.setProperty('--doc-bg-'+i,blendColor(frames[a][i],frames[b][i],t));}
 backgroundFrame=requestAnimationFrame(frame);
}

function navigate(tab){cancelAnimationFrame(backgroundFrame);current=tab;content.className=tab;phone.removeAttribute('data-doc');phone.removeAttribute('data-flipped');content.innerHTML=tab==='feed'?feed():tab==='menu'?menu():tab==='services'?servicePage():tab==='documents'?documents():`<div class="ai"><div class="spark">${icon('ai')}</div><h1>Дія.AI</h1><p>Асистент у державних послугах</p><button class="done" data-action="Дія.AI">Почати розмову</button></div>`;content.scrollTop=0;nav.innerHTML=tabs.map(([t,n])=>`<button data-tab="${t}" class="${t===tab?'active':''}" ${t===tab?'aria-current="page"':''}>${icon(t)}<span>${n}</span></button>`).join('');if(tab==='documents'){const track=document.querySelector('.document-track');setupDocumentSwipe(track);startDocumentBackground();requestAnimationFrame(()=>{goToDoc(docIndex,false);updateDoc(docIndex)});track.addEventListener('scroll',()=>{const i=Math.round(track.scrollLeft/(track.querySelector('.document').offsetWidth+parseFloat(getComputedStyle(track).gap)));updateDoc(Math.min(docNames.length-1,Math.max(0,i)))},{passive:true})}const nt=document.querySelector('.news-track');if(nt)nt.addEventListener('scroll',()=>{let i=Math.round(nt.scrollLeft/(nt.firstElementChild.offsetWidth+parseFloat(getComputedStyle(nt).gap)));document.querySelectorAll('[data-news]').forEach(b=>b.classList.toggle('selected',+b.dataset.news===i))},{passive:true})}
nav.addEventListener('click',e=>{let b=e.target.closest('[data-tab]');if(b)navigate(b.dataset.tab)});content.addEventListener('input',e=>{if(e.target.matches('input[type=search]'))document.querySelector('.services-grid').innerHTML=serviceCards(e.target.value)});
async function copy(text){try{await navigator.clipboard.writeText(text);toast('Скопійовано')}catch{modal('Копіювання',text)}}
content.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.code){const face=b.closest('.passport-back');face.querySelectorAll('[data-code]').forEach(t=>{t.classList.toggle('selected',t===b);t.setAttribute('aria-pressed',String(t===b))});face.querySelector('.demo-qr').src=b.dataset.code==='qr'?'demo-qr.svg':'demo-barcode.svg';return}if(b.dataset.flip){const card=b.closest('.document-flippable');const flipped=b.dataset.flip==='back';card.classList.toggle('flipped',flipped);card.querySelector('.document-front').inert=flipped;card.querySelector('.document-back').inert=!flipped;if(flipped&&card.classList.contains('passport-document'))startDemoQrCountdown(card);if(flipped)phone.dataset.flipped='true';else phone.removeAttribute('data-flipped');const target=card.querySelector(flipped?'.document-back .flip-trigger':'.document-front .flip-trigger');target.focus({preventScroll:true});return}if(b.dataset.action){if(b.dataset.action==='Зробити підпис'){openDemoSignature();return}if(b.dataset.action==='Копіювати номер пристрою')copy('DEMO-DEVICE-0001');else modal(b.dataset.action)}if(b.dataset.document)modal(docNames[+b.dataset.document],'Макет документа зі скриншота. Перевірка документа та QR-код доступні лише в офіційному застосунку.');if(b.dataset.copy)copy(b.dataset.copy);if(b.dataset.doc){goToDoc(+b.dataset.doc)}if(b.dataset.news){const t=document.querySelector('.news-track');t.scrollTo({left:+b.dataset.news*(t.firstElementChild.offsetWidth+parseFloat(getComputedStyle(t).gap)),behavior:'smooth'})}});
dialog.querySelector('.close').onclick=()=>dialog.close();dialog.querySelector('.done').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});navigate('feed');

function passportCard(){return `<article class="document document-flippable passport-document" aria-label=""><div class="document-inner"><div class="document-face document-front"><span class="demo-mark"></span><h2>Паспорт громадянина<br>України</h2><div class="doc-main"><img src="portrait-id.jpg" alt=""><div><p>Дата<br>народження:<span>29.11.2007</span></p><p>Номер:<span>37482394572</span></p><div class="sample-signature">${demoSignatureHTML()}</div></div></div><div class="ticker"><span>Документ оноволено о 01:01 | 03.10.2026 • Документ оноволено о 01:01 | 03.10.2026</span></div><div class="doc-footer"><div class="name">АФИНОВ<br>МАКСИМ<br>АНДРІЙОВИЧ</div><button class="more" data-document="2" aria-label="">···</button></div><button class="flip-trigger" data-flip="back" aria-label="QR-код"></button></div><div class="document-face document-back passport-back" inert><span class="demo-mark"></span><p class="code-validity" role="timer" aria-label="">QR-код діятиме 3 хвилини</p><img class="demo-qr" src="demo-qr.svg" alt="QR з повідомленням DEMO"><div class="passport-controls"><button data-code="qr" class="selected" aria-pressed="true"><span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M15 15h3v3h3v3h-6v-3m6-3v1"/></svg></span>QR-код</button><button data-code="barcode" aria-pressed="false"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6v12M8 6v12M12 6v12M16 6v12M20 6v12"/></svg></span>Штрихкод</button></div><button class="flip-trigger" data-flip="front" aria-label=""></button></div></div></article>`}
