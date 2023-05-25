var con = require("./connection");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { Router } = require("express");
const path = require('path');


// format date
const { format } = require('date-fns');

// Helper function để định dạng ngày
function formatDate(date, formatString) {
  return format(date, formatString);
}

// Đăng ký helper function là một locals trong Express
app.locals.formatDate = formatDate;


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
            res.render(__dirname+"/assets/views/customer",{customer:result})
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
            res.render(__dirname+"/assets/views/service",{service:result})
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

        var sql = "UPDATE dichvu SET MaDV=?, TenDV=?, PhanLoai=?, DonGia=?, MoTa=? WHERE MaDV=?";

        con.query(sql, [MaDV, TenDV, PhanLoai, DonGia, MoTa, MaDV], function(err, result){
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
// -------------1.3. Tài khoản kế toán -----------
app.post('/danhmuc/taikhoan', function(req, res)  {
    var MaTK = req.body.accountId;
    var TenTK = req.body.accountName;
    var CapTK = req.body.accountLevel;

    con.connect(function(err){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO tkkt (MaTK, TenTK, CapTK) VALUES ?";

            var values =[
                [MaTK, TenTK, CapTK]
            ];

            con.query(sql, [values],function(err2, result, fields) {
                if(err2) {console.log(err2);
                }
                else {
                    res.redirect('/danhmuc/taikhoan');
                    // res.send('Student Register succesfull '+result.insertId);
                }
            });
        }
    })
});

// {R - CRUD} Load DB -> Hiển thị dịch vụ trên web
app.get('/danhmuc/taikhoan', function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM tkkt";

        con.query(sql, function(err, result){
            if(err) console.log(err);
            
            res.render(__dirname+"/assets/views/account",{account:result});
        });
    });
});
// {U - CRUD} Cập nhật thông tin dịch vụ
app.get('/danhmuc/taikhoan-update', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM tkkt WHERE MaTK=?";
        
        var MaTK = req.query.accountId;

        con.query(sql, [MaTK], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/account",{account:result})
        });
    });
});
app.post('/danhmuc/taikhoan-update', function(req, res){
    var MaTK = req.body.accountId;
    var TenTK = req.body.accountName;
    var CapTK = req.body.accountLevel;

    con.connect(function(err){
        if(err) console.log(err);

        var sql = "UPDATE tkkt SET MaTK=?, TenTK=?, CapTK=? WHERE MaTK=?";

        con.query(sql, [MaTK, TenTK, CapTK, MaTK], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/taikhoan');
        });
    });
});

// D- CRUD : Xóa dịch vụ
app.get('/danhmuc/taikhoan-delete', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);
        
        var MaTK = req.query.accountId;
        var sql = "DELETE FROM tkkt WHERE MaTK=?";
        
        con.query(sql, [MaTK], function(err, result){
            if(err) console.log(err);
            res.redirect('/danhmuc/taikhoan');
        });
    });
});

// -------------- 2.1. Hóa đơn GTGT ----------------
app.get('/chungtu/hoadonGTGT-preview',function(req, res){
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM hddv" + 
        "JOIN ct_phieu ON hddv.SoCT = ct_phieu.SoCT"+
        "JOIN khachhang ON hddv.MaKH = khachhang.MaKH"+
        "JOIN dichvu ON ct_phieu.MaDV = dichvu.MaDV"+
        "WHERE hddv.SoCT = ?";
        var SoCT = req.query.bill;

        con.query(sql, [SoCT], function(err, result){
            if(err) console.log(err);
            res.render(__dirname+"/assets/views/printBill",{bill:result})
        });
    });
    // res.render(__dirname+'/assets/views/printBill',{bill:result});
});

// {C - CRUD} Thêm hóa đơn mới -> DB 
app.post('/chungtu/hoadonGTGT', function(req, res)  {
    // ph
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
    var TienCK = req.body.TienCK;
    // ct
    var MaDV = req.body.serviceId;
    var TenDV = req.body.serviceName;
    var SoLuong = req.body.serviceNumber;
    var DonGia = req.body.servicePrice;
    var TienDV = req.body.TienDV;
    var TienThanhToan = req.body.TienTT;
    var TienDoanhThu = req.body.TienDT;
    var TienThue = req.body.TienThue;


    // Kết nối đến cơ sở dữ liệu
    con.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối:', err);
      return;
    }
  
    console.log('Kết nối thành công!');
  
    // Gọi Stored Procedure và chèn dữ liệu vào 2 bảng
    con.query('CALL Them_HDDV(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [SoCT, NgayCT, MaKH, TKNoTT,TKCoDT, TKCoThue, ThueSuat, TienThue, HTTT, STK, NganHang, TKChietKhau, TyLeCK, TienCK, MaDV, SoLuong, DonGia, TienThanhToan, TienDoanhThu], (error, results) => {
      if (error) {
        console.error('Lỗi gọi Stored Procedure:', error);
        return;
      } else{
        res.redirect('/chungtu/hoadonGTGT');
      }
  
      console.log('Dữ liệu đã được chèn vào 2 bảng!');
  
      // Đóng kết nối đến cơ sở dữ liệu khi đã hoàn thành
    //   connection.end();
    });
  });
});
//     con.connect(function(err){
//         if(err) {
//             res.send("Error occured.");
//         } 
//         else {
//             var sql = "INSERT INTO hddv (SoCT, NgayCT, MaKH, TKNoTT, TKCoDT, TKCoThue, ThueSuat, HTTT, STK, NganHang, TKChietKhau, TyLeCK) VALUES ?";

//             var values =[
//                 [SoCT, NgayCT, MaKH, TKNoTT, TKCoDT, TKCoThue, ThueSuat, HTTT, STK, NganHang, TKChietKhau, TyLeCK]
//             ];

//             con.query(sql, [values],function(err2, result, fields) {
//                 if(err2) {console.log(err2);
//                 }
//                 else {
//                     res.redirect('/chungtu/hoadonGTGT');
//                     // res.send('Student Register succesfull '+result.insertId);
//                 }
//             });
//         }
//     })
// });

// {R - CRUD} Load DB -> Hiển thị trên web
app.get('/chungtu/hoadonGTGT', function(req, res){
    
    con.connect(function(err){
        if(err) console.log(err);

        var sql = "SELECT * FROM hddv" + 
        "JOIN ct_phieu ON hddv.SoCT = ct_phieu.SoCT"+
        "JOIN khachhang ON hddv.MaKH = khachhang.MaKH"+
        "JOIN dichvu ON ct_phieu.MaDV = dichvu.MaDV"+
        "WHERE hddv.SoCT = ?";

        con.query(sql, function(err, result){
            if(err) console.log(err);
            
            res.render(__dirname+"/assets/views/bill",{bill:result});
        });
    });
});
// D- CRUD : Xóa hóa đơn
app.get('/chungtu/hoadonGTGT-delete', function(req, res){

    con.connect(function(err){
        if(err) console.log(err);
        
        var SoHD = req.query.bill;
        // var sql = "CALL Xoa_HDDV(?)";
        // con.query(sql, [SoHD], function(err, result){
        //     if(err) console.log(err);
        //     res.redirect('/chungtu/hoadonGTGT');
        // });
        var sql1 = "DELETE FROM hddv WHERE SoCT=?";
        var sql2 = "DELETE FROM ct_phieu WHERE SoCT=?";
        con.query(sql1, [SoHD], function(err, result){
            if(err) console.log(err);
            con.query(sql2, [SoHD], function(err, result){
                if(err) console.log(err);
                res.redirect('/chungtu/hoadonGTGT');
            });
        });
    });
});

// ---------- port --------------
app.listen(5500);


