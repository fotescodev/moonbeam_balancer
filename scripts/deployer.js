require("@nomiclabs/hardhat-ethers");


async function main() {
  // We get the contract to deploy
 
  // const BToken = await ethers.getContractFactory('BToken');
  // const Token = await ethers.getContractFactory('MockToken');

  const BFactory = await ethers.getContractFactory('BFactory');
  console.log(`Deploying BFactory`);
  const factory = await BFactory.deploy();
  console.log(`BFactory: ${factory.address}`);
  

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });