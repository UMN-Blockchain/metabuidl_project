const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");

let hdWalletProvider;

const setupWallet = (url) => {
  if (!hdWalletProvider) {
    hdWalletProvider = new HDWalletProvider(process.env.privatekey, url);
    hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider());
  }
  return hdWalletProvider;
};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 1000000,
    },

    aurora: {
      provider: () => setupWallet("https://testnet.aurora.dev"),
      network_id: 0x4e454153,
      gas: 10000000,
      from: "0x25cA509D99c8B5F2e08B317117479D3d2006484B",
    },
  },
};
