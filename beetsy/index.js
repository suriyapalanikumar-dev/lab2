//import express module 
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
// app.use(session({
//     secret: 'cmpe_273_secure_string',
//     resave: false,
//     saveUninitialized: true
// }));


var mysql = require('mysql');
RDS_HOSTNAME = "db-etsy-prototype.c7k9u8fpyl8e.us-east-2.rds.amazonaws.com"
RDS_USERNAME = "admin"
RDS_PASSWORD = "admin123"
RDS_PORT = "3306"
RDS_DATABASE = "dbetsy"

var connection = mysql.createConnection({
  host     : RDS_HOSTNAME,
  user     : RDS_USERNAME,
  password : RDS_PASSWORD,
  port     : RDS_PORT,
  database : RDS_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();


var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});