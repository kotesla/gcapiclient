const crypto = require('../../lib/crypto-js');

function encrypt(text, key) {
    return crypto.AES.encrypt(text, key).toString();
}

function decrypt(text, key) {
    let decrypted = crypto.AES.decrypt(text, key);
    return crypto.enc.Utf8.stringify(decrypted);
}

module.exports = { encrypt, decrypt };
