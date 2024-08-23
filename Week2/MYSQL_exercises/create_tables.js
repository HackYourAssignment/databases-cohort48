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
    createTables();
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
        connection.end();
    });
}
