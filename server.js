// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");
// Get request
app.get('/', function (req, res) {
 
    // Config your database credential
    const config = {
        server: 'localhost',
        database: 'KeToanDoanhThu'
    };
 
    // Connect to your database
    mssql.connect(config, function (err) {
 
        // Create Request object to perform
        // query operation
        let request = new mssql.Request();
 
        // Query to the database and get the records
        request.query('select * from tblDMKH',
            function (err, records) {
 
                if (err) console.log(err)
 
                // Send records as a response
                // to browser
                res.send(records);
 
            });
    });
});
 
let server = app.listen(1433, function () {
    console.log('Server is listening at port 5000...');
});