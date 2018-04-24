const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const facebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const secret = require('./secret');

passport.use(User.createStrategy());

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.findOne({
                $or: [{
                    'google.id': profile.id
                },
                {
                    'email': profile.emails[0].value
                }
                ]
            }, (err, user) => {
                if (err) return done(err);

                if (user) {
                    if (user.google.id == undefined) {
                        user.google.id = profile.id;
                        user.google.name = profile.displayName;
                        user.google.token = accessToken;
                        user.save();

                    }
                    return done(null, user);
                } else {
                    const newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.name = profile.displayName;
                    newUser.google.token = accessToken;

                    newUser.email = profile.emails[0].value;
                    newUser.slika = profile.photos[0].value;
                    newUser.ime = `${profile.name.givenName} ${profile.name.familyName}`;


                    newUser.save((err) => {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }))


passport.use(new facebookStrategy(secret.facebook, (accessToken, refreshToken, profile, done) => {

    process.nextTick(() => {
        User.findOne({
            $or: [{
                'facebook.id': profile.id
            },
            {
                'email': profile.emails[0].value
            }
            ]
        }, (err, user) => {
            if (err) return done(err);

            if (user) {
                if (user.facebook.id == undefined) {
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.email = profile.emails[0].value;
                    user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
                    user.slika = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.save();

                }
                return done(null, user);
            } else {
                const newUser = new User();
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                // newUser.facebook.email = profile.emails[0].value;
                newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
                newUser.email = profile._json.email;

                newUser.ime = `${profile.name.givenName} ${profile.name.familyName}`;
                newUser.slika = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                newUser.save((err) => {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    });
}))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());