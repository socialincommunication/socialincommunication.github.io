const fs = require('fs');
const filePath = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo_CORRETTO.html';

try {
  let html = fs.readFileSync(filePath, 'utf8');

  // remove the exact block of css that was injected twice.
  // We can just find the second occurrence and remove it, or just deduplicate it.
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
  html = html.replace(cssAdditions, '');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log("Deduplicated.");
} catch(e) {
  console.error("Error:", e);
}
