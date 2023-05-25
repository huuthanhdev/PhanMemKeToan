var mysql = require("mysql2");

config = {
    // conLimit: 151,
    host:"localhost",
    user:"huuthanh",
    password:"Thanh0508@",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
