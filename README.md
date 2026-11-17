# ColorBike by CARROZZERIA di GATTO VITTORIO 🏍️💨

Web Application ad alte prestazioni sviluppata per **ColorBike by CARROZZERIA di GATTO VITTORIO** (Via Petraro 381, 80050 Santa Maria La Carità NA • P.IVA 09180971211), officina specializzata in verniciatura moto e scooter a forno, grafiche personalizzate, aerografo, personalizzazione totale moto, verniciatura caschi e riparazione carene in caso di incidenti.

![ColorBike Logo](logo_horizontal_transparent.png)

---

## 🏁 Caratteristiche Principali

- **Design System Dark-Racing**:
  - Palette cromatica: Nero Asfalto (`#09090B`), Grigio Tecnico (`#A1A1AA`) e Rosso Corsa (`#DC2626` / `#E11D48`).
  - Font tecnici: **Orbitron** (display aggressivo), **Rajdhani** (tipografia sportiva) e **Inter** (massima leggibilità).
  - Logo orizzontale trasparente con telemetria e raccordi aerodinamici nella barra superiore.
  
- **Hero Section**:
  - Box officina racing con illuminazione d'atmosfera e superbike sportiva ad altissima risoluzione.
  - Badge di telemetria per le 6 specializzazioni ufficiali.
  - Pulsante interattivo *Configura la tua moto* con form preventivo e redirect rapido WhatsApp.

- **Sezione Servizi & Specializzazioni (6 Schede Attive, Zero Slot Vuoti)**:
  1. Verniciatura Moto e Scooter (Ciclo termico a forno a 65°C)
  2. Grafiche Personalizzate (Livree su misura e loghi sotto trasparente)
  3. Aerografo (Lavorazioni artistiche a mano libera, sfumature 3D)
  4. Personalizzazione Totale Moto (Restyling estetico completo a 360°)
  5. Verniciatura Caschi (Integrali, jet e modulari, grafiche replica)
  6. Riparazione in caso di Incidenti (Saldatura ABS, raddrizzatura serbatoi)

- **Gallery "Prima & Dopo" Interattiva**:
  - Slider con laser divider centrale trascinabile (mouse e touch screen) per confrontare carene prima e dopo la lavorazione.
  - Filtri per categoria (*Verniciatura*, *Riparazione*, *Livree Racing*).

- **Pannello Gestione / No-Code CMS Integrato**:
  - Accesso protetto da PIN (Default: `0000`) tramite icona ⚙ o scorciatoia `Ctrl + Shift + A`.
  - Gestione in tempo reale dei 6 slot dei servizi.
  - Upload e pubblicazione immediata di nuovi lavori Prima/Dopo con anteprima foto.
  - **Esportazione & Importazione `data.json`**: scarica la configurazione aggiornata con un click e sostituiscila nel repository per rendere definitivi tutti i contenuti senza bisogno di un database esterno.

---

## 🚀 Come Pubblicare su GitHub Pages (Hosting Gratuito)

L'applicazione è 100% statica (HTML5, CSS3, Vanilla JS), quindi perfetta per **GitHub Pages** a costo zero e con caricamento istantaneo:

1. **Crea un nuovo repository su GitHub**:
   - Vai su [github.com/new](https://github.com/new).
   - Chiama il repository (es. `colorbike-web`).
   - Lascialo pubblico (o privato se hai GitHub Pro) e **non** aggiungere README o .gitignore (sono già pronti qui).

2. **Collega e invia il codice dal tuo computer**:
   Apri il terminale nella cartella del progetto (`e:\ColorBike sito Web`) ed esegui:
   ```bash
   git remote add origin https://github.com/TUO_USERNAME/TUO_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```

3. **Attiva GitHub Pages**:
   - Nel tuo repository su GitHub, vai su **Settings** > **Pages** (nel menu laterale sinistro).
   - Sotto **Build and deployment** > **Source**, seleziona:
     - Branch: `main`
     - Folder: `/ (root)`
   - Clicca su **Save**.
   - Entro 1-2 minuti il tuo sito sarà online all'indirizzo:
     `https://TUO_USERNAME.github.io/TUO_REPOSITORY/`

---

## 🛠️ Struttura dei File

```text
ColorBike sito Web/
├── index.html              # Struttura semantica completa e accessibile
├── style.css               # Design system dark-racing modulare
├── app.js                  # Logica slider, filtri, preventivo e pannello CMS
├── data.json               # Database locale dei servizi e dei lavori
├── logo1.jpeg              # Logo originale
├── logo_transparent.png    # Logo scontornato trasparente ad alta risoluzione
├── .gitignore              # Esclusioni file temporanei/sistema
└── README.md               # Documentazione del progetto
```

---

## 📞 Contatti Officina
- **Brand**: ColorBike — Carrozzeria Gatto
- **Sede**: Via Torino 42, Rivalta di Torino (TO)
- **Email**: info@colorbike.it
- **Assistenza / Foto Danni**: [WhatsApp Diretto](https://wa.me/393401234567)
