// transfer.js

const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
    }

    try {
        await client.connect();
        const database = client.db('databaseWeek4');
        const accounts = database.collection('accounts');

         // Log the account numbers before converting
         console.log('Initial From Account Number (type):', fromAccountNumber, typeof fromAccountNumber);
         console.log('Initial To Account Number (type):', toAccountNumber, typeof toAccountNumber);

        // Ensure account_number is treated as a number in the query
        fromAccountNumber = Number(fromAccountNumber);
        toAccountNumber = Number(toAccountNumber);

        // Find both accounts
        const fromAccount = await accounts.findOne({ account_number: fromAccountNumber });
        const toAccount = await accounts.findOne({ account_number: toAccountNumber });

        console.log('From Account:', fromAccount);
        console.log('To Account:', toAccount);

        if (!fromAccount || !toAccount) {
            throw new Error('One or both accounts not found');
        }

        if (fromAccount.balance < amount) {
            throw new Error('Insufficient funds');
        }

        // Calculate new change numbers
        const fromChangeNumber = fromAccount.account_changes.length ? fromAccount.account_changes.slice(-1)[0].change_number + 1 : 1;
        const toChangeNumber = toAccount.account_changes.length ? toAccount.account_changes.slice(-1)[0].change_number + 1 : 1;

        // Update balances and account changes
        await accounts.updateOne(
            { account_number: fromAccountNumber },
            {
                $inc: { balance: -amount },
                $push: {
                    account_changes: {
                        change_number: fromChangeNumber,
                        amount: -amount,
                        changed_date: new Date(),
                        remark
                    }
                }
            }
        );

        await accounts.updateOne(
            { account_number: toAccountNumber },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: toChangeNumber,
                        amount,
                        changed_date: new Date(),
                        remark
                    }
                }
            }
        );

        console.log('Transfer successful');
    } catch (err) {
        console.error('Error transferring funds:', err);
    } finally {
        await client.close();
    }
}

module.exports = transfer;
