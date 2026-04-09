const Message = require('../types/Message');
const {
    throwArity,
    throwWhenEmptyString,
} = require('../shared/utils');

// Returns call history
async function getCallHistoryAsync(publicKey, privateKey) {
    throwArity(arguments, getCallHistoryAsync);
    throwWhenEmptyString(publicKey, 'Invalid public key');
    throwWhenEmptyString(privateKey, 'Invalid private key');
    const msg = new Message(publicKey);
    const urlExt = 'callHistory';
    await msg.sendAsync(privateKey, urlExt);
    return msg.getPayload();
}

module.exports = { getCallHistoryAsync };
