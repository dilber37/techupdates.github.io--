const chatDisplay = document.getElementById('chat-display');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value;
  if (message) {
    const newMessage = document.createElement('div');
    newMessage.innerText = `You: ${message}`;
    chatDisplay.appendChild(newMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    chatInput.value = '';
  }
}
