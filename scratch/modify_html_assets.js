const fs = require('fs');

const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove IMG_DATA block
  html = html.replace(/var IMG_DATA = \{[\s\S]*?\};\s*/, '');

  // 2. Remove the querySelector loop that injects IMG_DATA into elements
  html = html.replace(/document\.querySelectorAll\('\[data-img\]'\).*?;\s*/, '');

  // 3. Update FEED_DATA dynamic grid logic
  html = html.replace(/IMG_DATA\[it\.img\]/g, "(it.img === 'logo' ? 'assets/logo.png' : 'assets/' + it.img + '.jpg')");

  // 4. Update all img tags to use assets directly
  // We match <img ... data-img="X" ... > and potentially src="data:..." 
  // It's safest to parse the tag, remove the src if it exists, and append the correct src.
  html = html.replace(/<img([^>]*)data-img="([^"]+)"([^>]*)>/gi, (match, p1, p2, p3) => {
    const ext = p2 === 'logo' ? 'png' : 'jpg';
    const newSrc = `src="assets/${p2}.${ext}"`;
    // remove existing src attribute if present in p1 or p3
    const cleanP1 = p1.replace(/\bsrc\s*=\s*"[^"]*"/gi, '').replace(/\bsrc\s*=\s*'[^']*'/gi, '');
    const cleanP3 = p3.replace(/\bsrc\s*=\s*"[^"]*"/gi, '').replace(/\bsrc\s*=\s*'[^']*'/gi, '');
    return `<img${cleanP1}data-img="${p2}" ${newSrc}${cleanP3}>`;
  });

  // 5. Update the Spot section
  const spotRegex = /<div class="spot-container"[\s\S]*?<\/div>/;
  const newSpot = `<div class="spot-container" style="padding: 0; overflow: hidden; border: none; background: transparent; aspect-ratio: 16/9; border-radius: 24px; margin-top: 24px;">
        <video width="100%" height="auto" controls poster="assets/cover-spot-fisiointegra.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          <source src="assets/spot-fisiointegra.mp4" type="video/mp4">
          Il tuo browser non supporta il tag video.
        </video>
      </div>`;
  html = html.replace(spotRegex, newSpot);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('File successfully updated with assets paths and video tag.');

} catch (err) {
  console.error('Error: ', err);
}
