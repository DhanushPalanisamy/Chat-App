const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const chatList = document.getElementById('chat-list');
const groupList = document.getElementById('group-list');
const chatTitle = document.getElementById('chat-title');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('message-input');
const settingsModal = document.getElementById('settings-modal');
const openSettings = document.getElementById('open-settings');
const closeSettings = document.getElementById('close-settings');
const themeSelector = document.getElementById('theme-selector');

let currentChat = null;

tabs.forEach(btn =>
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  })
);

[chatList, groupList].forEach(list =>
  list.addEventListener('click', e => {
    if(e.target.classList.contains('contact-item')) {
      currentChat = e.target.textContent;
      chatTitle.textContent = currentChat;
      chatMessages.innerHTML = '';
      addMessage(`Welcome to ${currentChat}!`, 'bot');
    }
  })
);

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const t = msgInput.value.trim();
  if(!t || !currentChat) return;
  addMessage(t, 'user');
  msgInput.value = '';
  setTimeout(() => addMessage(`Echo: ${t}`, 'bot'), 600);
});

function addMessage(txt, sender) {
  const m = document.createElement('div');
  m.classList.add('message', sender);
  m.textContent = txt;
  chatMessages.appendChild(m);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

openSettings.addEventListener('click', () =>
  settingsModal.classList.remove('hidden')
);
closeSettings.addEventListener('click', () =>
  settingsModal.classList.add('hidden')
);
themeSelector.addEventListener('change', () =>
  document.body.setAttribute('data-theme', themeSelector.value)
);
