const fs = require('fs');
const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo_CORRETTO.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // Task 1: Extract `spot-desc` and `spot-storytelling` and move them before `architettura-feed`
  const spotDescStart = html.indexOf('<section class="sec" id="spot-desc">');
  const spotStorytellingEnd = html.indexOf('</div>\n\n            <div class="ig-stats">');
  
  if (spotDescStart !== -1 && spotStorytellingEnd !== -1) {
    // We need to extract everything from `<section class="sec" id="spot-desc">` to the closing `</div>` of `spot-storytelling`
    // Actually the closing tag for `spot-storytelling` is right before `<div class="ig-stats">`
    const extractedBlock = html.substring(spotDescStart, spotStorytellingEnd + 6); // +6 for </div>
    
    // Remove it from current location
    html = html.replace(extractedBlock, '');
    
    // Insert it right before `<section class="sec" id="architettura-feed">`
    const insertTarget = '<section class="sec" id="architettura-feed">';
    html = html.replace(insertTarget, extractedBlock + '\n\n  ' + insertTarget);
  }

  // Task 3: Replace `ig-stats` contents with the PROTOTIPO VISIVO badge
  const igStatsRegex = /<div class="ig-stats">[\s\S]*?<\/div>\s*<\/div>/;
  const newIgStats = `<div class="ig-stats" style="display:flex; align-items:center; justify-content:flex-end;">
              <div class="fisio-add-badge-prototipo" style="background:var(--petrolio); color:#fff; font-size:10px; font-weight:800; letter-spacing:1px; padding:4px 8px; border-radius:4px;">PROTOTIPO VISIVO</div>
            </div>
          </div>`;
  html = html.replace(igStatsRegex, newIgStats);

  // Task 2: Remove Base64 residual from #igGrid script
  html = html.replace(/if\s*\(IMG_DATA\[k\]\)\s*el\.src\s*=\s*IMG_DATA\[k\];\s*}\);/g, '');
  // Clean up var M if it has any Base64 strings? The user said "NON modificare la logica funzionante che genera #igGrid. Il feed 3x3 deve continuare a usare esclusivamente i percorsi già esistenti: assets/...". We already changed it to use relative assets, so just removing that `if (IMG_DATA[k]) ...` is correct.
  html = html.replace(/if\s*\(typeof IMG_DATA\s*!==\s*'undefined'\s*&&\s*IMG_DATA\[k\]\)\s*el\.src\s*=\s*IMG_DATA\[k\];/g, '');
  html = html.replace(/if\s*\(IMG_DATA\[k\]\)\s*el\.src\s*=\s*IMG_DATA\[k\];/g, '');

  // Task 5: Cursor O + I
  // Update HTML
  const oldCursorHtmlRegex = /<div id="fisioCursor" class="fisio-cursor">[\s\S]*?<\/div>\s*<script>/;
  const newCursorHtml = `<div id="fisioCursor" class="fisio-cursor">
  <div class="fisio-cursor-circle"></div>
  <div class="fisio-cursor-head"></div>
  <div class="fisio-cursor-body"></div>
  <div class="fisio-cursor-base"></div>
</div>
<script>`;
  html = html.replace(oldCursorHtmlRegex, newCursorHtml);

  // Update CSS
  const oldCursorCssRegex = /\.fisio-cursor-circle \{[\s\S]*?\}\s*\.fisio-cursor-dot \{[\s\S]*?\}/;
  const newCursorCss = `.fisio-cursor-circle {
    width: 32px; height: 32px; border: 1.5px solid var(--teal); border-radius: 50%;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s, border-color 0.2s;
  }
  .fisio-cursor-head {
    width: 5px; height: 5px; background: var(--petrolio); border-radius: 50%;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -10px);
    transition: all 0.2s;
  }
  .fisio-cursor-body {
    width: 1.5px; height: 10px; background: var(--petrolio); border-radius: 1px;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, 0px);
    transition: all 0.2s;
  }
  .fisio-cursor-base {
    width: 8px; height: 1.5px; background: var(--petrolio); border-radius: 1px;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, 6px);
    transition: all 0.2s;
  }`;
  html = html.replace(oldCursorCssRegex, newCursorCss);

  // Save changes
  fs.writeFileSync(filePath, html, 'utf8');
  console.log("Corrections applied successfully!");
} catch(e) {
  console.error("Error:", e);
}
