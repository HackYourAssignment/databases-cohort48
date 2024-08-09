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
    connection.query('CREATE DATABASE IF NOT EXISTS author_db', (error, results) => {
        if (error) throw error;
        console.log('Database "author_db" created or already exists.');

        connection.changeUser({database: 'author_db'}, (err) => {
            if (err) throw err;
            console.log('Using "author_db" database.');
            createTables();
        });
    });
});

function createTables() {
    const AUTHORS = `
        CREATE TABLE IF NOT EXISTS authors (
            author_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255),
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender ENUM('male', 'female', 'other'),
            mentor INT,
            FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL
        );
    `;
    connection.query(AUTHORS, (error, results, fields) => {
        if (error) throw error;
        console.log('Table "authors" created or already exists.');
        createResearchPapersTable();
    });
}

function createResearchPapersTable() {
    const RESEARCH_PAPERS = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT AUTO_INCREMENT PRIMARY KEY,
            paper_title VARCHAR(255),
            conference VARCHAR(255),
            publish_date DATE,
            author_id INT,
            FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
        );
    `;
    connection.query(RESEARCH_PAPERS, (error, results, fields) => {
        if (error) throw error;
        console.log('Table "research_papers" created or already exists.');
        insertSampleData();
    });
}

function insertSampleData() {
    let authors = [];
    let papers = [];

    for (let i = 1; i <= 15; i++) {
        const year = 1980 + i;
        const author = [
            `Author ${i}`,
            `University ${String.fromCharCode(64 + (i % 3) + 1)}`,
            `${year}-01-01`,
            Math.floor(Math.random() * 20) + 1,
            i % 2 === 0 ? 'male' : 'female',
            i > 1 ? Math.floor(Math.random() * (i - 1)) + 1 : null
        ];
        authors.push(author);
    }

    for (let i = 1; i <= 30; i++) {
        const paper = [
            `Paper ${i}`,
            `Conference ${String.fromCharCode(64 + (i % 3) + 1)}`,
            `2022-01-${(i % 30) + 1}`,
            Math.floor(Math.random() * 15) + 1 
        ];
        papers.push(paper);
    }

    const INSERT_AUTHORS = `
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
        VALUES ?;
    `;
    connection.query(INSERT_AUTHORS, [authors], (error, results, fields) => {
        if (error) throw error;
        console.log('Sample data inserted into "authors" table.');
        insertResearchPapers(papers);
    });
}

function insertResearchPapers(papers) {
    const INSERT_RESEARCH_PAPERS = `
        INSERT INTO research_papers (paper_title, conference, publish_date, author_id)
        VALUES ?;
    `;
    connection.query(INSERT_RESEARCH_PAPERS, [papers], (error, results, fields) => {
        if (error) throw error;
        console.log('Sample data inserted into "research_papers" table.');
        runQueries();
    });
}

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
