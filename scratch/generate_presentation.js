const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

const pngDir = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/TABELLE_REVISIONATE_PNG';
const assetsDir = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/assets';
const outputPath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/PRESENTAZIONE_ESTETOLOGIA_SCENOGRAFICA_FINALE.pptx';

// Fonts & Colors
const TITLE_FONT = 'Georgia';
const BODY_FONT = 'Helvetica';

const LIGHT_BG = 'FAFAFA';
const DARK_BG = '111827';

const TEXT_DARK = '1E293B';
const TEXT_MUTED = '475569';
const TEXT_WHITE = 'F9FAFB';
const TEXT_GRAY = '9CA3AF';

const ACCENT_GOLD = 'C5A880'; // Elegant soft gold
const ACCENT_AMBER = 'D97706'; // Amber-600
const ACCENT_RED = '991B1B'; // Red-800

// Helper to set background and header on light slides
function createLightSlide(titleText) {
  const slide = pptx.addSlide();
  slide.background = { fill: LIGHT_BG };
  
  // Header Slide Title
  slide.addText(titleText, {
    x: 0.8,
    y: 0.5,
    w: 11.7,
    h: 0.6,
    fontFace: TITLE_FONT,
    fontSize: 24,
    bold: true,
    color: TEXT_DARK,
    valign: 'middle'
  });
  
  return slide;
}

// Helper to set background and header on dark slides
function createDarkSlide(titleText) {
  const slide = pptx.addSlide();
  slide.background = { fill: DARK_BG };
  
  if (titleText) {
    slide.addText(titleText, {
      x: 0.8,
      y: 0.5,
      w: 11.7,
      h: 0.6,
      fontFace: TITLE_FONT,
      fontSize: 24,
      bold: true,
      color: TEXT_WHITE,
      valign: 'middle'
    });
  }
  
  return slide;
}

// ==========================================
// SLIDE 1 — COPERTINA (Dark Theme)
// ==========================================
const s1 = createDarkSlide();

// LUM School of Management Logo (Top Left)
s1.addImage({
  path: path.join(pngDir, 'image1.jpeg'),
  x: 0.8,
  y: 0.6,
  w: 2.2,
  h: 0.9,
  sizing: { type: 'contain', w: 2.2, h: 0.9 }
});

// Title
s1.addText('ESTETOLOGIA E AVATAR AI', {
  x: 0.8,
  y: 2.1,
  w: 6.8,
  h: 1.0,
  fontFace: TITLE_FONT,
  fontSize: 36,
  bold: true,
  color: TEXT_WHITE
});

// Subtitle
s1.addText('Arte, identità e strategie di marketing', {
  x: 0.8,
  y: 3.1,
  w: 6.8,
  h: 0.5,
  fontFace: TITLE_FONT,
  fontSize: 18,
  italic: true,
  color: TEXT_GRAY
});

// Left Column Details (Candidate/Master)
s1.addText([
  { text: 'Candidato\n', options: { bold: true, color: TEXT_WHITE, fontSize: 13 } },
  { text: 'Federica Centonze\n\n', options: { bold: true, color: ACCENT_GOLD, fontSize: 16 } },
  { text: 'Master MADIMAV\n', options: { color: TEXT_GRAY, fontSize: 13 } },
  { text: 'Anno Accademico 2025/2026', options: { color: TEXT_GRAY, fontSize: 13 } }
], {
  x: 0.8,
  y: 4.2,
  w: 3.2,
  h: 2.5,
  fontFace: BODY_FONT,
  valign: 'top'
});

// Right Column Details (Relatori)
s1.addText([
  { text: 'Relatore\n', options: { bold: true, color: TEXT_WHITE, fontSize: 13 } },
  { text: 'Prof. Domenico Morrone\n\n', options: { color: TEXT_WHITE, fontSize: 15 } },
  { text: 'Correlatore\n', options: { bold: true, color: TEXT_WHITE, fontSize: 13 } },
  { text: 'Pietro Coletta', options: { color: TEXT_WHITE, fontSize: 15 } }
], {
  x: 4.3,
  y: 4.2,
  w: 3.2,
  h: 2.5,
  fontFace: BODY_FONT,
  valign: 'top'
});

// Athy portrait on the right (Cinematic Asset)
s1.addImage({
  path: path.join(assetsDir, 'athy-brand-character-verticale.jpg'),
  x: 8.2,
  y: 1.0,
  w: 4.3,
  h: 5.5,
  sizing: { type: 'cover', w: 4.3, h: 5.5 }
});


// ==========================================
// SLIDE 2 — PERCHÉ QUESTA RICERCA (Light Theme)
// ==========================================
const s2 = createLightSlide('Immagine, identità, tecnologia e fiducia');

// Left Column Text - Four Key Words & RQ
s2.addText('Quattro pilastri fondamentali:', {
  x: 0.8,
  y: 1.3,
  w: 6.8,
  h: 0.4,
  fontFace: TITLE_FONT,
  fontSize: 18,
  bold: true,
  color: TEXT_DARK
});

// 4 Words
const words = ['Estetologia', 'Identità digitale', 'Marketing', 'AI responsabile'];
words.forEach((word, index) => {
  s2.addShape(pptx.shapes.OVAL, {
    x: 0.8,
    y: 1.8 + (index * 0.7),
    w: 0.15,
    h: 0.15,
    fill: { color: ACCENT_AMBER }
  });
  s2.addText(word, {
    x: 1.1,
    y: 1.7 + (index * 0.7),
    w: 6.0,
    h: 0.4,
    fontFace: TITLE_FONT,
    fontSize: 20,
    bold: true,
    color: TEXT_DARK
  });
});

// Question
s2.addText('Domanda di Ricerca:', {
  x: 0.8,
  y: 4.8,
  w: 6.8,
  h: 0.3,
  fontFace: BODY_FONT,
  fontSize: 13,
  bold: true,
  color: TEXT_MUTED
});
s2.addText('In che modo il modello metodologico del laboratorio strategico Socialin Communication e Federica Creative, basato su Estetologia e IA responsabile, si confronta con le evidenze e i limiti della prassi operativa nei casi studio considerati?', {
  x: 0.8,
  y: 5.15,
  w: 6.8,
  h: 1.4,
  fontFace: TITLE_FONT,
  fontSize: 14,
  italic: true,
  color: TEXT_DARK
});

// Right Image (Athanasya Scene)
s2.addImage({
  path: path.join(assetsDir, '01-scena-orbita-athanasya-verticale.png'),
  x: 8.2,
  y: 1.3,
  w: 4.3,
  h: 5.2,
  sizing: { type: 'cover', w: 4.3, h: 5.2 }
});


// ==========================================
// SLIDE 3 — METODO (Light Theme)
// ==========================================
const s3 = createLightSlide('Quattro livelli di evidenza');

// Grid of 4 columns
const levels = [
  { num: '1', title: 'Documentato', desc: 'Fonti documentali certe, contratti e materiali storici preesistenti.' },
  { num: '2', title: 'Prototipo o simulazione', desc: 'Sviluppi grafici, touchpoint interattivi e prototipi software.' },
  { num: '3', title: 'Proposta operativa', desc: 'Strategie editoriali, piani creativi e architetture non formalizzate.' },
  { num: '4', title: 'Sviluppo da validare', desc: 'Funzionalità tecniche future e performance da verificare sul campo.' }
];

levels.forEach((lvl, idx) => {
  const xOffset = 0.8 + (idx * 2.95);
  
  // Card background
  s3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xOffset,
    y: 1.5,
    w: 2.7,
    h: 3.5,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 1.5 },
    rectRadius: 0.1
  });
  
  // Number bubble
  s3.addShape(pptx.shapes.OVAL, {
    x: xOffset + 1.1,
    y: 1.7,
    w: 0.5,
    h: 0.5,
    fill: { color: 'F1F5F9' }
  });
  s3.addText(lvl.num, {
    x: xOffset + 1.1,
    y: 1.7,
    w: 0.5,
    h: 0.5,
    fontFace: TITLE_FONT,
    fontSize: 16,
    bold: true,
    color: ACCENT_AMBER,
    align: 'center',
    valign: 'middle'
  });
  
  // Title
  s3.addText(lvl.title, {
    x: xOffset + 0.1,
    y: 2.4,
    w: 2.5,
    h: 0.5,
    fontFace: TITLE_FONT,
    fontSize: 15,
    bold: true,
    color: TEXT_DARK,
    align: 'center',
    valign: 'top'
  });
  
  // Description
  s3.addText(lvl.desc, {
    x: xOffset + 0.15,
    y: 3.0,
    w: 2.4,
    h: 1.8,
    fontFace: BODY_FONT,
    fontSize: 12.5,
    color: TEXT_MUTED,
    align: 'center',
    valign: 'top'
  });
});

// Mandatory bottom phrase in red/gold
s3.addText('“Ciò che è progettato non è automaticamente validato.”', {
  x: 0.8,
  y: 5.6,
  w: 11.7,
  h: 0.8,
  fontFace: TITLE_FONT,
  fontSize: 20,
  bold: true,
  color: ACCENT_RED,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 4 — QUADRO TEORICO (Light Theme)
// ==========================================
const s4 = createLightSlide('Quattro lenti per leggere il modello');

// 2x2 Quadrant Grid
const quadrants = [
  { title: 'Valore', link: 'Marketing Strategico', desc: 'Rinnovare le relazioni e i processi di creazione di valore attraverso narrazioni interattive, personalizzazione e digital storytelling strategico.' },
  { title: 'Identità', link: 'Estetologia e Cultura Visuale', desc: 'Progettare l’universo sensoriale ed espressivo del brand tramite linguaggi visivi coordinati, sound design e design dei caratteri.' },
  { title: 'Fiducia', link: 'Neuromarketing Responsabile', desc: 'Stabilire relazioni basate su onestà informativa, trasparenza metodologica e interazioni volte al benessere psicofisico dell’utente.' },
  { title: 'Responsabilità', link: 'AI, Avatar e Trasparenza', desc: 'Integrare agenti artificiali preservando disclosure (esplicitazione dell’IA), controllo umano di supervisione e rispetto dei diritti.' }
];

quadrants.forEach((quad, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const xPos = 0.8 + (col * 6.0);
  const yPos = 1.4 + (row * 2.5);
  
  // Quadrant card
  s4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: yPos,
    w: 5.7,
    h: 2.2,
    fill: { color: 'FFFFFF' },
    line: { color: 'F1F5F9', width: 2 },
    rectRadius: 0.05
  });
  
  // Title
  s4.addText(quad.title, {
    x: xPos + 0.3,
    y: yPos + 0.2,
    w: 5.1,
    h: 0.4,
    fontFace: TITLE_FONT,
    fontSize: 18,
    bold: true,
    color: ACCENT_GOLD
  });
  
  // Academic Link
  s4.addText(quad.link, {
    x: xPos + 0.3,
    y: yPos + 0.6,
    w: 5.1,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 12,
    bold: true,
    color: TEXT_DARK
  });
  
  // Description
  s4.addText(quad.desc, {
    x: xPos + 0.3,
    y: yPos + 0.95,
    w: 5.1,
    h: 1.1,
    fontFace: BODY_FONT,
    fontSize: 12,
    color: TEXT_MUTED
  });
});


// ==========================================
// SLIDE 5 — SOCIALIN E FEDERICA CREATIVE (Light Theme)
// ==========================================
const s5 = createLightSlide('Laboratorio creativo-strategico');

// Left textual column
s5.addText([
  { text: 'Il Modello Integrato\n\n', options: { bold: true, fontSize: 16, color: TEXT_DARK } },
  { text: 'Un ecosistema multidisciplinare in cui visual design, marketing relazionale ed estetologia si fondono per dare forma a identità digitali complesse.\n\n', options: { fontSize: 13, color: TEXT_MUTED } },
  { text: 'Arte, visual design, marketing, AI e touchpoint in un ecosistema progettuale da validare progressivamente.', options: { bold: true, italic: true, fontSize: 14, color: ACCENT_AMBER } }
], {
  x: 0.8,
  y: 1.4,
  w: 3.2,
  h: 5.0,
  fontFace: TITLE_FONT,
  valign: 'top'
});

// Right Image (image2.jpeg - Map, occupying ~67% width)
s5.addImage({
  path: path.join(pngDir, 'image2.jpeg'),
  x: 4.3,
  y: 1.3,
  w: 8.2,
  h: 5.2,
  sizing: { type: 'contain', w: 8.2, h: 5.2 }
});


// ==========================================
// SLIDE 6 — AS IS / TO BE (Light Theme)
// ==========================================
const s6 = createLightSlide('Dallo scenario documentabile alla direzione progettuale');

// Image (image1.png - As Is / To Be diagram)
s6.addImage({
  path: path.join(pngDir, 'image1.png'),
  x: 0.8,
  y: 1.3,
  w: 11.7,
  h: 4.8,
  sizing: { type: 'contain', w: 11.7, h: 4.8 }
});

// Bottom caption
s6.addText('Sviluppo progressivo, fonti verificabili e validazione.', {
  x: 0.8,
  y: 6.2,
  w: 11.7,
  h: 0.5,
  fontFace: BODY_FONT,
  fontSize: 14,
  italic: true,
  color: TEXT_MUTED,
  align: 'center'
});


// ==========================================
// SLIDE 7 — SOCIALIN COMMUNICATION (Light Theme)
// ==========================================
const s7 = createLightSlide('Il sito come dimostratore metodologico-operativo');

// Image (image2.png - Ecosistema digitale)
s7.addImage({
  path: path.join(pngDir, 'image2.png'),
  x: 0.8,
  y: 1.3,
  w: 11.7,
  h: 4.6,
  sizing: { type: 'contain', w: 11.7, h: 4.6 }
});

// Caption (Mandatory text)
s7.addText('Il sito rende osservabile una direzione progettuale, non certifica automaticamente performance, conversioni o funzioni tecniche attive.', {
  x: 0.8,
  y: 6.0,
  w: 11.7,
  h: 0.6,
  fontFace: TITLE_FONT,
  fontSize: 14,
  italic: true,
  bold: true,
  color: TEXT_DARK,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 8 — QUATTRO CASI, UNA GRIGLIA (Light Theme)
// ==========================================
const s8 = createLightSlide('Comparazione qualitativa dei casi studio');

// Left Column - 4 Case Labels
const cases = [
  { name: 'Aia Pura Bio', badge: 'Studio di fattibilità', desc: 'Progettazione integrale e touchpoint prima del lancio commerciale.' },
  { name: 'FisioIntegra', badge: 'Supporto tecnico-creativo', desc: 'Limiti dell’automazione e rispetto delle competenze sanitarie.' },
  { name: 'EssereApe', badge: 'Caso reale', desc: 'Touchpoint preesistenti e proposta creativa “Il Tempo delle Api”.' },
  { name: 'Claudio Stella', badge: 'Proposta strategica', desc: 'Architettura editoriale proposta e non formalizzata.' }
];

cases.forEach((cs, idx) => {
  const yOffset = 1.3 + (idx * 1.3);
  
  // Label Card Background
  s8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: yOffset,
    w: 6.2,
    h: 1.15,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 1 },
    rectRadius: 0.08
  });
  
  // Case name
  s8.addText(cs.name, {
    x: 1.0,
    y: yOffset + 0.1,
    w: 2.8,
    h: 0.35,
    fontFace: TITLE_FONT,
    fontSize: 15,
    bold: true,
    color: TEXT_DARK
  });
  
  // Badge
  s8.addText(cs.badge, {
    x: 3.8,
    y: yOffset + 0.1,
    w: 3.0,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 11,
    bold: true,
    color: ACCENT_AMBER,
    align: 'right'
  });
  
  // Desc
  s8.addText(cs.desc, {
    x: 1.0,
    y: yOffset + 0.45,
    w: 5.8,
    h: 0.6,
    fontFace: BODY_FONT,
    fontSize: 11.5,
    color: TEXT_MUTED
  });
});

// Right Column - Portion of Tabella 1 Matrix (uncropped slice via cover)
s8.addImage({
  path: path.join(pngDir, 'Tabella_1_Matrice_comparativa_REVISIONE.png'),
  x: 7.4,
  y: 1.3,
  w: 5.1,
  h: 5.1,
  sizing: { type: 'cover', w: 5.1, h: 5.1 }
});

s8.addText('*La matrice comparativa completa è riportata negli allegati tecnici.*', {
  x: 7.4,
  y: 6.4,
  w: 5.1,
  h: 0.3,
  fontFace: BODY_FONT,
  fontSize: 10,
  italic: true,
  color: TEXT_MUTED,
  align: 'right'
});


// ==========================================
// SLIDE 9 — AIA PURA BIO (Light Theme)
// ==========================================
const s9 = createLightSlide('Filiera, fiducia informativa e prototipi progettuali');

// Image (image3.png - Aia Pura Bio studio)
s9.addImage({
  path: path.join(pngDir, 'image3.png'),
  x: 0.8,
  y: 1.3,
  w: 11.7,
  h: 4.6,
  sizing: { type: 'contain', w: 11.7, h: 4.6 }
});

// Wording & Studio di fattibilità
s9.addText('Il caso mostra come identità, catalogo, packaging, QR code, Bianca e funnel possano essere progettati prima dell’attivazione commerciale. [Studio di fattibilità]', {
  x: 0.8,
  y: 6.0,
  w: 11.7,
  h: 0.6,
  fontFace: TITLE_FONT,
  fontSize: 14,
  italic: true,
  bold: true,
  color: TEXT_DARK,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 10 — FISIOINTEGRA (Light Theme)
// ==========================================
const s10 = createLightSlide('Comunicazione professionale e limiti dell’automazione');

// Image (image4.png - FisioIntegra)
s10.addImage({
  path: path.join(pngDir, 'image4.png'),
  x: 0.8,
  y: 1.3,
  w: 11.7,
  h: 4.6,
  sizing: { type: 'contain', w: 11.7, h: 4.6 }
});

// Wording & Constraints
s10.addText('Il supporto tecnico-creativo rende più leggibile il progetto, senza sovrapporsi alle competenze sanitarie. Limiti documentati: nessuna diagnosi o prescrizione, nessuna automazione decisionale.', {
  x: 0.8,
  y: 6.0,
  w: 11.7,
  h: 0.6,
  fontFace: TITLE_FONT,
  fontSize: 14,
  italic: true,
  bold: true,
  color: TEXT_DARK,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 11 — ESSEREAPE E CLAUDIO STELLA (Light Theme)
// ==========================================
const s11 = createLightSlide('Due proposte narrative, due livelli diversi di maturità');

// Left Column: EssereApe (image5.png)
s11.addImage({
  path: path.join(pngDir, 'image5.png'),
  x: 0.8,
  y: 1.3,
  w: 5.6,
  h: 3.8,
  sizing: { type: 'contain', w: 5.6, h: 3.8 }
});

s11.addText('EssereApe:\n“Proposta creativa distinta da brand e touchpoint preesistenti.”', {
  x: 0.8,
  y: 5.3,
  w: 5.6,
  h: 0.8,
  fontFace: TITLE_FONT,
  fontSize: 13,
  bold: true,
  color: TEXT_DARK,
  align: 'center'
});

// Right Column: Claudio Stella (image6.png)
s11.addImage({
  path: path.join(pngDir, 'image6.png'),
  x: 6.9,
  y: 1.3,
  w: 5.6,
  h: 3.8,
  sizing: { type: 'contain', w: 5.6, h: 3.8 }
});

s11.addText('Claudio Stella:\n“Proposta editoriale non formalizzata, subordinata ad accordi e validazione.”', {
  x: 6.9,
  y: 5.3,
  w: 5.6,
  h: 0.8,
  fontFace: TITLE_FONT,
  fontSize: 13,
  bold: true,
  color: TEXT_DARK,
  align: 'center'
});


// ==========================================
// SLIDE 12 — ATHY (Dark Theme)
// ==========================================
const s12 = createDarkSlide('Strategia senza volto e identità sintetica');

// Cinematic Athy portrait (cover/fill aspect ratio)
s12.addImage({
  path: path.join(assetsDir, 'athy-strategia-senza-volto-verticale.jpg'),
  x: 0.8,
  y: 1.3,
  w: 4.2,
  h: 5.2,
  sizing: { type: 'cover', w: 4.2, h: 5.2 }
});

// Bullet list with points
s12.addText([
  { text: 'Universo visivo e continuità narrativa\n', options: { bold: true, color: TEXT_WHITE, fontSize: 18 } },
  { text: 'Progettazione di coerenza visuale e canora per la cantante virtuale Athy.\n\n', options: { color: TEXT_GRAY, fontSize: 14 } },
  
  { text: 'Disclosure obbligatoria\n', options: { bold: true, color: TEXT_WHITE, fontSize: 18 } },
  { text: 'Dichiarazione esplicita della natura sintetica dell’avatar in ogni touchpoint.\n\n', options: { color: TEXT_GRAY, fontSize: 14 } },
  
  { text: 'Controllo umano e diritti d’uso\n', options: { bold: true, color: TEXT_WHITE, fontSize: 18 } },
  { text: 'Supervisione del concept, dell’output generato e regolamentazione dei diritti.', options: { color: TEXT_GRAY, fontSize: 14 } }
], {
  x: 5.4,
  y: 1.3,
  w: 7.1,
  h: 4.4,
  fontFace: TITLE_FONT,
  valign: 'top'
});

// Caption
s12.addText('Prototipo proprietario sperimentale. Non quinto caso cliente.', {
  x: 5.4,
  y: 5.9,
  w: 7.1,
  h: 0.5,
  fontFace: BODY_FONT,
  fontSize: 12,
  italic: true,
  color: ACCENT_GOLD
});


// ==========================================
// SLIDE 13 — VALIDAZIONE E ROADMAP (Light Theme)
// ==========================================
const s13 = createLightSlide('Dalla sperimentazione al metodo');

// Image (image13.png - Roadmap)
s13.addImage({
  path: path.join(pngDir, 'image13.png'),
  x: 0.8,
  y: 1.3,
  w: 11.7,
  h: 4.6,
  sizing: { type: 'contain', w: 11.7, h: 4.6 }
});

// Mandatory bottom text
s13.addText('Il modello richiede fonti, ruoli, consenso, test tecnici, feedback e dati osservabili prima di ogni validazione.', {
  x: 0.8,
  y: 6.0,
  w: 11.7,
  h: 0.6,
  fontFace: TITLE_FONT,
  fontSize: 14,
  italic: true,
  bold: true,
  color: TEXT_DARK,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDE 14 — CONCLUSIONI (Dark Theme)
// ==========================================
const s14 = createDarkSlide('La risposta alla domanda di ricerca');

// Left column: Final text & Grazie
s14.addText([
  { text: 'Socialin e Federica Creative possono configurarsi come laboratorio creativo-strategico solo quando arte, marketing, AI e cultura visuale restano documentati, attribuiti e validati progressivamente.\n\n\n', options: { fontSize: 18, color: TEXT_WHITE } },
  { text: 'Grazie', options: { bold: true, fontSize: 36, color: ACCENT_GOLD, fontFace: TITLE_FONT } }
], {
  x: 0.8,
  y: 1.8,
  w: 6.8,
  h: 4.5,
  fontFace: TITLE_FONT,
  valign: 'top'
});

// Right Column: Athy artistic reference
s14.addImage({
  path: path.join(assetsDir, 'athy-estetologia-identita-verticale.jpg'),
  x: 8.2,
  y: 1.0,
  w: 4.3,
  h: 5.5,
  sizing: { type: 'cover', w: 4.3, h: 5.5 }
});


// ==========================================
// SLIDE DIVISORIA — ALLEGATI TECNICI (Dark Theme)
// ==========================================
const sDiv = createDarkSlide();

sDiv.addText('ALLEGATI TECNICI', {
  x: 0.8,
  y: 2.2,
  w: 11.7,
  h: 1.0,
  fontFace: TITLE_FONT,
  fontSize: 42,
  bold: true,
  color: ACCENT_GOLD,
  align: 'center',
  valign: 'middle'
});

sDiv.addText('Tabelle e strumenti metodologici di supporto', {
  x: 0.8,
  y: 3.3,
  w: 11.7,
  h: 0.8,
  fontFace: TITLE_FONT,
  fontSize: 22,
  italic: true,
  color: TEXT_GRAY,
  align: 'center',
  valign: 'middle'
});


// ==========================================
// SLIDES 15 - 20 — ALLEGATI TECNICI (Light Theme)
// ==========================================
const appendixSlides = [
  {
    num: 15,
    title: 'Tabella 1 — Matrice comparativa dei casi analizzati',
    file: 'Tabella_1_Matrice_comparativa_REVISIONE.png'
  },
  {
    num: 16,
    title: 'Tabella 2 — Analisi SWOT del modello Socialin e Federica Creative',
    file: 'Tabella_2_SWOT_REVISIONE.png'
  },
  {
    num: 17,
    title: 'Tabella 3 — Benchmark comparativo di cinque agenzie di comunicazione digitale',
    file: 'Tabella_3_Benchmark_comparativo_REVISIONE_V2.png'
  },
  {
    num: 18,
    title: 'Tabella 4 — KPI preliminari e criteri di validazione del modello',
    file: 'Tabella_4_KPI_VALIDAZIONE_REVISIONE.png'
  },
  {
    num: 19,
    title: 'Tabella 5 — Dati di contesto e parametri metodologici preliminari',
    file: 'Tabella_5_Dati_contesto_parametri_metodologici_REVISIONE_V2.png'
  },
  {
    num: 20,
    title: 'Tabella 6 — Analisi qualitativa di costi, benefici, rischi e condizioni di sviluppo',
    file: 'Tabella_6_Costi_benefici_rischi_REVISIONE.png'
  }
];

appendixSlides.forEach(slideInfo => {
  const slide = createLightSlide(`SLIDE ${slideInfo.num}: ${slideInfo.title}`);
  
  slide.addImage({
    path: path.join(pngDir, slideInfo.file),
    x: 0.8,
    y: 1.3,
    w: 11.7,
    h: 5.2,
    sizing: { type: 'contain', w: 11.7, h: 5.2 }
  });
});


// Save Presentation
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`Presentation generated successfully at: ${outputPath}`);
  })
  .catch(err => {
    console.error(`Error generating presentation: ${err}`);
    process.exit(1);
  });
