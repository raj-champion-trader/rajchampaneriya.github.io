

const API_ENDPOINT = 'https://api.rajc.work/ai/chat'; // Placeholder

function safeAppendMessage(container, text, type) {
  if (!container) {
    console.warn('AI Chat: messages container missing — message not appended');
    return;
  }
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function createSendMessageFn(inputEl, messagesContainer) {
  return async function sendMessage() {
    const text = inputEl?.value?.trim();
    if (!text) return;

    safeAppendMessage(messagesContainer, text, 'user');
    if (inputEl) inputEl.value = '';

    // Mock Backend Call
    safeAppendMessage(messagesContainer, 'Thinking...', 'system');

    try {
      // Replace with real fetch when service is available
      // const response = await fetch(API_ENDPOINT, { method: 'POST', body: JSON.stringify({ query: text }) });
      setTimeout(() => {
        safeAppendMessage(messagesContainer, `I'm a simulated response. Connect me to ${API_ENDPOINT} for real answers.`, 'system');
      }, 900);
    } catch (err) {
      safeAppendMessage(messagesContainer, 'Error connecting to AI service.', 'system');
    }
  };
}

function initAIChat() {
  const chatPanel = document.getElementById('ai-chat-panel');
  if (!chatPanel) return; // no chat UI on this layout

  // Prevent double-binding when header/bottom-nav persist across swup navigations
  if (chatPanel.dataset.aiChatInit === '1') return;
  chatPanel.dataset.aiChatInit = '1';

  const triggerBtn = document.getElementById('ai-chat-trigger');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  function toggleChat() {
    chatPanel.classList.toggle('hidden');
    if (!chatPanel.classList.contains('hidden') && input) input.focus();
  }

  const sendMessage = createSendMessageFn(input, messagesContainer);

  if (triggerBtn) {
    // guard against multiple handlers
    if (!triggerBtn.dataset.aiChatBound) {
      triggerBtn.addEventListener('click', (e) => { e.preventDefault(); toggleChat(); });
      triggerBtn.dataset.aiChatBound = '1';
    }
  } else {
    // Trigger button not present on this page (optional)
  }

  if (closeBtn && !closeBtn.dataset.aiChatBound) {
    closeBtn.addEventListener('click', toggleChat);
    closeBtn.dataset.aiChatBound = '1';
  }
  if (sendBtn && !sendBtn.dataset.aiChatBound) {
    sendBtn.addEventListener('click', sendMessage);
    sendBtn.dataset.aiChatBound = '1';
  }
  if (input && !input.dataset.aiChatBound) {
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    input.dataset.aiChatBound = '1';
  }
}

// Initialize now and re-run on Swup navigation if Swup is present
initAIChat();
if (window.swup && window.swup.hooks) {
  window.swup.hooks.on('page:view', initAIChat);
}
