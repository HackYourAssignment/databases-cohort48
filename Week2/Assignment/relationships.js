import { connection } from "./dbConnect.js";

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.query('USE assignmentDatabase', (err) => {
        if (err) {
            console.error('Error using assignment database:', err);
            return;
        }
        console.log('Using assignment database');
    });

    const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT PRIMARY KEY AUTO_INCREMENT,
        paper_title VARCHAR(100) NOT NULL,
        conference VARCHAR(100) NOT NULL,
        publish_date DATE NOT NULL
    )`;

    const createAuthorsResearchPapersTable = `CREATE TABLE IF NOT EXISTS authors_research_papers (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    )`;

    connection.query(createResearchPapersTable, (err) => {
        if (err) {
            console.error('Error creating research_papers table:', err);
            return;
        }
        console.log('Research papers table created');
    });

    connection.query(createAuthorsResearchPapersTable, (err) => {
        if (err) {
            console.error('Error creating authors_research_papers table:', err);
            return;
        }
        console.log('Authors research papers table created');
    });

    // decring variables for the insert queries
    const insertAuthorQuery = `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
        VALUES
        (1, 'Alice Johnson', 'Stanford University', '1980-01-15', 35, 'F',1),
        (2, 'Bob Smith', 'MIT', '1975-05-20', 42, 'M',1),
        (3, 'Charlie Brown', 'UC Berkeley', '1985-03-10', 28, 'M',1),
        (4, 'Diana Lee', 'Stanford University', '1978-11-25', 38, 'F',2),
        (5, 'Emily Carter', 'MIT', '1982-07-18', 32, 'F',1),
        (6, 'Frank Miller', 'UC Berkeley', '1979-04-05', 40, 'M',1),
        (7, 'Grace Wilson', 'Stanford University', '1983-09-12', 30, 'F',2),
        (8, 'Henry Davis', 'MIT', '1981-02-21', 36, 'M',2),
        (9, 'Isabella Taylor', 'UC Berkeley', '1977-06-03', 45, 'F',1),
        (10, 'Jack White', 'Stanford University', '1984-10-08', 29, 'M',2),
        (11, 'Karen Green', 'MIT', '1976-12-19', 41, 'F',1),
        (12, 'Liam Brown', 'UC Berkeley', '1987-05-23', 27, 'M',2),
        (13, 'Maria Rodriguez', 'Stanford University', '1988-08-04', 26, 'F',1),
        (14, 'Noah Hall', 'MIT', '1974-09-11', 43, 'M',1),
        (15, 'Olivia Martinez', 'UC Berkeley', '1986-03-20', 31, 'F',2);`

    const insertResearchPapersQuery = `INSERT INTO research_papers (paper_title, conference, publish_date)
        VALUES
        ('Paper 1', 'Conference 1', '2021-01-15'),
        ('Paper 2', 'Conference 2', '2021-02-20'),
        ('Paper 3', 'Conference 3', '2021-03-10'),
        ('Paper 4', 'Conference 1', '2021-01-25'),
        ('Paper 5', 'Conference 2', '2021-02-18'),
        ('Paper 6', 'Conference 3', '2021-03-05'),
        ('Paper 7', 'Conference 1', '2021-01-12'),
        ('Paper 8', 'Conference 2', '2021-02-21'),
        ('Paper 9', 'Conference 3', '2021-03-03'),
        ('Paper 10', 'Conference 1', '2021-01-08'),
        ('Paper 11', 'Conference 2', '2021-02-19'),
        ('Paper 12', 'Conference 3', '2021-03-23'),
        ('Paper 13', 'Conference 1', '2021-01-04'),
        ('Paper 14', 'Conference 2', '2021-02-11'),
        ('Paper 15', 'Conference 3', '2021-03-20'),
        ('Paper 16', 'Conference 1', '2021-01-15'),
        ('Paper 17', 'Conference 2', '2021-02-20'),
        ('Paper 18', 'Conference 3', '2021-03-10'),
        ('Paper 19', 'Conference 1', '2021-01-25'),
        ('Paper 20', 'Conference 2', '2021-02-18'),
        ('Paper 21', 'Conference 3', '2021-03-05'),
        ('Paper 22', 'Conference 1', '2021-01-12'),
        ('Paper 23', 'Conference 2', '2021-02-21'),
        ('Paper 24', 'Conference 3', '2021-03-03'),
        ('Paper 25', 'Conference 1', '2021-01-08'),
        ('Paper 26', 'Conference 2', '2021-02-19'),
        ('Paper 27', 'Conference 3', '2021-03-23'),
        ('Paper 28', 'Conference 1', '2021-01-04'),
        ('Paper 29', 'Conference 2', '2021-02-11'),
        ('Paper 30', 'Conference 3', '2021-03-20');`;

    const insertAuthorsResearchPapersQuery = `INSERT INTO authors_research_papers (author_id, paper_id)
        VALUES
        (1, 1),
        (1, 2),
        (2, 3),
        (2, 4),
        (3, 5),
        (3, 6),
        (4, 7),
        (4, 1),
        (4, 8),
        (5, 2),
        (5, 9),
        (5, 10),
        (6, 3),
        (6, 11),
        (6, 12),
        (7, 4),
        (7, 13),
        (7, 14),
        (8, 5),
        (8, 15),
        (8, 16),
        (9, 6),
        (9, 17),
        (9, 18),
        (10, 7),
        (10, 19),
        (10, 20),
        (11, 8),
        (11, 21),
        (11, 22),
        (12, 9),
        (12, 23),
        (12, 24),
        (13, 10),
        (13, 25),
        (13, 26),
        (14, 11),
        (14, 27),
        (14, 28),
        (15, 12),
        (15, 29),
        (15, 30);`;

    connection.query(insertAuthorQuery, (err) => {
        if (err) {
            console.error('Error inserting authors:', err);
            return;
        }
        console.log('Authors inserted');
    });

    connection.query(insertResearchPapersQuery, (err) => {
        if (err) {
            console.error('Error inserting research papers:', err);
            return;
        }
        console.log('Research papers inserted');
    });

    connection.query(insertAuthorsResearchPapersQuery, (err) => {
        if (err) {
            console.error('Error inserting authors research papers:', err);
            return;
        }
        console.log('Authors research papers inserted');
            connection.end((err) => {
                if (err) {
                    console.error('Error disconnecting from the database:', err);
                    return;
                }
                console.log('Disconnected from the database');
            });
    });

});


