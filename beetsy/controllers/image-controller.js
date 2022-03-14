const upload = require("../common");
const { uploadFile, getFileStream } = require("../config/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const connection = require("../config/database.js")

let middleware = upload.single('profile-file');
module.exports.uploadpic = (req, res, next) => {
  let controller = async() => {
    let tabledata = {
        "shopetsy-admin" : "Shop",
        "itemetsy-admin" : "Item",
        "useretsy-admin" : "User"
    }
    const result = await uploadFile(req.file);
    console.log("S3 response", result);
    await unlinkFile(req.file.path);
    if(result["data"]["key"].includes("shopetsy-admin"))
    {
        table = tabledata["shopetsy-admin"]
    }
    else if(result["data"]["key"].includes("itemetsy-admin"))
    {
        table = tabledata["itemetsy-admin"]
    }
    else{
        table = tabledata["useretsy-admin"]
    }
    // var sql = ``
    // connection.query()
    res.send({
      status: "success",
      message: "File uploaded successfully",
      data: result,
    });
  };
  middleware(req, res, controller);
}

module.exports.retrieveImg = (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
}
  