const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const importData = async (client) => {
  try {
    await client.connect();

    const database = client.db('databaseWeek4');
    const collection = database.collection('population_data');

    const hasCollection = await database
      .listCollections({ name: 'population_data' })
      .hasNext();

    if (hasCollection) {
      // Remove all the documents
      await collection.deleteMany({});

      const parser = csv({ delimiter: ',' });
      const stream = fs.createReadStream('population_pyramid_1950-2022.csv');

      const documentsToInsert = [];

      stream
        .pipe(parser)
        .on('data', (row) => {
          // New document
          const document = {
            Country: row.Country,
            Year: parseInt(row.Year),
            Age: row.Age,
            M: parseInt(row.M),
            F: parseInt(row.F),
          };
          documentsToInsert.push(document);
        })
        .on('end', async () => {
          console.log('CSV file parsed, inserting data into MongoDB');

          try {
            // Insert all documents at once
            const insertResult = await collection.insertMany(documentsToInsert);
            console.log(`${insertResult.insertedCount} documents inserted`);

            console.log('Documents inserted successfully');
          } catch (err) {
            console.error('Error inserting documents:', err);
          } finally {
            client.close();
          }
        })
        .on('error', (err) => {
          console.error('Error reading CSV:', err);
          client.close();
        });
    } else {
      throw new Error('The collection `population_data` does not exist!');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = {
  importData,
};