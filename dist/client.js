const header=document.querySelector('#header');
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>24);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const setMenu=open=>{document.body.classList.toggle('menu-open',open);menuButton?.setAttribute('aria-expanded',String(open));menuButton?.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.inert=!open;if(!open)menuButton?.focus()};
menuButton?.addEventListener('click',()=>setMenu(menu.inert));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.inert)setMenu(false)});
document.querySelector('#year').textContent=String(new Date().getFullYear());
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 30px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.documentElement.classList.add('motion-ready');
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const box=document.querySelector('#lightbox');
const buttons=[...document.querySelectorAll('[data-lightbox]')];
let current=0,lastFocus=null,touchStart=0;
function show(index){current=(index+buttons.length)%buttons.length;const source=buttons[current].querySelector('img');const large=box.querySelector('img');large.src=source.src;large.alt=source.alt;box.querySelector('.lightbox-count').textContent=`${String(current+1).padStart(2,'0')} / ${String(buttons.length).padStart(2,'0')}`}
function open(index){lastFocus=document.activeElement;show(index);box.hidden=false;document.body.classList.add('lightbox-open');box.querySelector('.lightbox-close').focus()}
function close(){box.hidden=true;document.body.classList.remove('lightbox-open');lastFocus?.focus()}
buttons.forEach((button,i)=>button.addEventListener('click',()=>open(i)));
box?.querySelector('.lightbox-close').addEventListener('click',close);
box?.querySelector('.lightbox-prev').addEventListener('click',()=>show(current-1));
box?.querySelector('.lightbox-next').addEventListener('click',()=>show(current+1));
box?.addEventListener('click',e=>{if(e.target===box)close()});
box?.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].screenX},{passive:true});
box?.addEventListener('touchend',e=>{const diff=e.changedTouches[0].screenX-touchStart;if(Math.abs(diff)>50)show(current+(diff<0?1:-1))},{passive:true});
document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);if(e.key==='Tab'){const controls=[...box.querySelectorAll('button')];const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const title=document.querySelector('.reconstruct');
  if(title){const update=()=>{const progress=Math.min(1,window.scrollY/(window.innerHeight*.7));title.style.letterSpacing=`${-.08+progress*.08}em`;title.style.filter=`blur(${(1-progress)*1.5}px)`};update();window.addEventListener('scroll',update,{passive:true})}
}

const motionTargets=[...document.querySelectorAll('.section-head,.collection-card,.featured-layout,.collab-preview,.people-preview,.history-list article')];
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
  const motionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('in-view');motionObserver.unobserve(entry.target)}}},{threshold:.08,rootMargin:'0px 0px 50px 0px'});
  motionTargets.forEach(el=>motionObserver.observe(el));
  document.documentElement.classList.add('motion-on');
}

const yearLinks=[...document.querySelectorAll('.archive-tour a')];if(yearLinks.length&&'IntersectionObserver' in window){const years=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){yearLinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}}},{rootMargin:'-30% 0px -60% 0px'});document.querySelectorAll('.year-block').forEach(el=>years.observe(el))}
