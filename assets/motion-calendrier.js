// Motion du Calendrier : barres qui montent (Semaine), série surlignée de proche en proche (Mois), feuille du jour, sélecteur qui glisse.
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const EO='cubic-bezier(.2,.8,.2,1)',DOUX='cubic-bezier(.25,.8,.25,1)';
const fmt=n=>n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g,' ');
const pile=e=>{(e._A||[]).forEach(a=>a.cancel());e._A=[];e._jeton=(e._jeton||0)+1;return (el,k,o)=>{if(RM||!el)return;e._A.push(el.animate(k,o))}};
const compter=(e,el,dur,delay)=>{if(RM||!el)return;const tn=[...el.childNodes].reverse().find(n=>n.nodeType===3&&n.textContent.trim());const cible=tn||el;const fin=cible.textContent;const v=parseInt(fin.replace(/\D/g,''))||0;const j=e._jeton,t0=performance.now()+delay;const pad=tn?'':'';
const f=n=>{if(e._jeton!==j){cible.textContent=fin;return}const k=Math.max(0,Math.min(1,(n-t0)/dur));cible.textContent=k>=1?fin:fmt(Math.round(v*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)};cible.textContent='0';requestAnimationFrame(f)};

const semaine=(e,b,an)=>{const g=b.querySelector('[style*="height:214px"]');if(!g)return;const [ligne,pill,cols]=g.children;
an(ligne,[{opacity:0},{opacity:1}],{duration:500,easing:'ease-out',fill:'backwards'});an(pill,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:450,delay:150,easing:EO,fill:'backwards'});
[...cols.children].forEach((c,i)=>{const t=c.firstElementChild;if(!t)return;const st=t.getAttribute('style')||'';const plein=/background:var\(--(accent|plein)\)/.test(st);const fill=plein?t:[...t.children].find(x=>x.tagName==='DIV'&&x.style.position==='absolute');if(!fill)return;const H=parseFloat(fill.style.height);if(!H)return;
an(fill,[{height:(plein?36:0)+'px'},{height:H+'px'}],{duration:1000,delay:400+i*80,easing:DOUX,fill:'backwards'});
if(plein){const p=t.querySelector('svg');an(p,[{transform:'none'},{transform:'translateY(-2px)'},{transform:'none'}],{duration:500,delay:400+i*80+950,easing:'ease-in-out'})}});
compter(e,b.querySelector('.total b'),1400,400)};

const mois=(e,b,an)=>{const rows=[...b.querySelectorAll('[style*="height:60px"]')];const bands=[],dots=[],badges=[];
rows.forEach((r,ri)=>[...r.children].forEach(s=>{const st=s.getAttribute('style')||'';if(st.includes('height:44px')&&st.includes('top:16px'))bands.push({s,ri,l:parseFloat(s.style.left),w:parseFloat(s.style.width)});else if(st.includes('width:36px;height:36px'))dots.push({s,ri,ci:Math.round((parseFloat(s.style.left)-3.21)/50.43)});else if(st.includes('top:10px'))badges.push(s)}));
dots.forEach(d=>an(d.s,[{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'none'}],{duration:450,delay:(d.ri+d.ci)*40,easing:EO,fill:'backwards'}));
bands.sort((a,c)=>a.ri-c.ri||a.l-c.l);const W=bands.reduce((s,x)=>s+x.w,0)||1;let acc=0;const T0=600,TOT=1800;
bands.forEach((x,i)=>{const d=Math.max(220,x.w/W*TOT);const ez=bands.length===1?'cubic-bezier(.4,0,.2,1)':i===0?'cubic-bezier(.4,0,1,1)':i===bands.length-1?'cubic-bezier(0,0,.2,1)':'linear';an(x.s,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],{duration:d,delay:T0+acc,easing:ez,fill:'backwards'});acc+=d});
badges.forEach(s=>an(s,[{opacity:0,transform:'translateY(3px)'},{opacity:1,transform:'none'}],{duration:400,delay:T0+acc,easing:EO,fill:'backwards'}));
compter(e,b.querySelector('.total b'),1400,300)};

const serie=(e,an)=>{const c=e.querySelector('.serie .bloc .chiffre');if(!c)return;compter(e,c,1100,250);an(c.querySelector('svg'),[{transform:'none'},{transform:'scale(1.08)'},{transform:'none'}],{duration:600,delay:1350,easing:'ease-in-out'})};

const jour=(e,an)=>{const f=e.querySelector('[style*="border-radius:38px 38px 0 0"]');if(!f)return false;an(f.previousElementSibling,[{opacity:0},{opacity:1}],{duration:450,easing:'ease-out',fill:'backwards'});
an(f,[{transform:'translateY(100%)'},{transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.9,.25,1)',fill:'backwards'});
const arc=f.querySelector('circle[r="88"][stroke="var(--accent)"]');an(arc,[{strokeDashoffset:552.92},{strokeDashoffset:0}],{duration:1300,delay:550,easing:'cubic-bezier(.3,0,.2,1)',fill:'backwards'});
compter(e,f.querySelector('span[style*="font:700 48px"]'),1300,550);
[...f.querySelectorAll('[style*="grid-template-columns:1fr 1fr"]>div')].forEach((c,i)=>an(c,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:500,delay:900+i*100,easing:EO,fill:'backwards'}));return true};

const bloc=e=>e.querySelector('.defile').children[2];
const jouer=e=>{const an=pile(e);if(jour(e,an))return;serie(e,an);(e.dataset.vue==='semaine'?semaine:mois)(e,bloc(e),an)};

document.querySelectorAll('.rang').forEach(rang=>{const figs=[...rang.querySelectorAll('figure')];const vues={};
figs.forEach(f=>{const e=f.querySelector('.ecran'),s=e.querySelector('.selecteur');const v=s&&s.querySelector('span.elu')?.textContent.trim().toLowerCase();if(!e.querySelector('[style*="border-radius:38px 38px 0 0"]')&&v){e.dataset.vue=v;vues[v]=bloc(e).cloneNode(true)}});
figs.forEach(f=>{const e=f.querySelector('.ecran'),s=e.querySelector('.selecteur');
const r=document.createElement('button');r.className='rejouer';r.textContent='Rejouer';r.onclick=()=>jouer(e);f.appendChild(r);
if(!e.dataset.vue||!s)return;s.classList.add('anime');s.dataset.v=e.dataset.vue;s.insertAdjacentHTML('afterbegin','<i class="pastille"></i>');
[...s.querySelectorAll('span')].forEach(sp=>sp.onclick=()=>{const v=sp.textContent.trim().toLowerCase();if(v===e.dataset.vue||!vues[v])return;const dir=v==='mois'?1:-1;
s.querySelectorAll('span').forEach(x=>x.classList.toggle('elu',x===sp));s.dataset.v=v;e.dataset.vue=v;
const vieux=bloc(e),neuf=vues[v].cloneNode(true);const poser=()=>{vieux.replaceWith(neuf);const an=pile(e);if(!RM)neuf.animate([{opacity:0,transform:'translateX('+dir*14+'px)'},{opacity:1,transform:'none'}],{duration:380,easing:EO});(v==='semaine'?semaine:mois)(e,neuf,an)};
if(RM)return poser();vieux.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateX('+(-dir*14)+'px)'}],{duration:220,easing:'ease-in',fill:'forwards'}).onfinish=poser})})});

const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){io.unobserve(x.target);jouer(x.target)}}),{threshold:.3});
document.querySelectorAll('.rang .ecran').forEach(e=>io.observe(e));
})();
