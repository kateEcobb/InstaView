var InstagramStrategy = require('passport-instagram').Strategy;

var User = require('../models/user');
var tokens = require('./tokens');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  passport.use(new InstagramStrategy({
    clientID: tokens.Instagram.CLIENT_ID,
    clientSecret: tokens.Instagram.CLIENT_SECRET,
    callbackURL: tokens.Instagram.CALLBACK_URL
  }, function(token, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne({'instagram.id': profile.id}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, user); //user exists in database
        else {
          var newUser = new User();
          newUser.instagram.id = profile.id;
          newUser.instagram.token = token;
          newUser.instagram.name = profile.displayName;

          newUser.save(function(err){
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
