const Message = require("../types/Message");
const { throwArity } = require("../shared/utils");

// Returns a short list of all error models supported
async function getErrorModelListShortAsync(publicKey, privateKey) {
  throwArity(arguments, getErrorModelListShortAsync);
  const msg = new Message(publicKey);
  await msg.sendAsync(privateKey, "errorModelListShort");
  return msg.getPayload();
}

module.exports = { getErrorModelListShortAsync };
