// Dependencies
const express = require('express');
const mysql = require('mysql');
const htmlRoutes = require('./routes/htmlRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const connection = require('./db');
// allow heroku to inject a PORT
const PORT = process.env.PORT || 8080;
// instantiate express
const app = express();
// set up express to serve static files
app.use(express.static('public'));
// set up express to handle post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Authentication Middleware
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'cofit19_db'
};

var sessionStore = new MySQLStore(options);

app.use(
	session({
		secret: 'knsilendmxnjs',
		store: sessionStore,
		resave: false,
		saveUninitialized: false
		// cookie: { secure: true }
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
});

passport.use(
	new LocalStrategy(function (username, password, done) {
		connection.query('SELECT id, password FROM users WHERE email = ?', [username], (err, response) => {
			if (err) {
				return done(err);
			}
			if (response.length == 0) {
				done(null, false);
			} else {
				const hash = response[0].password.toString();
				const user_id = response[0].id;
				bcrypt.compare(password, hash, (err, response) => {
					if (response == true) {
						return done(null, { user_id: user_id });
					} else {
						return done(null, false);
					}
				});
			}
		});
	})
);

// set view engine to handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// routes
app.use('/myplan', userRoutes);
app.use('/', htmlRoutes);
app.use('', apiRoutes);
// starts server
app.listen(PORT, () => {
	console.log(`Server listening at PORT: ${PORT}`);
});
