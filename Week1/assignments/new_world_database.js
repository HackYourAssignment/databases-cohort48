const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to the database');

    // 1- What are the names of countries with population greater than 8 million?
    connection.query('SELECT name FROM country WHERE population > 8000000', (err, results) => {
        if (err) {
            console.error('Error in query 1:', err.stack);
            return;
        }
        console.log('Countries with population greater than 8 million:', results);
    });

    // 2- What are the names of countries that have “land” in their names?
    connection.query('SELECT name FROM country WHERE name LIKE "%land%"', (err, results) => {
        if (err) {
            console.error('Error in query 2:', err.stack);
            return;
        }
        console.log('Countries with land in their name:', results);
    });

    // 3- What are the names of the cities with population in between 500,000 and 1 million?
    connection.query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000', (err, results) => {
        if (err) {
            console.error('Error in query 3:', err.stack);
            return;
        }
        console.log('Cities with population between 500,000 and 1 million:', results);
    });

    // 4- What's the name of all the countries on the continent ‘Europe’?
    connection.query('SELECT name FROM country WHERE continent = "Europe"', (err, results) => {
        if (err) {
            console.error('Error in query 4:', err.stack);
            return;
        }
        console.log('Countries in Europe:', results);
    });

    // 5- List all the countries in the descending order of their surface areas.
    connection.query('SELECT name FROM country ORDER BY surfaceArea DESC', (err, results) => {
        if (err) {
            console.error('Error in query 5:', err.stack);
            return;
        }
        console.log('Countries in descending order of surface area:', results);
    });
    
    // 6- What are the names of all the cities in the Netherlands?
    connection.query('SELECT name FROM city WHERE countryCode = "NLD"', (err, results) => {
        if (err) {
            console.error('Error in query 6:', err.stack);
            return;
        }
        console.log('Cities in the Netherlands:', results);
    });

    // 7- What is the population of Rotterdam?
    connection.query('SELECT population FROM city WHERE name = "Rotterdam"', (err, results) => {
        if (err) {
            console.error('Error in query 7:', err.stack);
            return;
        }
        console.log('Population of Rotterdam:', results);
    });

    // 8- What's the top 10 countries by Surface Area?
    connection.query('SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10', (err, results) => {
        if (err) {
            console.error('Error in query 8:', err.stack);
            return;
        }
        console.log('Top 10 countries by surface area:', results);
    });

    // 9- What's the top 10 most populated cities?
    connection.query('SELECT name FROM city ORDER BY population DESC LIMIT 10', (err, results) => {
        if (err) {
            console.error('Error in query 9:', err.stack);
            return;
        }
        console.log('Top 10 most populated cities:', results);
    });

    // 10- What is the population number of the world?
    connection.query('SELECT SUM(population) AS world_population FROM country', (err, results) => {
        if (err) {
            console.error('Error in query 10:', err.stack);
            return;
        }
        console.log('Population of the world:', results);
    });     

    connection.end((err) => {
        if (err) {
            console.error('Error closing connection:', err.stack);
            return;
        }
        console.log('Connection closed');
    });
});