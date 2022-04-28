const KriptoBird = artifacts.require("./KryptoBirdz.sol");

module.exports = function(deployer) {
  deployer.deploy(KriptoBird);
};
