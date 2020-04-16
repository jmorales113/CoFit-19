const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

router
	.get('/', (req, res) => {
		res.render('home', { layout: false });
	})
	.get('/about', (req, res) => {
		res.render('about', { title: 'About', cssLink: '../css/about.css' });
	})
	.get('/login', (req, res) => {
		res.render('login', { title: 'Login', cssLink: '../css/login.css' });
	})
	.post(
		'/login',
		passport.authenticate('local', {
			successRedirect: '/myplan',
			failureRedirect: '/login'
		})
	)
	.post('/register', (req, res) => {
		validateNewUser(req, res);
	})
	.get('/register', (req, res) => {
		res.render('register', { title: 'Register', cssLink: '../css/register.css' });
	})
	.get('/nutrition', (req, res) => {
		res.render('nutrition', { title: 'Nutrition', cssLink: '../css/nutrition.css' });
	})
	.get('/logout', (req, res) => {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});

module.exports = router;

function validateNewUser(req, res) {
	const { email, password, password2 } = req.body;
	let errors = [];
	if (!email || !password || !password2) {
		errors.push({ message: 'Please fill out all fields' });
	}
	if (!email.includes('@')) {
		errors.push({ message: 'Please enter a valid email' });
	}
	if (password != password2) {
		errors.push({ message: 'Please enter matching password' });
	}
	if (password.length < 8 || password.length > 20) {
		errors.push({ message: 'Please enter a password between 8-20 characters' });
	}
	if (errors.length > 0) {
		res.render('register', { title: 'Register', email, errors, cssLink: '../css/register.css' });
	} else {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) throw err;
			connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err) => {
				if (err) {
					console.log(err);
					errors.push({ message: 'An account already exists with that email' });
					res.render('register', { title: 'Register', email, errors, cssLink: '../css/register.css' });
				} else {
					connection.query('SELECT LAST_INSERT_ID() FROM users as user_id;', (err, data, fields) => {
						if (err) throw err;
						const user = {
							user_id: data[0]['LAST_INSERT_ID()']
						};
						console.log(user);
						req.login(user, (err) => {
							res.redirect('myplan');
						});
					});
				}
			});
		});
	}
}

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
