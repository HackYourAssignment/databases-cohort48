
const insertValues = `
INSERT INTO account (account_number, balance) VALUES
(101, 5000.00),
(102, 3000.00);

INSERT INTO account_changes (account_number, amount, remark) VALUES
(101, 5000.00, 'Initial deposit'),
(102, 3000.00, 'Initial deposit');
`;

module.exports = insertValues;
