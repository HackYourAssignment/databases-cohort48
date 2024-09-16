const connection = require('./connections');

connection.beginTransaction((err) => {
    if (err) {
        console.error('Error beginning transaction:', err);
        return;
    }

    connection.query('UPDATE account SET balance = balance - 1000 WHERE account_number = 101;', (err, results) => {
        if (err) {
            return connection.rollback(() => {
                console.error('Error updating account 101:', err);
            });
        }
        
        connection.query('UPDATE account SET balance = balance + 1000 WHERE account_number = 102;', (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error updating account 102:', err);
                });
            }

            connection.query('INSERT INTO account_changes (change_number, account_number, amount, changed_date, remark) VALUES (NULL, 101, -1000.00, CURDATE(), "Transfer to account 102"), (NULL, 102, 1000.00, CURDATE(), "Transfer from account 101");', (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error inserting data into account_changes table:', err);
                    });
                }
            
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                        });
                    }
                    console.log('Transaction completed successfully.');
                    connection.end();
                });
            });
        });
    });
});