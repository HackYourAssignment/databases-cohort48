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

    // Query: All research papers and the number of authors that wrote that paper
    const query1 =`
     SELECT rp.paper_id, rp.paper_title, COUNT(ap.author_id) AS num_of_authors
     FROM Research_Papers rp 
     LEFT JOIN Author_Papers ap ON rp.paper_id = ap.paper_id 
     GROUP BY rp.paper_id, rp.paper_title`;
    
    // Query: Sum of the research papers published by all female authors
    const query2 = `
    SELECT COUNT(ap.paper_id) AS total_papers_published_by_females
    FROM Author_Papers ap
    JOIN Authors a ON ap.author_id = a.author_id
    WHERE a.gender = 'Female'`;

    // Query: Average of the h-index of all authors per university
    const query3 = `
    SELECT university, AVG(h_index) AS avg_h_index 
    FROM Authors 
    GROUP BY university`;

    // Query: Sum of the research papers of the authors per university
    const query4 = `
    SELECT a.university, COUNT(ap.paper_id) AS total_papers
    FROM Authors a
    LEFT JOIN Author_Papers ap ON a.author_id = ap.author_id
    GROUP BY a.university`;

    // Query: Minimum and maximum of the h-index of all authors per university
    const query5 = `
    SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index 
    FROM Authors
    GROUP BY university`;

    // Execute queries
    connection.query(query1, (err, results1) => {
        if (err) throw err;
        console.log(results1);
    });

    connection.query(query2, (err, results2) => {
        if (err) throw err;
        console.log(results2);
    });

    connection.query(query3, (err, results3) => {
        if (err) throw err;
        console.log(results3);
    });

    connection.query(query4, (err, results4) => {
        if (err) throw err;
        console.log(results4);
    });

    connection.query(query5, (err, results5) => {
        if (err) throw err;
        console.log(results5);
    });

    // Close the connection
    connection.end();
});