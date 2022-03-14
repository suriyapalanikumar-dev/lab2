const upload = require("../common");
const { uploadFile, getFileStream } = require("../config/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);


module.exports.uploadshoppic = (upload.single("image"), async (req, res) => {
    console.log(req.file);
    console.log(req.data)
  
    // uploading to AWS S3
    const result = await uploadFile(req.file);
    console.log("S3 response", result);
  
    // You may apply filter, resize image before sending to client
  
    // Deleting from local if uploaded in S3 bucket
    await unlinkFile(req.file.path);
  
    res.send({
      status: "success",
      message: "File uploaded successfully",
      data: req.file,
    });
  });