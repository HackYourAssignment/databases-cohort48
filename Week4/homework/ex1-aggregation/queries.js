const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getPopulationByYear = async (country) => {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("populationData");

    const result = await collection
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: "$Year",
            countPopulation: { $sum: { $add: ["$Male", "$Female"] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    console.log(result);
    return result;
  } catch (err) {
    console.error("Error fetching population data by year:", err);
  } finally {
    await client.close();
  }
};

const getPopulationByContinent = async (year, age) => {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("populationData");

    const result = await collection
      .aggregate([
        { $match: { Year: year, Age: age } },
        {
          $group: {
            _id: "$Country",
            Country: { $first: "$Country" },
            Year: { $first: "$Year" },
            Age: { $first: "$Age" },
            Male: { $sum: "$Male" },
            Female: { $sum: "$Female" },
            TotalPopulation: { $sum: { $add: ["$Male", "$Female"] } },
          },
        },
      ])
      .toArray();

    console.log(result);
    return result;
  } catch (err) {
    console.error("Error fetching population data by continent:", err);
  } finally {
    await client.close();
  }
};

module.exports = {
  getPopulationByYear,
  getPopulationByContinent,
};
