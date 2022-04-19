const SHA256 = require("crypto.js/sha256");

class Block {
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        // we will be using SHA256 cryptographic function to generate the hash of this block
        return SHA256(this.index+this.timestamp+this.data+JSON.stringify(this.previousHash)).toString();
    }
}
