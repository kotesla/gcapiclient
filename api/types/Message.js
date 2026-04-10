const {
    exists,
    throwWhenDoesNotExist,
    throwArity,
    throwWhenEmptyString,
    copyProps,
    isEmptyString,
    errorIncludesText,
} = require('../shared/utils');
const { encrypt, decrypt } = require('../shared/cypher');
const { transport } = require('../shared/transport');

function Message(publicKey) {
    throwArity(arguments, Message);
    throwWhenEmptyString(publicKey, 'Public key does not exist');
    this.publicKey = publicKey; // used for all tasks
    this.payload = null; // used for compute tasks only
}

// payload is an object as per examples
Message.prototype.setPayload = function (payload) {
    throwArity(arguments, this.setPayload);
    this.payload = payload;
};

Message.prototype.setLog = function (log) {
    throwArity(arguments, this.setLog);
    this.log = log;
};

Message.prototype.getPayload = function () {
    throwArity(arguments, this.getPayload);
    return this.payload;
};

Message.prototype.encodePayload = function (privateKey) {
    throwArity(arguments, this.encodePayload);
    throwWhenDoesNotExist(privateKey, 'Private key does not exist');
    throwWhenDoesNotExist(this.payload, 'Payload does not exist');
    let serialized = JSON.stringify(this.payload);
    this.payload = encrypt(serialized, privateKey);
};

Message.prototype.decodePayload = function (privateKey) {
    throwArity(arguments, this.decodePayload);
    throwWhenDoesNotExist(privateKey, 'Private key does not exist');
    throwWhenDoesNotExist(this.payload, 'Payload does not exist');
    let serialized;
    try {
        serialized = decrypt(this.payload, privateKey);
    } catch (e) {
        throwWhenPrivateKeyError(e);
        throw e;
    }
    this.payload = JSON.parse(serialized);
};

Message.prototype.dropPayload = function () {
    throwArity(arguments, this.dropPayload);
    if (exists(this.payload)) {
        this.payload = null;
    }
};

function throwWhenPrivateKeyError(err) {
    if (errorIncludesText(err, 'Malformed')) {
        throw new Error(
            'Unable to decode payload, check that client software is using the correct private key.'
        );
    }
}

function throwWhenCommError(err) {
    if (errorIncludesText(err, 'ECONNREFUSED')) {
        throw new Error(
            'Error sending message (server not responding)'
        );
    }
    if (errorIncludesText(err, 'ERR_NETWORK')) {
        throw new Error(
            'Error sending message (check your internet connection)'
        );
    }
    if (errorIncludesText(err, 'ECONNRESET')) {
        throw new Error(
            'Error sending message (server dropped connection)'
        );
    }
}

Message.prototype.sendAsync = async function (privateKey, urlExt) {
    throwArity(arguments, this.sendAsync);
    try {
        if (exists(this.payload)) {
            this.encodePayload(privateKey);
        }
        const reply = await transport(
            'http',
            '127.0.0.1', //"api.geocertainty.com",
            '3000',
            urlExt,
            this
        );
        copyProps(reply, this);
        if (exists(this.payload)) {
            this.decodePayload(privateKey);
        }
        if (exists(this.log) && !isEmptyString(this.log)) {
            throw new Error(this.log);
        }
    } catch (e) {
        throwWhenCommError(e);
        throw e;
    }
};

module.exports = Message;
