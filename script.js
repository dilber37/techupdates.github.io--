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
    saveMessage('You', message); // Call server-side function to save message
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
  // Call server-side PHP script to save message to a database
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'save_message.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Handle successful response
        console.log('Message saved successfully');
      } else {
        // Handle error response
        console.error('Failed to save message');
      }
    }
  };
  xhr.send(`sender=${encodeURIComponent(sender)}&content=${encodeURIComponent(content)}`);
}
