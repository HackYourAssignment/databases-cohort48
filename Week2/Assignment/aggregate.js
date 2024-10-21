import { connection } from "./dbConnect.js";

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});



// All research papers and the number of authors that wrote that paper
const query1 = `
SELECT rp.paper_title, COUNT(arp.author_id) AS num_authors
    FROM research_papers rp
    RIGHT JOIN authors_research_papers arp ON rp.paper_id = arp.paper_id
    GROUP BY rp.paper_id;
    `;

// Sum of the research papers published by all female authors
const query2 = `
SELECT COUNT(rp.paper_id) AS total_papers
    FROM research_papers rp
    INNER JOIN authors_research_papers arp ON rp.paper_id = arp.paper_id
    INNER JOIN authors a ON arp.author_id = a.author_id
    WHERE a.gender = 'F';`;

// Average of the h-index of all authors per university
const query3 = `
SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;`;

// Sum of the research papers of the authors per university
const query4 = `
SELECT university, COUNT(arp.paper_id) AS total_papers
    FROM authors_research_papers arp
    INNER JOIN authors a ON arp.author_id = a.author_id
    GROUP BY university;`;

// Minimum and maximum of the h-index of all authors per university
const query5 = `
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university;`;

connection.query('USE assignmentDatabase', (err) => {
    if (err) {
        console.error('Error using assignment database:', err);
        return;
    }
    console.log('Using assignment database');
    try {
    connection.query(query1, (err, results) => {
        if (err) {
            console.error('Error retrieving research papers:', err);
            return;
        }
        console.log('Research papers and number of authors:', results);
    });
    connection.query(query2, (err, results) => {
        if (err) {
            console.error('Error retrieving sum of research papers:', err);
            return;
        }
        console.log('Sum of research papers published by female authors:', results);
    });
    connection.query(query3, (err, results) => {
        if (err) {
            console.error('Error retrieving average h-index:', err);
            return;
        }
        console.log('Average h-index of authors per university:', results);
    });
    connection.query(query4, (err, results) => {
        if (err) {
            console.error('Error retrieving sum of research papers:', err);
            return;
        }
        console.log('Sum of research papers of authors per university:', results);
    });
    connection.query(query5, (err, results) => {
        if (err) {
            console.error('Error retrieving min and max h-index:', err);
            return;
        }
        console.log('Min and max h-index of authors per university:', results);
    });
    } catch (err) {
        console.error('Error running queries:', err);
    } finally {
        closeConnection();
    }    
});


// close the connection
const closeConnection = () => {
    connection.end((err) => {
        if (err) {
            console.error('Error disconnecting from the database:', err);
            return;
        }
        console.log('Disconnected from the database');
    });
}
