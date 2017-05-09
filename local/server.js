'use strict'; 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const db = require('./app/db'); 
const User = require('./app/db').UserModel; 

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded()); 

app.set('view engine', 'ejs'); 

app.locals.status = 'pending'; 

app.get('/', (req, res) => {
  res.render('login', {
    status: app.locals.status, 
    error: app.locals.error
  });
}); 

app.get('/profile', (req, res) => {
  if (app.locals.status === 'signed in') {
    res.render('profile', {
    status: app.locals.status, 
    user: app.locals.user.username, 
    password: app.locals.user.password, 
    id: app.locals.user._id
  });
  } else {
    res.redirect('/'); 
  } 
}); 

app.post('/auth/logout', (req, res) => {
  app.locals.status = 'pending'; 
  app.locals.user = {}; 
  app.locals.error = ''; 
  res.redirect('/'); 
}); 

app.post('/auth/register', (req, res) => {
  console.log(req.body); 
  if(req.body.username && req.body.password) {
    User.create(req.body, (err, data) => {
      if (err) {
        console.log(err); 
      }
      else {
        console.log(data); 
        app.locals.status = 'Registered. Please sign in.' 
        res.redirect('/'); 
      }  
    })
  } else {
    app.locals.error = 'enter a username and password'; 
    console.log('error'); 
    res.redirect('/'); 
  }
});  

app.post('/auth/signIn', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => { 
    if (user) {
      console.log(user); 
      app.locals.status = 'signed in'; 
      app.locals.user = user; 
      res.redirect('/profile'); 
    } else {
      console.log('not found');
      app.locals.status = 'not found'; 
      res.redirect('/'); 
      
    }
  })
});  

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 