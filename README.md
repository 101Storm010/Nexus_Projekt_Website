# Nexus Projekt — Website

Statisches Frontend für GitHub Pages oder Cloudflare Pages.

## Struktur
- `index.html` Home mit animiertem Ring-Hero
- `about.html` Über uns
- `projects.html` Projekte
- `community.html` Community
- `apply.html` Bewerben (statisches Formular)
- `contact.html` Kontakt (statisches Formular)
- `privacy.html` Datenschutz (Platzhalter)
- `imprint.html` Impressum (Platzhalter)
- `assets/css/style.css` Styles
- `assets/js/app.js` JS
- `assets/fonts/Nexus-Font.ttf` eingebundene Schrift
- `assets/img/*` Logos & Grafiken

## Deployment
### GitHub Pages
1. Repo erstellen, gesamten Ordnerinhalt committen und nach `main` pushen.
2. In den Repo-Einstellungen **Pages** aktivieren, Branch `main`, Folder `/root` wählen.

### Cloudflare Pages
1. Neues Projekt, Repo verbinden.
2. Build Befehl leer lassen (statisch), Output-Directory `/`.

