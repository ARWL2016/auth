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
  res.render('login.ejs', {
    status: app.locals.status
  });
}); 

app.post('/auth/register', (req, res) => {
  console.log(req.body); 
  User.create(req.body, (err, data) => {
    if (err) console.log(err); 
    if (data) console.log(data); 
  })

  res.send('Thank you for registering'); 

});  

app.post('/auth/signIn', (req, res) => {
  User.findOne({username: req.body.username}, (err, data) => { 
    if (data) {
      console.log(data); 
      res.send('Thanks for signing in')
    } else {
      console.log('not found');
      app.locals.status = 'not found' 
      res.redirect('/'); 
      
    }
  })
});  

app.listen(3000, () => {
  console.log('Listening on Port 3000'); 
}); 