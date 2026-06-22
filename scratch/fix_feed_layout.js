const fs = require('fs');
const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo_CORRETTO.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // We need to find:
  //             <div class="ig-stats" style="display:flex; align-items:center; justify-content:flex-end;">
  //               <div class="fisio-add-badge-prototipo" style="background:var(--petrolio); color:#fff; font-size:10px; font-weight:800; letter-spacing:1px; padding:4px 8px; border-radius:4px;">PROTOTIPO VISIVO</div>
  //             </div>
  //           <div class="ig-bio">
  //
  // And replace with:
  //             <div class="ig-stats" style="display:flex; align-items:center; justify-content:flex-end;">
  //               <div class="fisio-add-badge-prototipo" style="background:var(--petrolio); color:#fff; font-size:10px; font-weight:800; letter-spacing:1px; padding:4px 8px; border-radius:4px;">PROTOTIPO VISIVO</div>
  //             </div>
  //           </div> <!-- chiusura .ig-head -->
  //           <div class="ig-bio">
  
  html = html.replace(/<\/div>\s*<div class="ig-bio">/, '</div>\n          </div>\n          <div class="ig-bio">');
  
  // Add CSS
  const cssAdditions = `
<style>
/* FIX LAYOUT FEED PREVIEW: MOCKUP A SINISTRA, LEGENDA A DESTRA */

#feed .feed-wrap {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: clamp(42px, 5vw, 76px);
  align-items: start;
}

#feed .ig-phone {
  display: block;
  width: 340px;
  max-width: 100%;
  margin: 0;
}

#feed .ig-head {
  display: flex;
  align-items: center;
  gap: 13px;
}

#feed .ig-bio {
  display: block;
  width: 100%;
}

#feed .ig-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  width: 100%;
}

#feed .feed-legend {
  display: block;
  width: 100%;
  max-width: 620px;
  min-width: 0;
  padding-top: 0;
}

#feed .feed-legend h4 {
  margin-top: 0;
}

@media (max-width: 980px) {
  #feed .feed-wrap {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  #feed .ig-phone {
    max-width: 360px;
  }

  #feed .feed-legend {
    max-width: none;
  }
}
</style>
`;
  html = html.replace('</style>', '</style>\n' + cssAdditions);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log("Fixed HTML and added CSS.");
} catch(e) {
  console.error("Error:", e);
}
