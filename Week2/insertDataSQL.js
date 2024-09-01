// insertDataSQL.js
module.exports = [
    `INSERT INTO Recipe (name, description, preparation_time, vegan) VALUES
    ('No-Bake Cheesecake', 'A creamy, no-bake cheesecake topped with cherry jam.', 180, FALSE),
    ('Roasted Brussels Sprouts', 'Brussels sprouts roasted with lemon juice and sesame seeds.', 40, TRUE),
    ('Mac & Cheese', 'Classic macaroni and cheese made with cheddar cheese.', 30, FALSE),
    ('Tamagoyaki Japanese Omelette', 'A sweet and savory Japanese omelette.', 15, FALSE),
    ('Chocolate Mousse Cake', 'A rich chocolate mousse cake that does not require baking.', 60, FALSE);`,

    `INSERT INTO Ingredient (name, unit) VALUES
    ('Condensed milk', 'can'),
    ('Cream Cheese', 'block'),
    ('Lemon Juice', 'ml'),
    ('Pie Crust', 'piece'),
    ('Cherry Jam', 'jar'),
    ('Brussels Sprouts', 'cup'),
    ('Sesame seeds', 'tsp'),
    ('Pepper', 'tsp'),
    ('Salt', 'tsp'),
    ('Olive oil', 'ml'),
    ('Macaroni', 'cup'),
    ('Butter', 'tbsp'),
    ('Flour', 'tbsp'),
    ('Milk', 'ml'),
    ('Shredded Cheddar cheese', 'cup'),
    ('Eggs', 'piece'),
    ('Soy sauce', 'tbsp'),
    ('Sugar', 'tbsp');`,

    `INSERT INTO Category (name, description) VALUES
    ('No-Bake', 'Recipes that do not require baking.'),
    ('Gluten-Free', 'Recipes without gluten-containing ingredients.'),
    ('Japanese', 'Japanese cuisine recipes.');`,

    `INSERT INTO RecipeIngredient (recipe_id, ingredient_id, quantity) VALUES
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Ingredient WHERE name = 'Condensed milk'), 1),
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Ingredient WHERE name = 'Cream Cheese'), 1),
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Ingredient WHERE name = 'Lemon Juice'), 50),
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Ingredient WHERE name = 'Pie Crust'), 1),
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Ingredient WHERE name = 'Cherry Jam'), 1),

    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Brussels Sprouts'), 2),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Lemon Juice'), 20),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Sesame seeds'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Pepper'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Salt'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Ingredient WHERE name = 'Olive oil'), 30),

    ((SELECT id FROM Recipe WHERE name = 'Mac & Cheese'), (SELECT id FROM Ingredient WHERE name = 'Macaroni'), 2),
    ((SELECT id FROM Recipe WHERE name = 'Mac & Cheese'), (SELECT id FROM Ingredient WHERE name = 'Butter'), 2),
    ((SELECT id FROM Recipe WHERE name = 'Mac & Cheese'), (SELECT id FROM Ingredient WHERE name = 'Flour'), 2),
    ((SELECT id FROM Recipe WHERE name = 'Mac & Cheese'), (SELECT id FROM Ingredient WHERE name = 'Milk'), 500),
    ((SELECT id FROM Recipe WHERE name = 'Mac & Cheese'), (SELECT id FROM Ingredient WHERE name = 'Shredded Cheddar cheese'), 2),

    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Ingredient WHERE name = 'Eggs'), 3),
    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Ingredient WHERE name = 'Soy sauce'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Ingredient WHERE name = 'Sugar'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Ingredient WHERE name = 'Salt'), 1),
    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Ingredient WHERE name = 'Olive Oil'), 1);`,

    `INSERT INTO RecipeCategory (recipe_id, category_id) VALUES
    ((SELECT id FROM Recipe WHERE name = 'No-Bake Cheesecake'), (SELECT id FROM Category WHERE name = 'No-Bake')),
    ((SELECT id FROM Recipe WHERE name = 'Roasted Brussels Sprouts'), (SELECT id FROM Category WHERE name = 'Gluten-Free')),
    ((SELECT id FROM Recipe WHERE name = 'Tamagoyaki Japanese Omelette'), (SELECT id FROM Category WHERE name = 'Japanese')),
    ((SELECT id FROM Recipe WHERE name = 'Chocolate Mousse Cake'), 
        (SELECT id FROM Category WHERE name = 'No-Bake'));`
];
