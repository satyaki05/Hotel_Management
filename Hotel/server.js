const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
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

// Signup route
// Signup route
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, username,email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        const sql = 'INSERT INTO USER_DATA (firstname, lastname,username, email, password) VALUES (?, ?,?, ?, ?)';
        db.query(sql, [firstName, lastName, username,email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: 'Failed to register user.' });
            }
            // Successful response
            res.status(200).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }
});
// // Login route with username, email, and password validation
app.post('/api/login', (req, res) => {
    const { username, email, password } = req.body;

    // Query to check if the user exists with the given username and email
    const sql = 'SELECT * FROM USER_DATA WHERE username = ? AND email = ?';
    db.query(sql, [username, email], async (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            // No user found with matching username and email
            return res.status(404).json({ message: 'Invalid username or email' });
        }

        const user = result[0];
        const storedHashedPassword = user.password;

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
