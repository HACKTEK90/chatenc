// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp9kCBsDLnQEmR7wWHXwt3FB2T1zDtiqU",
  authDomain: "h-90-8a7c5.firebaseapp.com",
  databaseURL: "https://h-90-8a7c5-default-rtdb.firebaseio.com",
  projectId: "h-90-8a7c5",
  storageBucket: "h-90-8a7c5.appspot.com",
  messagingSenderId: "367196609301",
  appId: "1:367196609301:web:156e24c1b4532c26af671c",
  measurementId: "G-W5K7F4VQGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const sendMessageButton = document.getElementById('sendMessageButton');
const messageInput = document.getElementById('messageInput');
const chatDiv = document.getElementById('chat');

// Encrypt the message (simple Caesar Cipher as an example)
function encryptMessage(message) {
  let encryptedMessage = '';
  for (let i = 0; i < message.length; i++) {
    encryptedMessage += String.fromCharCode(message.charCodeAt(i) + 3);
  }
  return encryptedMessage;
}

// Decrypt the message (reverse of Caesar Cipher)
function decryptMessage(message) {
  let decryptedMessage = '';
  for (let i = 0; i < message.length; i++) {
    decryptedMessage += String.fromCharCode(message.charCodeAt(i) - 3);
  }
  return decryptedMessage;
}

// Send message function
sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    const encryptedMessage = encryptMessage(message);
    const messagesRef = ref(db, 'chats/chat1/messages');
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      text: encryptedMessage,
      timestamp: Date.now()
    });
    messageInput.value = ''; // Clear the input after sending
  }
});

// Listen for new messages
onValue(ref(db, 'chats/chat1/messages'), (snapshot) => {
  const messages = snapshot.val();
  chatDiv.innerHTML = ''; // Clear the chat div before adding new messages

  for (let messageId in messages) {
    const message = messages[messageId];
    const decryptedMessage = decryptMessage(message.text);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = decryptedMessage;
    chatDiv.appendChild(messageDiv);
  }
});
