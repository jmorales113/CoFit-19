const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => {
		res.render('daily-log', { layout: 'myplan', title: 'Daily Log' , cssLink: "../css/daily-log.css"});
	})
	.get('/bmi-calculator', (req, res) => {
		res.render('bmi-calculator', { layout: 'myplan', title: 'BMI Calculator' , cssLink: "../css/bmi-calculator.css"});
	})
	.get('/macro-calculator', (req, res) => {
		res.render('macro-calculator', { layout: 'myplan', title: 'Macro Calculator' , cssLink: "../css/macro-calculator.css"});
	})
	.get('/workouts', (req, res) => {
		res.render('workouts', { layout: 'myplan', title: 'Workouts' , cssLink: "../css/workouts.css"});
	});

module.exports = router;
