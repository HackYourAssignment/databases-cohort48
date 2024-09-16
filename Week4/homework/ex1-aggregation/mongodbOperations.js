const { MongoClient } = require("mongodb");
require("dotenv").config();

// Function to retrieve total population for a given Country per year
const getCountryPopulationByYear = async (country) => {
  const client = new MongoClient(process.env.MONGODB_URL);
  await client.connect();

  const database = client.db("databaseWeek4");
  const collection = database.collection("population_data");

  const result = await collection.aggregate([
    {
      $match: { Country: country }
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: { $add: ["$M", "$F"] }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]).toArray();

  client.close();
  return result;
};

// Update getAllContinentInformationByYearAndAge function to find documents based on provided year and age
const getAllContinentInformationByYearAndAge = async (year, age) => {
  const client = new MongoClient(process.env.MONGODB_URL);
  await client.connect();

  const database = client.db("databaseWeek4");
  const collection = database.collection("population_data");

  const result = await collection.aggregate([
    {
      $match: {
        Year: year, Age: age, $and: [
          { Country: { $regex: /^[A-Z]+$/ } },
          { Country: { $not: { $regex: /world/i } } }]
      }
    },
    {
      $project: {
        _id: 0,
        Country: 1,
        Year: 1,
        Age: 1,
        M: 1,
        F: 1,
        TotalPopulation: { $add: ["$M", "$F"] }
      }
    }
  ]).toArray();

  client.close();
  return result;
};

// Sample calls to the functions
getCountryPopulationByYear("Netherlands").then((result) => {
  console.log("Population by year for Netherlands:");
  console.log(result);
});

getAllContinentInformationByYearAndAge(2020, "100+").then((result) => {
  console.log("Continent information for 2020 and Age 100+:");
  console.log(result);
});