/**
 * Created by Ankit on 01/10/17.
 */


var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var engines = require('consolidate');
var loginController = require("./controllers/admin/login");
var categoryController = require("./controllers/admin/manageCategory");
var menuController = require("./controllers/admin/menuCategory");
var blogController = require("./controllers/api/blogFeed");
var walletController = require("./controllers/wallet/activateWallet");
var cartController = require('./controllers/api/cart');
var authUser = require("./controllers/api/authUser");
var mysql = require('mysql');
var router = express.Router();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({"extended": false}));
app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Buffet'
});

connection.connect();


global.db = connection;

//Starter
router.get("/", function (req, res) {
    res.render("buffetadmin/index.html");
});
router.get("/managecategory", function (req, res) {
    res.render("buffetadmin/managecategory/manageCategoryView.html");
});

//Login Admin
router.post("/login", loginController.auth);

//Manage Category
router.post("/addcategory", categoryController.add);
router.post("/updatecategory", categoryController.update);
router.get("/getallcategory", categoryController.getAll);
router.post("/deletecategory", categoryController.delete);

//Manage Menu
router.post("/addmenu", menuController.add);
router.post("/updatemenu", menuController.update);
router.get("/getallmenu", menuController.getAll);
router.post("/deletemenu", menuController.delete);
router.get("/filters",menuController.filterlearning);
//API
//cart
router.post("/getCartById", cartController.getCartDataByID);
router.post("/pushnewcartdata",cartController.pushCartData);

//about
router.get("/about", function (req, res) {
    res.render("buffetadmin/about/about.html");
});

//User Login
router.post("/auth", authUser.auth);



//utilities
router.get("/findtoppings", menuController.findTopping);


//review feeds
router.post("/review/addfeed", blogController.add);
router.get("/review/getallfeeds", blogController.getAll);

//wallet
router.post("/wallet/activation", walletController.activate);
router.post("/wallet/checkstatus", walletController.checkStatus);
router.post("/wallet/gettransaction", walletController.getAllTransactions);
router.post("/wallet/fetchprofile", walletController.getUserprofile);

app.use('/', router);
app.listen(8081);
console.log("Listening to PORT 8081");

