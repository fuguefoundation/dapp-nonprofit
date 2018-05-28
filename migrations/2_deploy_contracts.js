var Board = artifacts.require("./BoardOfDirectors.sol");
var FF = artifacts.require("./FugueFoundation.sol");
var Token = artifacts.require("./AdvancedToken.sol");

module.exports = function(deployer, network, accounts) {
  console.log(`${"-".repeat(30)}
DEPLOYING FUGUE FOUNDATION CONTRACTS...\n`)

  deployer.deploy(Board, 0, 0, 0);
  deployer.deploy(FF);
  deployer.deploy(Token, 21, "Fugue", "XFF")
};
