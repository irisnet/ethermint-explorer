/**
 * Created by vincent on 2017/10/27.
 */
const DECRYPT_MODE = 16;
var password = '1234';
data = {
    "address": "7eff122b94897ea5b0e2a9abf47b86337fafebdc",
    "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "19de8a919e2f4cbdde2b7352ebd0be8ead2c87db35fc8e4c9acaf74aaaa57dad",
        "cipherparams": {"iv": "ba2bd370d6c9d5845e92fbc6f951c792"},
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "n": 262144,
            "p": 1,
            "r": 8,
            "salt": "c7cc2380a96adc9eb31d20bd8d8a7827199e8b16889582c0b9089da6a9f58e84"
        },
        "mac": "ff2c0caf051ca15d8c43b6f321ec10bd99bd654ddcf12dd1a28f730cc3c13730"
    },
    "id": "f86a62b4-0621-4616-99af-c4b7f38fcc48",
    "version": 3
};

decrypt('1234',data);

/**
 * 解密
 * @param password
 * @param data
 */
function decrypt(password, data) {
    var kdfparams = data.crypto.kdfparams;
    scrypt(password, hexToBytes(kdfparams.salt),{
        N: kdfparams.n,
        r: kdfparams.r,
        p: kdfparams.p,
        dkLen: kdfparams.dklen
    },function (derivedKey) {
        var iv = hexToBytes(data.crypto.cipherparams.iv);
        var encryptKey = [];
        for (var i = 0; i < 16; i++) {
            encryptKey.push(derivedKey[i]);
        }
        var counter = new aesjs.Counter(DECRYPT_MODE);
        counter.setBytes(iv);
        var aesCtr = new aesjs.ModeOfOperation.ctr(encryptKey, counter);
        var cipherBytes = hexToBytes(data.crypto.ciphertext);
        var decryptedBytes = aesCtr.decrypt(cipherBytes);
        console.log(bytesToHex(decryptedBytes));
    });
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}


