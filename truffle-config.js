// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      gas: 4700000,
      gasPrice: 10000000000, // 10 gwei
      host: "localhost",
      port: 8545,
      network_id: "4"
    }
  }
}