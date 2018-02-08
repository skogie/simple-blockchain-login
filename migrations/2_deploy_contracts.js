var MemberContract = artifacts.require("./MemberContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MemberContract);
};
