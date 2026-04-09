const Message = require('./types/Message');
const {
    throwArity,
    throwWhenEmptyString,
} = require('./shared/utils');

// Returns daily quota remaining
async function getBalanceAsync(publicKey, privateKey) {
    throwArity(arguments, getBalanceAsync);
    throwWhenEmptyString(publicKey, 'Invalid public key');
    throwWhenEmptyString(privateKey, 'Invalid private key');
    const msg = new Message(publicKey);
    const urlExt = 'balance';
    await msg.sendAsync(privateKey, urlExt);
    return msg.getPayload();
}

module.exports = { getBalanceAsync };
