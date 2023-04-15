const chatDisplay = document.getElementById('chat-display');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message !== '') {
    appendMessage('You', message);
    saveMessage('You', message);
    chatInput.value = '';
  }
}

function appendMessage(sender, content) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${content}`;
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function saveMessage(sender, content) {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  const newMessage = { sender, content };
  messages.push(newMessage);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.forEach((message) => {
    appendMessage(message.sender, message.content);
  });
}

loadMessages();

