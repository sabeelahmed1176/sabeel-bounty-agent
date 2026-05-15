require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    arcTestnet: {
      type: "http",
      url: "https://rpc.testnet.arc.network",
      chainId: 5042002,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
