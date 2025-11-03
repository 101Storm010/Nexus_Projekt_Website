// Year
const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
// Menu
const t=document.querySelector('.nav-toggle'), m=document.querySelector('.menu'); if(t&&m) t.addEventListener('click',()=>m.classList.toggle('open'));
// Typewriter (clean, steady)
const typeEl=document.querySelector('.type');
if(typeEl){
  const text=typeEl.dataset.text||"";
  let i=0; const speed=20;
  const tick=()=>{ typeEl.textContent=text.slice(0,i)+"█"; i++; (i<=text.length)? setTimeout(tick,speed): (typeEl.textContent=text); };
  setTimeout(tick,400);
}
