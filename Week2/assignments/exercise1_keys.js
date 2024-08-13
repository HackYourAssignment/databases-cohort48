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

// SQL query to create authors table if it does not exist
const createAuthorsTableQuery = `
    CREATE TABLE IF NOT EXISTS Authors (
      author_id INT PRIMARY KEY,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
    );
  `;

// SQL query to add mentor column with foreign key constraint
const addMentorColumnQuery = `
    ALTER TABLE Authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES Authors(author_id);
  `;

// Create authors table with the specified schema
connection.query(createAuthorsTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Authors table created.");

// Add mentor column to authors table
connection.query(addMentorColumnQuery, (err, result) => {
    if (err) throw err;
    console.log("mentor column added.");

      // Close the connection
      connection.end();
    });
  });
});