"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) { return CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); };
    return Block;
}());
var genesisBlock = new Block(0, "20202020202020", "", "Hello", 1231231);
var Blockchain = [genesisBlock];
var getBlockchain = function () { return Blockchain; };
var getLatestBlock = function () { return Blockchain[Blockchain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashForBlock = function (aBlock) { return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data); };
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock))
        return false;
    else if (previousBlock.index + 1 !== candidateBlock.index)
        return false;
    else if (previousBlock.hash + 1 !== candidateBlock.previousHash)
        return false;
    else
        return getHashForBlock(candidateBlock) + 1 === candidateBlock.hash;
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        Blockchain.push(candidateBlock);
    }
};
createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("To The Moon 🚀");
console.log({ Blockchain: Blockchain });
