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

  let vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!vectorStoreId) {
    const idFile = path.join(__dirname, '..', '.vector-store-id');
    if (fs.existsSync(idFile)) {
      vectorStoreId = fs.readFileSync(idFile, 'utf8').trim();
    }
  }

  if (!vectorStoreId) {
    console.error("ERRORE: OPENAI_VECTOR_STORE_ID non impostato e file .vector-store-id non trovato.");
    process.exit(1);
  }

  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v2"
  };

  try {
    const vsResponse = await fetch(`${API_BASE}/vector_stores/${vectorStoreId}`, {
      method: 'GET',
      headers: headers
    });

    if (!vsResponse.ok) {
      const errorData = await vsResponse.json().catch(() => ({}));
      console.error(`ERRORE API Vector Store HTTP ${vsResponse.status}:`, errorData.error?.message || "Messaggio sconosciuto");
      if (errorData.error?.type) console.error(`Type: ${errorData.error.type}`);
      if (errorData.error?.code) console.error(`Code: ${errorData.error.code}`);
      process.exit(1);
    }

    const vectorStore = await vsResponse.json();
    console.log(`Nome Vector Store: ${vectorStore.name}`);
    console.log(`ID Vector Store: ${vectorStore.id}`);
    console.log(`Status: ${vectorStore.status}`);
    console.log(`File counts: ${JSON.stringify(vectorStore.file_counts)}`);
    
    const filesResponse = await fetch(`${API_BASE}/vector_stores/${vectorStoreId}/files`, {
      method: 'GET',
      headers: headers
    });

    if (!filesResponse.ok) {
      const errorData = await filesResponse.json().catch(() => ({}));
      console.error(`ERRORE API Files HTTP ${filesResponse.status}:`, errorData.error?.message || "Messaggio sconosciuto");
      if (errorData.error?.type) console.error(`Type: ${errorData.error.type}`);
      if (errorData.error?.code) console.error(`Code: ${errorData.error.code}`);
      process.exit(1);
    }

    const files = await filesResponse.json();
    console.log(`\nElenco file associati:`);
    
    for (const file of files.data) {
      console.log(`- File ID: ${file.id} | Stato: ${file.status}`);
    }
    
  } catch (error) {
    console.error("ERRORE di rete durante il controllo del Vector Store:", error.message);
    process.exit(1);
  }
}

main().catch(console.error);
