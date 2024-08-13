const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myLibrary'  // Use the existing database
});

// Connect to the MySQL server
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the MySQL server:', err);
    return;
  }
  console.log('Connected to the MySQL server.');

  // Insert sample data into authors table including the mentor column
  const insertAuthors = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
    ('Author 1', 'University A', '1980-01-01', 10, 'Male', NULL),
    ('Author 2', 'University B', '1981-02-02', 12, 'Female', 1),
    ('Author 3', 'University C', '1982-03-03', 15, 'Male', 1),
    ('Author 4', 'University D', '1983-04-04', 9, 'Female', 2),
    ('Author 5', 'University E', '1984-05-05', 20, 'Male', 2),
    ('Author 6', 'University F', '1985-06-06', 25, 'Female', 3),
    ('Author 7', 'University G', '1986-07-07', 30, 'Male', 3),
    ('Author 8', 'University H', '1987-08-08', 18, 'Female', 4),
    ('Author 9', 'University I', '1988-09-09', 22, 'Male', 4),
    ('Author 10', 'University J', '1989-10-10', 17, 'Female', 5),
    ('Author 11', 'University K', '1990-11-11', 19, 'Male', 5),
    ('Author 12', 'University L', '1991-12-12', 14, 'Female', 6),
    ('Author 13', 'University M', '1992-01-13', 23, 'Male', 6),
    ('Author 14', 'University N', '1993-02-14', 26, 'Female', 7),
    ('Author 15', 'University O', '1994-03-15', 21, 'Male', 7);
  `;

  connection.query(insertAuthors, (err) => {
    if (err) {
      console.error('Error inserting authors data:', err);
      return;
    }
    console.log('Sample data inserted into authors table.');

    // Create the research_Papers table
    const createResearchPapersTable = `
      CREATE TABLE IF NOT EXISTS research_Papers (
          paper_id INT AUTO_INCREMENT PRIMARY KEY,
          paper_title VARCHAR(255) NOT NULL,
          conference VARCHAR(255),
          publish_date DATE,
          author_id INT,
          FOREIGN KEY (author_id) REFERENCES authors(author_id)
      );
    `;

    connection.query(createResearchPapersTable, (err) => {
      if (err) {
        console.error('Error creating research_Papers table:', err);
        return;
      }
      console.log('Research Papers table created.');

      // Insert sample data into research_Papers table
      const insertResearchPapers = `
        INSERT INTO research_Papers (paper_title, conference, publish_date, author_id) VALUES
        ('Paper A', 'Conference 1', '2023-01-15', 1),
        ('Paper B', 'Conference 2', '2022-11-20', 2),
        ('Paper C', 'Conference 1', '2023-03-10', 3),
        ('Paper D', 'Conference 3', '2022-09-25', 4),
        ('Paper E', 'Conference 2', '2023-05-30', 5),
        ('Paper F', 'Conference 1', '2022-10-05', 6),
        ('Paper G', 'Conference 3', '2023-02-22', 7),
        ('Paper H', 'Conference 2', '2022-12-14', 8),
        ('Paper I', 'Conference 1', '2023-04-08', 9),
        ('Paper J', 'Conference 3', '2022-08-19', 10),
        ('Paper K', 'Conference 2', '2023-01-11', 11),
        ('Paper L', 'Conference 1', '2022-11-04', 12),
        ('Paper M', 'Conference 3', '2023-06-17', 13),
        ('Paper N', 'Conference 2', '2022-10-23', 14),
        ('Paper O', 'Conference 1', '2023-05-06', 15);
      `;

      connection.query(insertResearchPapers, (err) => {
        if (err) {
          console.error('Error inserting research papers data:', err);
        } else {
          console.log('Sample data inserted into research_Papers table.');
        }

        // Close the connection
        connection.end();
      });
    });
  });
});
