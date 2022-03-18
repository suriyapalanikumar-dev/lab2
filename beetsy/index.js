require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require("./middleware/auth.js")

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now()+'-'+file.originalname)
  }
})


var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const { API_PORT } = process.env;
const port =  API_PORT;




const authenticatectrl = require('./controllers/authenticate-controller.js')
const shopctrl = require('./controllers/shop-controller.js')
const imgctrl = require("./controllers/image-controller.js")

app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/checkshopname", shopctrl.isshopnameavailabile)
app.post("/createshopdetails", shopctrl.createshopname)
app.get("/displayshopdetails", shopctrl.getshopdetails)
app.post("/uploadshopdp",upload.single('profile-file'), imgctrl.uploadpic)
app.post("/updateshopimgdb", shopctrl.updateshopimage)
app.get("/image/:key",imgctrl.retrieveImg)


// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
