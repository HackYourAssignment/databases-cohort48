const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function setupDatabase() {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("accounts");

    // Clear the collection before inserting new data
    await collection.deleteMany({});

    // Sample data to insert
    const sampleData = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: []
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: []
      }
    ];

    // Insert sample data
   const result= await collection.insertMany(sampleData);
    console.log("Database setup successfully.");
    console.log('Sample data inserted successfully:', result.insertedIds);
  } catch (error) {
    console.error("An error occurred during setup:", error);
  } finally {
    await client.close();
  }
}

module.exports = setupDatabase;
