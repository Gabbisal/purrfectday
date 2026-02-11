# 🐱 KattKalender — Installera på din mobil

## Enklaste sättet: Vercel (gratis, tar ~5 minuter)

### Steg 1: Skapa ett GitHub-konto (om du inte har ett)
1. Gå till **github.com** och skapa ett gratiskonto

### Steg 2: Ladda upp projektet till GitHub
1. Logga in på GitHub
2. Klicka på **"+"** uppe till höger → **"New repository"**
3. Namnge det `katt-kalender`
4. Klicka **"Create repository"**
5. Klicka **"uploading an existing file"**
6. Dra in HELA **katt-kalender-pwa**-mappen med alla filer
7. Klicka **"Commit changes"**

### Steg 3: Publicera med Vercel (gratis)
1. Gå till **vercel.com**
2. Klicka **"Sign Up"** → logga in med ditt GitHub-konto
3. Klicka **"Add New" → "Project"**
4. Hitta ditt `katt-kalender`-repo och klicka **"Import"**
5. Vercel kommer automatiskt att känna igen att det är en React-app
6. Klicka **"Deploy"**
7. Vänta ~1-2 minuter tills den är klar
8. Du får en URL som t.ex: `katt-kalender.vercel.app`

### Steg 4: Installera på din iPhone
1. Öppna **Safari** (måste vara Safari, inte Chrome!)
2. Gå till din URL: `katt-kalender.vercel.app`
3. Tryck på **delningsknappen** (fyrkant med pil uppåt) ⬆️
4. Scrolla ner och tryck **"Lägg till på hemskärmen"**
5. Ge den ett namn (t.ex. "KattKalender 🐱") → tryck **"Lägg till"**
6. Klart! Appen ligger nu som en ikon på din hemskärm!

### Steg 4b: Installera på din Android
1. Öppna **Chrome**
2. Gå till din URL: `katt-kalender.vercel.app`
3. Du bör få en banner som säger **"Installera app"** — tryck på den!
4. Om ingen banner syns: tryck på **⋮ (tre prickar)** → **"Installera app"** eller **"Lägg till på startskärmen"**
5. Klart! Appen ligger nu på din hemskärm!

---

## 📁 Projektets filstruktur

```
katt-kalender-pwa/
├── public/
│   ├── index.html          ← Huvud-HTML med PWA-meta-taggar
│   ├── manifest.json       ← PWA-konfiguration (namn, ikon, färger)
│   ├── sw.js              ← Service Worker (offline-stöd, notiser)
│   ├── icon-192.png       ← App-ikon (liten)
│   └── icon-512.png       ← App-ikon (stor)
├── src/
│   ├── index.js           ← Startpunkt + SW-registrering
│   ├── App.js             ← Wrapper
│   └── App.jsx            ← Hela appen (kalender, chatt, anteckningar)
└── package.json           ← Projektets beroenden
```

---

## 💡 Tips

- **Appen fungerar offline** tack vare Service Worker
- **Notifikationer**: Appen frågar om tillåtelse för push-notiser och påminner dig 15 min före möten
- **All data sparas lokalt** i din telefon (localStorage)
- **Gratis hosting** på Vercel — ingen kostnad alls!
- Du kan ändra appens namn och färg i `manifest.json`

---

## 🔧 Om du vill köra lokalt först

```bash
cd katt-kalender-pwa
npm install
npm start
```

Öppnar appen på `http://localhost:3000`
