const { MongoClient } = require('mongodb');
require('dotenv').config();

async function setup() {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const database = client.db("databaseWeek4");
    const accountsCollection = database.collection("accounts");

    // Clear existing data
    await accountsCollection.deleteMany({});

    // Add new sample data
    const sampleData = [
      { account_number: 101, balance: 5000, account_changes: [] },
      { account_number: 102, balance: 3000, account_changes: [] },
      { account_number: 103, balance: 7000, account_changes: [] },
      { account_number: 104, balance: 4500, account_changes: [] },
      { account_number: 105, balance: 6000, account_changes: [] },
      { account_number: 106, balance: 3500, account_changes: [] },
      { account_number: 107, balance: 8000, account_changes: [] },
      { account_number: 108, balance: 2500, account_changes: [] },
      { account_number: 109, balance: 9000, account_changes: [] },
      { account_number: 110, balance: 4000, account_changes: [] }
    ];
    
    // Insert sample data into the accounts collection
    await accountsCollection.insertMany(sampleData);

    console.log('Database and collection set up successfully with sample data.');
  } catch (error) {
    console.error('An error occurred: ', error);
  } finally {
    await client.close();
  }
}

module.exports = setup;