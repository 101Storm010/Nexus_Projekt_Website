const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = 'none';
      observer.unobserve(e.target);
    }
  })
}, {threshold:.15});

document.querySelectorAll('.card, .prose, .media, .page-hero').forEach(el=>{
  el.style.opacity=.001;
  el.style.transform='translateY(10px)';
  el.style.transition='opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
