## init
Based on truffles webpack box, initialized with ```truffle unbox webpack```

## Requirements
Node 6+  
MetaMask  
Truffle  

## run
Install dependencies with ```npm install```  
Start the truffle blockchain with ```truffle develop```  
Run ```migrate```  
Start the frontend with ```npm run dev```  
Set MetaMask to custom RPC on address ```http://localhost:9545``` and generate account with seed ```candy maple cake sugar pudding cream honey rich smooth crumble sweet treat```  

## debugging
Working with MetaMask and ```truffle develop``` might cause problems, and require you to reinstall metamask each time the blockchain is deployed.  

## test
There is one js-test in ```test/membertest.js```  
Start testrpc on port 7545 and run ```truffle test```

