const mysql = require('mysql');

// Create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'recipe'
});

// Connect to the MySQL server
connection.connect();

// Query to get vegetarian recipes containing potatoes
connection.query(
    `SELECT r.recipe_name, i1.ingredient_name AS potato_ingredient, i2.ingredient_name AS ingredient2, i3.ingredient_name AS ingredient3
    FROM recipes r
    JOIN ingredients i1 ON r.ingredient1_id = i1.ingredient_id
    JOIN ingredients i2 ON r.ingredient2_id = i2.ingredient_id
    JOIN ingredients i3 ON r.ingredient3_id = i3.ingredient_id
    WHERE (i1.ingredient_name = 'Potatoes' OR i2.ingredient_name = 'Potatoes' OR i3.ingredient_name = 'Potatoes')
    AND r.type1_id = 'Vegetarian';`,
    (error, results) => {
        if (error) throw error;
        console.log('Vegetarian recipes with potatoes:', results);
    }
);

// Query to get cake recipes that do not require baking
connection.query(
    `SELECT r.recipe_name, dt.type_name AS cake_type, dt2.type_name AS second_type
    FROM recipes r
    JOIN dish_types dt ON r.type1_id = dt.type_id
    JOIN dish_types dt2 ON r.type2_id = dt2.type_id
    WHERE dt.type_name = 'Cake' AND dt2.type_name = 'No Bake';`,
    (error, results) => {
        if (error) throw error;
        console.log('Cakes not requiring baking:', results);
    }
);

// Query to get vegan and Japanese recipes
connection.query(
    `SELECT r.recipe_name, dt.type_name AS type1, dt2.type_name AS type2
    FROM recipes r
    JOIN dish_types dt ON r.type1_id = dt.type_id
    JOIN dish_types dt2 ON r.type2_id = dt2.type_id
    WHERE dt.type_name = 'Vegan' AND dt2.type_name = 'Japanese';`,
    (error, results) => {
        if (error) throw error;
        console.log('Vegan and Japanese recipes:', results);
    }
);

// End the MySQL connection
connection.end();