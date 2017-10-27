var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');



router.get('/:block', function (req, res, next) {
    var anyObject = req.app.get('anyObject');
    var config = req.app.get('config');
    var web3 = new Web3();
    web3.setProvider(config.provider);

    async.waterfall([
        function (callback) {
            web3.eth.getBlock(req.params.block, true, function (err, result) {
                if (!result) {
                    return next({name: "BlockNotFoundError", message: "Block not found!"});
                }
                callback(err, result, result.transactions);
            });
        }
        // , function (result, callback) {
        //     if (!result) {
        //         return next({name: "BlockNotFoundError", message: "Block not found!"});
        //     }
        //     web3.trace.block(result.number, function (err, traces) {
        //         callback(err, result, traces);
        //     });
        // }
    ], function (err, block, traces) {
        if (err) {
            return next(err);
        }
        block.transactions.forEach(function (tx) {
            tx.traces = [];
            tx.failed = false;
            traces.forEach(function (trace) {
                if (tx.hash === trace.transactionHash) {
                    tx.traces.push(trace);
                    if (trace.error) {
                        tx.failed = true;
                        tx.error = trace.error;
                    }
                }
            });
            //
            // tx.traces = [{
            //     "action": {
            //         "from": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
            //         "to": "0x8be7a6246ac1c73c09ea62ef69d33836434de391",
            //         "value": 10
            //     },
            //     "type": "call"
            // },{
            //     "action":{
            //         "from":"0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
            //         "to":"0x8be7a6246ac1c73c09ea62ef69d33836434de391",
            //         "value":10,
            //         "result":'dasdddddddd'
            //     },
            //     "result":{
            //         "address":"address",
            //     },
            //     "type":"create"
            // },{
            //     "action":{
            //         "from":"0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
            //         "to":"0x8be7a6246ac1c73c09ea62ef69d33836434de391",
            //         "value":10,
            //         "result":'dasdddddddd',
            //         "refundAddress":"xxxxxx",
            //         "balance":30
            //     },
            //     "type":"suicide"
            // }];
        });

        res.render('block', {block: block,head: anyObject.__('head'),language:anyObject.__('block')});
    });

});

router.get('/uncle/:hash/:number', function (req, res, next) {

    var config = req.app.get('config');
    var web3 = new Web3();
    web3.setProvider(config.provider);

    async.waterfall([
        function (callback) {
            web3.eth.getUncle(req.params.hash, req.params.number, true, function (err, result) {
                callback(err, result);
            });
        }, function (result, callback) {
            if (!result) {
                return next({name: "UncleNotFoundError", message: "Uncle not found!"});
            }

            callback(null, result);
        }
    ], function (err, uncle) {
        if (err) {
            return next(err);
        }

        console.log(uncle);

        res.render('uncle', {uncle: uncle, blockHash: req.params.hash});
    });

});

module.exports = router;
