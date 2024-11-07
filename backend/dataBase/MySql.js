require('dotenv').config();
// db.js
const mysql = require('mysql2');


// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // your MySQL username
    password: process.env.DB_PASSWORD, // your MySQL password
    database: process.env.DB_NAME // the database you're connecting to
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connection successfully established');
});

module.exports = connection; // Export the connection for use in other files
