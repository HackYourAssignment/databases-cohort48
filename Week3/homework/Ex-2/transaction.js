const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bank_db'
});

function transferAmount() {
    connection.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err.stack);
            return;
        }

        const debitQuery = `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`;
        const creditQuery = `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`;

        connection.query(debitQuery, (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    console.error('Error executing debit query:', error);
                });
            }

            connection.query(creditQuery, (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        console.error('Error executing credit query:', error);
                    });
                }

                const logDebit = `INSERT INTO account_changes (account_number, amount, remark) VALUES (101, -1000, 'Transfer to account 102')`;
                const logCredit = `INSERT INTO account_changes (account_number, amount, remark) VALUES (102, 1000, 'Transfer from account 101')`;

                connection.query(logDebit + ';' + logCredit, (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            console.error('Error logging transaction:', error);
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', err);
                            });
                        }
                        console.log('Transaction completed successfully');
                        connection.end();
                    });
                });
            });
        });
    });
}

transferAmount();