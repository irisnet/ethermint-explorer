Service = require('./service.js');
var service = new Service();
var async = require('async');
console.log(service.unlockAccount());
// test_get_svc_def_list();
test_svc_def(9);
// test_svc_bind();
// test_get_svc_def_list();
// test_svc_bind_update();
// test_get_svc_bind_by_id();
// test_get_svc_def_by_id();
// test_get_svc_def_by_code();

function test_svc_def(i) {
    var _svc_cd = "BJ00" + i;
    var _svc_name = "测试服务";
    var _description = "测试";
    var _svc_def_type = "type001";
    var _github = "xxxx3";
    var _svc_def = "xxxx1";


    var _auth = "*";
    var _block_type = "ethereum";

    service.svc_def(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description)
        .then(function (val) {
            console.log('val', val);
            test_svc_def(++i);
        }, function (error) {
            console.log('error', error);
        });
    // for (var i = 7; i < 1000; i++) {
    //     var _svc_cd = "BJ00" + i;
    //     var _svc_def_type = "type001";
    //     var _svc_def = "xxxx1";
    //     var _auth = "xxxx2";
    //     var _github = "xxxx3";
    //     var _block_type = "xxxx4";
    //     var _svc_name = "测试服务";
    //     var _description = "测试";
    //     service.svc_def(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description)
    //         .then(function (val) {
    //             console.log('val', val);
    //         }, function (error) {
    //             console.log('error', error);
    //         });
    // }
}


function test_svc_bind() {
    var _svc_cd = "BJ007";
    var _bind_address = "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc";
    var _action = "aaa";
    var _fee = 100;
    var _scope = "test";
    var _block_type = "E";
    var _public_key = "3ba7836b9f2d366711c16de2e2251690439481b1650cdb1219d7ea51390ba402a";
    service.svc_bind(_svc_cd, _bind_address, _action, _fee, _scope, _block_type, _public_key)
        .then(function (val) {
            console.log('val', val);
        }, function (error) {
            console.log('error', error);
        });
}

function test_svc_bind_update() {
    var _svc_cd = "BJ007";
    var _action = "aaa";
    var _fee = 10000;
    service.svc_bind_update(_svc_cd, _action, _fee)
        .then(function (val) {
            console.log('val', val);
        }, function (error) {
            console.log('error', error);
        });
}


function test_get_svc_def_list() {
    var result = service.get_svc_def_list();
    var limit_result = service.get_svc_def_list_limit(0, 1);
    console.log('service def list result:', result);
    console.log('service def list limit_result', limit_result);
}

function test_get_svc_def_by_id() {
    var result = service.get_svc_def_by_id(1);
    console.log(result);
}

function test_get_svc_def_by_code() {
    var result = service.get_svc_def("BJ007");
    console.log(result);
}

function test_get_svc_bind_by_id() {
    var result = service.get_svc_bind_by_id(1);
    console.log(result);
}
