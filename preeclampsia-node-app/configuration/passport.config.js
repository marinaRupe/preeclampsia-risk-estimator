const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { db } = require('../models');

const configure = async (app) => {
  app.use(passport.initialize());

  // Login
  passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, async (email, password, done) => {
    try {
      // Find the user associated with the email provided by the user
      const user = await db.User.findOne({ where: { email }});
      if (!user) {
        return done(null, false, { message : 'User not found'});
      }

      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return done(null, false, { message : 'Incorrect Password' });
      }

      // Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

  // Registration
  passport.use('signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
  }, async (req, email, password, done) => {
    try {
      const {
        firstName,
        lastName,
        role,
      } = req.body;

      const user = await db.User.create({
        firstName,
        lastName,
        role,
        email,
        hashedPassword: password
      });

      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  // Authentication
  passport.use(new JWTstrategy({
    secretOrKey : process.env.JWT_SECRET,
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    passReqToCallback : true,
  }, async (req, token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
};

module.exports = {
  configure,
};
