const mysql = require('mysql2');
//mySQL exercise 3.3 --> create 2 queries
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

  // Query 1: Print names of all authors and their corresponding mentors

  //To get the names of all authors along with their mentors, 
  //you'll need to join the authors table with itself. This is because the mentor is also an author.
  const query1 = `
    SELECT 
        a.author_name AS Author,
        m.author_name AS Mentor
    FROM 
        authors a
    LEFT JOIN 
        authors m 
    ON 
        a.mentor = m.author_id;
  `;
  
  connection.query(query1, (err, results) => {
    if (err) {
      console.error('Error executing query 1:', err);
    } else {
      console.log('Names of all authors and their corresponding mentors:');
      console.log(results);
    }

    // Query 2: Print all columns of authors and their published paper titles
    const query2 = `
      SELECT 
          a.author_id,
          a.author_name,
          a.university,
          a.date_of_birth,
          a.h_index,
          a.gender,
          a.mentor,
          rp.paper_title
      FROM 
          authors a
      LEFT JOIN 
          research_Papers rp 
      ON 
          a.author_id = rp.author_id;
    `;

    connection.query(query2, (err, results) => {
      if (err) {
        console.error('Error executing query 2:', err);
      } else {
        console.log('All columns of authors and their published paper titles:');
        console.log(results);
      }

      // Close the connection
      connection.end();
    });
  });
});
