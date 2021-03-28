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
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) { return CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); };
    return Block;
}());
var genesisBlock = new Block(0, "20202020202020", "", "Hello", 1231231);
var blockchain = [genesisBlock];
console.log({ blockchain: blockchain });
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
