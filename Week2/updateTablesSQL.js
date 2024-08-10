// updateTablesSQL.js
module.exports = [
    `ALTER TABLE Recipe
     ADD COLUMN description TEXT,
     ADD COLUMN preparation_time INT,
     ADD COLUMN vegan BOOLEAN DEFAULT FALSE;`,

    `ALTER TABLE Ingredient
     ADD COLUMN unit VARCHAR(50);`,

    `ALTER TABLE Category
     ADD COLUMN description TEXT;`
];
