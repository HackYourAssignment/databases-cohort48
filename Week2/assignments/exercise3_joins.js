// Load the MySQL module
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'research_db'
});

// Establish database connection
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");

    // Query to print names of all authors and their corresponding mentors
    const query1 = `
        SELECT a.author_name, m.author_name AS mentor_name
        FROM Authors a
        LEFT JOIN Authors m ON a.mentor = m.author_id
    `;

    // Query to print all columns of authors and their published paper_title
    const query2 = `
        SELECT a.*, rp.paper_title
        FROM Authors a
        LEFT JOIN Author_Papers ap ON a.author_id = ap.author_id
        LEFT JOIN Research_Papers rp ON ap.paper_id = rp.paper_id
    `;

    // Execute the first query to print names of all authors and their mentors
    connection.query(query1, (err, results) => {
        if (err) throw err;
        console.log("Query 1 Results:");
        console.log(results);
    });

    // Execute the second query to print all columns of authors and their published paper_title
    connection.query(query2, (err, results) => {
        if (err) throw err;
        console.log("Query 2 Results:");
        console.log(results);
    });

    // Close the connection
    connection.end();
});