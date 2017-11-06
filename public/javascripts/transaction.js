/**
 * Created by vincent on 2017/11/6.
 */
var EthereumTx  = require('ethereumjs-tx');

function Transaction() {

}

Transaction.prototype.signTX =  function signTX(wallet , rawTx){
  var privateKey = wallet.getPrivateKey();
  var tx = new EthereumTx(rawTx);
  tx.sign(privateKey);
  return tx.serialize();
}

module.exports = Transaction;



