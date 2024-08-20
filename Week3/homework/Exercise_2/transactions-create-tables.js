const connection = require('./connections');

const createAccountTable = `CREATE TABLE IF NOT EXISTS account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(10, 2)
);`;

const createAccountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    amount DECIMAL(10, 2),
    changed_date DATE,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
);`;

connection.query(createAccountTable, (err, results) => {
    if (err) {
        console.error('Error creating account table:', err);
    } else {
        console.log('Account table created successfully.');
    }
});

connection.query(createAccountChangesTable, (err, results) => {
    if (err) {
        console.error('Error creating account_changes table:', err);
    } else {
        console.log('Account_changes table created successfully.');
    }
});