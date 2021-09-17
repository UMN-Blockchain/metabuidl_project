module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    }
  },
  compilers: {
    solc: {
<<<<<<< HEAD
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  },
  enviroments:{
    production: {
      ipfs: {
        address: 'https://ipfs.infura.io:5001',
      }
    }
  }
=======
      version: "0.8.3",
    },
  },
>>>>>>> 2e5f97d0ffaaf3b4d3f02bca2a1eb408a4e8c2eb
};
