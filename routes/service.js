var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
Service = require('../service/service.js');
var service = new Service();

router.get('/', function (req, res, next) {
    var anyObject = req.app.get('anyObject');
    res.render('service', {head: anyObject.__('head'), language: anyObject.__('service')});
});
router.get('/page/:page', function (req, res) {
    var page = (req.params.page - 1) * 10;
    var list = service.get_svc_def_list_limit(page, 10);
    res.send(list);
});
router.post('/save', function (req, res) {
    var model = req.body["model[]"];
    // if(model.length!=)
    if (model.length !== 6) {
        res.send('参数错误')
        return;
    }
    var _svc_cd = model[0];
    var _svc_name = model[1];
    var _description = model[2];
    var _svc_def_type = model[3];
    var _github = model[4];
    var _svc_def = model[5];

    var _auth = "*";
    var _block_type = "ethereum";

    service.svc_def(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description)
        .then(function (val) {
            res.send('成功')
        }, function (error) {
            res.send('错误')
        });

});

router.get('/detail/:id', function (req, res, next) {
    console.log(req.params.id);
    var anyObject = req.app.get('anyObject');
    var list = JSON.parse(service.get_svc_def_by_id(req.params.id));
    list.createtime = getDate(list.createtime);
    list.updatetime = getDate(list.updatetime);
    console.log(list);
    if (list.svc_bind.createtime) {
        list.svc_bind.createtime = getDate(list.svc_bind.createtime);
        list.svc_bind.updatetime = getDate(list.svc_bind.updatetime);
    }
    res.render('service_detail', {head: anyObject.__('head'), language: anyObject.__('service_detail'), model: list});
});

function getDate(date) {
    var date = new Date(date * 1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}

module.exports = router;