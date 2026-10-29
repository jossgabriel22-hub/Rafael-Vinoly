(function(){
const $=s=>document.querySelector(s),nav=$('#nav'),bar=$('#progress'),top=$('#top'),menu=$('#menu'),burger=$('#burger');
function onScroll(){const h=document.documentElement,y=h.scrollTop||document.body.scrollTop,max=h.scrollHeight-h.clientHeight;
bar.style.width=(max>0?y/max*100:0)+'%';nav.classList.toggle('solid',y>40||menu.classList.contains('open'));top.classList.toggle('on',y>700);}
addEventListener('scroll',onScroll,{passive:true});onScroll();

function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);onScroll();}
burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});

top.addEventListener('click',()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));

const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.08});
  els.forEach(e=>io.observe(e));
}else els.forEach(e=>e.classList.add('in'));

document.querySelectorAll('.ph img').forEach(i=>{
  const f=()=>{i.style.display='none';i.parentElement.classList.add('missing');};
  i.addEventListener('error',f);
  if(i.complete&&i.naturalWidth===0&&i.src)f();
});

const dlg=$('#dlg');
function open(w){
  $('#dimg').src=w.dataset.img;$('#dimg').alt=w.dataset.title;
  $('#dmeta').textContent=w.dataset.meta;$('#dtitle').textContent=w.dataset.title;$('#ddesc').textContent=w.dataset.desc;
  dlg.showModal?dlg.showModal():dlg.setAttribute('open','');
}
document.querySelectorAll('.work').forEach(w=>{
  w.querySelector('.more').addEventListener('click',()=>open(w));
  const p=w.querySelector('.ph');p.addEventListener('click',()=>open(w));p.style.cursor='zoom-in';
});
$('#close').addEventListener('click',()=>dlg.close?dlg.close():dlg.removeAttribute('open'));
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
})();