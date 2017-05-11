const express = require('express'); 
const passport = require('passport'); 
const session = require('express-session'); 
const bodyParser = require('body-parser'); 
const flash = require('connect-flash'); 

const db = require('./db'); 
const User = require('./db').UserModel; 

const app = express(); 

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(session({
  secret:'library', 
  resave: false, 
  saveUninitialized: true
}));
app.use(flash()); 

require('./auth')(app); 

app.set('view engine', 'ejs'); 

require('./routes')(app, passport, User); 

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 