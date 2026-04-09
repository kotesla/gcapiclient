const Message = require('../types/Message');
const {
    throwArity,
    throwWhenEmptyString,
} = require('../shared/utils');

// Returns a short list of all error models supported
async function getErrorModelListShortAsync(publicKey, privateKey) {
    throwArity(arguments, getErrorModelListShortAsync);
    throwWhenEmptyString(publicKey, 'Invalid public key');
    throwWhenEmptyString(privateKey, 'Invalid private key');
    const msg = new Message(publicKey);
    const urlExt = 'emdlListShort';
    await msg.sendAsync(privateKey, urlExt);
    return msg.getPayload();
}

module.exports = { getErrorModelListShortAsync };
