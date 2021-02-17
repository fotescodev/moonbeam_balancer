require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

PRIVATE_KEY = '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {

    },
    moonbase: {
      url: "https://rpc.testnet.moonbeam.network",
      accounts: [PRIVATE_KEY],
      chainId: 1287,
      gas: 5000000,
      gasPrice: 0
    }
  },
  solidity: {
    version: "0.5.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};