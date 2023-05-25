var mysql = require("mysql");

config = {
    conLimit: 100,
    host:"localhost",
    user:"root",
    password:"",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
