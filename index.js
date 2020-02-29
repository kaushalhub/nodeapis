var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-04.cleardb.net', //mysql database host name
  user     : 'b165cea90fbe99', //mysql database user name
  password : '2c9f14e7', //mysql database password
  database : 'heroku_e3e3a039f7ae290' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(4000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

app.get('/', (req, res) => {
  res.send('Hello')
});

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/customer/:id', function (req, res) {
   connection.query('select * from customer where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new customer record into mysql database
// app.post('/customer', function (req, res) {
//    var params  = req.body;
//    console.log(params);
//    connection.query("INSERT INTO customer (Name, Address, Country, Phone) VALUES ?",  body, (err, result, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify());
// 	});
// });

// app.post("/customer", (req, res) => {
//     let body = req.body;
//     connection.query("INSERT INTO customer set ?", body, (err, result) => {
//       if (err) throw err;
//       res.end(JSON.stringify());
      
//     });
//   });

app.post('/customer',(req, res) => {
  let body = req.body;
  let sql = "INSERT INTO customer SET ?";
  let query = connection.query(sql, body,(err, results) => {
    if(err) throw err;
    // res.end(JSON.stringify());
    console.log(data)
  });
});

//rest api to update record into mysql database
app.put('/customer', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/customer', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});