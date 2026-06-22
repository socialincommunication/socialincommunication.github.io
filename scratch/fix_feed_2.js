const fs = require('fs');
const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo_CORRETTO.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Feed section tag removal
  html = html.replace(/<\/div>\s*<\/div>\s*<div class="ig-bio">/, '</div>\n          <div class="ig-bio">');

  // 2. Architettura feed highlights replacement
  html = html.replace(/<div class="fisio-add-highlights-grid"[\s\S]*?(?=<div class="fisio-add-mockup-grid">)/, 
`<div class="fisio-ig-highlights">
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/metodo-fisiointegra.jpg" alt="Metodo"></div>
                <span class="fisio-ig-highlight-label">Metodo</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/problema-movimento.jpg" alt="Movimento"></div>
                <span class="fisio-ig-highlight-label">Movimento</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/problema-prevenzione.jpg" alt="Prevenzione"></div>
                <span class="fisio-ig-highlight-label">Prevenzione</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/problema-postura.jpg" alt="Falsi miti"></div>
                <span class="fisio-ig-highlight-label">Falsi miti</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/_anteprima_carosello.png" alt="Percorsi"></div>
                <span class="fisio-ig-highlight-label">Percorsi</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/Post “Tornare allo sport”.png" alt="Sport"></div>
                <span class="fisio-ig-highlight-label">Sport</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/02_ascolto.png" alt="FAQ"></div>
                <span class="fisio-ig-highlight-label">FAQ</span>
              </div>
              <div class="fisio-ig-highlight">
                <div class="fisio-ig-highlight-circle"><img src="assets/05_cta.png" alt="Contatti"></div>
                <span class="fisio-ig-highlight-label">Contatti</span>
              </div>
            </div>\n\n            `);


  // 3. Templates group processing
  const tplGridStartStr = '<section class="sec" id="template">';
  const tplGridEndStr = '<section class="sec" id="stories">';
  
  let secTemplate = html.substring(html.indexOf(tplGridStartStr), html.indexOf(tplGridEndStr));
  
  // Extract all cards
  let c01 = secTemplate.match(/<!-- 01 REEL COVER -->[\s\S]*?(?=<!-- 02 CAROSELLO -->)/);
  let c02 = secTemplate.match(/<!-- 02 CAROSELLO -->[\s\S]*?(?=<!-- 03 INFOGRAFICA -->)/);
  let c03 = secTemplate.match(/<!-- 03 INFOGRAFICA -->[\s\S]*?(?=<!-- 04 EDUCATIVO -->)/);
  let c04 = secTemplate.match(/<!-- 04 EDUCATIVO -->[\s\S]*?(?=<!-- 05 REEL PAUSA ATTIVA -->)/);
  let c05 = secTemplate.match(/<!-- 05 REEL PAUSA ATTIVA -->[\s\S]*?(?=<!-- 06 FALSO MITO -->)/);
  let c06 = secTemplate.match(/<!-- 06 FALSO MITO -->[\s\S]*?(?=<!-- 07 SPORT -->)/);
  let c07 = secTemplate.match(/<!-- 07 SPORT -->[\s\S]*?(?=<!-- 08 STORY QUIZ -->)/);
  let c08 = secTemplate.match(/<!-- 08 STORY QUIZ -->[\s\S]*?(?=<!-- 09 CTA -->)/);
  let c09 = secTemplate.match(/<!-- 09 CTA -->[\s\S]*?(?=\s*<\/div>\s*<\/section>)/);

  if(c01 && c02 && c03 && c04 && c05 && c06 && c07 && c08 && c09) {
    const group1 = [c02[0], c03[0], c04[0], c06[0], c07[0], c09[0]].join('');
    const group2 = [c01[0], c05[0], c08[0]].join('');

    const newTemplateContent = `
<div class="fisio-template-group">
  <div class="fisio-template-group-head">
    <h3>Template Feed 4:5</h3>
    <p>Post, carousel, contenuti educativi, falso mito, sport e call to action.</p>
  </div>
  <div class="tpl-grid fisio-tpl-grid-feed">
${group1}
  </div>
</div>

<div class="fisio-template-group">
  <div class="fisio-template-group-head">
    <h3>Template verticali 9:16</h3>
    <p>Reel cover e Stories progettati per formati verticali.</p>
  </div>
  <div class="fisio-tpl-grid-vertical">
${group2}
  </div>
</div>
`;
    let oldTplGridMatch = secTemplate.match(/<div class="tpl-grid">[\s\S]*?<\/div>\s*<\/section>/);
    if(oldTplGridMatch) {
      let replacement = newTemplateContent + '\n    </section>';
      let updatedSecTemplate = secTemplate.replace(oldTplGridMatch[0], replacement);
      html = html.replace(secTemplate, updatedSecTemplate);
    }
  } else {
    console.log("Could not find all 9 cards.");
  }

  // 4. CSS Additions
  const cssAdditions = `
<style>
/* CSS FOR FEED */
#feed .feed-wrap {
  display: grid;
  grid-template-columns: minmax(300px, 340px) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

#feed .ig-phone {
  width: 100%;
  max-width: 340px;
}

#feed .feed-legend {
  width: 100%;
  max-width: 620px;
  padding-top: 2px;
}

@media (max-width: 980px) {
  #feed .feed-wrap {
    grid-template-columns: 1fr;
  }

  #feed .ig-phone {
    max-width: 360px;
  }

  #feed .feed-legend {
    max-width: none;
  }
}

/* CSS FOR HIGHLIGHTS */
.fisio-ig-highlights {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px 6px;
  margin: 18px 0 22px;
}

.fisio-ig-highlight {
  min-width: 0;
  text-align: center;
}

.fisio-ig-highlight-circle {
  width: 40px;
  height: 40px;
  margin: 0 auto 4px;
  padding: 3px;
  border: 1.5px solid var(--teal);
  border-radius: 50%;
  background: var(--crema);
  overflow: hidden;
}

.fisio-ig-highlight-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.fisio-ig-highlight-label {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 7px;
  line-height: 1.15;
  font-weight: 700;
  color: var(--petrolio);
}

/* CSS FOR TEMPLATES */
.fisio-template-group {
  margin-top: 34px;
}

.fisio-template-group-head {
  margin-bottom: 20px;
}

.fisio-template-group-head h3 {
  font-family: var(--display);
  color: var(--petrolio);
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 6px;
}

.fisio-template-group-head p {
  color: #5a767c;
  font-size: 14px;
  margin: 0;
}

#template .fisio-tpl-grid-feed {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

#template .fisio-tpl-grid-vertical {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 260px));
  gap: 26px;
  justify-content: start;
  align-items: start;
}

#template .fisio-tpl-grid-feed .tpl-card,
#template .fisio-tpl-grid-vertical .tpl-card {
  min-width: 0;
}

@media (max-width: 980px) {
  #template .fisio-tpl-grid-feed {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #template .fisio-tpl-grid-vertical {
    grid-template-columns: repeat(2, minmax(0, 260px));
  }
}

@media (max-width: 620px) {
  #template .fisio-tpl-grid-feed,
  #template .fisio-tpl-grid-vertical {
    grid-template-columns: minmax(0, 320px);
    justify-content: center;
  }
}

/* CSS FOR STORIES */
#stories .stories {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}

#stories .tpl-card {
  width: 100%;
  max-width: 250px;
  justify-self: center;
}

@media (max-width: 980px) {
  #stories .stories {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #stories .tpl-card {
    max-width: 280px;
  }
}

@media (max-width: 620px) {
  #stories .stories {
    grid-template-columns: 1fr;
  }

  #stories .tpl-card {
    max-width: 320px;
  }
}
</style>
`;
  html = html.replace('</style>', '</style>\n' + cssAdditions);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log("Done");
} catch(e) {
  console.error("Error:", e);
}
