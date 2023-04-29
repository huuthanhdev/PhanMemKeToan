var con = require("./connection");

// con.connect(function(error){
//     if (error) throw error;

//     con.query("select * from students", function(error, result){
//         if (error) throw  error;
//         console.log(result);
//     });
// });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { Router } = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/pages',function(req, res){
    res.sendFile(__dirname+'../pages/customer.html');
});
app.post('/', function(req, res)  {
    var customerName = req.body.customerName;
    var taxId = req.body.taxId;
    var customerType = req.body.customerType;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    con.getConnection(function(err){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO customer(customerName, taxId, customerType, email, phone, address) VALUES ?";

            var values =[
                [customerName, taxId, customerType, email, phone, address]
            ];

            con.query(sql, [values],function(err2, result, fields) {
                if(err2) {console.log(err2);
                }
                else {
                    res.send('Student Register succesfull '+result.insertcustomerId);
                }
            });
        }
    })
});

app.listen(5500);