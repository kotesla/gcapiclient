const Message = require("../types/Message");
const { printObj, throwArity } = require("../shared/utils");

// *********************************************************************
// *********************** FUNCTION ARGUMENTS **************************
// *********************************************************************

// Public key to encode data in transit. Although secure HTTPS
// transport is used by default, some users prefer an extra security
// layer they can control.
const publicKey = "public_key_here"; // private key (from token)

// Private key is not sent over the network, it is used to scramble payload
// when in transit. Although secure HTTPS transport is used by default,
// some users prefer an extra security layer they can control.
const privateKey = "private_key_here"; // private key (from token)

// *********************************************************************
// ************************ EXAMPLE OF USE *****************************
// *********************************************************************

async function getErrorModelListShort(privateKey) {
  // Returns short list of all error models supported, no details
  throwArity(arguments, getErrorModelListShort);
  const msg = new Message(publicKey);
  await msg.sendAsync(privateKey, "errorModelListShort");
  return msg.getPayload();
}

getErrorModelListShort(privateKey)
  .then((s) => {
    printObj(s);
  })
  .catch((e) => {
    console.log(e);
  });
