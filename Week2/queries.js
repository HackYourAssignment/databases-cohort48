// queries.js
module.exports = [
    {
        name: 'Vegan Recipes with Potatoes',
        sql: `SELECT r.name
              FROM Recipe r
              JOIN RecipeIngredient ri ON r.id = ri.recipe_id
              JOIN Ingredient i ON ri.ingredient_id = i.id
              WHERE r.vegan = TRUE AND i.name = 'potatoes';`
    },
    {
        name: 'Cakes that Do Not Need Baking',
        sql: `SELECT r.name
              FROM Recipe r
              JOIN RecipeCategory rc ON r.id = rc.recipe_id
              JOIN Category c ON rc.category_id = c.id
              WHERE c.name = 'Cake' AND r.description NOT LIKE '%bake%';`
    },
    {
        name: 'Vegan Japanese Recipes',
        sql: `SELECT r.name
              FROM Recipe r
              JOIN RecipeCategory rc ON r.id = rc.recipe_id
              JOIN Category c ON rc.category_id = c.id
              WHERE r.vegan = TRUE AND c.name = 'Japanese';`
    }
];
