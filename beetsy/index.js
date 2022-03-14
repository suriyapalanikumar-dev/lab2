require("dotenv").config();
var express = require('express');
// var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require("./middleware/auth.js")
var multer  = require('multer')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const { API_PORT } = process.env;
const port =  API_PORT;
// console.log(API_PORT)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
//console.log(upload)
app.post('/uploadshopdp', upload.single('profile-file'), function (req, res, next) {
  console.log(JSON.stringify(req.file))
  return res.status(200).json({
    "message" : "Data saved"
  })
})

const authenticatectrl = require('./controllers/authenticate-controller.js')
const shopctrl = require('./controllers/shop-controller.js')
//const imgctrl = require("./controllers/image-controller.js")

app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/checkshopname", shopctrl.isshopnameavailabile)
app.post("/createshopdetails", shopctrl.createshopname)
app.get("/displayshopdetails", shopctrl.getshopdetails)
//app.post("/uploadshopdp", imgctrl.uploads)

// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
