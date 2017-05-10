const express = require('express'); 
const passport = require('passport'); 
const session = require('express-session'); 
const bodyParser = require('body-parser'); 

const db = require('./db'); 
const User = require('./db').UserModel; 

const app = express(); 

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded()); 
app.use(session({secret:'library'}));

require('./auth')(app); 

app.set('view engine', 'ejs'); 




// *** ROUTES *** 
app.get('/', (req, res) => {
  res.render('login');
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

app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile', 
  failureRedirect: '/' 
}));  

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 