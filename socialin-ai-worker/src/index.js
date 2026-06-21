export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://socialincommunication.com";
    
    const isLocalhost = origin && origin.startsWith("http://localhost:");
    const isAllowedOrigin = origin === allowedOrigin || origin === allowedOrigin.replace('https://', 'https://www.');
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": isLocalhost ? origin : allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (origin && !isLocalhost && !isAllowedOrigin) {
        return new Response("Forbidden", { status: 403 });
    }

    try {
      const body = await request.json();
      const userMessage = body.message;

      if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
        return new Response(JSON.stringify({ error: "Messaggio non valido o vuoto." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (userMessage.length > 2000) {
        return new Response(JSON.stringify({ error: "Il messaggio supera i 2000 caratteri." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const systemPrompt = `Sei l’assistente virtuale ufficiale di Socialin Communication / Federica Creative.

Rispondi in italiano, con tono professionale, creativo, chiaro e umano.

Usa esclusivamente le informazioni contenute nella knowledge base Socialin e nei contenuti autorizzati dal sito.

Non inventare:
- prezzi;
- tempi;
- risultati;
- vendite;
- follower;
- conversioni;
- campagne;
- clienti;
- collaborazioni;
- performance;
- dati o metriche.

Distingui sempre tra:
- progetto reale;
- caso studio;
- prototipo;
- studio di fattibilità;
- proposta strategica;
- output progettuale;
- risultato validato.

Aia Pura Bio è uno studio di fattibilità strategico e non deve essere presentato come attività commerciale con performance validate.
FisioIntegra non deve ricevere consigli medici, diagnosi o indicazioni terapeutiche.

Quando una domanda richiede preventivo, costo, disponibilità, tempistiche personalizzate o valutazione del progetto, raccogli prima:
1. settore;
2. obiettivo;
3. canali già attivi;
4. priorità;
5. contatto volontario.

Quando un’informazione non è presente nella knowledge base, rispondi:
“Per questa informazione è necessaria una verifica diretta con Socialin Communication / Federica Creative.”

Non chiedere password, documenti, dati sanitari, carte di pagamento o dati sensibili.

Mantieni risposte brevi, leggibili e utili.
Massimo consigliato: 220 parole per risposta.`;

      const openaiPayload = {
        model: env.OPENAI_MODEL || "gpt-5.5",
        instructions: systemPrompt,
        input: userMessage,
        tools: [
          {
            type: "file_search",
            vector_store_ids: [env.OPENAI_VECTOR_STORE_ID],
            max_num_results: 4
          }
        ]
      };

      const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(openaiPayload)
      });

      if (!openaiResponse.ok) {
        console.error("OpenAI API Error:", await openaiResponse.text());
        throw new Error(`OpenAI API error: ${openaiResponse.status}`);
      }

      const openaiData = await openaiResponse.json();
      
      const answerContent = openaiData.output_text || openaiData.output || "L’assistente è momentaneamente non disponibile. Puoi riprovare tra poco oppure contattare Socialin Communication / Federica Creative tramite la sezione contatti.";

      return new Response(JSON.stringify({ answer: answerContent }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({ 
        answer: "L’assistente è momentaneamente non disponibile. Puoi riprovare tra poco oppure contattare Socialin Communication / Federica Creative tramite la sezione contatti." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};

function handleOptions(request, env) {
  let corsHeaders = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const origin = request.headers.get("Origin");
  const allowedOrigin = env.ALLOWED_ORIGIN || "https://socialincommunication.com";
  const isLocalhost = origin && origin.startsWith("http://localhost:");
  const isAllowedOrigin = origin === allowedOrigin || origin === allowedOrigin.replace('https://', 'https://www.');

  if (isLocalhost) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
  } else if (isAllowedOrigin) {
    corsHeaders["Access-Control-Allow-Origin"] = allowedOrigin;
  } else {
    corsHeaders["Access-Control-Allow-Origin"] = "null";
  }

  return new Response(null, {
    headers: corsHeaders,
  });
}
