const fs = require('fs');

const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  const css = `
<style>
.fisio-add-grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
@media (max-width: 768px) { .fisio-add-grid-2-col { grid-template-columns: 1fr; } }
.fisio-add-mockup { background: #fff; border-radius: 32px; padding: 24px; border: 8px solid var(--petrolio); box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 350px; margin: 0 auto; }
.fisio-add-mockup-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.fisio-add-mockup-logo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(0,0,0,0.1); }
.fisio-add-mockup-bio h4 { margin: 0 0 4px 0; font-family: var(--display); color: var(--petrolio); font-size: 16px; }
.fisio-add-mockup-bio p { margin: 0; font-size: 13px; color: #555; line-height: 1.4; }
.fisio-add-mockup-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
.fisio-add-mockup-item { aspect-ratio: 1; background: #eee; border-radius: 2px; overflow: hidden; }
.fisio-add-mockup-item img { width: 100%; height: 100%; object-fit: cover; }
.fisio-add-list-box h3 { font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 12px; margin-top: 32px; }
.fisio-add-list-box h3:first-child { margin-top: 0; }
.fisio-add-list-box ul { padding-left: 20px; color: #555; font-size: 15px; line-height: 1.6; margin: 0; }

.fisio-add-number-card { background: var(--crema); border-radius: 16px; padding: 32px; text-align: center; border: 1px solid rgba(0,0,0,0.05); }
.fisio-add-number-val { font-family: var(--display); font-size: 48px; font-weight: 700; color: var(--teal); line-height: 1; margin-bottom: 12px; }
.fisio-add-number-lbl { font-size: 13px; font-weight: 700; color: var(--petrolio); text-transform: uppercase; letter-spacing: 1px; }

.fisio-add-disclaimer { margin-top: 32px; padding: 16px; background: rgba(0,0,0,0.02); border-left: 4px solid var(--teal); font-size: 14px; color: #666; border-radius: 0 8px 8px 0; font-style: italic; }
</style>
`;

  const secSpotStorytelling = `
    <div id="spot-storytelling" style="margin-top: 64px;">
      <h3 class="sec-title" style="font-size: 24px;">Spot pubblicitari e storytelling</h3>
      <p class="sec-desc" style="margin-bottom: 32px;">Tre concept narrativi progettuali per trasformare il sistema FisioIntegra in contenuti video informativi, riconoscibili e orientati alla relazione.</p>
      
      <div class="fisio-add-grid-3">
        <!-- CARD 1 -->
        <div class="fisio-add-card">
          <div class="fisio-add-label" style="margin-bottom: 16px;">SPOT 1</div>
          <h3 class="fisio-add-ctitle" style="font-size: 22px;">Il movimento inizia dall’ascolto</h3>
          <p style="font-size: 14px; color: #666; margin-bottom: 16px;"><strong>Durata:</strong> 30 secondi</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Obiettivo:</strong> Rendere visibile un approccio orientato alla persona, all’ascolto e alla costruzione graduale del percorso.</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Target:</strong> Persone che avvertono rigidità, fastidi o difficoltà nella quotidianità e cercano informazioni chiare.</p>
          <div style="margin-bottom: 16px; font-size: 14px; color: #555;">
            <strong>Struttura:</strong><br>
            0–5s: gesto quotidiano e segnale di difficoltà.<br>
            5–12s: pausa, ascolto e osservazione.<br>
            12–22s: movimento guidato, ambiente professionale e relazione.<br>
            22–30s: invito a conoscere il percorso.
          </div>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px; font-style: italic;"><strong>Voice-over:</strong> “Ogni movimento racconta qualcosa. Il primo passo è ascoltarlo.”</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>CTA:</strong> Scopri il percorso FisioIntegra.</p>
          <div class="fisio-add-disclaimer" style="margin-top: 16px;">Nota: Contenuto informativo progettuale. Non sostituisce una valutazione professionale individuale.</div>
        </div>

        <!-- CARD 2 -->
        <div class="fisio-add-card">
          <div class="fisio-add-label" style="margin-bottom: 16px;">SPOT 2</div>
          <h3 class="fisio-add-ctitle" style="font-size: 22px;">La prevenzione vive nella quotidianità</h3>
          <p style="font-size: 14px; color: #666; margin-bottom: 16px;"><strong>Durata:</strong> 20 secondi</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Obiettivo:</strong> Comunicare la prevenzione come attenzione continua e accessibile, senza promesse o prescrizioni.</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Target:</strong> Persone sedentarie, lavoratori al computer e pubblico interessato al benessere quotidiano.</p>
          <div style="margin-bottom: 16px; font-size: 14px; color: #555;">
            <strong>Struttura:</strong><br>
            0–4s: postazione sedentaria o gesto ripetitivo.<br>
            4–10s: semplice momento di pausa e consapevolezza.<br>
            10–16s: messaggio visivo su continuità e attenzione.<br>
            16–20s: CTA informativa.
          </div>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px; font-style: italic;"><strong>Voice-over:</strong> “La prevenzione non è un momento isolato. È attenzione che continua.”</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>CTA:</strong> Scopri i contenuti educativi di FisioIntegra.</p>
          <div class="fisio-add-disclaimer" style="margin-top: 16px;">Nota: Contenuto progettuale a finalità divulgativa.</div>
        </div>

        <!-- CARD 3 -->
        <div class="fisio-add-card">
          <div class="fisio-add-label" style="margin-bottom: 16px;">SPOT 3</div>
          <h3 class="fisio-add-ctitle" style="font-size: 22px;">Un percorso più leggibile</h3>
          <p style="font-size: 14px; color: #666; margin-bottom: 16px;"><strong>Durata:</strong> 15 secondi</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Obiettivo:</strong> Rendere più comprensibile il metodo comunicativo di FisioIntegra e facilitare il primo contatto.</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>Target:</strong> Persone che desiderano capire servizi, approccio e possibilità di orientamento.</p>
          <div style="margin-bottom: 16px; font-size: 14px; color: #555;">
            <strong>Struttura:</strong><br>
            0–4s: visual del metodo o della mappa del percorso.<br>
            4–9s: elementi chiave: ascolto, orientamento, continuità.<br>
            9–15s: invito al contatto.
          </div>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px; font-style: italic;"><strong>Voice-over:</strong> “Capire il percorso è già un modo per iniziare.”</p>
          <p class="fisio-add-cdesc" style="margin-bottom: 16px;"><strong>CTA:</strong> Richiedi informazioni.</p>
          <div class="fisio-add-disclaimer" style="margin-top: 16px;">Nota: Prototipo di spot. Non rappresenta una campagna realmente pubblicata.</div>
        </div>
      </div>
    </div>
`;

  const secFeedInstagram = `
  <section class="sec" id="architettura-feed">
    <div class="sec-content">
      <h2 class="sec-title">Feed Instagram: post, reel e stories</h2>
      <p class="sec-desc">Il profilo Instagram viene organizzato come spazio di orientamento: contenuti educativi, format narrativi e touchpoint informativi costruiscono una presenza coerente e riconoscibile.</p>
      
      <div class="fisio-add-grid-2-col" style="margin-top: 40px;">
        <!-- COLONNA SINISTRA -->
        <div>
          <div class="fisio-add-mockup">
            <div class="fisio-add-mockup-header">
              <img src="assets/logo-fisiointegra.png" class="fisio-add-mockup-logo" alt="Logo">
              <div class="fisio-add-mockup-bio">
                <h4>FisioIntegra</h4>
                <p>Orientamento, ascolto e continuità nel movimento.</p>
                <p style="color:var(--teal); font-weight:600; font-size:12px; margin-top:4px;">fisiointegra.it</p>
              </div>
            </div>
            
            <div class="fisio-add-highlights-grid" style="margin-top:0; margin-bottom: 24px; gap: 8px; justify-content: space-between;">
              <div class="fisio-add-highlight-item" style="width: 50px;">
                <div class="fisio-add-highlight-circle" style="width:50px; height:50px;"><img src="assets/02_ascolto.png" alt=""></div>
              </div>
              <div class="fisio-add-highlight-item" style="width: 50px;">
                <div class="fisio-add-highlight-circle" style="width:50px; height:50px;"><img src="assets/_anteprima_carosello.png" alt=""></div>
              </div>
              <div class="fisio-add-highlight-item" style="width: 50px;">
                <div class="fisio-add-highlight-circle" style="width:50px; height:50px;"><img src="assets/05_cta.png" alt=""></div>
              </div>
              <div class="fisio-add-highlight-item" style="width: 50px;">
                <div class="fisio-add-highlight-circle" style="width:50px; height:50px; background:#f0f0f0; border-color:#ccc;"></div>
              </div>
            </div>

            <div class="fisio-add-mockup-grid">
              <div class="fisio-add-mockup-item"><img src="assets/problema-movimento.jpg" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/_anteprima_carosello.png" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/Post educativo “Cinque errori della giornata sedentaria”.png" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/problema-postura.jpg" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/Post “Tornare allo sport”.png" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/05_cta.png" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/Copertina Reel “Il dolore è un segnale”.png" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/metodo-fisiointegra.jpg" alt=""></div>
              <div class="fisio-add-mockup-item"><img src="assets/problema-prevenzione.jpg" alt=""></div>
            </div>
          </div>
          <div class="fisio-add-disclaimer" style="margin-top: 24px; text-align: left;">Il profilo, le miniature e le copertine visualizzate hanno funzione dimostrativa. Non rappresentano dati di performance, follower, interazioni o contenuti già pubblicati.</div>
        </div>

        <!-- COLONNA DESTRA -->
        <div class="fisio-add-list-box">
          <h3>1. POST FEED</h3>
          <ul>
            <li>Educazione sul movimento;</li>
            <li>falsi miti;</li>
            <li>prevenzione quotidiana;</li>
            <li>metodo e percorso;</li>
            <li>CTA informative.</li>
          </ul>

          <h3>2. REEL FORMAT</h3>
          <ul>
            <li>movimento quotidiano;</li>
            <li>pause attive;</li>
            <li>spiegazioni visive;</li>
            <li>storytelling del metodo;</li>
            <li>ritorno graduale allo sport.</li>
          </ul>

          <h3>3. STORIES E HIGHLIGHT</h3>
          <ul>
            <li>FAQ;</li>
            <li>quiz;</li>
            <li>reminder;</li>
            <li>dietro le quinte;</li>
            <li>contatti;</li>
            <li>percorso;</li>
            <li>prevenzione.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

  const secPianoNumeri = `
  <section class="sec" id="piano-numeri">
    <div class="sec-content">
      <h2 class="sec-title">Il piano editoriale in numeri</h2>
      
      <div class="fisio-add-grid-4" style="margin-top: 40px; margin-bottom: 40px;">
        <div class="fisio-add-number-card">
          <div class="fisio-add-number-val">16</div>
          <div class="fisio-add-number-lbl">Post / mese</div>
        </div>
        <div class="fisio-add-number-card">
          <div class="fisio-add-number-val">8</div>
          <div class="fisio-add-number-lbl">Reel / mese</div>
        </div>
        <div class="fisio-add-number-card">
          <div class="fisio-add-number-val">4</div>
          <div class="fisio-add-number-lbl">Stories / mese</div>
        </div>
        <div class="fisio-add-number-card">
          <div class="fisio-add-number-val">6</div>
          <div class="fisio-add-number-lbl">Pilastri tematici</div>
        </div>
      </div>

      <div class="fisio-add-grid-2-col">
        <div class="fisio-add-list-box">
          <h3>Pilastri editoriali</h3>
          <ul>
            <li>Educazione al movimento</li>
            <li>Metodo &amp; percorso</li>
            <li>Prevenzione</li>
            <li>Sport &amp; riabilitazione</li>
            <li>Community &amp; interazione</li>
            <li>Call to action</li>
          </ul>
        </div>
        <div class="fisio-add-list-box">
          <h3>Format e categorie</h3>
          <ul>
            <li>Reel cover / Reel</li>
            <li>Carosello 6 slide</li>
            <li>Post educativo / Post falso mito</li>
            <li>Stories interattive / Sondaggio</li>
            <li>Post CTA</li>
          </ul>
        </div>
      </div>

      <div class="fisio-add-disclaimer">I valori indicati rappresentano parametri di pianificazione editoriale e monitoraggio futuro. Non corrispondono a risultati, performance o dati già ottenuti.</div>
    </div>
  </section>
`;

  // Inject CSS
  html = html.replace('</style>', '</style>' + css);

  // Spot pubblicitari e storytelling -> After Spot Video
  // The video container ends before </div>\n    </section> inside #spot
  const spotRegex = /(<section class="sec" id="spot">[\s\S]*?<\/div>\s*<\/div>)/;
  html = html.replace(spotRegex, '$1' + secSpotStorytelling);

  // Feed Instagram: post, reel e stories -> Before Feed preview 3x3
  html = html.replace('<section class="sec" id="feed">', secFeedInstagram + '\n    <section class="sec" id="feed">');

  // Il piano editoriale in numeri -> Before Calendario
  html = html.replace('<section class="sec" id="calendario">', secPianoNumeri + '\n    <section class="sec" id="calendario">');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Final sections added successfully.');

} catch (err) {
  console.error('Error:', err);
}
