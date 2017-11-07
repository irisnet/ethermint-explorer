/**
 * Created by vincent on 2017/11/6.
 */
var ethereumTx  = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');

function Transaction() {

}

Transaction.prototype.getNonce = function getNonce(web3 , wallet) {
  var buf = ethUtil.toBuffer(wallet.getAddress());
  return web3.eth.getTransactionCount('0x' + buf.toString('hex'));
}


Transaction.prototype.signTX =  function signTX(wallet , rawTx){
  var privateKey = wallet.getPrivateKey();
  var tx = new ethereumTx(rawTx);
  tx.sign(privateKey);
  return tx.serialize().toString('hex');
}

Transaction.prototype.sendTx = function sendTx(web3 , serializeTx) {
  return web3.eth.sendRawTransaction(serializeTx);
}

module.exports = Transaction;



