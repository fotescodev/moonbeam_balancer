// This is a script for deploying your contracts. You can adapt it to deploy
require('dotenv').config();
const { BigNumber } = require('ethers');
const { ethers } = require("hardhat");
const { getReceipt } = require("./getReceipt");


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


    const admin = await deployer.getAddress()
    console.log("Admin account: ", admin);

    const toBeMinted = "100000000000000000000";

    const TToken = await ethers.getContractFactory("TToken");
    const factory = await ethers.getContractAt("BFactory", process.env.CONTRACT_BFACTORY);

    // creating a new BPool
    console.log("Factory: ", factory.address);
    console.log("Creating a new BPool...")
    const txPoolCreate = await factory.newBPool();
    const receiptPoolCreate = await getReceipt(txPoolCreate.hash);

    const poolInstance = await ethers.getContractAt("BPool", receiptPoolCreate.logs[1].address);
    console.log("BPool: ", poolInstance.address,"\n");
    
    // creating ERC20 tokens & minting into admin's account

    let DAI;
    let AVO;
    let TST;

    console.log("######### Deploying and minting ERC20 tokens #########\n");


    let dai = await TToken.deploy('Dai Stablecoin', 'DAI', 18);
    await dai.deployed();
    DAI = dai.address;
    console.log("DAI: ", DAI);

    let avo = await TToken.deploy('Avocado Coin', 'AVO', 18);
    await avo.deployed();
    AVO = avo.address;
    console.log("Avocado Coin: ", AVO);

    let tst = await TToken.deploy('Toast Coin', 'TST', 18);
    await tst.deployed();
    TST = tst.address;
    console.log("Toast Coin: ", TST,"\n");

    // minting admin balances. *** To Do: add two more users and mint tokes
    console.log("Minting..\n")
    console.log("DAI...")
    await dai.mint(deployer.address, toBeMinted);
    console.log("AVO...")
    await avo.mint(deployer.address, toBeMinted);
    console.log("TST...\n")
    await tst.mint(deployer.address, toBeMinted);

    console.log("####### Unlocking Tokens to be used by the Pool #######\n");   
    console.log("Unlocking DAI...")
    const daiUnlockTx = await dai.approve(poolInstance.address, 10000000); // 1DAI = 1 USD, 10 USD
    await getReceipt(daiUnlockTx.hash);
    
    console.log("Unlocking Avocado Unstable-Coin...")
    const avoUnlockTx = await avo.approve(poolInstance.address, 10000000); // 1AVO = 100 USD, 1000 USD
    await getReceipt(avoUnlockTx.hash);
    
    console.log("Unlocking Toast Coin...\n")
    const tstUnlockTx = await tst.approve(poolInstance.address, 10000000); // 1TST = 1000 USD, 10,000 USD
    await getReceipt(tstUnlockTx.hash);    

    // Binding tokens to the pool
    // Denorming formula  (Desired Pool Token %) / 2 * 10^18
    // Pool starting funds: 100$
    
    console.log("####### Configuring Pool parameters: 100$ total funds #######\n");
    console.log("DAI 10, 10% Pool, Denorm = 5* 10^18");
    const daiBindTx = await poolInstance.bind(DAI, 10000000, BigNumber.from(500000000000000));
    await getReceipt(daiBindTx.hash);                                      

    console.log("AVO 0.5, 50% Pool, Denorm = 25* 10^18");
    const avoBindTx = await poolInstance.bind(AVO, 5000000, BigNumber.from(2500000000000000));
    await getReceipt(avoBindTx.hash);

    console.log("TST 0.04, 40% Pool, Denorm = 20* 10^18");
    const tstBindTx = await poolInstance.bind(TST, 400000, BigNumber.from(2000000000000000));
    await getReceipt(tstBindTx.hash);

    console.log("Setting up a swap fee to 0.3%");
    await poolInstance.setSwapFee(3000000000000000);

    console.log("Enabling public swapping ...\n");
    await poolInstance.setPublicSwap(true);

    console.log("Finalizing Pool ...");
    const finalizeTx = await poolInstance.finalize();
    await getReceipt(finalizeTx.hash);







}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
