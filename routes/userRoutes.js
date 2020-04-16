const express = require('express');
const router = express.Router();
const passport = require('passport');

router
	.get('/', authenticationMiddleware(), (req, res) => {
		console.log(req.user);
		console.log(req.isAuthenticated());
		res.render('daily-log', { layout: 'myplan', title: 'Daily Log', cssLink: '../css/daily-log.css' });
	})
	.get('/bmi-calculator', authenticationMiddleware(), (req, res) => {
		res.render('bmi-calculator', {
			layout: 'myplan',
			title: 'BMI Calculator',
			cssLink: '../css/bmi-calculator.css'
		});
	})
	.get('/macro-calculator', authenticationMiddleware(), (req, res) => {
		res.render('macro-calculator', {
			layout: 'myplan',
			title: 'Macro Calculator',
			cssLink: '../css/macro-calculator.css'
		});
	})
	.get('/workouts', authenticationMiddleware(), (req, res) => {
		res.render('workouts', { layout: 'myplan', title: 'Workouts', cssLink: '../css/workouts.css' });
	});

module.exports = router;

function authenticationMiddleware() {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

		if (req.isAuthenticated()) return next();
		res.redirect('/login');
	};
}
