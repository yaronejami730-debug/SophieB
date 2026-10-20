(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const C=window.SB||{};
// header compact + totop
const hdr=$('.hdr'),top=$('.totop');if(hdr&&hdr.classList.contains('over'))hdr.dataset.over='';
addEventListener('scroll',()=>{const y=scrollY;if(hdr){hdr.classList.toggle('solid',y>40);if(hdr.dataset.over!==undefined)hdr.classList.toggle('over',y<=40)}top&&top.classList.toggle('on',y>900)},{passive:true});
top&&top.addEventListener('click',()=>scrollTo({top:0}));
// mobile menu
const mm=$('.mmenu'),bg=$('.burger');
if(mm&&bg){bg.addEventListener('click',()=>{mm.classList.add('open');bg.setAttribute('aria-expanded','true');$('.close',mm).focus()});
$('.close',mm).addEventListener('click',()=>{mm.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.focus()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&mm.classList.contains('open'))$('.close',mm).click()})}
// announce
const an=$('.announce');
try{if(an&&localStorage.getItem('sb-ann')===an.dataset.id)an.remove()}catch(e){}
an&&$('button',an).addEventListener('click',()=>{try{localStorage.setItem('sb-ann',an.dataset.id)}catch(e){}an.remove()});
// reveal
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));
// sécurité : à l'ouverture, ce qui est déjà visible ne dépend pas de l'observateur
const showVisible=()=>$$('.rv:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.05&&r.bottom>-50)el.classList.add('in')});
addEventListener('load',()=>{showVisible();setTimeout(showVisible,400);setTimeout(showVisible,1200)});
addEventListener('scroll',showVisible,{passive:true});
// open/closed
const on=$('.open-now');
if(on&&C.hours){const n=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Paris'}));const h=C.hours[(n.getDay()+6)%7];
const m=n.getHours()*60+n.getMinutes();const p=t=>{const[a,b]=t.split(':');return a*60+ +b};
if(!h.o){on.textContent=h.d==='Samedi'?'Horaires du samedi : nous contacter':'Fermé aujourd’hui'}
else if(m>=p(h.o)&&m<p(h.c)){on.classList.add('on');on.textContent='Ouvert maintenant · jusqu’à '+h.c.replace(':','h')}
else{on.classList.add('off');on.textContent='Fermé maintenant'}}
// consent + tracking
const KEY='sb-consent';let consent=null;try{consent=localStorage.getItem(KEY)}catch(e){}
const ck=$('.cookie');
function loadTrackers(){
 if(C.ga4&&!window.gtag){const s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+C.ga4;document.head.appendChild(s);
 window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',C.ga4)}
 if(C.pixel&&!window.fbq){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',C.pixel);fbq('track','PageView')}}
if(consent==='yes')loadTrackers();else if(!consent&&ck)ck.classList.add('on');
$$('[data-consent]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.consent;try{localStorage.setItem(KEY,v)}catch(e){}ck.classList.remove('on');if(v==='yes')loadTrackers()}));
$$('[data-cookies]').forEach(b=>b.addEventListener('click',()=>ck&&ck.classList.add('on')));
// conversion clicks
document.addEventListener('click',e=>{const a=e.target.closest('[data-track]');if(!a)return;const t=a.dataset.track;
 if(consent!=='yes')return;window.gtag&&gtag('event',t,{page:location.pathname});window.fbq&&fbq('trackCustom',t)});
// accordions: open from hash
if(location.hash){const d=$(location.hash);d&&d.tagName==='DETAILS'&&(d.open=true)}
// tarifs search
const q=$('#tq');
if(q)q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();let hits=0;
 $$('.trow').forEach(r=>{const s=!v||r.textContent.toLowerCase().includes(v);r.hidden=!s;s&&hits++});
 $$('details.tcat').forEach(d=>{const any=$$('.trow',d).some(r=>!r.hidden);d.hidden=!any;if(v&&any)d.open=true});
 $('#tcount').textContent=v?hits+' résultat(s)':''});
// filter visage
$$('.chip[data-f]').forEach(c=>c.addEventListener('click',()=>{$$('.chip[data-f]').forEach(x=>x.setAttribute('aria-pressed',x===c));const f=c.dataset.f;
 $$('.soin').forEach(s=>s.hidden=!(f==='all'||s.dataset.needs.split(' ').includes(f)))}));
// quiz
const qz=$('#quiz');
if(qz)qz.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(qz);const a=d.get('q1'),b=d.get('q2'),c=d.get('q3');
 let r;if(a==='imperf')r=['Soin anti-imperfections (ultrasons + luminothérapie)','/soins-visage-paris-12/orlane/#anti-imperfections'];
 else if(a==='rides'||c==='age')r=['Soin signature Orlane B21 + radiofréquence','/soins-visage-paris-12/orlane/#orlane-b21'];
 else if(a==='eclat'&&b==='pressee')r=['Hydrastar, protocole éclat express','/soins-visage-paris-12/hydrastar/#eclat-express'];
 else if(a==='hydrat'||b==='seche')r=['Hydrastar','#hydrastar'];
 else r=['Hydrastar, soin expert personnalisé','/soins-visage-paris-12/hydrastar/#soin-expert'];
 const o=$('#quiz-out');o.hidden=false;o.innerHTML='<p class="eyebrow">Notre suggestion</p><h3></h3><p>Indicatif : le diagnostic en cabine confirme le bon soin.</p><p><a class="btn sm" href="'+r[1]+'">Voir ce soin</a></p>';$('h3',o).textContent=r[0]});
// laser calculator
const lc=$('#lc');
if(lc){const f=()=>{const per=+$('#lc-m').value,yr=+$('#lc-f').value,pack=+$('#lc-p').value;const y10=per*yr*10;
 $('#lc-m-o').textContent=per+' € / séance';$('#lc-f-o').textContent=yr+' fois / an';$('#lc-p-o').textContent=pack+' €';
 $('#lc-r').textContent=y10.toLocaleString('fr-FR')+' €';const diff=y10-pack;
 $('#lc-d').textContent=diff>0?'Économie estimée : '+diff.toLocaleString('fr-FR')+' € sur 10 ans':'À ce niveau, le forfait coûte plus que votre dépense actuelle.'};
 $$('input',lc).forEach(i=>i.addEventListener('input',f));f()}
// mariee form -> mailto fallback (static site)
$$('form[data-mail]').forEach(fm=>fm.addEventListener('submit',e=>{e.preventDefault();if($('.hp input',fm).value)return;const d=new FormData(fm);
 const body=[...d.entries()].filter(([k])=>k!=='website').map(([k,v])=>k+' : '+v).join('\n');
 location.href='mailto:'+C.mail+'?subject='+encodeURIComponent(fm.dataset.mail)+'&body='+encodeURIComponent(body)}));
// vidéo hero : ralentie, jamais si mouvement réduit
$$('video.hero-video').forEach(v=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(rm){v.removeAttribute('autoplay');v.pause();return}
 const slow=()=>{v.playbackRate=.5};v.addEventListener('loadedmetadata',slow);v.addEventListener('play',slow);slow();
 const pl=v.play();pl&&pl.catch&&pl.catch(()=>{})});

// fondu de sortie sur les liens internes ; réinitialisé au retour via le cache navigateur
(()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 if(window.CSS&&CSS.supports('view-transition-name','none'))return; // le navigateur gère le fondu
 addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});
 document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(a.target&&a.target!=='_self')return;
  if(a.hasAttribute('download'))return;
  let u;try{u=new URL(a.href,location.href)}catch(_){return}
  if(u.origin!==location.origin)return;
  if(u.pathname===location.pathname&&u.search===location.search)return; // ancre sur la même page
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(()=>{location.href=u.href},320);
 });
})();

// partenaires : chaque emplacement fait défiler ses logos en fondu, décalés les uns des autres
(()=>{
 const rot=$('.partner-rot');if(!rot)return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 $$('.slot',rot).forEach((slot,k)=>{
  const items=$$('a',slot);if(items.length<2)return;
  let i=0;
  const step=()=>{
   if(document.hidden)return;
   const cur=items[i];i=(i+1)%items.length;const nxt=items[i];
   cur.classList.remove('on');cur.setAttribute('aria-hidden','true');cur.tabIndex=-1;
   nxt.classList.add('on');nxt.removeAttribute('aria-hidden');nxt.tabIndex=0;
  };
  setTimeout(()=>setInterval(step,4200),1400+k*1000);
 });
})();
})();
