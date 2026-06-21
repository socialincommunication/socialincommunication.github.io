const fs = require('fs');

const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  const assetMap = {
    'logo': 'logo-fisiointegra.png',
    'giovanni': 'giovanni-cavone-fisiointegra.png',
    'metodo': 'metodo-fisiointegra.jpg',
    'movimento': 'problema-movimento.jpg',
    'dolore': 'Copertina Reel “Il dolore è un segnale”.png',
    'carosello': '_anteprima_carosello.png',
    'sedentaria': 'Post educativo “Cinque errori della giornata sedentaria”.png',
    'postura': 'problema-postura.jpg',
    'sport': 'Post “Tornare allo sport”.png',
    'cta': '05_cta.png',
    'ascolto': '02_ascolto.png',
    'osservazione': '03_osservazione.png',
    'prevenzione': 'problema-prevenzione.jpg'
  };

  // 1. Update <img data-img="..."> tags
  html = html.replace(/<img([^>]*)data-img="([^"]+)"([^>]*)>/gi, (match, p1, p2, p3) => {
    if (assetMap[p2]) {
      const newSrc = `src="assets/${assetMap[p2]}"`;
      const cleanP1 = p1.replace(/\bsrc\s*=\s*"[^"]*"/gi, '').replace(/\bsrc\s*=\s*'[^']*'/gi, '');
      const cleanP3 = p3.replace(/\bsrc\s*=\s*"[^"]*"/gi, '').replace(/\bsrc\s*=\s*'[^']*'/gi, '');
      return `<img${cleanP1}data-img="${p2}" ${newSrc}${cleanP3}>`;
    }
    return match;
  });

  // 2. Update Spot video source
  html = html.replace(/src="assets\/spot-fisiointegra\.mp4"/, 'src="assets/hero-fisiointegra.mp4"');

  // 3. Remove Spot video poster
  html = html.replace(/\bposter="assets\/cover-spot-fisiointegra\.jpg"\s*/, '');

  // 4. Update the FEED_DATA javascript injection
  // The current JS: im.src = (it.img === 'logo' ? 'assets/logo.png' : 'assets/' + it.img + '.jpg');
  // We'll replace it with a lookup.
  const jsMapStr = JSON.stringify(assetMap);
  const oldJs = /im\.src = \(it\.img === 'logo' \? 'assets\/logo\.png' : 'assets\/' \+ it\.img \+ '\.jpg'\);/;
  const newJs = `var M=${jsMapStr}; im.src = 'assets/' + M[it.img];`;
  html = html.replace(oldJs, newJs);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('File successfully updated with exact asset mapping.');

} catch (err) {
  console.error('Error: ', err);
}
