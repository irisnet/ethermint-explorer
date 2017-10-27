var async = require('async');

var Web3 = require('web3');

var httpUri = "http://127.0.0.1:8545";

var web3 = new Web3(new Web3.providers.HttpProvider(httpUri));

var myContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"documentHashMap","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"newDocument","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"doc_id","type":"uint256"}],"name":"getDocument","outputs":[{"name":"blockNumber","type":"uint256"},{"name":"hash","type":"bytes32"},{"name":"from","type":"address"},{"name":"to","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatestDocId","outputs":[{"name":"latest","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"history","outputs":[{"name":"blockNumber","type":"uint256"},{"name":"hash","type":"bytes32"},{"name":"from","type":"address"},{"name":"to","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"usedHashes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"recipient","type":"address"}],"name":"transferDocument","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"empty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"}],"name":"isDocumentExists","outputs":[{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"}],"name":"DocumentEvent","type":"event"}]);

var contractInstance = myContract.at('0xf532e77db1f10a18f364120cc3a633673e556b1b');

// var event = contractInstance.DocumentEvent();

// // watch for changes
// event.watch(function(error, result){
//     // result will contain various information
//     // including the argumets given to the Deposit
//     // call.
//     if (!error)
//         console.log(result);
//     else
//         console.log("error: " + error);
// });
//
// // Or pass a callback to start watching immediately
// // var event = clientReceipt.Deposit(function(error, result) {
// //     if (!error)
// //         console.log(result);
// // });

web3.personal.unlockAccount("0x7eff122b94897ea5b0e2a9abf47b86337fafebdc", "1234");
async.waterfall([
    function (callback) {
        var success = contractInstance.newDocument("b127ed457b703dac2e1fcba471698746", {from: web3.eth.coinbase, gas: 1800000});
        console.log(success);
        callback(null, success);
    },
    function (success, callback) {
        var exists = contractInstance.isDocumentExists("b127ed457b703dac2e1fcba471698746", {from: web3.eth.coinbase, gas: 1800000});
        console.log(exists);
        callback(null, exists);
    },
    function (exists, callback) {
        var success = contractInstance.transferDocument("b127ed457b703dac2e1fcba471698746", "0x3ddfae96dbc57a613215b071a64cf522391b7411", {from: web3.eth.coinbase, gas: 1800000});
        console.log(success);
        callback(null, success);
    }
], function (err, result) {
    // result now equals 'done'
    // console.log(result);
});
