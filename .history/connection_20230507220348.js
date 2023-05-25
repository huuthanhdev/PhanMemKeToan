var mysql = require("mysql");

config = {
    conLimit: 100,
    host:"localhost",
    user:"root",
    password:"123456",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
