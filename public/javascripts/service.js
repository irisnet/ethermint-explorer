const Web3 = require("web3");
const Transaction = require("./transaction");
const irisSvcContract = require("../contract/irisSvcContract");

const httpUri = "http://10.10.0.1:8546";
const web3 = new Web3(new Web3.providers.HttpProvider(httpUri));

const transaction = new Transaction();
const myContract = web3.eth.contract(irisSvcContract);

const contractInstance = myContract.at('0x1645adf21f42f202a2f1bc4b5a1d200d2d54118c');

const defEvents = contractInstance.evtSvcDef([{fromBlock: 0, toBlock: 'latest'}]);
const bindEvents = contractInstance.evtSvcBind([{fromBlock: 0, toBlock: 'latest'}]);
const bindUpdateEvents = contractInstance.evtSvcBindUpdate([{fromBlock: 0, toBlock: 'latest'}]);

const events = contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

events.watch(function (error, event) {
  console.log("events result", event);
  if (!error) {
    console.log(event.transactionHash);
  }
});


const gasLimit = 4300000;
const gasPrice = 20000000000;

function Service() {

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
Service.prototype.defineService = function defineService(wallet, cd, name, desc, defType, definition, github) {
  return new Promise(function (resolve, reject) {
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
Service.prototype.bindService = function bindService(wallet, svcId, bindState, auth, fee) {
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
Service.prototype.updateSvcBind = function updateSvcBind(wallet, svcId, bindState, auth, fee) {
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
 * get Service Binding
 * @param svcId
 * @returns {*}
 */
Service.prototype.getSvcBind = function getSvcBind(svcId) {
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
};

/**
 * get Latest Service Id
 * @returns {*}
 */
Service.prototype.getLatestSvcId = function getLatestSvcId() {
  return contractInstance.getLatestSvcId.call();
};


module.exports = Service;
