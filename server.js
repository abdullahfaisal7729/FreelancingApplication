const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('express-flash');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');


const sessionStore = new MongoStore({url: config.database, autoReconnect: true});

const app = express();
const http = require('http').Server(app);


const sessionMiddleware = session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
  store: new MongoStore({url: config.database, autoReconnect: true})
})

mongoose.connect(config.database, {
  useMongoClient: true
}, function (err) {
  if (err) 
    console.log(err);
  console.log("Connected to the database");
});

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});



function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept) {
  console.log('failed connection to socket.io:', message);
  if (error) 
    accept(new Error(message));
  }


