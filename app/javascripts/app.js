import "../stylesheets/app.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import member_artifact from '../../build/contracts/MemberContract.json'

var Member = contract(member_artifact);

window.App = {
  start: () => {
    var self = this;

    web3.eth.getCoinbase((error, coinbase) => {
      
      if (error) {
        console.error(error);
      }
      var member;
      Member.deployed().then(instance => {
        member = instance;
        return member.signIn.call({from: coinbase});
      }).then(accountExist => {
        if(accountExist.valueOf() == true) {
          window.location.replace("http://127.0.0.1:8080/profile.html");
        }
      })
    })
  },

  profile: () => {
    showProfile();
  },

  edit: () => {
    removeChildren();
    document.getElementById("getfirstname").appendChild(createInput("getfirstname"));
    document.getElementById("getlastname").appendChild(createInput("getlastname"));
    document.getElementById("getemail").appendChild(createInput("getemail"));
    document.getElementById("getage").appendChild(createInput("getage"));
    document.getElementById("edit").innerHTML = "Submit!";
    document.getElementById("edit").setAttribute("onclick", "App.submit()");

  },

  submit: () => {
    var firstname = document.getElementById("getfirstnameinput").value;
    var lastname = document.getElementById("getlastnameinput").value; 
    var email = document.getElementById("getemailinput").value; 
    var age = parseInt(document.getElementById("getageinput").value);

    var member;

    web3.eth.getCoinbase((error, address) => {
      
      if (error) {
        console.error(error);
      }

      Member.deployed().then(instance => {
        member = instance;
        return member.update(firstname, lastname, email, age, {from: address});
      }).then(() => {
        return new Promise(resolve => setTimeout(resolve, 4000)); //Wait for rerender..
      }).then(() => {
        removeChildren();
        document.getElementById("edit").innerHTML = "Edit profile";
        document.getElementById("edit").setAttribute("onclick", "App.edit()");
        showProfile();
      })
    })
  },

  signUp: () => {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value; 
    var email = document.getElementById("email").value; 
    var age = parseInt(document.getElementById("age").value);

    var member;

    web3.eth.getCoinbase((error, address) => {
      
      if (error) {
        console.error(error);
      }

      Member.deployed().then(instance => {
        member = instance;
        return member.signUp(firstname, lastname, email, age, {from: address});
      }).then(() => {
        window.location.replace("http://127.0.0.1:8080/profile.html");
      })
    })
  }
};

var showProfile = () => {
  var member;
    
  web3.eth.getCoinbase((error, coinbase) => {
    
    if (error) {
      console.error(error);
    }

    Member.deployed().then(instance => {
      member = instance;
      return member.getMember.call({from: coinbase});
    }).then(member => {
      document.getElementById("getfirstname").appendChild(createLabel(member[0]));
      document.getElementById("getlastname").appendChild(createLabel(member[1]))
      document.getElementById("getemail").appendChild(createLabel(member[2]))
      document.getElementById("getage").appendChild(createLabel(member[3]))
    });
  });
}

var removeChildren = () => {
  document.getElementById("getfirstname").removeChild(document.getElementById("getfirstname").firstChild);
  document.getElementById("getlastname").removeChild(document.getElementById("getlastname").firstChild);
  document.getElementById("getemail").removeChild(document.getElementById("getemail").firstChild);
  document.getElementById("getage").removeChild(document.getElementById("getage").firstChild);
}

var createLabel = text => {
  var label = document.createElement("label")
  label.innerHTML = text;
  return label;
}

var createInput = id => {
  var input = document.createElement("input");
  input.setAttribute("id", id + "input");
  return input;
}

window.addEventListener('load', () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
  Member.setProvider(web3.currentProvider);
  if (window.location != "http://127.0.0.1:8080/profile.html") {
    App.start();
  } else {
    App.profile();
  }
  
});
