require("dotenv").config();
var express = require('express');
// var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require("./middleware/auth.js")
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const { API_PORT } = process.env;
const port =  API_PORT;
// console.log(API_PORT)

const authenticatectrl = require('./controllers/authenticate-controller.js')
const shopctrl = require('./controllers/shop-controller.js')

app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/checkshopname", shopctrl.isshopnameavailabile)
app.post("/createshopdetails", shopctrl.createshopname)
app.get("/displayshopdetails", shopctrl.getshopdetails)


// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
