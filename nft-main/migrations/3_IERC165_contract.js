const IERC165 = artifacts.require("ERC165");

module.exports = function(deployer) {
  deployer.deploy(IERC165);
};
