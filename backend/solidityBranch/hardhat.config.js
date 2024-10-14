require("@nomicfoundation/hardhat-toolbox");
const PRIVATE_KEY = "fcb28ffde498964732926eab25bba819c1eb23523c7d39c14ac646a19f0ddccd";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
      zkEVM: {
      url: `https://rpc.cardona.zkevm-rpc.com`,
      accounts: [PRIVATE_KEY],
      },
      avax: {
        url: `https://api.avax-test.network/ext/bc/C/rpc`,
        accounts: [PRIVATE_KEY],
        },
  },
  };
  