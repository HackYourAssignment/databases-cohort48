# Prep Exercise Week 4

### 1. What are the collections?
- The collections are `Users`, `Recipes`, and `Ingredients`.

### 2. What information will you embed in a document and which will you store normalized?
- I will embed `Ingredients` inside the `Recipes` document.
- I will store `Users` information in a separate collection and link it to `Recipes`.

### 3. What made you decide when to embed information? What assumptions did you make?
- I decided to embed information when it was small and related directly to the main document.
- I assumed that `Ingredients` will always belong to one `Recipe`, so it is better to embed them.

### 4. If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?
- I would choose MongoDB because it is more flexible and allows for easy changes in the structure of the data.
