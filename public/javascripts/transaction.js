/**
 * Created by vincent on 2017/11/6.
 */
const ethereumTx  = require('ethereumjs-tx');
const ethUtil = require('ethereumjs-util');

function Transaction() {

}

Transaction.prototype.getNonce = function getNonce(web3 , wallet) {
  let buf = ethUtil.toBuffer(wallet.getAddress());
  return web3.eth.getTransactionCount('0x' + buf.toString('hex'));
};

Transaction.prototype.signTX =  function signTX(wallet , rawTx){
  let privateKey = wallet.getPrivateKey();
  let tx = new ethereumTx(rawTx);
  tx.sign(privateKey);
  return tx.serialize().toString('hex');
};

Transaction.prototype.sendTx = function sendTx(web3 , serializeTx) {
  return web3.eth.sendRawTransaction(serializeTx);
};

module.exports = Transaction;



