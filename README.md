# Nexus Projekt — SCP:RP Website

Ein modernes, responsives One‑Pager‑Layout mit Untertabs und sanften Animationen. Getestet für Mobile ⟷ Desktop.  
**Farben:** Hintergrund `#000000`, Text `#ffffff`, Akzent `#faa03c` (aus dem gelieferten Logo).  
Schrift: **Big Orange** für Headlines (liegt lokal bei), **Inter** (Google Fonts) für Fließtext.

## Schnellstart
1. ZIP entpacken, Repository zu GitHub pushen.
2. In **Cloudflare Pages** verbinden und deployen (Build nicht nötig, es ist ein statisches Projekt).
3. In `js/config.js` **alle Links/IPs** anpassen:
   ```js
   window.NEXUS_CONFIG = {
     server: { ip: "DEINE.IP.ODER.DOMAIN", port: 27015, appid: 4000 },
     links: {
       discord: "https://discord.gg/DEININVITE",
       workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=DEINE_ID",
     },
   };
   ```
4. Optional: **Serverstatus aktivieren** (Spielerzahl, Map, Name).

---

## Serverstatus (Cloudflare Pages Functions + Steam Web API)
Die Seite ruft `/api/status` auf, das von `functions/api/status.js` bereitgestellt wird.  
Die Function fragt die **Steam Web API** nach dem Servereintrag (kein UDP nötig).

### Einrichten
- In Cloudflare Pages → **Settings → Functions → Environment variables**
  - `STEAM_API_KEY` = dein Steam Web API-Key (https://steamcommunity.com/dev/apikey)
- In `js/config.js` IP/Port korrekt setzen.
- Route der Function ist automatisch `/api/status`.

### Funktionsweise
- Die Function baut einen Filter `\appid\4000\addr\IP:PORT` und ruft:
  `IGameServersService/GetServerList/v1` mit `limit=1` auf.
- Antwort enthält u. a. `players`, `max_players`, `map`, `name`.
- Der Statusbereich auf der Seite aktualisiert sich automatisch.

### Fehlersuche
- Der Punkt bleibt rot/„Offline“ → Prüfe:
  - `STEAM_API_KEY` korrekt gesetzt?
  - Ist der Server öffentlich in der Steam‑Masterliste sichtbar?
  - Stimmt IP/Port?
  - Cloudflare Pages Functions aktiviert?

---

## Discord/Links ändern
Alle Links zentral in `js/config.js`. Suche im Code **nicht** an mehreren Stellen, alles ist dort gebündelt.
- `links.discord` steuert u. a. die Buttons **Discord** / **Zum Discord**.
- `links.workshop` steuert die Workshop‑Links.
- Die **Steam Connect**‑Links werden aus `server.ip:server.port` generiert.

---

## Assets & Struktur
```
nexus-projekt-site/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ config.js            // <— zentrale Konfiguration
│  ├─ main.js              // <— UI, Tabs, Mobile-Nav, Effekte
│  └─ server-status.js     // <— ruft /api/status und füllt die Werte
├─ assets/
│  ├─ images/
│  │  ├─ logo.svg
│  │  ├─ Round_logo_colored.png
│  │  ├─ logo_x_colored.png
│  │  ├─ logo_letters_colored_white.png
│  │  └─ logo_letters_colored_black.png
│  └─ fonts/
│     └─ Big-Orange.ttf
└─ functions/
   └─ api/
      └─ status.js         // <— Cloudflare Pages Function
```

> Hinweis zur Lesbarkeit: Auf dunklem Hintergrund sind Texte immer mit hoher Helligkeit (#fff) und
> ausreichendem Kontrast gesetzt. Akzentflächen (Orange) werden sparsam und nicht flächig unter Texten verwendet.

---

## Optional: Kontaktformular
Ein echtes Formular braucht einen E‑Mail‑Backenddienst. Zwei einfache Wege:
1) **Formspree**: In `index.html` einen `<form>` mit `action="https://formspree.io/f/DEIN_CODE"` ergänzen.
2) **Eigene Cloudflare Function**: Einen `POST`‑Endpoint anlegen, der mit SendGrid/MailChannels versendet.
Falls du das wünschst, kann ich dir den Function‑Code nachreichen.

---

## Anpassungen
- **Farben**: In `css/style.css` im `:root`‑Block.
- **Typografie**: Überschriften nutzen die mitgelieferte `Big Orange` (Logo‑Look), Fließtext `Inter`.
- **Sektionen**: Du kannst Blöcke duplizieren, es wird automatisch responsiv.
- **Bilder**: Leichte Glows/Rotationen sind reines CSS, skalieren sauber von Mobile bis 4K.

Viel Spaß mit dem **Nexus Projekt**! :)
