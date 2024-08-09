const {createDatabaseAndTables,connection} = require("../Week1/recipe_DataBase.js");

if (!connection._connectCalled) {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
    runQueries();
  });
} else {
  runQueries();
}

function runQueries() {
  createDatabaseAndTables(() => {

    const ADD_TYPE_COLUMN_QUERY = `
      ALTER TABLE Recipe
      ADD COLUMN type ENUM 
      (
        'vegetarian', 
        'vegan', 
        'non-vegetarian'
      ) NOT NULL AFTER recipe_name;`;

    connection.query(ADD_TYPE_COLUMN_QUERY, function (error, results, fields) {
      if (error) throw error;
      console.log("Type column added to Recipe table.");



      // add categories to the table => Category
      const ADD_CATEGORIES_QUERY = `
        INSERT INTO Category (category_name) VALUES 
        ('Cake'), 
        ('No-Bake'), 
        ('Vegetarian'), 
        ('Vegan'), 
        ('Gluten-Free'), 
        ('Japanese');`;

      connection.query(ADD_CATEGORIES_QUERY, function (error, results, fields) {
        if (error) throw error;
        console.log("Categories added to Category table.");



        //add materials to the table => Ingredient
        const ADD_INGREDIENTS_QUERY = `
          INSERT INTO Ingredient (ingredient_name) VALUES 
          ('Condensed milk'), 
          ('Cream Cheese'), 
          ('Lemon Juice'), 
          ('Pie Crust'), 
          ('Cherry Jam'), 
          ('Brussels Sprouts'), 
          ('Butter'), 
          ('Flour'), 
          ('Salt'), 
          ('Pepper'), 
          ('Milk'), 
          ('Shredded Cheddar cheese'), 
          ('Macaroni'), 
          ('Eggs'), 
          ('Soy sauce'), 
          ('Sugar'), 
          ('Olive Oil');`;

        connection.query(ADD_INGREDIENTS_QUERY, function (error, results, fields) {
          if (error) throw error;
          console.log("Ingredients added to Ingredient table.");



          // sort of the materials and categories and add commands to the table => recipe
          const ADD_RECIPES_QUERY = `
            INSERT INTO Recipe (recipe_name, type) VALUES 
            ('No-Bake Cheesecake', 'vegetarian'), 
            ('Roasted Brussels Sprouts', 'vegan'), 
            ('Mac & Cheese', 'vegetarian'), 
            ('Tamagoyaki Japanese Omelette', 'vegetarian');

            INSERT INTO RecipeCategory (recipe_id, category_id) VALUES 
            (1, 1), (1, 2), (1, 3),  -- No-Bake Cheesecake with Cake, No-Bake, Vegetarian
            (2, 5), (2, 4),          -- Roasted Brussels Sprouts with Gluten-Free, Vegan
            (3, 3),                  -- Mac & Cheese with Vegetarian
            (4, 3), (4, 6);          -- Tamagoyaki Japanese Omelette with Vegetarian, Japanese

            INSERT INTO RecipeIngredient (recipe_id, ingredient_id) VALUES 
            (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), -- Ingredients for No-Bake Cheesecake
            (2, 6), (2, 3), (2, 9), (2, 11), (2, 7), -- Ingredients for Roasted Brussels Sprouts
            (3, 13), (3, 7), (3, 8), (3, 9), (3, 12), (3, 10), (3, 11), -- Ingredients for Mac & Cheese
            (4, 14), (4, 15), (4, 16), (4, 17); -- Ingredients for Tamagoyaki Japanese Omelette
          `;

          connection.query(ADD_RECIPES_QUERY, function (error, results, fields) {
            if (error) throw error;
            console.log("Recipes and their associations added.");

          // perform query
            const VEGETARIAN_POTATO_RECIPES_QUERY = `
              SELECT recipe_name 
              FROM Recipe
              JOIN RecipeIngredient ON Recipe.recipe_id = RecipeIngredient.recipe_id
              JOIN Ingredient ON RecipeIngredient.ingredient_id = Ingredient.ingredient_id
              WHERE Recipe.type = 'vegetarian' 
              AND Ingredient.ingredient_name = 'potato';`;

            connection.query(VEGETARIAN_POTATO_RECIPES_QUERY, function (error, results, fields) {
              if (error) throw error;
              console.log("Vegetarian recipes with potatoes:", results);

              const CAKES_NO_BAKING_QUERY = `
                SELECT recipe_name 
                FROM Recipe
                JOIN RecipeCategory ON Recipe.recipe_id = RecipeCategory.recipe_id
                JOIN Category ON RecipeCategory.category_id = Category.category_id
                WHERE Category.category_name = 'cake' 
                AND Recipe.recipe_name LIKE '%no bake%';`;

              connection.query(CAKES_NO_BAKING_QUERY, function (error, results, fields) {
                if (error) throw error;
                console.log("Cakes that do not need baking:", results);

                const VEGAN_JAPANESE_RECIPES_QUERY = `
                  SELECT recipe_name 
                  FROM Recipe
                  JOIN RecipeCategory ON Recipe.recipe_id = RecipeCategory.recipe_id
                  JOIN Category ON RecipeCategory.category_id = Category.category_id
                  WHERE Recipe.type = 'vegan' 
                  OR Category.category_name = 'Japanese';`;

                connection.query(VEGAN_JAPANESE_RECIPES_QUERY, function (error, results, fields) {
                  if (error) throw error;
                  console.log("Vegan and Japanese recipes:", results);

                  connection.end();
                });
              });
            });
          });
        });
      });
    });
  });
}


// * don't forget
// SELECT 
// Recipe.recipe_name,
// Recipe.type,
// Ingredient.ingredient_name,
// Category.category_name,
// Step.step_description
// FROM Recipe
// LEFT JOIN RecipeIngredient ON Recipe.recipe_id = RecipeIngredient.recipe_id
// LEFT JOIN Ingredient ON RecipeIngredient.ingredient_id = Ingredient.ingredient_id
// LEFT JOIN RecipeCategory ON Recipe.recipe_id = RecipeCategory.recipe_id
// LEFT JOIN Category ON RecipeCategory.category_id = Category.category_id
// LEFT JOIN RecipeStep ON Recipe.recipe_id = RecipeStep.recipe_id
// LEFT JOIN Step ON RecipeStep.step_id = Step.step_id;


// DESCRIBE recipestep;