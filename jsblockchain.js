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

class BlockChain {
    constructor() {
        // the 1st variable of the array will
        // be genesis block, created manually
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "This is genesis block", "0");
    }
    
    // new block object
    // the hash of the previous block
    // calculate the hash of current block

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
         newBlock.previousHash = this.getLatestBlock.hash;
         newBlock.hash = newBlock.calculateHash(); 
         this.chain.push(newBlock);
    }
}
