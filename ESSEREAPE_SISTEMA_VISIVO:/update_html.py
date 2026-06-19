import re

with open("essereape_sistema_visivo.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Contrast
content = content.replace("--testo-soft:#6b5d4c;", "--testo-soft:#4a3f31;")

# 2. Sostituisci i placeholder.
# In section 1 (Cover)
content = content.replace("[INSERIRE VASETTO HERO TRAMONTO]", "<img src=\"assets/1.EssereAPE_hero_vasetto_tramonto.jpg\" alt=\"Vasetto Hero\" style=\"width:100%; height:100%; object-fit:cover; border-radius:14px; position:absolute; inset:0; opacity:0.8\">")

# In section 2 (Brand Board)
content = content.replace("[INSERIRE LOGO ORIZZONTALE ESSEREAPE]", "<img src=\"assets/logo essere ape orizzontale.png\" alt=\"Logo Orizzontale\" style=\"width:100%; height:100%; object-fit:contain; position:absolute; inset:0; padding:24px;\">")
content = content.replace("[INSERIRE LOGO TONDO ESSEREAPE]", "</span><br><img src=\"assets/logo cerchio essere ape senza sfondo.png\" alt=\"Logo Tondo\" style=\"width:60px; height:60px; object-fit:contain; margin-top:10px;\"><span>")
content = content.replace("[INSERIRE PATTERN ALVEARE]", "<img src=\"assets/EssereAPE_pattern_alveare_premium.jpg\" alt=\"Pattern Alveare\" style=\"width:100%; height:100%; object-fit:cover; border-radius:14px; position:absolute; inset:0;\">")

# Stile Fotografico (Lists)
content = content.replace("[INSERIRE VASETTO ESSEREAPE]", "Vedi sopra")
content = content.replace("[INSERIRE NONNO]", "Vedi sopra")
content = content.replace("[INSERIRE BAMBINO]", "Vedi sopra")
content = content.replace("[INSERIRE API E FIORI]", "Vedi sopra")
content = content.replace("[INSERIRE TERRITORIO SALENTO]", "Vedi sopra")
content = content.replace("[INSERIRE TRACCIABILITÀ / MÈLIA]", "Vedi sopra")
content = content.replace("[INSERIRE TERRITORIO]", "Vedi sopra")
content = content.replace("[INSERIRE TRACCIABILITÀ]", "Vedi sopra")
content = content.replace("[INSERIRE VASETTO]", "Vedi sopra")
content = content.replace("[INSERIRE MÈLIA]", "Vedi sopra")
content = content.replace("[PATTERN ALVEARE]", "Vedi sopra")


# For the cards in Section 3 (Stile fotografico)
content = content.replace("<h3>1 · Vasetto premium</h3>", "<img src=\"assets/EssereAPE_vasetto_still_life_premium.jpg\" alt=\"Vasetto\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>1 · Vasetto premium</h3>")
content = content.replace("<h3>2 · Nonno custode</h3>", "<img src=\"assets/EssereAPE_nonno_apicoltore_custode.jpg\" alt=\"Nonno\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>2 · Nonno custode</h3>")
content = content.replace("<h3>3 · Bambino / futuro</h3>", "<img src=\"assets/EssereAPE_bambino_infanzia_attesa.jpg\" alt=\"Bambino\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>3 · Bambino / futuro</h3>")
content = content.replace("<h3>4 · Api e fioriture</h3>", "<img src=\"assets/1.EssereAPE_api_fiori_biodiversita.jpg\" alt=\"Api e fioriture\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>4 · Api e fioriture</h3>")
content = content.replace("<h3>5 · Territorio salentino</h3>", "<img src=\"assets/EssereAPE_apiario_etico_salento.jpg\" alt=\"Territorio\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>5 · Territorio salentino</h3>")
content = content.replace("<h3>6 · Tracciabilità / Mèlia</h3>", "<img src=\"assets/melia-ui-interface.jpg\" alt=\"Tracciabilità\" style=\"width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; margin-bottom:14px\"><h3>6 · Tracciabilità / Mèlia</h3>")

# Correzione Brand Board
brand_board_text_old = "La brand board è un <b>prototipo progettuale</b>: codifica un sistema coerente da validare con il referente del progetto. Codici colore e tipografia derivano dall'identità documentata di EssereAPE (etichetta nera, oro del wordmark, miele)."
brand_board_text_new = "La brand board illustra come l'<b>identità visiva esistente di EssereAPE</b> è stata studiata e integrata nel nuovo sistema, non creata ex novo. Codici colore e tipografia derivano dall'identità documentata di EssereAPE (etichetta nera, oro del wordmark, miele)."
content = content.replace(brand_board_text_old, brand_board_text_new)

# Rimuovere "Uso nel Project Work" e "Roberto" -> "Come leggere il sistema"
# Section 21 starts at: <!-- ===== 21. USO NEL PROJECT WORK ===== -->
sec21_regex = re.compile(r'<!-- ===== 21\. USO NEL PROJECT WORK ===== -->.*?</section>', re.DOTALL)
new_sec21 = '''<!-- ===== 21. COME LEGGERE IL SISTEMA ===== -->
<section class="sec" id="metodo">
  <div class="wrap">
    <div class="eyebrow"><span class="hexnum">21</span> Come leggere il sistema</div>
    <h2 class="h-sec">Guida alla <em>lettura</em></h2>
    <div class="grid g2" style="margin-top:30px">
      <div class="usebox rev"><h4>Coerenza visiva</h4><p>Il sistema visivo e i pillar dimostrano l'applicazione operativa della content strategy, integrando l'identità esistente in modo armonioso e senza deformazioni.</p></div>
      <div class="usebox rev"><h4>Flessibilità</h4><p>Feed preview, 9 template, carosello e stories planner documentano un laboratorio creativo-strategico progettato per adattarsi a vari formati.</p></div>
      <div class="usebox rev"><h4>Pronto all'uso</h4><p>Gli asset sono organizzati e pronti per essere utilizzati sui principali canali social, mantenendo sempre l'etica del brand.</p></div>
      <div class="usebox rev"><h4>Visione strategica</h4><p>Usa il claim, i 5 pillar e il workflow per raccontare il metodo; i KPI suggeriti sono orientati alla misurazione dell'efficacia futura.</p></div>
    </div>
    <div class="card rev" style="margin-top:22px;background:rgba(110,122,69,.06);border-color:rgba(110,122,69,.3)">
      <p style="font-family:'Jost';font-size:.9rem;color:var(--testo-soft);margin:0">Il <b>sistema visivo è un prototipo progettuale</b>, il <b>piano editoriale è una proposta operativa</b>, i <b>KPI sono criteri futuri di misurazione</b>. Le scelte grafiche e narrative valorizzano e rispettano l'ecosistema del brand.</p>
    </div>
  </div>
</section>'''

content = sec21_regex.sub(new_sec21, content)

# Aggiunta sezione "Spot pubblicitario" (Before section 4 -> 3.5)
spot_section = '''
<!-- ===== 3.5 SPOT PUBBLICITARIO ===== -->
<section class="sec sec--dark" id="spot">
  <div class="wrap">
    <div class="eyebrow"><span class="hexnum">03b</span> Spot pubblicitario</div>
    <h2 class="h-sec">Spot pubblicitario · <em>Il tempo delle api</em></h2>
    <p class="lead">Un breve viaggio emozionale che connette le generazioni e il territorio attraverso l'attesa e la cura. (Usa i controlli del video per riprodurlo).</p>
    <div style="margin-top:36px; border-radius:14px; overflow:hidden; border:1px solid var(--linea-scura); box-shadow:var(--ombra);">
      <video width="100%" controls poster="assets/Spot-Eseereape-Federica-Centonze-Copertina.jpg">
        <source src="assets/Essereape-il-tempo- Spot.mp4" type="video/mp4">
        Il tuo browser non supporta il tag video.
      </video>
    </div>
    <div class="grid g2" style="margin-top:22px">
        <div class="card rev">
            <img src="assets/01_nonno_bambino_spot_essereape.jpg" alt="Nonno e bambino" style="width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin-bottom:14px">
            <h3>Connessione tra generazioni</h3>
            <p style="font-family:'Jost';font-size:.86rem;color:rgba(247,241,230,.78)">La saggezza del nonno e la scoperta del bambino al centro del racconto.</p>
        </div>
        <div class="card rev">
            <img src="assets/storyboard-spot-essereape.jpg" alt="Storyboard" style="width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin-bottom:14px">
            <h3>Storyboard emozionale</h3>
            <p style="font-family:'Jost';font-size:.86rem;color:rgba(247,241,230,.78)">I ritmi della natura guidano le inquadrature, dando spazio all'essenza del territorio salentino.</p>
        </div>
    </div>
  </div>
</section>
'''
content = content.replace('<!-- ===== 4. PROFILO INSTAGRAM ===== -->', spot_section + '\n<!-- ===== 4. PROFILO INSTAGRAM ===== -->')

# Rimuovere ogni possibile menzione di "Roberto"
content = re.sub(r'(?i)roberto', 'il referente', content)

with open("essereape_sistema_visivo_updated.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Modifiche completate. Scritto su essereape_sistema_visivo_updated.html")
