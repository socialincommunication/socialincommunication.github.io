const fs = require('fs');
const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo_CORRETTO.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // TASK A: Video Spot
  const videoTarget = `<div class="spot-container" style="padding: 0; overflow: hidden; border: none; background: transparent; aspect-ratio: 16/9; border-radius: 24px; margin-top: 24px;">
        <video width="100%" height="auto" controls style="width: 100%; height: 100%; object-fit: cover; display: block;">`;
  const videoReplacement = `<div class="spot-container fisio-spot-container" style="position: relative; padding: 0; overflow: hidden; border: none; background: transparent; aspect-ratio: 16/9; border-radius: 24px; margin-top: 24px;">
        <video id="fisioSpotVideo" width="100%" height="auto" autoplay muted loop playsinline preload="metadata" controls aria-label="Spot di presentazione FisioIntegra" style="width: 100%; height: 100%; object-fit: cover; display: block;">`;

  if(html.includes(videoTarget)) {
    html = html.replace(videoTarget, videoReplacement);
    
    const videoEndTarget = `Il tuo browser non supporta il tag video.
        </video>`;
    const videoEndReplacement = `Il tuo browser non supporta il tag video.
        </video>
        <div class="fisio-spot-overlay">
          <div class="fisio-spot-badge">SPOT PRESENTAZIONE</div>
          <button id="fisioSpotBtn" class="fisio-spot-btn" type="button">Attiva audio</button>
          <div class="fisio-spot-hint">Passa sul video e clicca per ascoltare</div>
        </div>`;
    html = html.replace(videoEndTarget, videoEndReplacement);
  }

  // TASK B: Descrizione Editoriale
  const descHtml = `
  <section class="sec" id="spot-desc">
    <div class="sec-content">
      <h2 class="sec-title">L’idea dello spot: dal primo segnale al primo passo</h2>
      <p class="sec-desc">Uno spot di presentazione progettato per accompagnare l’utente dal contenuto video al funnel digitale di FisioIntegra.</p>
      
      <div class="fisio-case-grid-2-col" style="margin-top:40px;">
        <!-- SINISTRA -->
        <div>
          <h4 style="font-family: var(--display); color: var(--teal); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Concept creativo</h4>
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">Lo spot è progettato come video di apertura del funnel FisioIntegra. Non presenta il dolore come un problema da spettacolarizzare, ma come un segnale da ascoltare. La narrazione accompagna l’utente da una situazione quotidiana di difficoltà a una prospettiva di orientamento, relazione e movimento consapevole.</p>
          
          <h4 style="font-family: var(--display); color: var(--teal); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Obiettivo della presentazione</h4>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">Il video introduce il visitatore al sito e crea continuità tra social media, landing page e richiesta di informazioni. Il suo compito non è formulare promesse cliniche, ma rendere più chiari il tono, il metodo e l’approccio umano del progetto FisioIntegra.</p>
        </div>

        <!-- DESTRA -->
        <div>
          <div class="fisio-case-block" style="margin-bottom: 24px;">
            <h4 style="font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 8px;">01 · Il segnale</h4>
            <p style="color: #555; font-size: 15px; line-height: 1.5; margin:0;">Un gesto quotidiano, una rigidità o una difficoltà diventano il punto iniziale della narrazione.</p>
          </div>
          <div class="fisio-case-block" style="margin-bottom: 24px;">
            <h4 style="font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 8px;">02 · L’ascolto</h4>
            <p style="color: #555; font-size: 15px; line-height: 1.5; margin:0;">La persona non viene rappresentata come un caso generico, ma come qualcuno da comprendere attraverso attenzione, contesto e relazione.</p>
          </div>
          <div class="fisio-case-block" style="margin-bottom: 24px;">
            <h4 style="font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 8px;">03 · L’identità di Giovanni</h4>
            <p style="color: #555; font-size: 15px; line-height: 1.5; margin:0;">L’identità professionale di Giovanni viene utilizzata per dare continuità e riconoscibilità al funnel. Il volto e la presenza del professionista rendono più umano il passaggio dal contenuto digitale al primo contatto informativo.</p>
          </div>
          <div class="fisio-case-block" style="margin-bottom: 32px;">
            <h4 style="font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 8px;">04 · Il primo passo</h4>
            <p style="color: #555; font-size: 15px; line-height: 1.5; margin:0;">La chiusura dello spot conduce alla scoperta del sito e del percorso FisioIntegra, attraverso una call to action informativa e non prescrittiva.</p>
          </div>
        </div>
      </div>
      <div class="method-note" style="margin-top: 0; border-left: 4px solid var(--verde);">
        <p>La sceneggiatura costituisce una proposta narrativa e visiva. L’eventuale utilizzo dell’identità, della voce, delle immagini o delle riprese di Giovanni deve avvenire esclusivamente con autorizzazione e validazione del professionista coinvolto.</p>
      </div>
    </div>
  </section>
  `;
  html = html.replace('<div id="spot-storytelling"', descHtml + '\n    <div id="spot-storytelling"');

  // TASK D: Rimuovere LUM
  html = html.replace('<title>FisioIntegra · Sistema Visivo Instagram — Project Work LUM</title>', '<title>FisioIntegra · Sistema visivo e content strategy | Socialin Communication</title>');
  html = html.replace('<div class="pl-s">Socialin Communication / Federica Creative — Project Work LUM</div>', '<div class="pl-s">Caso studio digitale · Socialin Communication / Federica Creative</div>');
  html = html.replace(/Project Work\s*—\s*LUM School of\s*Management/g, 'Caso studio digitale<br>Visual system &middot; Content strategy &middot; Piano editoriale');
  html = html.replace(/Sistema\s*<b>progettato\s*e\s*prototipato<\/b>\s*nel\s*contesto\s*del\s*Project\s*Work\s*LUM\./g, 'Sistema progettuale sviluppato da Socialin Communication / Federica Creative come proposta operativa per FisioIntegra.');

  // TASK E: Nota metodologica
  const notaFinaleRegex = /Caso studio FisioIntegra · Sistema visivo, content strategy e piano editoriale sviluppati da Socialin Communication \/ Federica Creative\. Il progetto integra materiali visuali, planner, template e touchpoint digitali come proposta operativa di sviluppo futuro\. I contenuti non costituiscono diagnosi, indicazioni sanitarie personalizzate o risultati clinici\./g;
  const nuovaNotaFinale = `
    <h3 style="font-family: var(--display); color: var(--petrolio); font-size: 18px; margin-bottom: 12px; font-weight:700;">Nota metodologica del caso studio</h3>
    Questo caso studio digitale presenta una proposta operativa sviluppata da Socialin Communication / Federica Creative per FisioIntegra. Il sistema visivo, lo spot di presentazione, i template, il piano editoriale, il calendario, la dashboard e il workflow descrivono un possibile modello di comunicazione e funnel digitale.<br><br>Le frequenze di pubblicazione, i KPI, le metriche, gli stati del planner, le interazioni, i dati numerici e le proiezioni analitiche hanno funzione progettuale e simulativa. Non rappresentano campagne già pubblicate, risultati reali, performance certificate o dati clinici.<br><br>I contenuti non costituiscono diagnosi, prescrizioni, indicazioni sanitarie personalizzate o promesse di risultato. Ogni futura pubblicazione operativa dovrà essere validata dal professionista competente e monitorata attraverso dati reali.
  `.trim();
  html = html.replace(notaFinaleRegex, nuovaNotaFinale);

  // CSS for Spot, Descrizione, Cursor
  const css = `
<style>
/* SPOT CSS */
.fisio-spot-container:hover .fisio-spot-overlay { opacity: 1; }
.fisio-spot-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3);
  opacity: 0; transition: opacity 0.3s ease;
  z-index: 10;
}
.fisio-spot-badge {
  position: absolute; top: 20px; left: 20px;
  background: var(--teal); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 12px; border-radius: 4px; pointer-events: auto;
}
.fisio-spot-btn {
  background: var(--petrolio); color: #fff; border: 2px solid #fff; padding: 12px 24px; border-radius: 30px; font-weight: 600; cursor: pointer; pointer-events: auto; font-size: 16px; transition: all 0.2s ease;
}
.fisio-spot-btn:hover { background: var(--teal); border-color: var(--teal); }
.fisio-spot-hint { margin-top: 12px; color: #fff; font-size: 13px; text-shadow: 0 1px 4px rgba(0,0,0,0.5); pointer-events: auto; }
@media (max-width: 768px) {
  .fisio-spot-overlay { opacity: 1; background: rgba(0,0,0,0.1); }
  .fisio-spot-btn { padding: 10px 20px; font-size: 14px; }
}

/* SPOT DESC CSS */
.fisio-case-grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; } 
@media(max-width:768px){.fisio-case-grid-2-col{grid-template-columns:1fr;}}

/* CURSOR CSS */
@media (hover: hover) and (pointer: fine) {
  body { cursor: none; }
  a, button, video { cursor: none !important; }
  .fisio-cursor {
    position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
    transform: translate(-50%, -50%); transition: transform 0.1s ease-out;
  }
  .fisio-cursor-circle {
    width: 32px; height: 32px; border: 2px solid var(--teal); border-radius: 50%;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
  }
  .fisio-cursor-dot {
    width: 6px; height: 12px; background: var(--petrolio); border-radius: 3px;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    transition: all 0.2s;
  }
  .fisio-cursor.hovering .fisio-cursor-circle {
    width: 48px; height: 48px; background: rgba(110, 211, 198, 0.1);
  }
  .fisio-cursor.hidden { opacity: 0; }
}
</style>
`;
  html = html.replace('</style>', '</style>\n' + css);

  // JS for Spot and Cursor
  const js = `
<div id="fisioCursor" class="fisio-cursor">
  <div class="fisio-cursor-circle"></div>
  <div class="fisio-cursor-dot"></div>
</div>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("fisioSpotVideo");
  const btn = document.getElementById("fisioSpotBtn");
  if(video && btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      if(video.muted) {
        video.muted = false;
        btn.textContent = "Disattiva audio";
      } else {
        video.muted = true;
        btn.textContent = "Attiva audio";
      }
    });
    video.play().catch(function(err) { console.log("Autoplay prevented:", err); });
  }

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursor = document.getElementById("fisioCursor");
    if(cursor) {
      document.addEventListener("mousemove", e => {
        cursor.classList.remove("hidden");
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });
      document.addEventListener("mouseleave", () => {
        cursor.classList.add("hidden");
      });
      const interactives = document.querySelectorAll("a, button, video, .fisio-spot-btn, .scroll-top-button, .back-to-cases-button");
      interactives.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
      });
    }
  }
});
</script>
`;
  html = html.replace('</body>', js + '\n</body>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log("All changes successfully applied to _CORRETTO file.");
} catch(e) {
  console.error("Error applying changes:", e);
}
