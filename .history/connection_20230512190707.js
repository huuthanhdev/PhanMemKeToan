var mysql = require("mysql2");

var mysql = require('mysql2');
    
var con = mysql.createConnection({
 host: "localhost",
 user: "huuthanh",
 password: "Thanh0508@",
 database: "ketoandoanhthu"
});
    
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
});

// config = {
//     // conLimit: 151,
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"college"
// };
// var con= mysql.createPool(config);

module.exports = con;
