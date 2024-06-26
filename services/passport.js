const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const keys = require('../config/keys');


const User = mongoose.model('users');

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
});



passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done)=>{

    
    User.findOne({ googleId: profile.id }).then( (existingUser) => {
      if(existingUser){
        //User id or googleId already exist on db so we don't save it!
        done(null ,existingUser)
      } else {
        //No any record of this google Id save create and save.
        new User({ googleId: profile.id }).save()
        .then(user=> done(null, user));
      }
    });
     })
);