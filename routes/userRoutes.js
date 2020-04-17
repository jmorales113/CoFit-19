const express = require('express');
const router = express.Router();
const passport = require('passport');
const connection = require('../db');

router
	.get('/', authenticationMiddleware(), (req, res) => {
		console.log(req.user);
		console.log(req.isAuthenticated());
		connection.query('SELECT macros, bmi, dailyLog FROM users WHERE id = ?', [req.user.user_id], (err, data) => {
			if (err) throw err;
			let {macros, bmi, dailyLog} = data[0];
			let parsedMacros = JSON.parse(macros);
			let parsedDailyLog = JSON.parse(dailyLog);
			if (parsedMacros === null) {
				var calories = 0;
				var protein = 0;
				var carbs = 0;
				var fat = 0;
			} else {
				var {calories, protein, carbs, fat} = parsedMacros;
			}
			if (parsedDailyLog === null) {
				var newCalories = 0;
				var newProtein = 0;
				var newCarbs = 0;
				var newFat = 0; 
			} else {
				var {newCalories, newProtein, newCarbs, newFat} = parsedDailyLog;
			}
			res.render('daily-log', { layout: 'myplan', title: 'Daily Log', cssLink: '../css/daily-log.css' , calories, protein, fat, carbs, newCalories, newProtein, newCarbs, newFat, bmi});
		});
	})
	.post('/', (req, res)=>{
		const user_id = req.user.user_id;
		let {calories: inputCalories, fat: inputFat, protein: inputProtein, carbs: inputCarbs} = req.body;
		connection.query('SELECT dailyLog FROM users WHERE id = ?', [user_id], (err, data) => {
			if (err) throw err;
			let updatedMacros;
			if (!data[0].dailyLog) {
				updatedMacros = JSON.stringify({newCalories: inputCalories, newFat: inputFat, newProtein: inputProtein, newCarbs: inputCarbs});
			} else {
				let macros = JSON.parse(data[0].dailyLog);
				let userCalories = parseInt(inputCalories);
				let userProtein = parseInt(inputProtein);
				let userFat = parseInt(inputFat);
				let userCarbs = parseInt(inputCarbs);
				let newCalories = parseInt(macros.newCalories);  
				let newFat = parseInt(macros.newFat)
				let newProtein = parseInt(macros.newProtein);
				let newCarbs = parseInt(macros.newCarbs);
				newCalories += userCalories;
				newFat += userFat;
				newProtein += userProtein;
				newCarbs += userCarbs;
				updatedMacros = JSON.stringify({newCalories, newFat, newProtein, newCarbs});
			}
			connection.query('UPDATE users SET dailyLog = ? WHERE id = ?', [updatedMacros, user_id], (err, data)=>{
				if (err) throw err;
				console.log(data);
				res.redirect('/myplan');
			})
		})
	})
	.get('/bmi-calculator', authenticationMiddleware(), (req, res) => {
		res.render('bmi-calculator', {
			layout: 'myplan',
			title: 'BMI Calculator',
			cssLink: '../css/bmi-calculator.css'
		});
	})
	.post('/bmi-calculator', (req, res) => {
		console.log(req.user.user_id);
		console.log(req.body);
		connection.query("UPDATE users SET bmi = ? WHERE id = ?", [req.body.bmi, req.user.user_id], (err, data)=>{
			if (err) throw err;
		})
	})
	.get('/macro-calculator', authenticationMiddleware(), (req, res) => {
		res.render('macro-calculator', {
			layout: 'myplan',
			title: 'Macro Calculator',
			cssLink: '../css/macro-calculator.css'
		});
	})
	.post('/macro-calculator', (req, res)=>{
		const userId = req.user.user_id;
		const macroInfo = JSON.stringify(req.body);
		connection.query("UPDATE users SET macros = ? WHERE id = ?", [macroInfo, userId], (err, data)=>{
			if (err) throw err;
			console.log(data);
		})
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


