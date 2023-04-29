var mysql = require("mysql");

config = {
    conLimit: 50,
    host:"localhost",
    user:"root",
    password:"",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
