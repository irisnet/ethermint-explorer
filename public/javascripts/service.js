const Transaction = require("./transaction");
const irisSvcContract = require("../contract/irisSvcContract");
const transaction = new Transaction();
let contractInstance;
let defEvents;
let bindEvents;
let bindUpdateEvents;
let web3;
const gasLimit = 4300000;
const gasPrice = 20000000000;

function Service(web3js) {
  web3 = web3js;
  let myContract = web3.eth.contract(irisSvcContract);
  contractInstance = myContract.at('0x70f94d58cc3fdcbeac7140f35a087da9fcd09b94');
  defEvents = contractInstance.evtSvcDef([{fromBlock: 0, toBlock: 'latest'}]);
  bindEvents = contractInstance.evtSvcBind([{fromBlock: 0, toBlock: 'latest'}]);
  bindUpdateEvents = contractInstance.evtSvcBindUpdate([{fromBlock: 0, toBlock: 'latest'}]);
}

/**
 * Service Define
 * @param wallet
 * @param cd  service code
 * @param name  service name
 * @param desc  service description
 * @param defType  service definition type
 * @param definition  service definition
 * @param github  github address
 * @returns {Promise}
 */
Service.prototype.defineService = function defineService(wallet, cd, name, desc, defType, definition, github, gasPrice, gasLimit) {
  return new Promise(function (resolve, reject) {
      debugger;
      let data = contractInstance.defineService.getData(cd, name, desc, defType, definition, github);
      let rawTx = {
        nonce: transaction.getNonce(web3, wallet),
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: contractInstance.address,
        value: 0,
        data: data.toString("hex")
      };
      let rowTx = transaction.signTX(wallet, rawTx);
      let serializedTx = rowTx.toString("hex");
      web3.eth.sendRawTransaction('0x' + serializedTx, function (error, result) {
        if (!error) {
          // watch for changes
          defEvents.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                let svc_id = event.args.svcId.toString(10);
                resolve(svc_id);
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
 * Service Bind
 * @param wallet
 * @param svcId  service Id
 * @param bindState  bind State "1: bind/0: unbind"
 * @param auth
 * @param fee
 * @returns {Promise}
 */
Service.prototype.bindService = function bindService(wallet, svcId, bindState, auth, fee,gasPrice,gasLimit) {
  return new Promise(function (resolve, reject) {
      let publicKey = wallet.getPublicKey().toString("hex");
      let data = contractInstance.bindService.getData(svcId, bindState, auth, fee, publicKey);
      let rawTx = {
        nonce: transaction.getNonce(web3, wallet),
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: contractInstance.address,
        value: 0,
        data: data.toString("hex")
      };
      let rowTx = transaction.signTX(wallet, rawTx);
      let serializedTx = rowTx.toString("hex");
      web3.eth.sendRawTransaction('0x' + serializedTx, function (error, result) {
        if (!error) {
          // watch for changes
          bindEvents.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                resolve(event.args.bindId);
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
 * Service Bind Update
 * @param wallet
 * @param svcId  service Id
 * @param bindState  bind State "1: bind/0: unbind"
 * @param auth
 * @param fee
 * @returns {Promise}
 */
Service.prototype.updateSvcBind = function updateSvcBind(wallet, svcId, bindState, auth, fee,gasPrice,gasLimit) {
  return new Promise(function (resolve, reject) {
      let publicKey = wallet.getPublicKey().toString("hex");
      let data = contractInstance.updateSvcBind.getData(svcId, bindState, auth, fee, publicKey);
      let rawTx = {
        nonce: transaction.getNonce(web3, wallet),
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: contractInstance.address,
        value: 0,
        data: data.toString("hex")
      };
      let rowTx = transaction.signTX(wallet, rawTx);
      let serializedTx = rowTx.toString("hex");
      web3.eth.sendRawTransaction('0x' + serializedTx, function (error, result) {
        if (!error) {
          // watch for changes
          bindUpdateEvents.watch(function (error, event) {
            if (!error) {
              if (event.transactionHash === result) {
                resolve(event.args.bindId);
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
 * get Service Define
 * @param svcId
 * @returns {*}
 */
Service.prototype.getSvcDef = function getSvcDef(svcId) {
  try {
    let arry = contractInstance.getSvcDef.call(svcId);
    return {
      addr: arry[0],
      cd: arry[1],
      name: arry[2],
      desc: arry[3],
      defType: arry[4],
      def: arry[5],
      github: arry[6],
      createtime: arry[7].toString(10)
    };
  } catch (err) {
    return {}
  }
};

/**
 * get Service Define List
 * @param skip 跳过的数据项个数
 * @param limit 获取的数据项个数
 * @returns {*}
 */
Service.prototype.getSvcDefList = function getSvcDefList(skip, limit) {
  let total = this.getLatestSvcId().toString(10);
  let data = [];
  if (skip >= total) {
    return {total: total, data: data};
  }
  let last = skip + limit;
  if (last > total) {
    last = total;
  }
  for (let i = skip; i < last; i++) {
    data.push(this.getSvcDef(i + 1));
  }
  return {total: total, data: data};
};

/**
 * get Service Define List Desc
 * @param skip 跳过的数据项个数
 * @param limit 获取的数据项个数
 * @returns {*}
 */
Service.prototype.getSvcDefListDesc = function getSvcDefList(skip, limit) {
  let total = this.getLatestSvcId().toString(10);
  let data = [];
  if (skip >= total || total <= 0) {
    return {total: total, data: data};
  }
  let start = total - skip;
  let end = start - limit;
  if (end < 0) {
    end = 0;
  }
  for (let i = start; i > end; i--) {
    data.push(this.getSvcDef(i));
  }
  return {total: total, data: data};
};


/**
 * get Service Binding
 * @param svcId
 * @returns {*}
 */
Service.prototype.getSvcBind = function getSvcBind(svcId) {
  try {
    let arry = contractInstance.getSvcBind.call(svcId);
    return {
      addr: arry[0],
      state: arry[1].toString(10),
      auth: arry[2],
      fee: arry[3].toString(10),
      publicKey: arry[4],
      createtime: arry[5].toString(10),
      updatetime: arry[6].toString(10)
    }
  } catch (err) {
    return {}
  }
};

/**
 * get Latest Service Id
 * @returns {*}
 */
Service.prototype.getLatestSvcId = function getLatestSvcId() {
  return contractInstance.getLatestSvcId.call();
};

Service.prototype.getSvcDefDetailByCd = function getSvcDefByCd(cd) {
  let id = contractInstance.covertCdToId.call(cd);
  if (id <= 0) {
    return {};
  }
  let result = this.getSvcDef(id);
  result.id = id.toString(10);
  result.svcBind = this.getSvcBind(id);
  return result;
};

Service.prototype.covertCdToId = function covertCdToId(cd) {
  return contractInstance.covertCdToId.call(cd);
};


module.exports = Service;
