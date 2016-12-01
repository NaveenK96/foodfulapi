// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

// Schemas
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email:username }, function (err, user) {
      if (err){
        return done(err);
      }
      // Return if user not found in database
      if (!user){
        return done(null, false, {
          message: 'User not found',
          data: []
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong',
          data: []
        });
      }
      // If credentials are correct, return the user object
      return done(null, user, {
        message: 'Welcome!',
        data: []
      });
    });
  }
));