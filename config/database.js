import mysql from 'mysql';

export const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'scoring-app-db'
});
connection.connect(function(error){
	if(!!error) {
		console.log('Failed to connect with database.');
	} else {
		console.log('Database connected successfully!');
	}
});