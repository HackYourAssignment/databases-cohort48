import { connection } from "./dbConnect.js";

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

connection.query('USE assignmentDatabase', (err) => {
    if (err) {
        console.error('Error using assignment database:', err);
        return;
    }
    console.log('Using assignment database');
});

const authorsMentorsQuery = `
SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
`;

const authorsPapersQuery = `
SELECT a.author_name, r.paper_title
    FROM authors a
    JOIN authors_research_papers arp ON a.author_id = arp.author_id
    JOIN research_papers r ON arp.paper_id = r.paper_id;
`;

connection.query(authorsMentorsQuery, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Authors and their mentors:');
    results.forEach((row) => {
        console.log(`${row.author} - ${row.mentor}`);
    });
});

connection.query(authorsPapersQuery, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Authors and their papers:');
    results.forEach((row) => {
        console.log(`${row.author_name} - ${row.paper_title}`);
    });
    connection.end((err) => {
        if (err) {
            console.error('Error disconnecting from the database:', err);
            return;
        }
        console.log('Disconnected from the database');
    });
});

