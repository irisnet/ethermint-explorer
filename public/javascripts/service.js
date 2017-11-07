var Web3 = require('web3');
const httpUri = "http://10.10.0.1:8546";
const web3 = new Web3(new Web3.providers.HttpProvider(httpUri));
var Transaction = require("./transaction");
var transaction = new Transaction();
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

const def_events = contractInstance.evt_svc_def([{fromBlock: 0, toBlock: 'latest'}]);
const bind_events = contractInstance.evt_svc_bind([{fromBlock: 0, toBlock: 'latest'}]);
const evt_svc_bind_update = contractInstance.evt_svc_bind_update([{fromBlock: 0, toBlock: 'latest'}]);

// var events = contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
//
// events.watch(function (error, result) {
//   console.log("result", result);
//   var tx = web3.eth.getTransaction(result.transactionHash);
//   console.log(tx);
// });


const gas_limit = 4300000;

function Service() {

}

/**
 * 服务定义
 * @param _svc_cd
 * @param _svc_def_type
 * @param _svc_def
 * @param _auth
 * @param _github
 * @param _block_type
 * @param _svc_name
 * @param _description
 */
Service.prototype.svc_def = function (wallet, _svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description) {
  return new Promise(function (resolve, reject) {
      var data = contractInstance.svc_def.getData(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description);
      var rawTx = {
        nonce: transaction.getNonce(web3, wallet),
        gasPrice: 20000000000,
        gasLimit: 4300000,
        to: '0x6ddba2e46bd3b051fcf124e97e42f52d31a57cf4',
        value: 0,
        data: data.toString("hex")
      }
      var rowTx = transaction.signTX(wallet, rawTx);
      var serializedTx = rowTx.toString("hex");
      web3.eth.sendRawTransaction('0x' + serializedTx, function (error, result) {
        if (!error) {
          // watch for changes
          def_events.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                var svc_id = event.args.svc_id.toString(10);
                if (svc_id === '0') {
                  reject("service code already exists");
                } else {
                  resolve(svc_id);
                }
              }
            } else {
              reject(error);
            }
          });
        } else {
          reject(error);
        }
      });
    }
  )
};

/**
 * 服务绑定
 * @param _svc_cd
 * @param _bind_address
 * @param _action
 * @param _fee
 * @param _scope
 * @param _block_type
 * @param _public_key
 */
Service.prototype.svc_bind = function svc_bind(_svc_cd, _bind_address, _action, _fee, _scope, _block_type, _public_key) {
  return new Promise(function (resolve, reject) {
      contractInstance.svc_bind(_svc_cd, _bind_address, _action, _fee, _scope, _block_type, _public_key, {
        from: web3.eth.accounts[0], gas: gas_limit
      }, function (error, result) {
        if (!error) {
          // watch for changes
          bind_events.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                resolve(event.args.result);
              }
            } else {
              reject(error);
            }
          });
        } else {
          reject(error);
        }
      });
    }
  )
};

/**
 * 服务绑定更新
 */
Service.prototype.svc_bind_update = function svc_bind_update(_svc_cd, _action, _fee) {
  return new Promise(function (resolve, reject) {
      contractInstance.svc_bind_update(_svc_cd, _action, _fee, {
        from: web3.eth.accounts[0], gas: gas_limit
      }, function (error, result) {
        if (!error) {
          // watch for changes
          evt_svc_bind_update.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                resolve(event.args.result);
              }
            } else {
              reject(error);
            }
          });
        } else {
          reject(error);
        }
      });
    }
  )
};

/**
 * 服务定义列表
 * @returns {*}
 */
Service.prototype.get_svc_def_list = function get_svc_def_list() {
  return contractInstance.get_svc_def_list.call();
};

/**
 * 服务定义列表
 * @param skip 跳过的数据项个数
 * @param limit 获取的数据项个数
 * @returns {*}
 */
Service.prototype.get_svc_def_list_limit = function get_svc_def_list(skip, limit) {
  return contractInstance.get_svc_def_list_limit.call(skip, limit);
};

/**
 * 通过id查询服务定义
 * @param id
 * @returns {*}
 */
Service.prototype.get_svc_def_by_id = function get_svc_def_by_id(id) {
  return contractInstance.get_svc_def_by_id.call(id);
};

/**
 * 通过code查询服务定义
 * @param id
 * @returns {*}
 */
Service.prototype.get_svc_def = function get_svc_def(code) {
  return contractInstance.get_svc_def.call(code);
};

/**
 * 通过id查询服务绑定
 * @param id
 * @returns {*}
 */
Service.prototype.get_svc_bind_by_id = function get_svc_bind_by_id(id) {
  return contractInstance.get_svc_bind_by_id.call(id);
};

/**
 *  unlock account
 */
Service.prototype.unlockAccount = function unlockAccount() {
  return web3.personal.unlockAccount(web3.eth.accounts[0], '1234');
};

module.exports = Service;
