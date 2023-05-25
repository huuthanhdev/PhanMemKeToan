var mysql = require("mysql");

config = {
    conLimit: 151,
    host:"HUUTHANH",
    user:"huuthanh",
    password:"Thanh0508@",
    database:"college"
};
var con= mysql.createPool(config);

module.exports = con;
