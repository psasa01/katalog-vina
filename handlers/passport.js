const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const facebookStrategy = require('passport-facebook').Strategy;
const secret = require('./secret');


passport.use(User.createStrategy());

passport.use(new facebookStrategy(secret.facebook, (token, refreshToken, profile, done) => {
    User.findOne( {facebook: profile.id }, (err, user) => {
        if(err) return done(err);
        if(user) {
            return done(null, user);
        } else {
            const newUser = new User();
            newUser.email = profile._json.email;
            newUser.facebook = profile.id;
            newUser.tokens.push({kind: 'facebook', tokens: token});
            newUser.ime = profile.displayName;
            newUser.slika = `https://graph.facebook.com/${profile.id}/picture?type=medium`;

            newUser.save((err) => {
                if(err) throw err;
                return done(null, newUser);
            });
        }
    });
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


