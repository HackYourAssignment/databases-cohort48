//C:\Users\knowl\Documents\hyf\databases\Week4\homework\ex1-aggregation\exercise_01.js

import fs from 'fs';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import {connectToDatabase, closeConnection} from "./connection_query.js";


/* Helper function to get the collection based on database and collection names
* @return collection from the given database.*/
const getCollection = (client, dbName, collectionName) => {
    const database = client.db(dbName);
    return database.collection(collectionName);
};



//#1--------------------------------------------------------------------------------------------------------------//
/* populateDatabase() populates the database with data from a CSV file
* reads data from a CSV file and inserts it into the database collection.
* if the data already exists in the collection, it skips the insertion.*/
const populateDatabase = async (collection) => {
    const results = [];

    try {
        const existingData = await collection.findOne();
        if (existingData) {
            console.log("Same data already exists in database.");
            return;
        }

        // Read data from CSV file
        await new Promise((resolve, reject) => {
            createReadStream('./population_pyramid_1950-2022.csv')
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);

        });

        const insertResult = await collection.insertMany(results);
        console.log(`Inserted ${insertResult.insertedCount} records into the collection.`);
    } catch {
        console.error(`Error inserting records: `, error);
    }
};

// #2 -----------------------------------------------------------------------------------------------------------------//
/* Helper function for getPopulationData
*  createPipelineWithCountryFilter() generates a MongoDB aggregation pipeline
* to filter data by a specific country. */
export const createPipelineWithCountryFilter = (country) => [
    {
        $match: { Country: country }  // Match documents for the specified country
    },
    {
        $group: {
            _id: "$Year",  // Group by Year
            countPopulation: {
                $sum: {
                    $add: [
                        { $toInt: "$M" },  // Sum male population
                        { $toInt: "$F" }   // Sum female population
                    ]
                }
            }
        }
    },
    {
        $sort: { _id: 1 }  // Sort by Year (ascending)
    }
];


/* getTotalPopulationByYear()
* @return an array of objects with total population by year for a specific country;
* uses an aggregation pipeline from createPipelineWithCountryFilter()
* to calculate the total population for each year in the given country*/
const getTotalPopulationByYear = async (collection, country, pipelineGenerator = createPipelineWithCountryFilter) => {

    try {
        const pipeline = pipelineGenerator(country);

        const results = await collection.aggregate(pipeline).toArray();
        return results;
    } catch {
        console.error('Error fetching population data:', error);
    }
};

// #3 -----------------------------------------------------------------------------------------------------------------//

//* Helper function for getPopulationData()
// generates a MongoDB aggregation pipeline to filter data by
// a specific year and age group. *//
const createPipelineWithYearAgeFilter = (year, age) => [
    {
        $match: {
            Year: year.toString(),
            Age: age
        }
    },
    {
        $group: {
            _id: "$Country",
            Year: { $first: "$Year" },
            Age: { $first: "$Age" },
            M: { $sum: { $toInt: "$M" } },
            F: { $sum: { $toInt: "$F" } },
            TotalPopulation: {
                $sum: {
                    $add: [
                        { $toInt: "$M" },
                        { $toInt: "$F" }
                    ]
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            Country: "$_id",
            Year: 1,
            Age: 1,
            M: 1,
            F: 1,
            TotalPopulation: 1
        }
    }
];



/* @param year, age - year and age group to filter the database;
* @param pipelineGenerator() - creates an object containing all of the stages in aggregation pipeline for MongoDB;
* @return  array of the total population (M + F over all age groups) for a given Country per year
* */

const getPopulationData = async (collection, year, age, pipelineGenerator = createPipelineWithYearAgeFilter) => {
    try {

        // Generate the pipeline using the provided pipeline generator function
        const pipeline = pipelineGenerator(year, age);

        const results = await collection.aggregate(pipeline).toArray();
        return results;
    } catch (error) {
        console.error(`Error fetching population data for Year: ${year}, Age: ${age}: `, error)
    }
};


/*Helper function to limit the results to a specified number*/
const limitResults = (results, limit = 5) => {
    return results.slice(0, limit);
};

/* Main function to execute all the steps for the exercise
* connects to the database, populates it with data if necessary,
* and retrieves population data based on the specified parameters.*/
const executeExerciseOne = async (dbName, collectionName) => {
    let client;

    // Parameters: Netherlands, 2020, 100+
    const country = "Netherlands";
    const year = 2020;
    const age = "100+";

    try {
        // Establish database connection
        client = await connectToDatabase();
        console.log("Database connection established.");

        // Get the specified collection
        const collection = getCollection(client, dbName, collectionName);
        console.log(`Connected to collection: ${collectionName} in database: ${dbName}`);

        // #1 populate database only if data doesn't already exist
        await populateDatabase(collection);

        // #2 Fetch total population by year for the specified country
        let populationByYear = await getTotalPopulationByYear(collection, country);
        console.log("Top 3 Total Population By Year:", limitResults(populationByYear, 3));

        // #3 Fetch population data for the specified year and age group
        let populationData = await getPopulationData(collection, year, age);
        console.log("Top 3 Population Data:", limitResults(populationData, 3));
    } catch (error) {
        console.error(`Error during database operations: `, error);
    } finally {
        //Close the connection
        if (client) {
            await closeConnection();
            console.log("Database connection closed.");
        }
    }
};

// Run the wrapper function with the specified database and collection
executeExerciseOne('databaseWeek4', 'countries');
