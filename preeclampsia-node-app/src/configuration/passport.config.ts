import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { db } from 'models/index';
import UserService from 'services/user.service';

export const configure = async (app) => {
	app.use(passport.initialize());

	// Login
	passport.use('login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
	}, async (email: string, password: string, done) => {
		try {
			// Find the user by E-mail
			const user = await UserService.getByEmail(email);
			if (!user) {
				// User not found
				return done(null, false);
			}

			const isValidPassword: boolean = await user.isValidPassword(password);
			if (!isValidPassword) {
				// Incorrect password
				return done(null, false);
			}

			// Call the next middleware
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}));

	// Registration
	passport.use('signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true,
	}, async (req, email: string, password: string, done) => {
		try {
			const {
				firstName,
				lastName,
				role,
			} = req.body;

			const userData = {
				firstName,
				lastName,
				role,
				email,
				password,
			};

			const user = await UserService.createUser(userData);

			//Send the user information to the next middleware
			return done(null, user);
		} catch (error) {
			done(error);
		}
	}));

	// Authentication
	passport.use(new JWTstrategy({
		secretOrKey : process.env.JWT_SECRET,
		jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
		passReqToCallback : true,
	}, async (req, token, done) => {
		try {
			return done(null, token.user);
		} catch (error) {
			done(error);
		}
	}));
};

export default {
	configure,
};
