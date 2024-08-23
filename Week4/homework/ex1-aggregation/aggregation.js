const {MongoClient} = require('mongodb');

async function aggregatePopulation(){
    const client = new MongoClient('mongodb+srv://mahtabmardani88:hyfpassword@cluster0.x7tdc.mongodb.net/databaseWeek4?retryWrites=true&w=majority');
    await client.connect();

    const db = client.db('databaseWeek4');
    const collection = db.collection('population_date');

    // Retrieve and log raw data before closing the connection
    const rawData = await collection.find({}).toArray();
    console.log('Raw Data:', rawData);

    const result = await collection.aggregate([
        {$group : {_id : '$Year' , totalPopulation : {$sum : {$add :['$M' , '$F']}}}},
        {$sort : {_id : 1}}
    ]).toArray();

    console.log(result);

    // Close the connection after all operations
    await client.close();
}

aggregatePopulation().catch(console.error);
