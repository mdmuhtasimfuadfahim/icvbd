const keythereum = require('keythereum');
var account = "0x2c10f7ac1a61968ec2df0554fde9dba239355d3b";
var pass = "ornab2";

var keyObject = keythereum.importFromFile(account, "./blockchain/data");
var privateKey = keythereum.recover(pass, keyObject);
console.log(privateKey.toString('hex'));