const connection = require("../config/database.js")
module.exports.updateprofileimage = (req, res) =>{
    const {imgname, userid} = req.body
      const sql = `update dbetsy.User set profiledp=? where userid=?`
      const values = [
          imgname,
          userid
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
              message: 'Image updated Sucessfully'
            })
          }
      });
  }

  
  