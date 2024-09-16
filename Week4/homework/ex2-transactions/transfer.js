const { MongoClient } = require('mongodb');
require('dotenv').config();

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db("databaseWeek4");
    const accountsCollection = database.collection("accounts");

    const session = client.startSession();
    session.startTransaction();

    // Retrieve both accounts
    const fromAccount = await accountsCollection.findOne({ account_number: fromAccountNumber }, { session });
    const toAccount = await accountsCollection.findOne({ account_number: toAccountNumber }, { session });

    if (!fromAccount || !toAccount) {
      throw new Error('One or both accounts do not exist.');
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds in the sender account.');
    }

    // Calculate the new balances
    const newFromBalance = fromAccount.balance - amount;
    const newToBalance = toAccount.balance + amount;

    // Increment the change numbers
    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;

    // Update the balances and add changes within a transaction
    await accountsCollection.updateOne({ account_number: fromAccountNumber }, {
      $set: { balance: newFromBalance },
      $push: { account_changes: { change_number: fromChangeNumber, amount: -amount, remark } }
    }, { session });

    await accountsCollection.updateOne({ account_number: toAccountNumber }, {
      $set: { balance: newToBalance },
      $push: { account_changes: { change_number: toChangeNumber, amount, remark } }
    }, { session });

    await session.commitTransaction();
    session.endSession();

    console.log('Money transfer operation successful.');
  } catch (error) {
    console.error('An error occurred: ', error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
  } finally {
    await client.close();
  }
}

module.exports = transfer;