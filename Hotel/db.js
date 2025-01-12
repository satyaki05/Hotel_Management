const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createConnection({
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',           // Replace with your MySQL username
    password: '1234',           // Replace with your MySQL password
    database: 'hotel_management',    // Replace with your MySQL database name
});
// Connect to MySQL
db.connect(function(err){
    if (err) throw err;
        console.log("connect");
      
    });