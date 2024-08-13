const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // Allows execution of multiple SQL statements
});

// Function to create database and table
function setupDatabase() {
    // Create a connection to the MySQL server
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL server:', err.stack);
            return;
        }
        console.log('Connected to MySQL server');

        // SQL query to create the database if it doesn't exist
        const createDatabase = `CREATE DATABASE IF NOT EXISTS key_db; USE key_db;`;

        // SQL query to create the authors table
        const createAuthorsTable = `
            CREATE TABLE IF NOT EXISTS authors (
                author_id INT AUTO_INCREMENT PRIMARY KEY,
                author_name VARCHAR(255) NOT NULL,
                university VARCHAR(255),
                date_of_birth DATE,
                h_index INT,
                gender ENUM('Male', 'Female', 'Other')
            );
        `;

        // SQL query to add mentor column and foreign key
        const addMentorColumnAndForeignKey = `
            ALTER TABLE authors
            ADD COLUMN mentor INT;

            ALTER TABLE authors
            ADD CONSTRAINT fk_mentor
            FOREIGN KEY (mentor) REFERENCES authors(author_id)
            ON DELETE SET NULL ON UPDATE CASCADE;
        `;

        // Execute the query to create the database and table
        connection.query(createDatabase + createAuthorsTable, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                return;
            }
            console.log('Database and authors table created successfully');

            // Execute the query to add the mentor column and foreign key
            connection.query(addMentorColumnAndForeignKey, (error, results) => {
                if (error) {
                    console.error('Error executing SQL query:', error);
                    return;
                }
                console.log('Mentor column and foreign key added successfully');
                connection.end();
            });
        });
    });
}

// Run the setup function
setupDatabase();