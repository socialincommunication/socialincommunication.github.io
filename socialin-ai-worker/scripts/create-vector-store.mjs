import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = "https://api.openai.com/v1";

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("ERRORE: Variabile ambiente OPENAI_API_KEY non presente.");
    process.exit(1);
  }

  const kbDir = path.join(__dirname, '..', 'knowledge-base');
  
  if (!fs.existsSync(kbDir)) {
    console.error(`ERRORE: La cartella ${kbDir} non esiste.`);
    process.exit(1);
  }

  const files = fs.readdirSync(kbDir).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.error("ERRORE: Nessun file .md trovato nella knowledge-base.");
    process.exit(1);
  }

  console.log(`Inizio caricamento di ${files.length} file...`);
  
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v2"
  };

  const fileIds = [];

  for (const file of files) {
    const filePath = path.join(kbDir, file);
    const fileData = fs.readFileSync(filePath);
    
    const formData = new FormData();
    const blob = new Blob([fileData], { type: 'text/markdown' });
    formData.append('file', blob, file);
    formData.append('purpose', 'assistants');

    try {
      const response = await fetch(`${API_BASE}/files`, {
        method: 'POST',
        headers: headers,
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`ERRORE caricamento file ${file}:`, errorText);
        process.exit(1);
      }

      const data = await response.json();
      console.log(`- File caricato: ${file} (ID: ${data.id})`);
      fileIds.push(data.id);
    } catch (err) {
      console.error(`ERRORE di rete durante caricamento file ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\nCreazione del Vector Store 'Socialin Knowledge Base'...");
  let vectorStoreId;
  let vectorStoreName;

  try {
    const response = await fetch(`${API_BASE}/vector_stores`, {
      method: 'POST',
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Socialin Knowledge Base" })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ERRORE creazione Vector Store:`, errorText);
      process.exit(1);
    }

    const data = await response.json();
    vectorStoreId = data.id;
    vectorStoreName = data.name;
    console.log(`Vector Store creato. ID: ${vectorStoreId}`);
  } catch (err) {
    console.error("ERRORE di rete durante creazione Vector Store:", err.message);
    process.exit(1);
  }

  console.log("\nCollegamento dei file al Vector Store...");
  let batchId;

  try {
    const response = await fetch(`${API_BASE}/vector_stores/${vectorStoreId}/file_batches`, {
      method: 'POST',
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ file_ids: fileIds })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ERRORE collegamento file:`, errorText);
      process.exit(1);
    }

    const data = await response.json();
    batchId = data.id;
    console.log(`Batch creato. ID: ${batchId}`);
  } catch (err) {
    console.error("ERRORE di rete durante collegamento file:", err.message);
    process.exit(1);
  }

  console.log("\nControllo stato del file batch...");
  
  let batchStatus = "";
  let attempt = 0;

  while (batchStatus !== "completed" && attempt < 30) {
    try {
      const response = await fetch(`${API_BASE}/vector_stores/${vectorStoreId}/file_batches/${batchId}`, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`ERRORE controllo stato batch:`, errorText);
        process.exit(1);
      }

      const data = await response.json();
      batchStatus = data.status;

      if (batchStatus === "completed") {
        console.log("Elaborazione file batch completata.");
        break;
      } else if (batchStatus === "failed" || batchStatus === "cancelled" || batchStatus === "expired") {
        console.error(`ERRORE: Elaborazione batch fallita con stato '${batchStatus}'.`);
        console.error("Dettagli disponibili:", JSON.stringify(data, null, 2));
        process.exit(1);
      } else {
        console.log(`In attesa del completamento dell'elaborazione (stato: ${batchStatus})...`);
        await new Promise(r => setTimeout(r, 2000));
        attempt++;
      }
    } catch (err) {
      console.error("ERRORE di rete durante controllo stato batch:", err.message);
      process.exit(1);
    }
  }

  if (batchStatus !== "completed") {
    console.error("ERRORE: Timeout durante l'elaborazione del batch.");
    process.exit(1);
  }

  const finalIdFile = path.join(__dirname, '..', '.vector-store-id');
  fs.writeFileSync(finalIdFile, vectorStoreId);
  
  console.log("\n========================================================");
  console.log("RIEPILOGO:");
  console.log(`Nome Vector Store: ${vectorStoreName}`);
  console.log(`ID Vector Store: ${vectorStoreId}`);
  console.log(`Numero di file caricati: ${fileIds.length}`);
  console.log(`Stato finale: completed`);
  console.log("========================================================\n");
  console.log("VECTOR STORE CREATO CON SUCCESSO");
  console.log("ID DA SALVARE COME SECRET CLOUDFLARE OPENAI_VECTOR_STORE_ID:\n");
  console.log(vectorStoreId);
  console.log("\n========================================================");
}

main().catch(console.error);
