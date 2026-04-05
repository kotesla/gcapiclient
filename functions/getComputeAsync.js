const Message = require("../types/Message");
const Payload = require("../types/Payload");
const { throwArity, throwWhenEmptyString } = require("../shared/utils");

// Returns a list of surveys with all corrections
// and QA flags as required by the error model given.
async function getComputeAsync(
  publicKey,
  privateKey,
  errModelId,
  mAxes,
  mRef,
  stdDev,
  pcOutliersUser,
) {
  throwArity(arguments, getComputeAsync);
  throwWhenEmptyString(publicKey, "Invalid public key");
  throwWhenEmptyString(privateKey, "Invalid private key");
  const msg = new Message(publicKey);
  msg.setPayload(new Payload(errModelId, mAxes, mRef, stdDev, pcOutliersUser));
  await msg.sendAsync(privateKey);
  return msg.getPayload();
}

module.exports = { getComputeAsync };
