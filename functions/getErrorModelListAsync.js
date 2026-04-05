const Message = require("../types/Message");
const { throwArity } = require("../shared/utils");

// Returns a detailed list of all error models supported
async function getErrorModelListAsync(publicKey, privateKey) {
  throwArity(arguments, getErrorModelListAsync);
  const msg = new Message(publicKey);
  await msg.sendAsync(privateKey, "errorModelList");
  return msg.getPayload();
}

module.exports = { getErrorModelListAsync };
