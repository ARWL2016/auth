const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 

const { User } = require('../db'); 

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
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { type: 'error', message: 'User not found' }); 
        } else if (user.password !== password) {
          return done(null, false, { type: 'error', message: 'Invalid password.' }); 
        } else {
          return done(null, user);
        }
      })
      .catch(error => {
        return done(err, false);
      });
    }));
}

