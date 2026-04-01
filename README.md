# 🎧 Spotify Clone

Progetto frontend ispirato a Spotify, realizzato con HTML, CSS, Bootstrap e JavaScript.

L'app usa la API Deezer tramite endpoint StriveSchool per mostrare album, risultati di ricerca e una pagina dettagli dedicata a ogni album.

## 🚀 Funzionalità

- 🏠 Home page con layout stile Spotify
- 🎤 Sezioni iniziali dedicate a Eminem, Metallica e Queen
- 🔎 Ricerca artista con caricamento dinamico dei risultati
- ⏳ Spinner e messaggi di errore nelle sezioni principali e nella ricerca
- 📃 Bottone `Crea lista` per mostrare o nascondere una lista di album unici
- 🖱️ Navigazione alla pagina dettagli cliccando sulla cover di un album
- 💿 Pagina `details.html` con cover, titolo, artista, metadati e tracklist
- 📱 Layout responsive con Bootstrap e CSS personalizzato

## 🛠️ Tecnologie

- 🌐 HTML5
- 🎨 CSS3
- 🅱️ Bootstrap 5
- ⚡ JavaScript vanilla
- 🔗 Fetch API
- 🎵 Font Awesome

## 📁 Struttura Del Progetto

- `index.html` → pagina principale con sidebar, ricerca, sezioni album e player statico
- `details.html` → pagina dettagli album
- `css/style.css` → stili generali della home
- `css/details.css` → stili dedicati alla pagina dettagli
- `js/script.js` → logica della home, ricerca, rendering album e link ai dettagli
- `js/details.js` → fetch dettagli album e rendering della pagina dettagli

## ⚙️ Come Funziona

1. All'avvio la home carica automaticamente gli album di Eminem, Metallica e Queen.
2. La ricerca chiama la API e aggiorna dinamicamente la sezione dei risultati.
3. Il bottone `Crea lista` raccoglie e mostra i titoli unici degli album dei tre artisti principali.
4. Cliccando sulla cover di un album si apre `details.html?albumid=...`.
5. La pagina dettagli legge l'id dall'URL, recupera i dati dell'album e costruisce la vista completa.

## ▶️ Avvio Del Progetto

Non sono richieste dipendenze o build tool.

Puoi avviare il progetto in uno di questi modi:

- aprendo `index.html` nel browser
- usando un'estensione come Live Server da VS Code

## 🎯 Obiettivo

Questo progetto serve per esercitarsi con:

- manipolazione del DOM
- fetch di dati da API esterne
- rendering dinamico di contenuti
- organizzazione di una piccola app multi-pagina
- uso combinato di Bootstrap e CSS custom

---

📚 Progetto sviluppato durante il percorso di studio **Epicode Full Stack Developer**.
