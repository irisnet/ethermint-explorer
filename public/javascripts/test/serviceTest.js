/**
 * Created by vincent on 2017/11/6.
 */
var Web3 = require('web3');
var Wallet = require('../wallet');
var Transaction = require("../transaction");
var transaction = new Transaction();

const httpUri = "http://10.10.0.1:8545";

const web3 = new Web3(new Web3.providers.HttpProvider(httpUri));
var fileContent = '{"address":"7eff122b94897ea5b0e2a9abf47b86337fafebdc","crypto":{"cipher":"aes-128-ctr","ciphertext":"19de8a919e2f4cbdde2b7352ebd0be8ead2c87db35fc8e4c9acaf74aaaa57dad","cipherparams":{"iv":"ba2bd370d6c9d5845e92fbc6f951c792"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"c7cc2380a96adc9eb31d20bd8d8a7827199e8b16889582c0b9089da6a9f58e84"},"mac":"ff2c0caf051ca15d8c43b6f321ec10bd99bd654ddcf12dd1a28f730cc3c13730"},"id":"f86a62b4-0621-4616-99af-c4b7f38fcc48","version":3}';
const myContract = web3.eth.contract([{
  "constant": false,
  "inputs": [{"name": "bind_addr", "type": "address"}],
  "name": "get_svc_fee",
  "outputs": [{"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_svc_cd", "type": "string"}],
  "name": "get_svc_def",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_svc_id", "type": "uint256"}],
  "name": "get_svc_def_by_id",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "customer", "type": "address"}, {"name": "data", "type": "string"}],
  "name": "callbackService",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "bind_id", "type": "uint256"}],
  "name": "get_svc_bind_by_id",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_svc_cd", "type": "string"}, {"name": "_bind_address", "type": "address"}, {
    "name": "_action",
    "type": "string"
  }, {"name": "_fee", "type": "uint256"}, {"name": "_scope", "type": "string"}, {
    "name": "_block_type",
    "type": "string"
  }, {"name": "_public_key", "type": "string"}],
  "name": "svc_bind",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_svc_cd", "type": "string"}, {"name": "_action", "type": "string"}, {
    "name": "_fee",
    "type": "uint256"
  }],
  "name": "svc_bind_update",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "skip", "type": "uint256"}, {"name": "limit", "type": "uint256"}],
  "name": "get_svc_def_list_limit",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_svc_cd", "type": "string"}, {"name": "_svc_def_type", "type": "string"}, {
    "name": "_svc_def",
    "type": "string"
  }, {"name": "_auth", "type": "string"}, {"name": "_github", "type": "string"}, {
    "name": "_block_type",
    "type": "string"
  }, {"name": "_svc_name", "type": "string"}, {"name": "_description", "type": "string"}],
  "name": "svc_def",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "get_svc_def_list",
  "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "service", "type": "address"}, {"name": "data", "type": "string"}],
  "name": "callService",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
    "indexed": false,
    "name": "svc_id",
    "type": "uint256"
  }],
  "name": "evt_svc_def",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
    "indexed": false,
    "name": "result",
    "type": "bool"
  }],
  "name": "evt_svc_bind",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
    "indexed": false,
    "name": "result",
    "type": "bool"
  }],
  "name": "evt_svc_bind_update",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "consumer", "type": "address"}, {
    "indexed": false,
    "name": "provider",
    "type": "address"
  }, {"indexed": false, "name": "data", "type": "string"}],
  "name": "notify_consumer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "name": "consumer", "type": "address"}, {
    "indexed": false,
    "name": "provider",
    "type": "address"
  }, {"indexed": false, "name": "data", "type": "string"}],
  "name": "notify_provider",
  "type": "event"
}]);

const contractInstance = myContract.at('0x6ddba2e46bd3b051fcf124e97e42f52d31a57cf4');

var _svc_cd = "BJ000008";
var _svc_name = "测试服务";
var _description = "测试";
var _svc_def_type = "type001";
var _github = "xxxx3";
var _svc_def = "xxxx1";


var _auth = "*";
var _block_type = "ethereum";

var wallet = Wallet.getWalletFromPrivKeyFile(fileContent, '1234');
var ethUtil = require('ethereumjs-util');
console.log("Address :", ethUtil.bufferToHex(wallet.getAddress()));
console.log("PrivateKey :", wallet.getPrivateKey().toString("hex"));
console.log("PublicKey :", wallet.getPublicKey().toString("hex"));
var getData = contractInstance.svc_def.getData(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description);
console.log("getData ", getData.toString("hex"));

var rawTx = {
  nonce: transaction.getNonce(web3, wallet),
  gasPrice: 20000000000,
  gasLimit: 4300000,
  to: '0x6ddba2e46bd3b051fcf124e97e42f52d31a57cf4',
  value: 0,
  data: getData.toString("hex")
}
//
var rowTx = transaction.signTX(wallet, rawTx);
var serializedTx = rowTx.toString("hex");

var def_events = contractInstance.evt_svc_def([{fromBlock: 0, toBlock: 'latest'}]);

def_events.watch(function (error, event) {
  if (!error) {
    var svc_id = event.args.svc_id.toString(10);
    console.log("defResult", svc_id);
  } else {
    console.log(error)
  }
});

// web3.eth.sendRawTransaction('0x' + serializedTx, function (err, hash) {
//   if (!err)
//     console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
// });

var Service = require("../service");
var service = new Service();

test_svc_def(10000)
function test_svc_def(i) {
  var _svc_cd = "BJ00" + i;
  var _svc_name = "测试服务";
  var _description = "测试";
  var _svc_def_type = "type001";
  var _github = "xxxx3";
  var _svc_def = "xxxx1";


  var _auth = "*";
  var _block_type = "ethereum";

  service.svc_def(wallet, _svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description)
    .then(function (val) {
      console.log('val', val);
    }, function (error) {
      console.log('error', error);
    });
}

