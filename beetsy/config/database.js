var mysql = require('mysql');
const {RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD,RDS_PORT, RDS_DATABASE } = process.env
var connection = mysql.createConnection({
  host     : RDS_HOSTNAME,
  user     : RDS_USERNAME,
  password : RDS_PASSWORD,
  port     : RDS_PORT,
  database : RDS_DATABASE
});

exports.connect = () =>{
  connection.connect(function(err) {
  if (err) {
    // console.log(RDS_PASSWORD)
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});
}
// connection.end();
