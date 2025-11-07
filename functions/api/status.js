export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const ip = url.searchParams.get("ip");
  const port = url.searchParams.get("port");
  const appid = url.searchParams.get("appid") || "4000";
  const key = context.env.STEAM_API_KEY;

  if (!key) {
    return new Response(JSON.stringify({ error: "STEAM_API_KEY missing" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  if (!ip || !port) {
    return new Response(JSON.stringify({ error: "Missing ip/port" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Build Steam filter for Garry's Mod by appid and address
  const filter = `\\appid\\${appid}\\addr\\${ip}:${port}`;
  const apiUrl = `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${encodeURIComponent(
    key
  )}&filter=${encodeURIComponent(filter)}&limit=1`;

  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const servers = data?.response?.servers || [];

    if (servers.length > 0) {
      const s = servers[0];
      return new Response(
        JSON.stringify({
          status: "online",
          info: {
            name: s.name,
            map: s.map,
            players: s.players,
            max_players: s.max_players,
            addr: s.addr,
            gamedir: s.gamedir,
          },
        }),
        { headers: { "content-type": "application/json" } }
      );
    } else {
      return new Response(JSON.stringify({ status: "offline" }), {
        headers: { "content-type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ status: "offline", error: String(err) }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}
