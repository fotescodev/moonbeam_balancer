// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers } = require("hardhat");

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


    let DAI;
    let AVO;
    let TST;

    const toBeMinted = "100000000000000000000";
    const denorm = "100000000000000000";

    const TToken = await ethers.getContractFactory("TToken");

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
    console.log("Toast Coin: ", TST);

    // minting admin balances. *** To Do: add two more users and mint tokes
    await dai.mint(deployer.address, toBeMinted)
    await avo.mint(deployer.address, toBeMinted);
    await tst.mint(deployer.address, toBeMinted);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
