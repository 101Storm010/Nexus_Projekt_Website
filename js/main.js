// UI‑Logik & kleinere Effekte
(() => {
  const $ = (s, el=document) => el.querySelector(s);

  // Year in footer
  $("#year").textContent = new Date().getFullYear();

  // Mobile nav
  const burger = $(".hamburger");
  const nav = $(".main-nav");
  burger?.addEventListener("click", () => {
    const open = nav.classList.toggle("show");
    burger.setAttribute("aria-expanded", String(open));
  });

  // Tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tabpanel").forEach(p=>p.classList.remove("show"));
      btn.classList.add("active");
      const id = btn.dataset.tab;
      const panel = document.getElementById(`tab-${id}`);
      panel?.classList.add("show");
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  },{threshold:.1});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  // Buttons/Links from config
  const cfg = window.NEXUS_CONFIG || {server:{ip:"127.0.0.1",port:27015},links:{}};
  const connect = `steam://connect/${cfg.server.ip}:${cfg.server.port}`;

  const joinBtn = $("#joinBtn");
  const joinBtn2 = $("#joinBtn2");
  const workshopLink = $("#workshopLink");
  const workshopLink2 = $("#workshopLink2");
  const copyIpBtn = $("#copyIpBtn");
  const discordLink = $("#discordLink");
  const discordLink2 = $("#discordLink2");

  [joinBtn, joinBtn2].forEach(b => { if(b){ b.href = connect; b.rel = "noopener"; }});
  [workshopLink, workshopLink2].forEach(b => { if(b){ b.href = cfg.links.workshop; }});
  [discordLink, discordLink2].forEach(b => { if(b){ b.href = cfg.links.discord; }});
  if(copyIpBtn){
    copyIpBtn.dataset.copy = `${cfg.server.ip}:${cfg.server.port}`;
    copyIpBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(copyIpBtn.dataset.copy);
      copyIpBtn.textContent = "Kopiert ✓";
      setTimeout(()=>copyIpBtn.textContent="IP kopieren", 1500);
    });
  }
})();
