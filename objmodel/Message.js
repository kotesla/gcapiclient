const { throwWhenDoesNotExist, throwArity } = require("../shared/utils");
const { encrypt, decrypt } = require("../shared/cypher");
const { transport } = require("../shared/transport");

function Message(publicKey) {
  throwArity(arguments, Message);
  throwWhenDoesNotExist(publicKey, "Public key does not exist");
  this.publicKey = publicKey; // used for all tasks
  this.payload = null; // used for compute tasks only
}

// payload is an object as per examples
Message.prototype.setPayload = function (payload) {
  this.payload = payload;
};

Message.prototype.getPayload = function () {
  return this.payload;
};

Message.prototype.encodePayload = function (privateKey) {
  throwArity(arguments, this.encodePayload);
  throwWhenDoesNotExist(privateKey, "Private key does not exist");
  throwWhenDoesNotExist(this.payload, "Payload does not exist");
  let serialized = JSON.stringify(this.payload);
  this.payload = encrypt(serialized, privateKey);
};

Message.prototype.decodePayload = function (privateKey) {
  throwArity(arguments, this.decodePayload);
  throwWhenDoesNotExist(privateKey, "Private key does not exist");
  throwWhenDoesNotExist(this.payload, "Payload does not exist");
  let serialized = decrypt(this.payload, privateKey);
  this.payload = JSON.parse(serialized);
};

Message.prototype.sendMessageAsync = async function (privateKey, urlExt) {
  try {
    this.encodePayload(privateKey);
    this.setPayload(
      await transport("https", "api.geocertainty.com", "80", urlExt, {
        payload: this.payload,
      }),
    );
    this.decodePayload(privateKey);
  } catch (e) {
    console.log("Error sending ");
  }
};

module.exports = Message;
