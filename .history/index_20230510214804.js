var con = require("./connection");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { Router } = require("express");
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// set view engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'functions')));
app.use(express.static(path.join(__dirname,'pages')));

// app.get('/danhmuc/khachhang',function(req, res){
//     res.sendFile(__dirname+'/pages/customer.html');
// });
app.get('/home',function(req, res){
    res.sendFile(__dirname+'/pages/overview.html');
});

// --------1.1. Khách hàng -----------
// {C - CRUD} Thêm khách hàng -> DB 
app.post('/danhmuc/khachhang', function(req, res)  {
    var customerName = req.body.customerName;
    var taxId = req.body.taxId;
    var customerType = req.body.customerType;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    con.connect(function(err){
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
                    res.redirect('/danhmuc/khachhang');
                    // res.send('Student Register succesfull '+result.insertId);
                }
            });
        }
    })
});

// {R - CRUD} Load DB -> Hiển thị trên web
app.get('/danhmuc/khachhang', function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM customer";

        con.query(sql, function(err, result){
            if(err) console.log(err);
            
            res.render(__dirname+"/assets/views/customer",{customer:result});
        });
    });
});

// {U - CRUD} Cập nhật thông tin khách hàng
app.get('/danhmuc/khachhang-update', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM customer WHERE customerId=?";
        
        var customerId = req.query.customerId;

        con.query(sql, [customerId], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/update-customer",{customer:result})
        });
    });
});
app.post('/danhmuc/khachhang-update', function(req, res){
    var customerName = req.body.customerName;
    var taxId = req.body.taxId;
    var customerType = req.body.customerType;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var customerId = req.body.customerId;

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "UPDATE customer SET customerName=?, taxId=?, customerType=?, email=?, phone=?, address=? WHERE customerId=?";

        con.query(sql, [customerName, taxId, customerType, email, phone, address, customerId], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/khachhang');
        });
    });
});

// D- CRUD : Xóa khách hàng
app.get('/danhmuc/khachhang-delete', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);
        
        var customerId = req.query.customerId;
        var sql = "DELETE FROM customer WHERE customerId = ?";

        con.query(sql, [customerId], function(err, result){
            if(err) console.log(err);
            res.send("Xóa khách hàng thành công!");
        });
    });
});
// --------2.1. Hóa đơn GTGT -----------

app.listen(5500);


