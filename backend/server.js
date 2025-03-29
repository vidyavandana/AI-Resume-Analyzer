const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 5173;


// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S@ilu123',
    database: 'resume_analyzer'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('❌ MySQL Connection Failed:', err);
    } else {
      console.log('✅ MySQL Connected Successfully!');
  
      // Test Query
      db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
          console.error('❌ Query Failed:', err);
        } else {
          console.log('✅ Query Success:', results[0].solution); // Should log "2"
        }
      });
    }
  });
  
  // Start Server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });