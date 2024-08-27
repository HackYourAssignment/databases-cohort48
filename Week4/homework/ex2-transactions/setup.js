//Week4/homework/ex2-transactions/setup.js
import {MongoClient} from 'mongodb';
import {accounts} from './accounts_data.js';

export const setup = async () => {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('bank');
        const accountsCollection = db.collection('accounts');

        //Clean up the accounts collection
        await accountsCollection.deleteMany({});

        //Insert accounts data
        await accountsCollection.insertMany(accounts);
        console.log("Sample data inserted successfully!");

        // **Log the current state of the accounts collection**
        const allAccounts = await accountsCollection.find().toArray();
        console.log("Current accounts in the database:", allAccounts);
    } catch (error) {
        console.error("Error during setup:", error.message);
    } finally {
        await client.close();
    }
}