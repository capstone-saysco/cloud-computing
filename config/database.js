import mysql from 'mysql';
import 'dotenv/config';

export const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});
connection.connect(function(error){
	if(!!error) {
		console.log('Failed to connect with database.'+process.env.DB_NAME);
	} else {
		console.log('Database connected successfully!');
	}
});
