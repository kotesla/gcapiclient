const { printObj, throwArity } = require("../shared/utils");
const { getErrorModelList } = require("../functions/getErrorModelListAsync");

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

getErrorModelList(publicKey, privateKey)
  .then((s) => {
    printObj(s);
  })
  .catch((e) => {
    console.log(e);
  });
