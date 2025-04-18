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
const startChatButton = document.getElementById('startChatButton');
const sendMessageButton = document.getElementById('sendMessageButton');
const messageInput = document.getElementById('messageInput');
const chatDiv = document.getElementById('chat');
const userNameInput = document.getElementById('userName');
const userCountryInput = document.getElementById('userCountry');
const userInfoSection = document.getElementById('userInfo');
const chatAppSection = document.getElementById('app');

// Global variables to store user details
let userName = '';
let userCountry = '';

// Function to handle the Start Chat button click
startChatButton.addEventListener('click', () => {
  // Get user details
  userName = userNameInput.value;
  userCountry = userCountryInput.value;

  // Validate inputs
  if (userName && userCountry) {
    // Hide the user info section and show the chat section
    userInfoSection.style.display = 'none';
    chatAppSection.style.display = 'block';
  } else {
    alert('Please enter your name and select a country!');
  }
});

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
    // Encrypt the message
    const encryptedMessage = encryptMessage(message);

    // Store the message with user info (name, country, timestamp)
    const messagesRef = ref(db, 'chats/chat1/messages');
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      userName: userName,
      userCountry: userCountry,
      text: encryptedMessage,
      timestamp: Date.now()
    });

    // Clear the message input after sending
    messageInput.value = '';
  }
});

// Listen for new messages
onValue(ref(db, 'chats/chat1/messages'), (snapshot) => {
  const messages = snapshot.val();
  chatDiv.innerHTML = ''; // Clear the chat div before adding new messages

  // Display each message with user details
  for (let messageId in messages) {
    const message = messages[messageId];
    const decryptedMessage = decryptMessage(message.text);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = `<strong>${message.userName} (${message.userCountry})</strong> <small>${new Date(message.timestamp).toLocaleString()}</small><br>${decryptedMessage}`;
    chatDiv.appendChild(messageDiv);
  }
});

// Cleanup function for deleting messages older than 24 hours
function cleanupOldMessages() {
  const messagesRef = ref(db, 'chats/chat1/messages');

  // Get all messages from Firebase
  onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const now = Date.now();

    // Loop through each message
    for (let messageId in messages) {
      const message = messages[messageId];
      const messageTimestamp = message.timestamp;

      // If the message is older than 24 hours, delete it
      if (now - messageTimestamp > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
        const messageRef = ref(db, 'chats/chat1/messages/' + messageId);
        remove(messageRef); // Remove the message from Firebase
      }
    }
  });
}

// Call the cleanup function every time the app loads (or on a timer)
cleanupOldMessages();
