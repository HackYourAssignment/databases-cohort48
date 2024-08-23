const {MongoClient} = require('mongodb');

async function setup(){
    const client = new MongoClient('mongodb+srv://mahtabmardani88:hyfpassword@cluster0.x7tdc.mongodb.net/databaseWeek4?retryWrites=true&w=majority');
    client.connect();

    const db = client.db('databaseWeek4');
    const accountCollection = db.collection('accounts');

    // Delete before data's
    await accountCollection.deleteMany({});

    // add mention data
    await accountCollection.insertMany([
        {account_number : 101 , balance : 5000 , account_changes:[]},
        {account_number : 102 , balance : 3000 , account_changes:[]}
    ]);

    console.log("setup completed !");
    await client.close();
}
setup().catch(console.error);