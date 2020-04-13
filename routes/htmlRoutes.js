const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');


router
	.get('/', (req, res) => {
		res.render('home', { layout: false });
	})
	.get('/about', (req, res) => {
		res.render('about', { title: 'About' });
	})
	.get('/login', (req, res) => {
		res.render('login', { title: 'Login' });
	})
	.post('/login', (req, res) => {
		console.log(req.body);
		res.redirect('/myplan/');
	})
	.post('/register', (req, res) => {
		validateNewUser(req, res);
	})
	.get('/register', (req, res) => {
		res.render('register', { title: 'Register' });
	})
	.get('/nutrition', (req, res) => {
		res.render('nutrition', { title: 'Nutrition' });
	})
	.get('/exercise', (req, res) => {
		res.render('exercise', { title: 'Exercise' });
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
		res.render('register', { title: 'Register', email, errors });
	} else {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) throw err;
			connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err) => {
				if (err) {
					errors.push({ message: 'An account already exists with that email' });
					res.render('register', { title: 'Register', email, errors });
				} else {
					res.redirect('myplan');
				}
			});
		});
	}
}
