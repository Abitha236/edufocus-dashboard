// test.js

const SimpleBlockchain = artifacts.require("SimpleBlockchain");

contract("SimpleBlockchain", (accounts) => {

  let blockchain;

  before(async () => {
    blockchain = await SimpleBlockchain.deployed();
  });

  it("should create genesis block", async () => {
    const block = await blockchain.getBlock(0);

    console.log("Index:", block.index.toString());
    console.log("Timestamp:", block.timestamp.toString());
    console.log("Data:", block.data);
    console.log("Previous Hash:", block.previousHash);

    assert.equal(block.data, "Genesis Block");
  });


  it("should add a new block", async () => {

    await blockchain.createBlock(
      "Second Block",
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );

    const block = await blockchain.getBlock(1);

    console.log("New Block Data:", block.data);

    assert.equal(block.data, "Second Block");
  });

});