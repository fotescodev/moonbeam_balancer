const HDWalletProvider = require('@truffle/hdwallet-provider');
// Standalone Development Node Private Key
//const privateKeyDev = '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';

module.exports = {
    networks: {
        // ganache-cli -f https://eth-mainnet.alchemyapi.io/v2/V4aHOOcFKxvmZcNCdeWmXKRU5X-Ia_jB -i 1
        
        ganache: {
            host: 'localhost', // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: '*', // Ethereum Mainnet 
            gas: 6721975,
            gasPrice: 20000000000
        },

        // moonbeam: {
        //     provider: () => new PrivateKeyProvider(privateKey, "http://35.203.125.209:9933/", 43),
        //     network_id: 43
        //   },

        coverage: {
            host: 'localhost',
            network_id: '*',
            port: 8555,
            gas: 6721975,
            gasPrice: 0,
        },
    },
    // Configure your compilers
    compilers: {
        solc: {
            version: '0.5.12',
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 100,
                },
            },
        },
    },
};
