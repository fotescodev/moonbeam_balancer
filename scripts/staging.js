// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const BFactory = await ethers.getContractFactory("BFactory");
    const bFactory = await BFactory.deploy();
    await bFactory.deployed();
  
    console.log("BFactory address:", bFactory.address);

    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log("Multicall address:", multicall.address);

    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy();
    await weth.deployed();
    console.log("WETH address:", weth.address);

    const ExchangeProxy = await ethers.getContractFactory("ExchangeProxy");
    const exchangeProxy = await ExchangeProxy.deploy(weth.address);
    await exchangeProxy.deployed();
    console.log("ExchangeProxy address:", exchangeProxy.address);


  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  