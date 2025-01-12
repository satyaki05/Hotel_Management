const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
PORT=5500;
// Assuming you have a database connection already set up
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Replace with your MySQL password
    database: 'hotel_management', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Step 1: Retrieve the user from the database by email
    const sql = 'SELECT * FROM USER_DATA WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            // No user found with that email
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0]; // User data from the database
        const storedHashedPassword = user.password; // The hashed password stored in the database

        // Step 2: Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if (isMatch) {
            // Passwords match
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid password' });
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
