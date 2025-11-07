// Holt Status über Cloudflare Pages Function (siehe functions/api/status.js)
(async () => {
  const cfg = window.NEXUS_CONFIG?.server || {};
  const url = `/api/status?ip=${encodeURIComponent(cfg.ip)}&port=${encodeURIComponent(cfg.port)}&appid=${encodeURIComponent(cfg.appid||4000)}`;
  const dot = document.getElementById("statusDot");
  const txt = document.getElementById("statusText");
  const p = document.getElementById("playerCount");
  const maxp = document.getElementById("maxPlayers");
  const map = document.getElementById("mapName");
  const name = document.getElementById("serverName");

  const heroDot = document.getElementById("heroStatusDot");
  const heroTxt = document.getElementById("heroStatusText");

  function setState(state){
    const on = state === "online";
    dot?.classList.toggle("online", on);
    dot?.classList.toggle("offline", !on);
    heroDot?.classList.toggle("online", on);
    heroDot?.classList.toggle("offline", !on);
    txt && (txt.textContent = on ? "Online" : "Offline");
    heroTxt && (heroTxt.textContent = on ? "Server online" : "Server nicht erreichbar");
  }

  try{
    const r = await fetch(url, {headers:{'accept':'application/json'}});
    const data = await r.json();
    if(data?.status === "online" && data?.info){
      const s = data.info;
      p && (p.textContent = s.players ?? "0");
      maxp && (maxp.textContent = s.max_players ?? "0");
      map && (map.textContent = s.map ?? "—");
      name && (name.textContent = s.name ?? "—");
      setState("online");
    } else {
      setState("offline");
    }
  }catch(e){
    setState("offline");
    console.error("Status API Fehler:", e);
  }
})();
