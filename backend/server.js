const express = require('express');
const connection = require('./database');

const app = express();
const PORT = 5173;


app.put('/update-user', async (req, res) => {
  const { name, email, password } = req.body;
  // Database update logic here
  res.send({ message: "User updated successfully!" });
});


app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Example: Fetch all users from the database
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
