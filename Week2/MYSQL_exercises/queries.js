const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'author_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql server.');
    runQueries();
});

function runQueries() {
    const QUERY_AUTHORS_MENTORS = `
        SELECT a1.author_name AS author, a2.author_name AS mentor 
        FROM authors a1 
        LEFT JOIN authors a2 ON a1.mentor = a2.author_id;
    `;
    connection.query(QUERY_AUTHORS_MENTORS, (error, results, fields) => {
        if (error) throw error;
        console.log('Authors and their corresponding mentors:', results);
    });

    const QUERY_AUTHORS_PAPERS = `
        SELECT authors.author_name, authors.university, research_papers.paper_title 
        FROM authors 
        LEFT JOIN research_papers ON authors.author_id = research_papers.author_id;
    `;
    connection.query(QUERY_AUTHORS_PAPERS, (error, results, fields) => {
        if (error) throw error;
        console.log('Authors and their published papers:', results);
    });

    const QUERY_PAPER_AUTHOR_COUNT = `
        SELECT paper_title, COUNT(author_id) AS author_count 
        FROM research_papers 
        GROUP BY paper_title;
    `;
    connection.query(QUERY_PAPER_AUTHOR_COUNT, (error, results, fields) => {
        if (error) throw error;
        console.log('Number of authors per paper:', results);
    });

    const QUERY_FEMALE_PAPER_SUM = `
        SELECT SUM(rp.paper_count) AS female_paper_sum 
        FROM (
            SELECT author_id, COUNT(*) AS paper_count 
            FROM research_papers 
            GROUP BY author_id
        ) rp 
        JOIN authors ON rp.author_id = authors.author_id 
        WHERE authors.gender = 'female';
    `;
    connection.query(QUERY_FEMALE_PAPER_SUM, (error, results, fields) => {
        if (error) throw error;
        console.log('Sum of research papers by female authors:', results);
    });

    const QUERY_AVG_H_INDEX_PER_UNIVERSITY = `
        SELECT university, AVG(h_index) AS avg_h_index 
        FROM authors 
        GROUP BY university;
    `;
    connection.query(QUERY_AVG_H_INDEX_PER_UNIVERSITY, (error, results, fields) => {
        if (error) throw error;
        console.log('Average h-index per university:', results);
    });

    const QUERY_SUM_PAPERS_PER_UNIVERSITY = `
        SELECT university, COUNT(research_papers.paper_id) AS paper_count 
        FROM authors 
        LEFT JOIN research_papers ON authors.author_id = research_papers.author_id 
        GROUP BY university;
    `;
    connection.query(QUERY_SUM_PAPERS_PER_UNIVERSITY, (error, results, fields) => {
        if (error) throw error;
        console.log('Sum of research papers per university:', results);
    });

    const QUERY_MIN_MAX_H_INDEX_PER_UNIVERSITY = `
        SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index 
        FROM authors 
        GROUP BY university;
    `;
    connection.query(QUERY_MIN_MAX_H_INDEX_PER_UNIVERSITY, (error, results, fields) => {
        if (error) throw error;
        console.log('Min and max h-index per university:', results);
        connection.end();
    });
}
