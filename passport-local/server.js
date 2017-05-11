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




// *** ROUTES *** 
app.get('/', (req, res) => {
  console.log(req.flash.message); 
  res.render('login', {
    error: req.flash('error')
  });
}); 

app.get('/profile', (req, res) => {
  res.render('profile');
}); 

app.post('/logout', (req, res) => {
  res.redirect('/'); 
}); 

app.post('/register', (req, res) => {
  console.log(req.body); 
  if(req.body.username && req.body.password) {
    User.create(req.body, (err, data) => {
      if (err) {
        console.log(err); 
      }
      else {
        res.redirect('/'); 
      }  
    })
  } else {
    res.redirect('/'); 
  }
});  

app.get('/login', (req, res) => {
  let error = req.flash('error')[0]; 
  console.log('LOGIN', error); 
  
  res.render('login', {
    error: error
  })
})

app.post('/login', passport.authenticate('local', {
  failureFlash: true, 
  successRedirect: '/profile', 
  failureRedirect: '/login' 
}));  

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 