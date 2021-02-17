const TMath = artifacts.require('TMath');
const BFactory = artifacts.require('BFactory');
const Multicall = artifacts.require('Multicall');
const DAI = artifacts.require('DAI');
const WETH = artifacts.require('WETH');
const ExchangeProxy = artifacts.require('ExchangeProxy');

module.exports = async function (deployer, network, accounts) {
    deployer.deploy(TMath);
    deployer.deploy(Multicall);
    deployer.deploy(DAI);
    deployer.deploy(WETH).then(function () {
        return deployer.deploy(ExchangeProxy, WETH.address);
    });

    deployer.deploy(BFactory);

    console.log('Pre-deployed Contracts:\n', {
        Multicall: Multicall.address,
        BFactory: BFactory.address,
        ExchangeProxy: ExchangeProxy.address,
        WETH: WETH.address,
        DAI: DAI.address
    }
    )
};
