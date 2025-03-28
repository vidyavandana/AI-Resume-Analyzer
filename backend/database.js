const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost", // Change if your database is hosted elsewhere
    user: 'root',
    password: 'S@ilu123',
    database: 'resume_analyzer'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
