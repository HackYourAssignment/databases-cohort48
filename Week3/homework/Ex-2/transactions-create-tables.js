const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bank_db',
    multipleStatements: true
});

// Function to create tables
function createTables() {
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL server:', err.stack);
            return;
        }
        console.log('Connected to MySQL server');

        const createAccountTable = `
            CREATE TABLE IF NOT EXISTS account (
                account_number INT PRIMARY KEY,
                balance DECIMAL(10, 2) NOT NULL
            );
        `;

        const createAccountChangesTable = `
            CREATE TABLE IF NOT EXISTS account_changes (
                change_number INT AUTO_INCREMENT PRIMARY KEY,
                account_number INT,
                amount DECIMAL(10, 2),
                changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                remark VARCHAR(255),
                FOREIGN KEY (account_number) REFERENCES account(account_number)
            );
        `;

        connection.query(createAccountTable + createAccountChangesTable, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                return;
            }
            console.log('Tables created successfully');
            connection.end();
        });
    });
}


createTables();