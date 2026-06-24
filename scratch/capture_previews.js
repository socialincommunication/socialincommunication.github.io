const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching headless browser via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const ids = [
    'slide-01', 'slide-02', 'slide-03', 'slide-04', 'slide-05', 'slide-06', 'slide-07',
    'slide-08', 'slide-09', 'slide-10', 'slide-11', 'slide-12', 'slide-13', 'slide-14',
    'slide-15', 'slide-16', 'slide-17', 'slide-18', 'slide-19'
  ];

  const htmlPath = 'file://' + path.resolve(__dirname, '../PRESENTAZIONE_ESTETOLOGIA_HTML_REVISIONE_FINALE_V3/index.html');
  console.log('Target HTML presentation path:', htmlPath);

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const url = htmlPath + '#' + id;
    console.log(`Capturing slide ${i + 1} of ${ids.length} (${id})...`);
    await page.goto(url, { waitUntil: 'load' });
    
    // Brief delay to let the transition finish rendering
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const screenshotPath = path.resolve(__dirname, `../PRESENTAZIONE_ESTETOLOGIA_HTML_REVISIONE_FINALE_V3/previews/${id}.png`);
    await page.screenshot({ path: screenshotPath });
  }

  await browser.close();
  console.log('Successfully captured screenshots for all 19 slides!');
})();
