
const transferAmount = `
BEGIN;

-- Deduct from account 101
UPDATE account
SET balance = balance - 1000
WHERE account_number = 101;

-- Log the deduction
INSERT INTO account_changes (account_number, amount, remark) 
VALUES (101, -1000.00, 'Transfer to account 102');

-- Add to account 102
UPDATE account
SET balance = balance + 1000
WHERE account_number = 102;

-- Log the addition
INSERT INTO account_changes (account_number, amount, remark) 
VALUES (102, 1000.00, 'Transfer from account 101');

COMMIT;
`;

module.exports = transferAmount;
