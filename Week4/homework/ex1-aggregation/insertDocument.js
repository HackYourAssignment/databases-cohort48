const {MongoClient} = require('mongodb');

async function insertDocuments() {
    const client = new MongoClient('mongodb+srv://mahtabmardani88:hyfpassword@cluster0.x7tdc.mongodb.net/databaseWeek4?retryWrites=true&w=majority');
    await client.connect();

    const db = client.db('databaseWeek4');
    const collection = db.collection('population_date');

    const documents = [
        {Country: "Afghanistan", Year: 1950, Age: "20-24", M: 374109, F: 318392},
        {Country: "Afghanistan", Year: 1960, Age: "20-24", M: 400000, F: 350000},
    ];

    await collection.insertMany(documents);

    console.log("Documents inserted");
    await client.close();
}

insertDocuments().catch(console.error);
