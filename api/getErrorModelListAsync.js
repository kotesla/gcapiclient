const Message = require('./types/Message');
const {
    throwArity,
    throwWhenEmptyString,
} = require('./shared/utils');

// Returns a detailed list of all error models supported
async function getErrorModelListAsync(publicKey, privateKey) {
    throwArity(arguments, getErrorModelListAsync);
    throwWhenEmptyString(publicKey, 'Invalid public key');
    throwWhenEmptyString(privateKey, 'Invalid private key');
    const msg = new Message(publicKey);
    const urlExt = 'emdlList';
    await msg.sendAsync(privateKey, urlExt);
    return msg.getPayload();
}

module.exports = { getErrorModelListAsync };
