const { printObj } = require('../shared/utils');
const {
    getErrorModelListAsync,
} = require('../functions/getErrorModelListAsync');
const { getKeys } = require('../keys/getKeys');

// *********************************************************************
// *********************** FUNCTION ARGUMENTS **************************
// *********************************************************************

// Public key to encode data in transit. Although secure HTTPS
// transport is used by default, some users prefer an extra security
// layer they can control.
const publicKey = getKeys().publicKey; // private key (from token)

// Private key is not sent over the network, it is used to scramble payload
// when in transit. Although secure HTTPS transport is used by default,
// some users prefer an extra security layer they can control.
const privateKey = getKeys().privateKey; // private key (from token)

// *********************************************************************
// ************************ EXAMPLE OF USE *****************************
// *********************************************************************

getErrorModelListAsync(publicKey, privateKey)
    .then((s) => {
        printObj(s);
    })
    .catch((e) => {
        console.log(e);
    });
