# ColorBike by CARROZZERIA di GATTO VITTORIO

Web Application ad alte prestazioni sviluppata per **ColorBike by CARROZZERIA di GATTO VITTORIO** (Via Petraro 381, 80050 Santa Maria La Carità NA • P.IVA 09180971211), officina specializzata in verniciatura moto e scooter a forno, grafiche personalizzate, aerografo, personalizzazione totale moto stradali, verniciatura caschi e riparazione carene in caso di incidenti.

![ColorBike Logo](logo_horizontal_transparent.png)

---

## Caratteristiche Principali

- **Design System Dark-Racing & Clean**:
  - Palette cromatica: Sfondo Bianco pulito (`#FFFFFF`), componenti Nero Asfalto (`#09090B`), Grigio Tecnico (`#A1A1AA`) e Rosso Corsa (`#DC2626` / `#E11D48`).
  - Tipografia: **Rajdhani** (sportiva e tecnica), **Orbitron** (display racing per titoli) e **Inter** (massima leggibilità per dati commerciali e testi).
  - Logo orizzontale trasparente con telemetria e raccordi aerodinamici nella barra superiore.
  - Iconografia minimalista SVG vettoriale (zero emoji, stile professionale).
  
- **Hero Section**:
  - Box officina con illuminazione d'atmosfera e moto sportiva stradale ad altissima risoluzione.
  - Badge di telemetria per le 6 specializzazioni ufficiali.
  - Pulsante interattivo *Configura la tua moto* con form preventivo e redirect rapido WhatsApp.

- **Sezione Servizi & Specializzazioni (6 Schede Attive, Zero Slot Vuoti)**:
  1. Verniciatura Moto e Scooter (Ciclo termico a forno a 65°C)
  2. Grafiche Personalizzate (Livree su misura e loghi sotto trasparente)
  3. Aerografo & Cubicatura (Lavorazioni artistiche a mano libera, sfumature 3D e idrostampa carbon look)
  4. Personalizzazione Totale Moto (Restyling estetico completo a 360° per moto stradali)
  5. Verniciatura Caschi (Integrali, jet e modulari, grafiche replica)
  6. Riparazione in caso di Incidenti (Saldatura ABS, raddrizzatura serbatoi)

- **Gallery "I Nostri Lavori" Unificata con Slider Prima/Dopo Condizionale**:
  - Mostra tutti i progetti dell'officina in un'unica galleria coordinata ad alto impatto.
  - Per i lavori con foto prima e dopo (riparazione incidenti o restauro carene), slider interattivo con laser divider centrale trascinabile.
  - Per i lavori artistici o grafiche custom, elegante visualizzazione fotografica singola in alta definizione con badge "LAVORO ESEGUITO".

- **Social & Contatti Ufficiali**:
  - Icone social minimali collegate a Instagram (`@color.bike`), TikTok (`@colorbike`) e Facebook (`Colorbike`).
  - Dati commerciali completi di Partita IVA, orari di apertura e mappa interattiva Google Maps integrata.

---

## Come Pubblicare su GitHub Pages (Hosting Gratuito)

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

## Struttura dei File

```text
ColorBike sito Web/
├── index.html                       # Struttura semantica completa e accessibile
├── style.css                        # Design system dark-racing modulare
├── app.js                           # Logica slider condizionale, filtri e preventivo
├── data.json                        # Database locale dei servizi e dei lavori
├── logo_horizontal_transparent.png  # Logo orizzontale trasparente ufficiale
├── logo_transparent.png             # Logo trasparente
├── .gitignore                       # Esclusioni file temporanei/sistema
└── README.md                        # Documentazione del progetto
```

---

## Informazioni Commerciali & Contatti Officina
- **Ragione Sociale**: ColorBike by CARROZZERIA di GATTO VITTORIO
- **Indirizzo**: Via Petraro 381, 80050 Santa Maria La Carità (NA)
- **Partita IVA**: 09180971211
- **WhatsApp / Cellulare**: [+39 338 454 4717](https://wa.me/393384544717)
- **Orari di apertura**: Dal lunedì al venerdì 8:30 - 13:00 e 14:30 - 19:00
- **Social**: [Instagram](https://www.instagram.com/color.bike/) • [TikTok](https://www.tiktok.com/@colorbike) • [Facebook](https://www.facebook.com/p/Colorbike-100055205113946/?locale=it_IT)
