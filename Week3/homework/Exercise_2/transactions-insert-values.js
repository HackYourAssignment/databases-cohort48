const connection = require('./connections');

const insertAccountData = `INSERT IGNORE INTO account (account_number, balance) VALUES
    (101, 5000.00),
    (102, 3000.00);`;

const insertAccountChangesData = `INSERT IGNORE INTO account_changes (change_number, account_number, amount, changed_date, remark) VALUES
    (1, 101, 2000.00, '2024-03-15', 'Initial deposit'),
    (2, 102, -500.00, '2024-03-16', 'Withdrawal');`;

connection.query(insertAccountData, (err, results) => {
    if (err) {
        console.error('Error inserting data into account table:', err);
    } else {
        console.log('Data inserted into account table successfully.');
    }
});

connection.query(insertAccountChangesData, (err, results) => {
    if (err) {
        console.error('Error inserting data into account_changes table:', err);
    } else {
        console.log('Data inserted into account_changes table successfully.');
    }
});