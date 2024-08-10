const mysql = require('mysql2');

// Create a connection to the MySQL server (without specifying a database)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

// SQL statements to create the database and tables
const createDatabaseSQL = `CREATE DATABASE IF NOT EXISTS userdb;`;

const useDatabaseSQL = `USE userdb;`;

const createTablesSQL = [
    `CREATE TABLE IF NOT EXISTS Recipe (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Ingredient (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity VARCHAR(100)
    )`,
    `CREATE TABLE IF NOT EXISTS Step (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeCategory (
        recipe_id INT,
        category_id INT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (category_id) REFERENCES Category(id),
        PRIMARY KEY (recipe_id, category_id)
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeIngredient (
        recipe_id INT,
        ingredient_id INT,
        quantity VARCHAR(100),
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id),
        PRIMARY KEY (recipe_id, ingredient_id)
    )`,
    `CREATE TABLE IF NOT EXISTS RecipeStep (
        recipe_id INT,
        step_id INT,
        step_order INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
        FOREIGN KEY (step_id) REFERENCES Step(id),
        PRIMARY KEY (recipe_id, step_id)
    )`
];

// Function to create the database and tables
function initializeDatabase() {
    connection.query(createDatabaseSQL, function (err) {
        if (err) {
            console.error(`Error creating database: ${err.message}`);
            connection.end();
            return;
        }
        
        // Use the newly created database
        connection.query(useDatabaseSQL, function (err) {
            if (err) {
                console.error(`Error selecting database: ${err.message}`);
                connection.end();
                return;
            }
            
            // Create tables
            createTables(0); // Start creating tables
        });
    });
}

// Function to create tables
function createTables(index) {
    if (index < createTablesSQL.length) {
        connection.query(createTablesSQL[index], function (err) {
            if (err) {
                console.error(`Error creating table: ${err.message}`);
            } else {
                console.log(`Table ${index + 1} created successfully`);
            }
            createTables(index + 1); // Move to the next table
        });
    } else {
        console.log('All tables created successfully');
        connection.end(); // Close the connection
    }
}

// Start initializing the database
initializeDatabase();
