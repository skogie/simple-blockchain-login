var MemberContract = artifacts.require("./MemberContract.sol");

contract('MemberContract', function(accounts) {
  it("getMember should return correct member after signing up", function() {
    var member;

    return MemberContract.deployed().then(function(instance) {
      member = instance;
      member.signUp("Simen", "Skoglund", "simen.skoglund@gmail.com", 21, {from: accounts[0]});
    }).then(function() {
      return member.getMember.call({from: accounts[0]});
    }).then(function(memberArray) {
      assert.equal("Simen", memberArray[0], "Firstname from ledger should be Simen");
      assert.equal("Skoglund", memberArray[1], "Lastname from ledger should be Skoglund")
      assert.equal("simen.skoglund@gmail.com", memberArray[2], "Email from ledger should be simen.skoglund@gmail.com")
      assert.equal(21, memberArray[3], "Age from ledger should be 21")
    });
  });
});

