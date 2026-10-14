(()=>{const RACINE=new URL('./',document.currentScript.src).href,h=document.documentElement,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const D=[5500,4500,6000,4500,4500],S0=D.reduce((a,d,i)=>(a.push(a[i]+d),a),[0]),TOT=S0[D.length];
const lis=$$('#jr li'),scs=$$('#ph .sc'),nt0=$('#nt0'),an=$('#cel-an'),cn=$('#cel-n'),ci=$('#cel-img'),cb=$('#cel-bras'),cr=$('#cel-rond'),se=$('#h-serie'),sj=$('#h-jours'),cf=$('#h-conf'),cbu=$('#cel-bulle');
let t=0,prev=null,vis=true,cPrec=-1,fete=false;const C=552.9,calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pose=f=>{ci.src=RACINE+'assets/'+f+'.webp';cb.style.backgroundImage='url('+RACINE+'assets/'+f+'-bras.webp)'};
const fmt=n=>n.toLocaleString(h.lang==='en'?'en-US':'fr-FR').replace(/\u202f|\u00a0/g,' ');
const confettis=()=>{cf.innerHTML='';if(calme)return;const ox=196,oy=416,K=['var(--accent)','var(--joie)','#C9772E','var(--election)'],N=44;for(let i=0;i<N;i++){const a=(i/N)*Math.PI*2+((i*37)%10)/40,r=140+((i*53)%90),x=Math.cos(a)*r,y=Math.sin(a)*r*.9,k=i%4,p=document.createElement('i');p.style.cssText='left:'+ox+'px;top:'+oy+'px;background:'+K[i%4]+';'+(k===0||k===2?'width:13px;height:5px;border-radius:2px;margin:-2px -6px':k===1?'width:8px;height:8px;border-radius:50%;margin:-4px':'width:9px;height:9px;margin:-4.5px;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)');cf.appendChild(p);const rot=(i*67)%360;p.animate([{transform:'translate(0,0) rotate(0) scale(.2)',opacity:0},{transform:'translate('+x+'px,'+(y-10)+'px) rotate('+rot+'deg) scale(1.1)',opacity:1,offset:.4},{transform:'translate('+x+'px,'+(y+40)+'px) rotate('+(rot+200)+'deg) scale(1)',opacity:0}],{duration:2200,delay:(i%7)*30,easing:'cubic-bezier(.12,.8,.3,1)',fill:'forwards'})}};
const caps=$$('.cap'),chapitre=c=>{cPrec=c;if(c>=1)chargerCal();caps.forEach(e=>e.classList.toggle('on',+e.dataset.cap===c));scs.forEach(e=>e.classList.toggle('on',+e.dataset.sc===c));if(c>2){const fr=scs[c].querySelector('.cal-f');fr&&fr._jouer&&fr._jouer()}lis.forEach((l,i)=>{l.classList.toggle('on',i===c);l.classList.toggle('passe',i<c);if(i!==c)l.style.setProperty('--p',i<c?1:0)})};
const peindre=force=>{let c=0;while(t>=S0[c+1])c++;const lt=t-S0[c];if(c!==cPrec||force)chapitre(c);
lis[c].style.setProperty('--p',Math.min(1,lt/D[c]).toFixed(3));
const vu=c===0&&lt>700;nt0.classList.toggle('vu',vu);
if(c===2){const k=Math.max(0,Math.min(1,(lt-700)/1600)),e=1-Math.pow(1-k,3),n=Math.round((6800+200*e)/10)*10;an.setAttribute('stroke-dasharray',(C*n/7000).toFixed(1)+' '+C);cn.textContent=fmt(n);
if(k>=1&&!fete){fete=true;pose('accueil-g5');cbu.classList.add('on');cr.classList.add('pop');setTimeout(()=>cr.classList.remove('pop'),350);confettis();setTimeout(()=>{sj.textContent='24';se.classList.add('pop');setTimeout(()=>se.classList.remove('pop'),400)},700)}
if(k<1&&fete){fete=false;pose('accueil-g2');cbu.classList.remove('on');sj.textContent='23';cf.innerHTML=''}}
else if(fete){fete=false;pose('accueil-g2');cbu.classList.remove('on');sj.textContent='23';cf.innerHTML='';an.setAttribute('stroke-dasharray',(C*6800/7000).toFixed(1)+' '+C);cn.textContent=fmt(6800)}};

const calLib=new Promise(r=>{const s=document.createElement('script');s.src=RACINE+'assets/cal-histoire.js';s.onload=r;document.head.appendChild(s)}),calPatch=(d,n,f)=>window.moraCalPatch(d,n,f);
let calOk=false;const chargerCal=()=>{if(calOk)return;calOk=true;fetch(RACINE+'ecrans/30-calendrier-planche.html').then(r=>r.text()).then(src=>{const doc=src.split('sur 5 000 pas').join('sur 7 000 pas').replace(/<script src="..\/assets\/motion-calendrier.js"><\/script>/,'').replace('<head>','<head><base href="'+RACINE+'ecrans/'+'">');$$('.cal-f').forEach(f=>{f.addEventListener('load',()=>calLib.then(()=>{try{const d=f.contentDocument;calPatch(d,+f.dataset.n,f);const s=d.createElement('script');s.src=RACINE+'assets/motion-calendrier.js';d.body.appendChild(s);if(cPrec===+f.parentElement.dataset.sc)f._jouer&&f._jouer()}catch(err){console.warn(err)}}),{once:true});f.removeAttribute('src');f.srcdoc=doc})})};
const boucle=now=>{if(prev!==null&&vis){t+=Math.min(64,now-prev);if(t>=TOT)t=0;peindre()}prev=now;requestAnimationFrame(boucle)};
lis.forEach((l,i)=>l.querySelector('button').onclick=()=>{t=S0[i]+1;peindre(true)});
let voir=()=>{const r=$('#demo').getBoundingClientRect();vis=!document.hidden&&r.bottom>0&&r.top<innerHeight};const v_=()=>voir();addEventListener('scroll',v_,{passive:true});addEventListener('resize',v_);document.addEventListener('visibilitychange',v_);
window.moraDemo={seek:ms=>{t=ms;peindre(true)},pause:()=>{vis=false;voir=()=>{}}};
const set=l=>{$$('.langue a').forEach(b=>b.classList.toggle('on',b.dataset.l===l))};
$$('.langue a').forEach(b=>b.addEventListener('click',()=>{try{localStorage.setItem('mora-site-langue',b.dataset.l)}catch(e){}}));
const en=$('.entete'),sc=()=>en.classList.toggle('defile',scrollY>12);addEventListener('scroll',sc,{passive:true});sc();
set(h.lang);voir();peindre(true);requestAnimationFrame(boucle);
window.moraCapture=n=>{h.classList.add('capture');scrollTo(0,0);window.moraDemo.pause();window.moraDemo.seek([3000,8500,12400,19000,24000][n]||0);if(n===2)setTimeout(()=>document.getAnimations().forEach(a=>a.pause()),950)};
const CAP=new URLSearchParams(location.search).get('cap');if(CAP!==null)window.moraCapture(+CAP)})();
