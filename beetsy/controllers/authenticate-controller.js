const connection = require("../config/database.js")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

module.exports.registeruser = async(req, res) =>{
    const {username, email, password} = req.body
    //var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = await bcrypt.hash(password, 10);
    const userid = crypto.randomUUID()
    const token = jwt.sign(
        {user_id:userid, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
    );
    
    const sql = `INSERT INTO dbetsy.User (userid, usernaame, email, password, token) VALUES(?,?,?,?,?);`;
    const values = [
        userid, 
        username,
        email, 
        password,
        token
    ]

    
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
          res.status(200).json({
            data: results,
            message: 'User Registered Successfully'
          })
        }
      });
    }

module.exports.loginuser = async(req, res) =>{
  const { email, password } = req.body;
  var message = ""
  const sql = `select * from dbetsy.User where email= ?`;
  connection.query(sql, [email], function (error, results, fields) {
    //console.log(results)
    if(error)
    {
      res.status(500).json({
        message: error.sqlMessage
      })
    }
    else if (results.length<1) {
      res.status(500).json({
        message: "Please register before logging in"
      })
    }
    else {
    if( password == results[0].password)
    {
      res.status(200).json({
        data: {userid:results[0].userid, token:results[0].token},
        message: 'User Login Successful'
      })
    }
    else{
      res.status(500).json({
        message: "Incorrect Password"
      })
    }
  }
  })
}


 