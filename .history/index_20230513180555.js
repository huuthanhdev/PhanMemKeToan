var con = require("./connection");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { Router } = require("express");
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// -------set view engine
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

// -----------------1.1. Khách hàng -----------
// {C - CRUD} Thêm khách hàng -> DB 
app.post('/danhmuc/khachhang', function(req, res)  {
    var MaKH = req.body.customerId;
    var TenKH = req.body.customerName;
    var MaSoThue = req.body.taxId;
    var HinhThuc = req.body.customerType;
    var Email = req.body.email;
    var SDT = req.body.phone;
    var DiaChi = req.body.address;

    con.connect(function(err){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO khachhang(TenKH, MaSoThue, HinhThuc, Email, SDT, DiaChi) VALUES ?";

            var values =[
                [TenKH, MaSoThue, HinhThuc, Email, SDT , DiaChi]
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

        var sql = "SELECT * FROM khachhang";

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

        var sql = "SELECT * FROM khachhang WHERE MaKH=?";
        
        var MaKH = req.query.customerId;

        con.query(sql, [MaKH], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/update-customer",{customer:result})
        });
    });
});
app.post('/danhmuc/khachhang-update', function(req, res){
    var MaKH = req.body.customerId;
    var TenKH = req.body.customerName;
    var MaSoThue = req.body.taxId;
    var HinhThuc = req.body.customerType;
    var Email = req.body.email;
    var SDT = req.body.phone;
    var DiaChi = req.body.address;

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "UPDATE khachhang SET TenKH=?, MaSoThue=?, HinhThuc=?, Email=?, SDT=?, DiaChi=? WHERE MaKH=?";

        con.query(sql, [TenKH, MaSoThue, HinhThuc, Email, SDT, DiaChi, MaKH], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/khachhang');
        });
    });
});

// D- CRUD : Xóa khách hàng
app.get('/danhmuc/khachhang-delete', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);
        
        var MaKH = req.query.customerId;
        var sql = "DELETE FROM khachhang WHERE MaKH=?";
        
        con.query(sql, [MaKH], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/khachhang');
        });
    });
});

// -------------1.2. Dịch vụ -----------
// {C - CRUD} Thêm dịch vụ mới -> DB 
app.post('/danhmuc/dichvu', function(req, res)  {
    var MaDV = req.body.serviceId;
    var TenDV = req.body.serviceName;
    var PhanLoai = req.body.serviceType;
    var DonGia = req.body.servicePrice;
    var MoTa = req.body.serviceDesc;

    con.connect(function(err){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO dichvu (MaDV, TenDV, PhanLoai, DonGia, MoTa) VALUES ?";

            var values =[
                [MaDV, TenDV, PhanLoai, DonGia, MoTa]
            ];

            con.query(sql, [values],function(err2, result, fields) {
                if(err2) {console.log(err2);
                }
                else {
                    res.redirect('/danhmuc/dichvu');
                    // res.send('Student Register succesfull '+result.insertId);
                }
            });
        }
    })
});

// {R - CRUD} Load DB -> Hiển thị dịch vụ trên web
app.get('/danhmuc/dichvu', function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM dichvu";

        con.query(sql, function(err, result){
            if(err) console.log(err);
            
            res.render(__dirname+"/assets/views/service",{service:result});
        });
    });
});
// {U - CRUD} Cập nhật thông tin dịch vụ
app.get('/danhmuc/dichvu-update', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM dichvu WHERE MaDV=?";
        
        var MaDV = req.query.serviceId;

        con.query(sql, [MaDV], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/update-service",{service:result})
        });
    });
});
app.post('/danhmuc/dichvu-update', function(req, res){
    var MaDV = req.body.serviceId;
    var TenDV = req.body.serviceName;
    var PhanLoai = req.body.serviceType;
    var DonGia = req.body.servicePrice;
    var MoTa = req.body.serviceDesc;

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "UPDATE dichvu SET TenDV=?, PhanLoai=?, DonGia=?, MoTa=? WHERE MaDV=?";

        con.query(sql, [TenDV, PhanLoai, DonGia, MoTa, MaDV], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/dichvu');
        });
    });
});

// D- CRUD : Xóa dịch vụ
app.get('/danhmuc/dichvu-delete', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);
        
        var MaDV = req.query.serviceId;
        var sql = "DELETE FROM dichvu WHERE MaDV=?";
        
        con.query(sql, [MaDV], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/dichvu');
        });
    });
});

// -------------- 2.1. Hóa đơn GTGT ----------------
app.get('/chungtu/hoadonGTGT-preview',function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM hddv WHERE SoCT=?";
        
        var MaDV = req.query.bill;

        con.query(sql, [MaDV], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/printBill",{service:result})
        });
    });
    // res.render(__dirname+'/assets/views/printBill',{bill:result});
});

// {C - CRUD} Thêm hóa đơn mới -> DB 
app.post('/chungtu/hoadonGTGT', function(req, res)  {
    var SoCT = req.body.bill;
    var NgayCT = req.body.date;
    var MaKH = req.body.customerId;
    // var TenKH = req.body.customerName;
    // var MaSoThue = req.body.taxId;
    var TKNoTT = req.body.TKNoTT;
    var TKCoDT = req.body.TKCoDT;
    var TKCoThue = req.body.TKCoThue;
    var ThueSuat = req.body.tax;
    var HTTT = req.body.paymentType;
    var STK = req.body.STK;
    var NganHang = req.body.NH;
    var TKChietKhau = req.body.TKCK;
    var TyLeCK = req.body.TLCK;

    con.connect(function(err){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO hddv (SoCT, NgayCT, MaKH, TKNoTT, TKCoDT, TKCoThue, ThueSuat, HTTT, STK, NganHang, TKChietKhau, TyLeCK) VALUES ?";

            var values =[
                [SoCT, NgayCT, MaKH, TKNoTT, TKCoDT, TKCoThue, ThueSuat, HTTT, STK, NganHang, TKChietKhau, TyLeCK]
            ];

            con.query(sql, [values],function(err2, result, fields) {
                if(err2) {console.log(err2);
                }
                else {
                    res.redirect('/chungtu/hoadonGTGT');
                    // res.send('Student Register succesfull '+result.insertId);
                }
            });
        }
    })
});

// {R - CRUD} Load DB -> Hiển thị trên web
app.get('/chungtu/hoadonGTGT', function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM hddv";

        con.query(sql, function(err, result){
            if(err) console.log(err);
            
            res.render(__dirname+"/assets/views/bill",{bill:result});
        });
    });
});

// ---------- port --------------
app.listen(5500);


