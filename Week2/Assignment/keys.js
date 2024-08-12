import { connection } from "./dbConnect.js";

connection.query('CREATE DATABASE IF NOT EXISTS assignmentDatabase', (err) => {
    if (err) {
        console.error('Error creating assignment database:', err);
        return;
    }
    console.log('assignment database created');
});

connection.query('USE assignmentDatabase', (err) => {
    if (err) {
        console.error('Error using assignment database:', err);
        return;
    }
    console.log('Using assignment database');
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    university VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    h_index INT NOT NULL,
    gender ENUM('M', 'F') NOT NULL
)`;

connection.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating authors table:', err);
        return;
    }
    console.log('Authors table created');
});

// declaring variables for the queries

const checkColumnQuery = `SELECT * FROM information_schema.columns 
    WHERE table_name = 'authors' 
    AND column_name = 'mentor'`;
const addColumnQuery = `ALTER TABLE authors ADD COLUMN mentor INT`;
const addForeignKeyQuery = `ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`;


// checking if the mentor column exists in the authors table
connection.query(checkColumnQuery, (err, results) => {
    if (err) {
        console.error('Error checking mentor column:', err);
        return;
    }
    if (results.length === 0) {

        // adding the mentor column to the authors table
        connection.query(addColumnQuery, (err) => {
            if (err) {
                console.error('Error adding mentor column:', err);
                return;
            }
            console.log('Mentor column added');

            // adding the foreign key constraint to the mentor column
            connection.query(addForeignKeyQuery, (err) => {
                if (err) {
                    console.error('Error adding mentor foreign key:', err);
                    return;
                }
                console.log('Mentor foreign key added');
            });
            connection.end((err) => {
                if (err) {
                    console.error('Error ending the connection:', err);
                    return;
                }
                console.log('Connection ended');
            });
        
        });
    }
});