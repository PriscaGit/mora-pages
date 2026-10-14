/* Calendrier de la démo (jeudi 24 sept., série 24, objectif 7 000) : adapte un écran de ecrans/30-calendrier-planche.html. n=1 Semaine, n=0 Mois. Utilisé par site/landing.js et ecrans/_capture-appstore-cal.html */
(()=>{const calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
const calPatch=(d,n,f)=>{const A=[];const E=[...d.querySelectorAll('.ecran')],e=E[n];d.body.style.cssText='margin:0;padding:0;background:#FAF7F1;display:block;min-height:0;overflow:hidden';[...d.body.children].forEach(x=>{if(!x.contains(e)&&x.tagName!=='SVG'&&x.tagName!=='svg'&&x.tagName!=='SCRIPT'&&x.tagName!=='STYLE')x.style.display='none'});let p=e.parentElement;while(p&&p!==d.body){[...p.children].forEach(x=>{if(x!==e&&!x.contains(e))x.style.display='none'});p.style.cssText+=';margin:0;padding:0;gap:0;display:block';p=p.parentElement}e.style.margin='0';e.style.boxShadow='none';e.style.borderRadius='0';
const st=e.querySelector('.statut');if(st)st.textContent='19:05';const ch=e.querySelectorAll('.serie .chiffre');ch.forEach(x=>{const t=[...x.childNodes].find(k=>k.nodeType===3&&k.textContent.trim());if(t)t.textContent='24'});
const css=(el,o)=>el&&Object.assign(el.style,o);
if(n===1){const cols=[...e.querySelectorAll('[style*="height:214px"] > [style*="inset:0"] > div')],H=118.75;
const plein=cols[1].firstElementChild;
const met=(i,h)=>{const nv=plein.cloneNode(true);nv.style.height=h+'px';cols[i].replaceChildren(nv)};
const vide=cols[6].firstElementChild;const fut=i=>cols[i].replaceChildren(vide.cloneNode(true));
met(0,133);met(3,H);fut(4);fut(5);
cols.forEach((c,i)=>{const b=c.firstElementChild;if(!b)return;b.style.transformOrigin='50% 100%';A.push(()=>b.animate(i<4?[{transform:'scaleY(0)'},{transform:'scaleY(1.04)',offset:.8},{transform:'scaleY(1)'}]:[{opacity:0},{opacity:1}],{duration:i<4?620:400,delay:120+i*90,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'}))});
const lab=e.querySelector('[style*="height:48px"]'),sp=[...lab.children],days=sp.filter(x=>x.tagName==='DIV');
const W=(353-48)/7,fin=4*W+3*8;css(sp[0],{left:'0px',width:fin+'px'});css(sp[1],{left:(fin-14)+'px'});
days.forEach((dv,i)=>{const [l,nb]=dv.children;const auj=i===3,f=i>3;l.style.color=auj?'var(--accent)':'var(--text2)';nb.style.color=auj?'var(--accent)':f?'var(--pied)':'var(--text)';nb.style.fontWeight=auj?'700':'600'});
const tot=e.querySelector('.entete-periode .total b');if(tot)tot.textContent='29 400';const au=[...e.querySelectorAll('b')].find(x=>/pas$/.test(x.textContent)&&x.closest('div').textContent.startsWith('Aujourd'));if(au)au.textContent='7 000 pas'}
if(n===0){const rows=[...e.querySelectorAll('.defile [style*="height:60px"]')];const cell=(r,num)=>{const k=[...rows[r].children];const i=k.findIndex(x=>x.textContent.trim()===String(num)&&x.style.top==='0px');return [k[i],k[i+1]]};
const actif=cell(3,22)[1],vide=cell(3,27)[1];
let k=0;const set=(r,num,mod)=>{const [l,c]=cell(r,num),nv=mod.cloneNode(true);if(mod===actif){const q=k++;A.push(()=>nv.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1.12)',opacity:1,offset:.6},{transform:'scale(1)'}],{duration:420,delay:200+q*55,easing:'ease-out',fill:'backwards'}))}nv.style.left=c.style.left;nv.style.top=c.style.top;c.replaceWith(nv);return l};
[[0,[1,2,3,4,5,6]],[1,[7,8,9,10,11,12,13]],[2,[14,15,16,17,18,19,20]],[3,[21,22,23,24]]].forEach(([r,L])=>L.forEach(x=>set(r,x,actif)));[25,26].forEach(x=>set(3,x,vide));
[[3,24,'var(--accent)','700'],[3,25,'var(--pied)','500'],[3,26,'var(--pied)','500']].forEach(([r,x,co,fw])=>{const l=cell(r,x)[0];l.style.color=co;l.style.font=fw+' 11px/14px var(--sf)'});
const flamme=[...rows[3].children].pop();
rows.slice(0,4).forEach(r=>[...r.children].forEach(x=>{const s=x.getAttribute('style')||'';if(x.style.minWidth||(s.includes('top:16px')&&s.includes('height:44px'))||(s.includes('top:10px')&&x!==flamme))x.remove()}));
const grad='linear-gradient(90deg,color-mix(in srgb,var(--accent) 38%,transparent),color-mix(in srgb,var(--accent) 58%,transparent))',sh='inset 0 1px 1px rgba(255,255,255,.35)';
const bande=(r,l,w,rad,mask)=>{const s=d.createElement('span');s.style.cssText='position:absolute;top:16px;left:'+l+'px;width:'+w+'px;height:44px;border-radius:'+rad+';background:'+grad+';box-shadow:'+sh+';mask-image:'+mask+';-webkit-mask-image:'+mask;rows[r].prepend(s);A.push(()=>s.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:420,delay:200+[0,6,13,20][r]*55,easing:'ease-out',fill:'backwards'}))};
const fd='linear-gradient(270deg,transparent,#000 36px)',fg='linear-gradient(90deg,transparent,#000 36px)',f2='linear-gradient(90deg,transparent,#000 36px,#000 calc(100% - 36px),transparent)';
bande(0,49.64,377,'22px 0 0 22px',fd);bande(1,-24,441,'0',f2);bande(2,-24,441,'0',f2);bande(3,-24,218.94,'0 22px 22px 0',fg);
flamme.style.left='181.51px';rows[3].appendChild(flamme);A.push(()=>flamme.animate([{transform:'scale(0) rotate(-20deg)'},{transform:'scale(1.3) rotate(6deg)',offset:.6},{transform:'none'}],{duration:520,delay:200+24*55,easing:'ease-out',fill:'backwards'}));
const tot=e.querySelector('.entete-periode .total b');if(tot)tot.textContent='181 300'}
f._jouer=()=>{if(!calme)A.forEach(a=>a())}};
window.moraCalPatch=calPatch})();
