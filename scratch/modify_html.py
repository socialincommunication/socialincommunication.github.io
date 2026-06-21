import sys

def main():
    file_path = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/index.html'
    output_path = '/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/fisiointegra-sistema-visivo/fisiointegra-sistema-visivo-completo.html'

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # 1. Insert CSS
    css_to_insert = """
    /* ---------- STICKY MENU ---------- */
    .sticky-menu {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(247, 245, 239, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid #dfe7e5;
      padding: 12px 22px;
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .sticky-menu a {
      text-decoration: none;
      font-family: var(--display);
      font-weight: 700;
      font-size: 13.5px;
      color: var(--petrolio);
      padding: 6px 12px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .sticky-menu a:hover {
      background: rgba(20, 124, 124, 0.1);
      color: var(--teal);
    }
    @media (max-width: 768px) {
      .sticky-menu {
        gap: 8px;
        padding: 10px;
        justify-content: flex-start;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
    }
    /* ---------- NUOVE SEZIONI ---------- */
    .spot-container {
      background: var(--crema);
      border: 1px dashed #c8d6d2;
      border-radius: 24px;
      aspect-ratio: 16/9;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      padding: 20px;
      margin-top: 24px;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 24px;
    }
    .dash-card {
      background: #fff;
      border: 1px solid #e2eae8;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
    }
    .dash-num {
      font-family: var(--display);
      font-weight: 800;
      font-size: 42px;
      color: var(--petrolio);
      line-height: 1;
      margin-bottom: 8px;
    }
    .dash-label {
      font-size: 13px;
      color: #3d5a60;
      font-weight: 600;
    }
    .prompt-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      margin-top: 24px;
    }
    .prompt-card {
      background: #fff;
      border: 1px solid #e2eae8;
      border-radius: 16px;
      padding: 20px;
    }
    .prompt-card .pt {
      font-family: var(--display);
      font-weight: 800;
      font-size: 14px;
      color: var(--teal);
      margin-bottom: 12px;
    }
    .prompt-card ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
    }
    .prompt-card li {
      font-size: 13px;
      color: #3d5a60;
      padding-left: 16px;
      position: relative;
    }
    .prompt-card li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--verde);
    }
    .metodo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-top: 24px;
    }
    .metodo-card {
      background: #fff;
      border: 1px solid #e2eae8;
      border-radius: 16px;
      padding: 24px;
    }
    .metodo-card .mc-num {
      font-family: var(--display);
      font-weight: 800;
      font-size: 13px;
      color: #fff;
      background: var(--teal);
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .metodo-card h3 {
      font-family: var(--display);
      font-weight: 700;
      font-size: 16px;
      color: var(--petrolio);
      margin-bottom: 8px;
    }
    .metodo-card p {
      font-size: 14px;
      color: #3d5a60;
      margin: 0;
    }
    @media (max-width: 768px) {
      .dashboard-grid, .prompt-grid, .metodo-grid {
        grid-template-columns: 1fr;
      }
    }
"""
    if '/* ---------- STICKY MENU ---------- */' not in html:
        html = html.replace('  </style>', css_to_insert + '  </style>')

    # 2. Insert Sticky Menu
    sticky_menu_html = """
  <!-- ============ STICKY MENU ============ -->
  <nav class="sticky-menu">
    <a href="#identita">Identità</a>
    <a href="#spot">Spot</a>
    <a href="#feed">Feed</a>
    <a href="#template">Template</a>
    <a href="#carosello">Carosello</a>
    <a href="#calendario">Calendario</a>
    <a href="#dashboard">Dashboard</a>
    <a href="#prompt-ai">Prompt AI</a>
    <a href="#metodo">Metodo</a>
  </nav>
"""
    if 'class="sticky-menu"' not in html:
        html = html.replace('<body>', '<body>' + sticky_menu_html)

    # 3. Replace Hero Chips
    html = html.replace('<span class="chip"><b>01</b> Brand board</span>', '<a href="#identita" class="chip" style="text-decoration:none;"><b>01</b> Brand board</a>')
    html = html.replace('<span class="chip"><b>02</b> Feed preview 3×3</span>', '<a href="#feed" class="chip" style="text-decoration:none;"><b>02</b> Feed preview 3×3</a>')
    html = html.replace('<span class="chip"><b>03</b> 9 template Instagram</span>', '<a href="#template" class="chip" style="text-decoration:none;"><b>03</b> 9 template Instagram</a>')
    html = html.replace('<span class="chip"><b>04</b> Carosello 6 slide</span>', '<a href="#carosello" class="chip" style="text-decoration:none;"><b>04</b> Carosello 6 slide</a>')
    html = html.replace('<span class="chip"><b>05</b> Stories 4 slide</span>', '<a href="#stories" class="chip" style="text-decoration:none;"><b>05</b> Stories 4 slide</a>')
    html = html.replace('<span class="chip"><b>06</b> Content planner</span>', '<a href="#calendario" class="chip" style="text-decoration:none;"><b>06</b> Content planner</a>')

    # 4. Change IDs
    html = html.replace('<section class="sec" id="board">', '<section class="sec" id="identita">')
    html = html.replace('<section class="sec" id="templates">', '<section class="sec" id="template">')
    html = html.replace('<section class="sec" id="planner">', '<section class="sec" id="calendario">')

    # 5. Insert Spot Section
    spot_html = """
    <!-- ============ SPOT FISIOINTEGRA ============ -->
    <section class="sec" id="spot">
      <div class="sec-head">
        <span class="sec-kicker">Spot</span>
      </div>
      <div class="sec-head" style="margin-top:-14px">
        <h2 class="sec-title">Spot di presentazione FisioIntegra</h2>
        <p class="sec-desc">Un contenuto video pensato per raccontare movimento, ascolto, prevenzione e fiducia attraverso un tono professionale, umano e rassicurante.</p>
      </div>
      <div class="spot-container">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"/>
          <rect x="3" y="6" width="12" height="12" rx="2" ry="2"/>
        </svg>
        <span style="font-family:var(--display); font-weight:700; color:var(--petrolio); font-size:16px;">Spot FisioIntegra · asset video in integrazione</span>
      </div>
      <div class="method-note" style="margin-top:24px;">
        <p>Lo spot è un contenuto progettuale sviluppato da Socialin Communication / Federica Creative come proposta narrativa per il caso FisioIntegra.</p>
      </div>
    </section>

"""
    if 'id="spot"' not in html:
        html = html.replace('<!-- ============ 2. FEED PREVIEW ============ -->', spot_html + '    <!-- ============ 2. FEED PREVIEW ============ -->')

    # 6. Insert Dashboard, Prompt AI, Metodo
    # Common prompt list elements
    prompt_common = "<li>Mantenere palette FisioIntegra</li><li>Evitare stile ospedaliero</li><li>Evitare dolore estremo e scene drammatiche</li><li>Luce naturale, persone rilassate</li><li>Lasciare spazio negativo per i testi</li><li>No testo generato o watermark</li>"

    extra_sections_html = f"""
    <!-- ============ DASHBOARD ============ -->
    <section class="sec" id="dashboard">
      <div class="sec-head">
        <span class="sec-kicker">Dashboard</span>
      </div>
      <div class="sec-head" style="margin-top:-14px">
        <h2 class="sec-title">Dashboard del piano editoriale</h2>
        <p class="sec-desc">Una lettura sintetica del sistema progettuale: formati, contenuti e touchpoint previsti.</p>
      </div>
      <div class="dashboard-grid">
        <div class="dash-card">
          <div class="dash-num">9</div>
          <div class="dash-label">Template social</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">6</div>
          <div class="dash-label">Slide carosello</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">4</div>
          <div class="dash-label">Stories collegate</div>
        </div>
        <div class="dash-card">
          <div class="dash-num">7</div>
          <div class="dash-label">Contenuti nella settimana esempio</div>
        </div>
      </div>
      <div class="method-note" style="margin-top:24px;">
        <p>Dashboard dimostrativa. I numeri descrivono l’organizzazione del sistema editoriale proposto e non rappresentano risultati, pubblicazioni effettive o performance misurate.</p>
      </div>
    </section>

    <!-- ============ PROMPT AI ============ -->
    <section class="sec" id="prompt-ai">
      <div class="sec-head">
        <span class="sec-kicker">Prompt AI</span>
      </div>
      <div class="sec-head" style="margin-top:-14px">
        <h2 class="sec-title">Prompt AI per i visual FisioIntegra</h2>
        <p class="sec-desc">Prompt progettuali per generare o adattare visual coerenti con il sistema grafico, mantenendo una comunicazione professionale, rassicurante e non sensazionalistica.</p>
      </div>
      <div class="prompt-grid">
        <div class="prompt-card">
          <div class="pt">01 · Il dolore è un segnale</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">02 · Prima valutazione</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">03 · Le fasi del percorso</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">04 · Giornata sedentaria</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">05 · Pausa attiva</div>
          <ul>
            <li>Formato 9:16</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">06 · Falso mito sulla postura</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">07 · Tornare allo sport</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">08 · Quiz postura perfetta</div>
          <ul>
            <li>Formato 9:16</li>
            {prompt_common}
          </ul>
        </div>
        <div class="prompt-card">
          <div class="pt">09 · CTA colloquio informativo</div>
          <ul>
            <li>Formato 4:5</li>
            {prompt_common}
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ METODO ============ -->
    <section class="sec" id="metodo">
      <div class="sec-head">
        <span class="sec-kicker">Metodo</span>
      </div>
      <div class="sec-head" style="margin-top:-14px">
        <h2 class="sec-title">Come leggere il sistema</h2>
      </div>
      <div class="metodo-grid">
        <div class="metodo-card">
          <div class="mc-num">1</div>
          <h3>Coerenza visiva</h3>
          <p>Logo, palette, curva del movimento, tipografia e fotografia costruiscono un linguaggio riconoscibile.</p>
        </div>
        <div class="metodo-card">
          <div class="mc-num">2</div>
          <h3>Flessibilità dei formati</h3>
          <p>I contenuti sono progettati per adattarsi a feed 4:5, Reel cover e Stories 9:16.</p>
        </div>
        <div class="metodo-card">
          <div class="mc-num">3</div>
          <h3>Comunicazione responsabile</h3>
          <p>Il sistema evita diagnosi, promesse di guarigione, toni drammatici e claim medici assoluti.</p>
        </div>
        <div class="metodo-card">
          <div class="mc-num">4</div>
          <h3>Misurazione futura</h3>
          <p>KPI, stati del planner e metriche sono criteri progettuali da validare in una futura fase operativa.</p>
        </div>
      </div>
      <div class="method-note" style="margin-top:24px;">
        <p>Il sistema visivo è un prototipo progettuale; il piano editoriale è una proposta operativa; numeri, KPI, stati del planner e metriche sono scenari dimostrativi e non dati reali di campagne già pubblicate.</p>
      </div>
    </section>
"""
    if 'id="dashboard"' not in html:
        html = html.replace('<section class="back-to-cases-section"', extra_sections_html + '\n    <section class="back-to-cases-section"')

    # 7. Final Note Before Footer
    final_note_html = """
    <!-- ============ NOTA FINALE ============ -->
    <div style="max-width:1180px; margin: 40px auto 20px; padding: 0 22px; font-size:13px; color:#5a767c; text-align:center; line-height:1.5;">
      Caso studio FisioIntegra · Sistema visivo, content strategy e piano editoriale sviluppati da Socialin Communication / Federica Creative. Il progetto integra materiali visuali, planner, template e touchpoint digitali come proposta operativa di sviluppo futuro. I contenuti non costituiscono diagnosi, indicazioni sanitarie personalizzate o risultati clinici.
    </div>
"""
    if 'NOTA FINALE' not in html:
        html = html.replace('<!-- ============ CREDITS ============ -->', final_note_html + '\n    <!-- ============ CREDITS ============ -->')

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"File saved to {output_path}")

if __name__ == "__main__":
    main()
