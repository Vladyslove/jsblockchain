const SHA256 = require("crypto-js/sha256");

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
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.hash = newBlock.calculateHash(); 
         this.chain.push(newBlock);
    }
    
    checkBlockValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false; 
            }
        }
        return true;
    }
}

// creating new blocks
let block1 = new Block(1, "02/01/2018", {mybalance : 100});
let block2 = new Block(2, "03/01/2018", {mybalance : 50});

// create a new block chain
let myBlockChain = new BlockChain();

// adding the new blocks to the block chain
myBlockChain.addBlock(block1);
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain, null,4));
console.log("Validation check for the Block Chain: " + myBlockChain.checkBlockValid());