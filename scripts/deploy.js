// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const bank = await hre.ethers.deployContract("Bank");

  await bank.waitForDeployment();
  const address = await bank.getAddress();

  console.log("Bank deployed to:", address);

  const config = `export const abiBankAddress = "${address}";`

  const data = JSON.stringify(config);

  const fs = require('fs');
  fs.writeFileSync('../frontend/src/config.ts', JSON.parse(data));

  fs.copyFileSync("./artifacts/contracts/Bank.sol/Bank.json", "../frontend/src/utils/abi/Bank.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
