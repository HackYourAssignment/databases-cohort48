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
    insertSampleData();
});

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
        connection.end();
    });
}
