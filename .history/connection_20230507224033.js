var mysql = require("mysql2");

config = {
    // conLimit: 151,
    host:"localhost",
    user:"root",
    password:"",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
