const setupDatabase = require('./setup');
const transferMoney = require('./transfer');

async function main() {
  try {
    // Step 1: Setup the database with sample data
    await setupDatabase();

    // Step 2: Test the transfer function
    await transferMoney(101, 102, 1000, 'Payment for invoice #123');
  } catch (error) {
    console.error("An error occurred in the main function:", error);
  }
}

main();
