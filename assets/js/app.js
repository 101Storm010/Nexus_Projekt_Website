// Year
const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
// Menu
const t=document.querySelector('.nav-toggle'), m=document.querySelector('.menu'); if(t&&m) t.addEventListener('click',()=>m.classList.toggle('open'));
// Typewriter
const typeEl=document.querySelector('.type');
if(typeEl){
  const text=typeEl.dataset.text||"";
  let i=0; const speed=22;
  const tick=()=>{
    typeEl.textContent=text.slice(0,i)+"█"; // cursor
    i++; if(i<=text.length){ requestAnimationFrame(()=>setTimeout(tick,speed)); }
    else{ typeEl.textContent=text; }
  };
  setTimeout(tick,400);
}
// Parallax rings
const rings=document.querySelectorAll('.rings .ring');
window.addEventListener('mousemove',(e)=>{
  const x=(e.clientX/window.innerWidth-.5)*6;
  const y=(e.clientY/window.innerHeight-.5)*6;
  rings.forEach((r,i)=>{ r.style.transform=`translate(${x*(i+1)}px,${y*(i+1)}px)`; });
},{passive:true});
