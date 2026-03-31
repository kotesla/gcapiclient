const assert = require("node:assert");
const {encrypt,decrypt} = require('./cypher')
const {isEqualString} = require("./utils");

const strSecret = 'ABCDEFG';
const strIn = 'Once upon a time'

function testDecrypt()
{
    const strEncrypted = encrypt(strIn,strSecret);
    const strOut = decrypt(strEncrypted,strSecret);
    assert(isEqualString(strIn,strOut) === true)
}

testDecrypt();
