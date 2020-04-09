const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => {
		res.render('daily-log', { layout: 'myplan', title: 'Daily Log' });
	})
	.get('/bmi-calculator', (req, res) => {
		res.render('bmi-calculator', { layout: 'myplan', title: 'BMI Calculator' });
	})
	.get('/macro-calculator', (req, res) => {
		res.render('macro-calculator', { layout: 'myplan', title: 'Macro Calculator' });
	})
	.get('/workouts', (req, res) => {
		res.render('workouts', { layout: 'myplan', title: 'Workouts' });
	});

module.exports = router;
