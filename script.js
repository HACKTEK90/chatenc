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
