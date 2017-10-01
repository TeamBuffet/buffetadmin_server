/**
 * Created by Ankit on 01/10/17.
 */


var express = require("express");
var app = express();
var path=require('path');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var engines = require('consolidate');
var loginController = require("./controllers/login");
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
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Buffet'
});

connection.connect();


global.db = connection;

router.get("/", function (req, res) {
    res.render("buffetadmin/index.html");
});

router.post("/login", loginController.auth);
router.get("/test",function (req,res) {
    res.json({"msg" : "hello"});
});
app.use('/', router);

app.listen(8080);
console.log("Listening to PORT 8080");

