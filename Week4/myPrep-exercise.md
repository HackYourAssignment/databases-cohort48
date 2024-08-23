# Week 4 Prep Exercise

## Database Conversion to a Document-Based Model

### Collections

For the document-based database, the following collections will be used:

- `ingredients`
- `steps`
- `categories`
- `recipes`

### Embedding vs. Normalization

In the `recipes` collection, the following information will be embedded as arrays:

- `ingredients` (Embedded within the `recipes` collection as an array of ingredient IDs)
- `steps` (Embedded within the `recipes` collection as an array of step IDs)
- `categories` (Embedded within the `recipes` collection as an array of category IDs)

### Discussion

#### When to Embed Information

The decision to embed information versus normalizing it depends on the following factors:

- **Data Access Patterns**: If certain data is frequently accessed together (e.g., a recipe with its ingredients and steps), it is more efficient to embed this information. This reduces the number of queries required to retrieve related data.
  
- **Document Size**: If the embedded data will not cause the document size to exceed MongoDB's 16 MB limit, embedding is a practical solution.

- **Data Duplication**: While embedding can lead to data duplication, if the duplication is minimal and does not impact storage or performance, embedding can simplify data access.

#### Assumptions

- **Recipe Frequency**: It is assumed that recipes are frequently accessed in their entirety, meaning all ingredients, steps, and categories are needed together.

- **Data Volatility**: It is assumed that the data related to ingredients, steps, and categories does not change frequently. This makes embedding more viable since updates are less common.

#### MySQL vs. MongoDB

If given the choice between MySQL and MongoDB at the beginning of the project, I would choose based on the following considerations:

- **MySQL (Relational Database)**:
  - **Pros**: Strong data integrity, ACID compliance, normalized data structures.
  - **Cons**: Requires multiple joins for related data, which can slow down read operations.
  - **Use Case**: Best for complex queries and transactions where data consistency is critical.

- **MongoDB (Document-Based Database)**:
  - **Pros**: Flexible schema, efficient for read-heavy operations, especially when data is embedded.
  - **Cons**: Lack of ACID compliance for multi-document transactions (though MongoDB has made improvements in this area).
  - **Use Case**: Best for applications where scalability and fast read performance are more important than strict data consistency.

**Decision**: Given that the recipe application is likely to be read-heavy with frequent retrievals of entire recipes (including ingredients and steps), I would choose **MongoDB**. The document model allows for easy embedding of related data, which enhances read performance and simplifies query logic.

### Example MongoDB Queries

#### Inserting a Recipe with Embedded Ingredients, Steps, and Categories

```json
db.recipes.insertOne({
  "name": "Chocolate Cake",
  "ingredients": [
    { "ingredient_id": ObjectId("60c72b2f9fd2f2e5b43ddc24"), "name": "Flour", "quantity": "2 cups" },
    { "ingredient_id": ObjectId("60c72b2f9fd2f2e5b43ddc25"), "name": "Sugar", "quantity": "1 cup" }
  ],
  "steps": [
    { "step_id": ObjectId("60c72b2f9fd2f2e5b43ddc26"), "description": "Mix the dry ingredients." },
    { "step_id": ObjectId("60c72b2f9fd2f2e5b43ddc27"), "description": "Add wet ingredients and mix until smooth." }
  ],
  "categories": [
    { "category_id": ObjectId("60c72b2f9fd2f2e5b43ddc28"), "name": "Dessert" },
    { "category_id": ObjectId("60c72b2f9fd2f2e5b43ddc29"), "name": "Baking" }
  ]
});
