const mysql = require('mysql2');
const updateTablesSQL = require('./updateTablesSQL');
const insertDataSQL = require('./insertDataSQL');
const queries = require('./queries');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
    
});

// Function to execute the SQL statements
function updateTables(index = 0) {
    if (index < updateTablesSQL.length) {
        connection.query(updateTablesSQL[index], function(err, results) {
            if (err) {
                console.error(`Error updating table: ${err.message}`);
            } else {
                console.log(`Table update ${index + 1} executed successfully`);
                updateTables(index + 1); // Move to the next update
            }
        });
    } else {
        console.log('All table updates executed successfully');
        insertData(); // Start inserting data after tables are updated
    }
}

// Function to insert new data
function insertData(index = 0) {
    if (index < insertDataSQL.length) {
        connection.query(insertDataSQL[index], function(err, results) {
            if (err) {
                console.error(`Error inserting data: ${err.message}`);
            } else {
                console.log(`Data insertion ${index + 1} executed successfully`);
                insertData(index + 1); // Move to the next insertion
            }
        });
    } else {
        console.log('All data inserted successfully');
        executeQueries(); // Start executing the queries after data is inserted
    }
}

// Function to execute queries
function executeQueries(index = 0) {
    if (index < queries.length) {
        const query = queries[index];
        connection.query(query.sql, function (err, results) {
            if (err) {
                console.error(`Error executing query (${query.name}): ${err.message}`);
            } else {
                console.log(`Results for ${query.name}:`);
                console.log(results);
            }
            executeQueries(index + 1); // Move to the next query
        });
    } else {
        console.log('All queries executed successfully');
        connection.end(); // Close the connection
    }
}

// Start updating tables
updateTables();
