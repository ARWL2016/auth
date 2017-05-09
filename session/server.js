const express = require('express'); 
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); 
const mongoose = require('mongoose'); 
const db = require('./db'); 

const bodyParser = require('body-parser'); 
const parseurl = require('parseurl'); 

const app = express(); 

app.use(session({
  secret: 'anyoldstring', 
  resave: false, 
  saveUninitialized: true, 
  store: new MongoStore({ mongooseConnection: mongoose.connection })  
}));

app.get('/', (req, res, next) => {
  res.json(req.session); 
});

app.get('/foo', (req, res, next) => {
  let fooVisits = req.session.fooVisits || 0; 
  fooVisits +=1; 
  req.session.fooVisits = fooVisits; 

  let path = parseurl(req).path; 
  res.json({
    session: req.session, 
    id: req.sessionID, 
  }); 

});


app.listen(3000, () => {
  console.log('Listening on port 3000'); 
})