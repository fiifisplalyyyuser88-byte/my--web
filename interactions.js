function initStartup(){
 const start=document.querySelector('#startup'),welcome=start.querySelector('.welcome-screen'),screen=start.querySelector('.pin-screen');
 const pad=start.querySelector('.pin-pad'),dots=start.querySelector('.pin-dots');
 let pin='',unlocking=false;
 content.inert=true;nav.inert=true;
 
 pad.innerHTML=[1,2,3,4,5,6,7,8,9].map(n=>`<button type="button" class="pin-digit" data-digit="${n}" aria-label="${n}">${n}</button>`).join('')+`<span aria-hidden="true"></span><button type="button" class="pin-digit" data-digit="0" aria-label="0">0</button><button type="button" class="pin-delete" aria-label="Видалити цифру"><img src="pin-backspace.png" alt=""></button>`;
 function render(){dots.querySelectorAll('i').forEach((dot,i)=>dot.classList.toggle('filled',i<pin.length));dots.setAttribute('aria-label',`Введено ${pin.length} із 4 цифр`)}
 function enter(digit){if(unlocking||screen.hidden)return;const key=pad.querySelector(`[data-digit="${digit}"]`);key?.classList.add('pressed');setTimeout(()=>key?.classList.remove('pressed'),110);pin+=digit;render();if(pin.length===4){unlocking=true;setTimeout(()=>{pin='';start.classList.add('startup-finished');content.inert=false;nav.inert=false;document.removeEventListener('keydown',onKey);setTimeout(()=>start.remove(),250)},180)}}
 function remove(){if(unlocking)return;pin=pin.slice(0,-1);render()}
 function onKey(e){if(screen.hidden)return;if(/^[0-9]$/.test(e.key)){e.preventDefault();enter(e.key)}else if(e.key==='Backspace'||e.key==='Delete'){e.preventDefault();remove()}}
 pad.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.digit!==undefined)enter(b.dataset.digit);else remove()});
 document.addEventListener('keydown',onKey);
 start.querySelector('.pin-forgot').addEventListener('click',()=>modal('','Введіть будь-які чотири цифри. У цьому макеті немає справжньої авторизації. Код не зберігається і не передається.'));
 setTimeout(()=>{welcome.hidden=true;screen.hidden=false;screen.classList.add('pin-visible')},2000);
}
initStartup();

function demoSignatureHTML(){
 try{const saved=localStorage.getItem('demo-static-signature');if(saved&&/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(saved)&&saved.length<500000)return `<img src="${saved}" alt="">`}catch{}
 return 'Зразок';
}
function openDemoSignature(){
 const d=document.createElement('dialog');d.className='signature-editor';d.innerHTML='<h2></h2><p> — не є документом.</p><canvas width="600" height="240"></canvas><div class="editor-actions"><button data-clear>Очистити</button><button data-save>Зберегти</button><button data-close>Закрити</button></div><p role="status"></p>';document.body.append(d);d.showModal();const c=d.querySelector('canvas'),ctx=c.getContext('2d');let ink=false,drawing=false;ctx.lineWidth=3;ctx.lineCap='round';ctx.strokeStyle='black';
 function point(e){const r=c.getBoundingClientRect();return [(e.clientX-r.left)*600/r.width,(e.clientY-r.top)*240/r.height]}
 c.onpointerdown=e=>{drawing=true;c.setPointerCapture(e.pointerId);ctx.beginPath();ctx.moveTo(...point(e))};c.onpointermove=e=>{if(drawing){ctx.lineTo(...point(e));ctx.stroke();ink=true}};c.onpointerup=c.onpointercancel=()=>drawing=false;
 d.querySelector('[data-clear]').onclick=()=>{ctx.clearRect(0,0,600,240);ink=false};d.querySelector('[data-close]').onclick=()=>d.close();d.onclose=()=>d.remove();
 d.querySelector('[data-save]').onclick=()=>{if(!ink){d.querySelector('[role=status]').textContent='Спочатку намалюй підпис.';return}
 const pixels=ctx.getImageData(0,0,600,240).data;let x0=600,y0=240,x1=0,y1=0;
 for(let y=0;y<240;y++)for(let x=0;x<600;x++)if(pixels[(y*600+x)*4+3]){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}
 const out=document.createElement('canvas');out.width=x1-x0+13;out.height=y1-y0+24;const o=out.getContext('2d');o.drawImage(c,x0,y0,x1-x0+1,y1-y0+1,6,0,x1-x0+1,y1-y0+1);o.font='12px sans-serif';
 try{localStorage.setItem('demo-static-signature',out.toDataURL('image/png'));d.close();toast('Демопідпис збережено на цьому пристрої')}catch{d.querySelector('[role=status]').textContent='Не вдалося зберегти. Перевір доступ до сховища браузера.'}
 };
}

function formatDemoQrTime(seconds){return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0')}
function startDemoQrCountdown(card){
 if(card._qrTimer)clearInterval(card._qrTimer);
 const face=card.querySelector('.passport-back'),label=face.querySelector('.code-validity');
 if(!card._qrDeadline)card._qrDeadline=Date.now()+180000;
 function tick(){
  if(!card.isConnected){clearInterval(card._qrTimer);card._qrTimer=null;return}
  const remaining=Math.max(0,Math.ceil((card._qrDeadline-Date.now())/1000));
  label.textContent=remaining?'QR-код діятиме ще '+formatDemoQrTime(remaining)+' хв':'Демонстраційний час вичерпано';
  if(!remaining){clearInterval(card._qrTimer);card._qrTimer=null}
 }
 tick();card._qrTimer=setInterval(tick,250);
}
