var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var routes = require('./routes.js');
var db = require('./config/db.js');
var cors = require('cors');

var port = 7000;
var app = express();

//middleware =======
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//passport =======
require('./config/passport')(passport);
app.use(session({secret: 'swedishmeatballs' }));
app.use(passport.initialize());
app.use(passport.session());

//routes =========
routes(app, passport);

app.use(express.static(__dirname + '/../build'));

app.listen(port);
console.log("Server now listening on port " + port);
