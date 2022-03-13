var mysql = require('mysql');
const {RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD,RDS_PORT, RDS_DATABASE } = process.env
var mysqlconnection = mysql.createConnection({
  host     : RDS_HOSTNAME,
  user     : RDS_USERNAME,
  password : RDS_PASSWORD,
  database : RDS_DATABASE,
  port : RDS_PORT,
});


mysqlconnection.connect(function(err) {
if (err) {
  // console.log(RDS_PASSWORD)
  console.error('Database connection failed: ' + err.stack);
  return;
}
else{
  console.log("Database Connected")
}
})
module.exports = mysqlconnection;