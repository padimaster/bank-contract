const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    quickNode: {
      url: process.env.QUICKNODE_URL,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
  },
  solidity: "0.8.19",
};