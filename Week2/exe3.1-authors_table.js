const mysql = require('mysql2');
//mySQL EXERCISE 3.1 -->create databse myLibrary, create table authors, add mentor column and foreign key constraint
// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

// Connect to the MySQL server
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the MySQL server:', err);
    return;
  }
  console.log('Connected to the MySQL server.');

  // Create the database myLibrary
  const createDatabase = 'CREATE DATABASE IF NOT EXISTS myLibrary';

  connection.query(createDatabase, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database myLibrary created.');

    // Use the newly created database
    connection.query('USE myLibrary', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Using database myLibrary.');

      // Create the authors table
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

      connection.query(createAuthorsTable, (err) => {
        if (err) {
          console.error('Error creating authors table:', err);
          return;
        }
        console.log('Authors table created.');

        // Add the mentor column and foreign key constraint
        const addMentorColumn = `
          ALTER TABLE authors
          ADD COLUMN mentor INT,
          ADD CONSTRAINT fk_mentor
              FOREIGN KEY (mentor)
              REFERENCES authors(author_id);
        `;

        connection.query(addMentorColumn, (err) => {
          if (err) {
            console.error('Error adding mentor column:', err);
          } else {
            console.log('Mentor column added with foreign key constraint.');
          }

          // Close the connection
          connection.end();
        });
      });
    });
  });
});
