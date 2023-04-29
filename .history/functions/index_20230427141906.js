
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

app.get('/',function(req, res){
    res.sendFile(__dirname+'/customer.html');
});
app.post('/', function(req, res)  {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

    con.getConnection(function(err, tempCont){
        if(err) {
            res.send("Error occured.");
        } 
        else {
            var sql = "INSERT INTO students(name, email, mno) VALUES ?";

            var values =[
                [name, email, mno]
            ];

            con.query(sql, [values],function(err2, result, fields) {
                if(err2) {console.log(err2);
                }
                else {
                    res.send('Student Register succesfull '+result.insertId);
                }
                // tempCont = release();
            });
        }
    })
});

app.listen(5500);