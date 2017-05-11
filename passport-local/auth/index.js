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

  passport.deserializeUser((user, done) => {
  
    done(null, user); 
  });

  passport.use(new LocalStrategy((username, password, done) => {
    console.log('auth function', username, password); 
    User.findOne({ username: username }, (err, user) => {
    
    if (err) {
      console.log('auth error'); 
      return done(err);
    }
    if (!user) {
      console.log('auth error - no user');
      return done(null, false, { type: 'error', message: 'User not found' }); 
    }
    if (user.password !== password) {
      // console.log('incorrect password'); 
      return done(null, false, { type: 'error', message: 'Invalid password.' }); 
    }
    console.log('no error'); 
    return done(null, user); 
    })
  }
  ));

  

}

