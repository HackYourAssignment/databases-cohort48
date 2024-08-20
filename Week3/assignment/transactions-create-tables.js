
const createTables = `
CREATE TABLE account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
);

CREATE TABLE account_changes (
    change_number SERIAL PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
);
`;

module.exports = createTables;
