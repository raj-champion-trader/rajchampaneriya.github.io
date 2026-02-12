console.log('Frontier Theme: AI Chat Module Loaded');

const chatPanel = document.getElementById('ai-chat-panel');
const triggerBtn = document.getElementById('ai-chat-trigger');
const closeBtn = document.getElementById('chat-close');
const sendBtn = document.getElementById('chat-send');
const input = document.getElementById('chat-input');
const messagesContainer = document.getElementById('chat-messages');

// Config - .NET Backend
const API_ENDPOINT = 'https://api.rajc.work/ai/chat'; // Placeholder

function toggleChat() {
    chatPanel.classList.toggle('hidden');
    if (!chatPanel.classList.contains('hidden')) {
        input.focus();
    }
}

function appendMessage(text, type) {
    const div = document.createElement('div');
    div.classList.add('message', type);
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Mock Backend Call
    appendMessage('Thinking...', 'system');

    try {
        // Implement actual fetch here when backend is ready
        // const response = await fetch(API_ENDPOINT, { 
        //     method: 'POST', 
        //     body: JSON.stringify({ query: text, context: document.body.innerText }) 
        // });

        setTimeout(() => {
            // Remove 'Thinking...' (simplification: just append new message)
            appendMessage(`I'm simulated response. Connect me to ${API_ENDPOINT} to get real answers about this article!`, 'system');
        }, 1000);

    } catch (e) {
        appendMessage('Error connecting to AI service.', 'system');
    }
}

// Event Listeners
if (triggerBtn) {
    console.log('AI Chat: Trigger button found');
    triggerBtn.onclick = (e) => {
        console.log('AI Chat: Trigger clicked');
        e.preventDefault();
        toggleChat();
    };
} else {
    console.error('AI Chat: Trigger button NOT found');
}
if (closeBtn) closeBtn.addEventListener('click', toggleChat);
if (sendBtn) sendBtn.addEventListener('click', sendMessage);
if (input) {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}
