//C:\Users\knowl\Documents\hyf\databases\Week4\homework\ex1-aggregation\connection_query.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config(); //load env variables

const uri = process.env.MONGODB_URL;

let client;


export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log(`Connected to mongodb!`)
    }
    return client;
};

// Fallback simple connection script
// export const simpleConnectToMongo = async () => {
//     const uri = process.env.MONGODB_URL; // Use your actual MongoDB connection string here
//
//     const client = new MongoClient(uri);
//
//     try {
//         await client.connect();
//         console.log("Fallback: Connected successfully to MongoDB");
//     } catch (error) {
//         console.error("Fallback: Connection error:", error);
//     } finally {
//         await client.close();
//         console.log("Fallback: Connection closed.");
//     }
// };


export const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log(`Connection closed!`)
        client = null;
    }
};