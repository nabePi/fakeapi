var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fake_db',
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/customer', function(req, res){
  var data = {
    'error': 1,
    'customer': ''
  };

  connection.query("SELECT * FROM customer LIMIT 10", function(err, rows, fields){
    if (rows.length != 0) {
      data["error"] = 0;
      data["customer"] = rows;
      res.json(data);
    } else {
      data["customer"] = "No customer Found ...";
      res.json(data);
    }
  });
});

http.listen(8080, function(){
  console.log("Listen to port 8080");
});
