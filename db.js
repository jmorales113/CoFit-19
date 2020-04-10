const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	post: 3306,
	user: 'root',
	password: '',
	database: 'cofit19_db'
});
connection.connect(() => {
	console.log(`connected to sql with ID: ${connection.threadId}`);
});

module.exports = connection;
