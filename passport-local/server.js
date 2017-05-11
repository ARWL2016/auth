const express = require('express'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session); 
const passport = require('passport'); 
const bodyParser = require('body-parser'); 
const flash = require('connect-flash'); 

const { mongoose, User } = require('./db');  

const app = express(); 

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(session({
  secret:'library', 
  resave: false, 
  saveUninitialized: true, 
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash()); 

app.set('view engine', 'ejs'); 

require('./auth')(app); 
require('./routes')(app, passport, User); 

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 