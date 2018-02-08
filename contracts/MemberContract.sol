pragma solidity ^0.4.17;

contract MemberContract {

	struct Member {
		string firstname;
		string lastname;
		string email;
		int age;
		bool exists;
	}

    mapping(address => Member) members;

	function signUp(string firstname, string lastname, string email, int age) public memberNotExsist returns(string, string, string, int) {
		members[msg.sender] = Member({firstname: firstname, lastname: lastname, email: email, age: age, exists: true});
		return (members[msg.sender].firstname, members[msg.sender].lastname, members[msg.sender].email, members[msg.sender].age);
	}

	function update(string firstname, string lastname, string email, int age) memberExsist public returns(Member) {
		members[msg.sender].firstname = firstname;
		members[msg.sender].lastname = lastname;
		members[msg.sender].email = email;
		members[msg.sender].age = age;

		return members[msg.sender];
	}
	
	function getMember() public constant returns(string, string, string, int) {
    	return (members[msg.sender].firstname, members[msg.sender].lastname, members[msg.sender].email, members[msg.sender].age);
	}

	function signIn() public constant memberExsist returns(bool) {
		return true;		
	}
	
	modifier memberExsist() {
		require(members[msg.sender].exists == true);
		_;
	}

	modifier memberNotExsist() {
		require(members[msg.sender].exists != true);
		_;
	}
}
