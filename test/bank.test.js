const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Bank", function () {
    it("Should create new accounts", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const Bank = await ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();
        await bank.waitForDeployment();

        console.log("Bank deployed to:", await bank.getAddress());

        const account1 = await bank.getAccount(1234567890);

        expect(account1.name).to.equal("Miguel Villegas");

        const account2 = await bank.getAccount(4561238900);

        expect(account2.name).to.equal("Andres");
    });

    it("Should transfer funds between accounts", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const Bank = await ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();
        await bank.waitForDeployment();

        console.log("Bank deployed to:", await bank.getAddress());

        const account1 = await bank.getAccount(1234567890);
        const account2 = await bank.getAccount(4561238900);

        await bank.transfer(account1, account2, 1000);

        const balance1 = await bank.getBalance(account1);
        const balance2 = await bank.getBalance(account2);

        expect(balance1).to.equal(1000);
        expect(balance2).to.equal(1000);
    });
});
