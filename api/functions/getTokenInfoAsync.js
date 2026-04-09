const Message = require('../types/Message');
const {
    throwArity,
    throwWhenEmptyString,
} = require('../shared/utils');

// Returns token information
async function getTokenInfoAsync(publicKey, privateKey) {
    throwArity(arguments, getTokenInfoAsync);
    throwWhenEmptyString(publicKey, 'Invalid public key');
    throwWhenEmptyString(privateKey, 'Invalid private key');
    const msg = new Message(publicKey);
    const urlExt = 'tokenInfo';
    await msg.sendAsync(privateKey, urlExt);
    return msg.getPayload();
}

module.exports = { getTokenInfoAsync };
