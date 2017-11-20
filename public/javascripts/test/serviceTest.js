/**
 * Created by vincent on 2017/11/6.
 */
const Web3 = require("web3");
const irisSvcContract = require("../../contract/irisSvcContract");
const Wallet = require("../wallet");

const httpUri = "http://116.62.62.39:8546";
const web3 = new Web3(new Web3.providers.HttpProvider(httpUri));
const wallet = Wallet.fromPrivateKey('0ce9f0b80483fbae111ac7df48527d443594a902b00fc797856e35eb7b12b4be');

const Service = require("../service");
const service = new Service(web3);

web3.eth.filter("pending").watch(
  function(error,result){
    if (!error) {
      console.log('pending', result);
    }
  }
);


const i = 2;
defineServiceTest(i);

// let svcDef = service.getSvcDefDetailByCd('Code');
// console.log(svcDef);
// let svcDefList = service.getSvcDefList(2,1);
// console.log(svcDefList);
// bindServiceTest(i);
// let svcBind = service.getSvcBind(i);
// console.log(svcBind);
// updateSvcBindTest(i);
// svcBind = service.getSvcBind(i);
// console.log(svcBind);

function defineServiceTest(i) {
  let cd = "BJ00" + i;
  let name = "测试服务";
  let desc = "测试";
  let defType = "type001";
  let github = "xxxx3";
  let definition = "xxxx1";

  service.defineService(wallet, cd, name, desc, defType, definition, github,20000000000 ,4300000)
    .then(function (val) {
      console.log('val', val);
    }, function (error) {
      console.log('error', error);
    });

}

function bindServiceTest(i) {
  let svcId = i;
  let bindState = i;
  let auth = "权限";
  let fee = 100;

  service.bindService(wallet, svcId, bindState, auth, fee)
    .then(function (val) {
      console.log('val', val);
    }, function (error) {
      console.log('error', error);
    });
}

function updateSvcBindTest(i) {
  let svcId = i;
  let bindState = i + 1;
  let auth = "权限" + i;
  let fee = 100 + 1;

  service.updateSvcBind(wallet, svcId, bindState, auth, fee)
    .then(function (val) {
      console.log('val', val);
    }, function (error) {
      console.log('error', error);
    });
}

