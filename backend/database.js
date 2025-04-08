const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost", // Change if your database is hosted elsewhere
    user: "root",
    password:"S@ilu123",
    database: "resume_analyzer"
});
// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('❌ MySQL Connection Failed:', err);
    } else {
      console.log('✅ MySQL Connected Successfully!');
  
      // Test Query to Check Connection
      connection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
          console.error('❌ Query Failed:', err);
        } else {
          console.log('✅ Query Success:', results[0].solution); // Should log "2"
        }
      });
    }
  });
  
  module.exports = connection;
