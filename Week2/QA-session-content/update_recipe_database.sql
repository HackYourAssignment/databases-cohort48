-- Adding primary keys to dish_types table
ALTER TABLE dish_types
ADD PRIMARY KEY (type_id);

-- Adding primary keys to ingredients table
ALTER TABLE ingredients
ADD PRIMARY KEY (ingredient_id);

-- Adding primary keys to cooking_steps table 
ALTER TABLE cooking_steps
ADD PRIMARY KEY (step_id);

-- Adding primary keys to recipes table
ALTER TABLE recipes
ADD PRIMARY KEY (recipe_id);

-- Adding foreign keys to recipes table
ALTER TABLE recipes
ADD FOREIGN KEY (type1_id) REFERENCES dish_types(type_id);
ALTER TABLE recipes
ADD FOREIGN KEY (type2_id) REFERENCES dish_types(type_id);
ALTER TABLE recipes
ADD FOREIGN KEY (ingredient1_id) REFERENCES ingredients(ingredient_id);
ALTER TABLE recipes
ADD FOREIGN KEY (ingredient2_id) REFERENCES ingredients(ingredient_id);
ALTER TABLE recipes
ADD FOREIGN KEY (ingredient3_id) REFERENCES ingredients(ingredient_id);
ALTER TABLE recipes
ADD FOREIGN KEY (step1_id) REFERENCES cooking_steps(step_id);
ALTER TABLE recipes
ADD FOREIGN KEY (step2_id) REFERENCES cooking_steps(step_id);
ALTER TABLE recipes
ADD FOREIGN KEY (step3_id) REFERENCES cooking_steps(step_id);

-- Adding new recipes
INSERT INTO recipes (recipe_id, recipe_name, ingredient1_id, ingredient2_id, ingredient3_id, type1_id, step1_id, step2_id, step3_id) VALUES
(4, 'No-Bake Cheesecake', 1, 2, 3, 1, 9, 10, 11),
(5, 'Roasted Brussels Sprouts', 9, 10, 11, 2, 12, 13, NULL),
(6, 'Mac & Cheese', 12, 13, 14, 1, 14, 15, 16),
(7, 'Tamagoyaki Japanese Omelette', 15, 16, 17, 3, 17, 18, 19);





