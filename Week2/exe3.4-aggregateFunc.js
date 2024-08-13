const mysql = require('mysql2/promise');
//exercise 3.4 --> create 5 queries by using aggregate functions in an async function   
    
// Create a connection to the MySQL server
const connectionConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myLibrary'  // Use the existing database
};

// Queries to be executed
const queries = [
  {
    name: 'All research papers and the number of authors that wrote that paper',
    sql: `
      SELECT 
          rp.paper_title,
          COUNT(rp.author_id) AS num_authors
      FROM 
          research_Papers rp
      GROUP BY 
          rp.paper_id;
    `
  },
  {
    name: 'Sum of the research papers published by all female authors',
    sql: `
      SELECT 
          COUNT(rp.paper_id) AS total_papers_by_female_authors
      FROM 
          research_Papers rp
      JOIN 
          authors a 
      ON 
          rp.author_id = a.author_id
      WHERE 
          a.gender = 'Female';
    `
  },
  {
    name: 'Average of the h-index of all authors per university',
    sql: `
      SELECT 
          a.university,
          AVG(a.h_index) AS average_h_index
      FROM 
          authors a
      GROUP BY 
          a.university;
    `
  },
  {
    name: 'Sum of the research papers of the authors per university',
    sql: `
      SELECT 
          a.university,
          COUNT(rp.paper_id) AS total_papers
      FROM 
          authors a
      LEFT JOIN 
          research_Papers rp 
      ON 
          a.author_id = rp.author_id
      GROUP BY 
          a.university;
    `
  },
  {
    name: 'Minimum and maximum of the h-index of all authors per university',
    sql: `
      SELECT 
          a.university,
          MIN(a.h_index) AS min_h_index,
          MAX(a.h_index) AS max_h_index
      FROM 
          authors a
      GROUP BY 
          a.university;
    `
  }
];

const executeQueries = async (queries) => {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    for (const query of queries) {
      console.log(`Executing query: ${query.name}`);
      try {
        const [results] = await connection.query(query.sql);
        console.log(`Results for '${query.name}':`, results);
      } catch (err) {
        console.error(`Error executing query '${query.name}':`, err);
      }
    }
  } catch (err) {
    console.error('Error connecting to the MySQL server:', err);
  } finally {
    await connection.end();
  }
};

// Start executing queries
executeQueries(queries);
