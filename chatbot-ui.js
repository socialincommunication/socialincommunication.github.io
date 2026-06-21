/**
 * SOCIALIN ASSISTANT - Frontend Chatbot UI
 * 
 * Interfaccia e micro-interazioni avanzate.
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotAttachBtn = document.getElementById('chatbot-attach-btn');
    const chatbotFile = document.getElementById('chatbot-file');
    
    // Quick Replies predefined
    const quickReplies = [
        "Voglio un sito o funnel",
        "Mi serve una strategia social",
        "Vorrei creare un avatar AI",
        "Mi serve un video o spot",
        "Voglio richiedere una consulenza"
    ];

    let isChatOpen = false;
    let hasWelcomed = false;
    
    // --- AUDIO SYNTHESIS (Twinkle Sound) ---
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playTwinkle() {
        if (!audioCtx) {
            try { audioCtx = new AudioContext(); } 
            catch(e) { return; } // Silently fail if blocked
        }
        
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const t = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // High frequency sine wave for "magical" feel
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(2000, t + 0.1);
        
        // Envelope
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.08, t + 0.05); // Molto dolce
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        
        osc.start(t);
        osc.stop(t + 0.3);
    }

    // Apre/Chiude Chatbot
    chatbotToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatbotWindow.classList.toggle('active', isChatOpen);
        
        // Audio interaction
        playTwinkle();
        
        // Glow effect
        chatbotToggle.classList.add('glow-pulse');
        setTimeout(() => chatbotToggle.classList.remove('glow-pulse'), 500);

        if (isChatOpen && !hasWelcomed) {
            initChat();
            hasWelcomed = true;
        }
    });

    chatbotClose.addEventListener('click', () => {
        isChatOpen = false;
        chatbotWindow.classList.remove('active');
        playTwinkle();
    });

    // Inizializza la chat
    function initChat() {
        appendMessage("bot", "Ciao, sono l’assistente virtuale di Socialin Communication. Posso aiutarti a orientarti tra sito e funnel, strategia social, avatar AI, video, branding e consulenza.");
        appendQuickReplies(quickReplies);
    }

    // Aggiunge un messaggio in chat
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender === 'bot' ? 'msg-bot' : 'msg-user');
        msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Aggiunge pulsante CTA
    function appendCtaButton(text, href) {
        const ctaDiv = document.createElement('div');
        ctaDiv.classList.add('chat-cta-wrapper');
        ctaDiv.innerHTML = `<a href="${href}" class="chat-cta-btn" onclick="document.getElementById('chatbot-close').click()">${text}</a>`;
        chatbotMessages.appendChild(ctaDiv);
        scrollToBottom();
    }

    // Aggiunge pulsanti Quick Reply
    function appendQuickReplies(replies) {
        const qrContainer = document.createElement('div');
        qrContainer.classList.add('quick-replies-container');
        
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply-btn');
            btn.innerText = reply;
            btn.addEventListener('click', () => {
                handleUserMessage(reply);
                qrContainer.remove(); // Rimuove le opzioni dopo la scelta
            });
            qrContainer.appendChild(btn);
        });
        
        chatbotMessages.appendChild(qrContainer);
        scrollToBottom();
    }

    // Gestisce l'invio testo libero
    chatbotSendBtn.addEventListener('click', () => {
        const text = chatbotInput.value.trim();
        if (text) {
            chatbotInput.value = '';
            handleUserMessage(text);
            const qr = document.querySelector('.quick-replies-container');
            if(qr) qr.remove();
        }
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chatbotSendBtn.click();
    });

    // Simulazione allegato visivo (Solo UI)
    chatbotAttachBtn.addEventListener('click', () => {
        chatbotFile.click();
    });

    chatbotFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            appendMessage("user", `📎 Allegato inviato: ${fileName}`);
            
            setTimeout(() => {
                appendMessage("bot", "Ho ricevuto l'allegato! Questo mi aiuta a capire meglio la tua estetica. Qual è l'obiettivo principale di questo progetto?");
            }, 1000);
        }
    });

    // Gestione logica messaggi e routing verso AI
    function handleUserMessage(text) {
        appendMessage("user", text);
        
        // Invia ad AI
        sendToAI(text);
    }

    /**
     * LOCAL INTENT MATCHING (NO EXTERNAL API)
     */
    async function sendToAI(userText) {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-msg', 'msg-bot', 'typing-indicator');
        typingDiv.innerHTML = '<div class="msg-content">Sta scrivendo...</div>';
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();

        // Simulazione ritardo di rete per maggiore realismo
        setTimeout(() => {
            typingDiv.remove();
            const response = getLocalResponse(userText);
            appendMessage("bot", response);
            
            // Re-inserisce le quick reply se siamo nel messaggio di fallback
            if (response.startsWith("Posso aiutarti a orientarti")) {
                appendQuickReplies(quickReplies);
            }
        }, 1200);
    }

    function getLocalResponse(text) {
        const lowerText = text.toLowerCase();
        
        const intents = [
            {
                triggers: ["sito", "funnel", "landing", "ecommerce", "e-commerce", "shop"],
                response: "Possiamo progettare un sito, una landing page, un e-commerce o un funnel in base al tuo obiettivo: presentare il brand, raccogliere contatti, vendere prodotti o organizzare richieste di consulenza. Hai già un sito oppure parti da zero?"
            },
            {
                triggers: ["social", "instagram", "tiktok", "facebook", "piano editoriale", "contenuti"],
                response: "Una strategia social parte da obiettivo, target, posizionamento, contenuti, calendario editoriale e analisi. Socialin può affiancarti nella costruzione del sistema, non solo nella pubblicazione dei post. Qual è il tuo settore?"
            },
            {
                triggers: ["avatar", "ai", "intelligenza artificiale", "virtual influencer", "strategia senza volto"],
                response: "Gli avatar AI possono essere usati per contenuti, video, presentazioni, assistenti virtuali e strategie senza volto. Il progetto parte da identità, tono di voce, immagini, script e obiettivo di comunicazione. Vuoi usare un avatar per un brand, un servizio o un personaggio digitale?"
            },
            {
                triggers: ["video", "spot", "reel", "fotografia", "shooting", "contenuti"],
                response: "Socialin può progettare reel, spot, shooting fotografici, contenuti video e sistemi visivi per social e sito. Hai già un prodotto, servizio o progetto da raccontare?"
            },
            {
                triggers: ["consulenza", "preventivo", "contatto", "prezzo", "costi", "budget"],
                response: "Per una consulenza o un preventivo occorre comprendere settore, obiettivi, canali già attivi e priorità. Raccontami brevemente il progetto e utilizza la sezione contatti del sito per essere ricontattato."
            }
        ];

        for (const intent of intents) {
            for (const trigger of intent.triggers) {
                if (lowerText.includes(trigger)) {
                    return intent.response;
                }
            }
        }

        return "Posso aiutarti a orientarti tra sito/funnel, strategia social, avatar AI, contenuti video, branding e consulenza. Puoi scegliere una delle opzioni qui sotto oppure raccontarmi in breve di cosa hai bisogno.";
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
