const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');

async function importCsvToMongoDB() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("countries");

    // Clear the collection before importing
    await collection.deleteMany({});

    // Path to your CSV file
    const csvFilePath = "./population_pyramid_1950-2022.csv"; // Ensure this path is correct
    const documents = [];

    console.log("Reading CSV file...");

    // Parse CSV and prepare documents
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          documents.push({
            Country: row.Country,
            Year: parseInt(row.Year),
            Age: row.Age,
            M: parseInt(row.M),
            F: parseInt(row.F),
          });
        })
        .on('end', async () => {
          try {
            if (documents.length === 0) {
              throw new Error("No data found in CSV file");
            }
            await collection.insertMany(documents);
            console.log("Data imported successfully.");
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', reject);
    });

  } catch (error) {
    console.error("An error occurred during CSV import:", error);
  } finally {
    await client.close();
  }
}

async function getTotalPopulationByYear(country) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("countries");
 const pipeline = [
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } }
        }
      },
      { $sort: { _id: 1 } }
    ];

    const result = await collection.aggregate(pipeline).toArray();

    if (result.length === 0) {
      console.log(`No data found for country: ${country}`);
    } else {
      console.log(`Total population by year for ${country}:`, result);
    }
    return result;
  } catch (error) {
    console.error("An error occurred during aggregation:", error);
  } finally {
    await client.close();
  }
}

async function getContinentPopulationByYearAndAge(year, age) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("countries");
  const pipeline = [
    { $match: { Year: year, Age: age } },
    {
      $addFields: {
        TotalPopulation: { $add: ["$M", "$F"] }
      }
    }
  ]

    const result = await collection.aggregate(pipeline).toArray();

    if (result.length === 0) {
      console.log(`No data found for year: ${year} and age: ${age}`);
    } else {
      console.log(`Population by continent for year ${year} and age ${age}:`, result);
    }
    return result;
  } catch (error) {
    console.error("An error occurred during aggregation:", error);
  } finally {
    await client.close();
  }
}

// Example usage:
async function main() {
  try {
    // Step 1: Import the CSV data
    await importCsvToMongoDB();

    // Step 2: Perform aggregations after importing data
    // Get total population by year for a specific country
    await getTotalPopulationByYear("Netherlands");

    // Get population by continent for a specific year and age group
    await getContinentPopulationByYearAndAge(2020, "100+");
  } catch (error) {
    console.error("An error occurred in the main function:", error);
  }
}

main();
