const Message = require("../types/Message");
const { printObj } = require("../shared/utils");

// Token consists of public and private keys.
// Public key to encode data in transit. Although secure HTTPS
// transport is used by default, some users prefer an extra security
// layer they can control.
const publicKey = "public_key_here"; // private key (token)

// Private key is not sent over the network, it is used to scramble payload
// when in transit. Although secure HTTPS transport is used by default,
// some users prefer an extra security layer they can control.
const privateKey = "private_key_here"; // private key (token)

async function getErrorModelListShort(privateKey) {
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
