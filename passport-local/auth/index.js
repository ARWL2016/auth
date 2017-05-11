const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const db = require('../db'); 
const User = require('../db').UserModel; 

module.exports = (app) => {
  app.use(passport.initialize()); 
  app.use(passport.session()); 

  passport.serializeUser((user, done) => {
    done(null, user.id); 
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user); 
      })
     
  });

  passport.use(new LocalStrategy((username, password, done) => {
    console.log('auth function', username, password); 
    User.findOne({ username: username }, (err, user) => {
    
      if (err) { 
        return done(err, false, { type: 'error', message: 'Internal server error' });
      }
      if (!user) {
        return done(null, false, { type: 'error', message: 'User not found' }); 
      }
      if (user.password !== password) {
        return done(null, false, { type: 'error', message: 'Invalid password.' }); 
      }
      return done(null, user, {type: 'success', message: 'Logged in as '}); 
    })
  }
  ));

  

}

