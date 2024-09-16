## Exercise 1 : SQL Normalization

### 1.What columns violate 1NF?

The columns **food_code** and **food_description** violate 1NF as they contain multiple values separated by commas instead of atomic values.

### 2.What entities do you recognize that could be extracted?

From the given table, the entities that could be extracted are 
**members, dinners, venues, foods**.

### 3.Name all the tables and columns that would make a 3NF compliant solution.

**Members Table :**
Columns: member_id, member_name, member_address

**Dinners Table :**
Columns: dinner_id, dinner_date, venue_code

**Venues Table :**
Columns: venue_code, venue_description

**Foods Table :**
Columns: food_code, food_description

By structuring the data into separate tables based on the identified entities, and eliminating the multi-valued dependencies, a 3NF-compliant solution can be achieved. These tables would help in organizing the data efficiently and ensuring data integrity.
