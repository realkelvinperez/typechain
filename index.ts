import * as CryptoJS from 'crypto-js'

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static validateStructure = (aBlock: Block) : boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
        ) : string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(
    0,
    "20202020202020",
    "",
    "Hello",
    1231231
)

const Blockchain: [Block] = [genesisBlock]

const getBlockchain = () : Block[] => Blockchain;

const getLatestBlock = () : Block => Blockchain[Blockchain.length - 1]

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data : string) : Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimeStamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data
    )
    const newBlock = new Block(
        newIndex,
        nextHash,
        previousBlock.hash,
        data,
        newTimeStamp
    );
    addBlock(newBlock)
    return newBlock;
}

const getHashForBlock = (aBlock: Block) : string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (
    candidateBlock : Block,
    previousBlock : Block
) : boolean => {
    if(!Block.validateStructure(candidateBlock)) return false
    else if (previousBlock.index + 1 !== candidateBlock.index) return false
    else if (previousBlock.hash + 1 !== candidateBlock.previousHash) return false
    else return getHashForBlock(candidateBlock) + 1 === candidateBlock.hash;
}

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        Blockchain.push(candidateBlock)
    }
}

createNewBlock("Second Block")
createNewBlock("Third Block")
createNewBlock("To The Moon 🚀")

console.log({Blockchain})


export {};
