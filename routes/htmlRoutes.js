const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => {
		res.render('home', {title: 'Welcome'});
	})
	.get('/about', (req, res) => {
		res.render('about', {title: 'About'});
	})
	.get('/login', (req, res) => {
		res.render('login', { title: 'Login'});
	})
	.get('/register', (req, res) => {
		res.render('register', { title: 'Register'});
	})
	.get('/nutrition', (req, res) => {
		res.render('nutrition', { title: 'Nutrition'});
	})
	.get('/exercise', (req, res) => {
		res.render('exercise', { title: 'Exercise'});
	});

module.exports = router;
