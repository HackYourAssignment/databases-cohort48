const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bank_db',
    multipleStatements: true
});

function insertSampleData() {
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL server:', err.stack);
            return;
        }
        console.log('Connected to MySQL server');

        const insertAccounts = `
            INSERT INTO account (account_number, balance) VALUES
            (101, 5000.00),
            (102, 3000.00),
            (103, 7000.00);
        `;

        const insertAccountChanges = `
            INSERT INTO account_changes (account_number, amount, remark) VALUES
            (101, 5000.00, 'Initial deposit'),
            (102, 3000.00, 'Initial deposit'),
            (103, 7000.00, 'Initial deposit');
        `;

        connection.query(insertAccounts + insertAccountChanges, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                return;
            }
            console.log('Sample data inserted successfully');
            connection.end();
        });
    });
}

insertSampleData();