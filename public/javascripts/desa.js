/**
 * Created by vincent on 2017/10/20.
 */
var elliptic = require('elliptic');
var keythereum = require("keythereum");
var EC = elliptic.ec;
var ec = new EC('secp256k1');

// Generate keys
var pri_key1 = "3644bb6f64dd1e73db2dd5d571c131d2172ade78573b00671e77179827bc7e78";
var pri_key2 = "0ce9f0b80483fbae111ac7df48527d443594a902b00fc797856e35eb7b12b4be";

var pub_key1 = getPubFromPrivate(pri_key1);
var pub_key2 = getPubFromPrivate(pri_key2);
var key1 = ec.keyFromPrivate(pri_key1, "hex");
var key2 = ec.keyFromPrivate(pri_key2, "hex");
console.log('private1:  ' + key1.getPrivate('hex'));
console.log('public1:   ' + key1.getPublic('hex'));
console.log('private2:  ' + key2.getPrivate('hex'));
console.log('public2:   ' + key2.getPublic('hex'));
console.log(pub_key1);
console.log(pub_key2);

var shared1 = key1.derive(key2.getPublic());
var shared2 = key2.derive(key1.getPublic());
console.log('Both shared secrets are BN instances');
console.log(shared1.toString(16));
console.log(shared2.toString(16));

function getPubFromPrivate(privateKey) {
    var key = ec.keyFromPrivate(privateKey, "hex");
    return key.getPublic('hex')
}



var datadir = "./";
var keyObject = keythereum.importFromFile("0x7eff122b94897ea5b0e2a9abf47b86337fafebdc", datadir);
console.log(keyObject);