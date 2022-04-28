
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  },
  
  contracts_directory: './src/contract',
  contracts_build_directory: './src/abis',
 
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",  
      optmizer:{
        enable: 'true',
        runs: 200,
      }
    }
  },
};
