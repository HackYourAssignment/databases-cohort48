## Exercise 1: SQL Normalization

### 1. What columns violate 1NF?

The columns **food_code** and **food_description** violate 1NF because they contain multiple values separated by commas instead of atomic values. In 1NF, each column must contain only a single value.

### 2. What entities do you recognize that could be extracted?

From the given table, the following entities can be recognized and extracted:
- **Members**
- **Dinners**
- **Venues**
- **Foods**

### 3. Name all the tables and columns that would make a 3NF compliant solution.

To achieve a 3NF-compliant solution, the data should be organized into separate tables for each entity, with proper relationships established between them. Below are the tables and columns:

#### **Members Table:**
- `member_id` (Primary Key)
- `member_name`
- `member_address`

#### **Dinners Table:**
- `dinner_id` (Primary Key)
- `dinner_date`
- `venue_code` (Foreign Key to `Venues`)

#### **Venues Table:**
- `venue_code` (Primary Key)
- `venue_description`

#### **Foods Table:**
- `food_code` (Primary Key)
- `food_description`

#### **Dinner_Foods Table** (Junction table to handle the many-to-many relationship between `Dinners` and `Foods`):
- `dinner_id` (Foreign Key to `Dinners`)
- `food_code` (Foreign Key to `Foods`)

### **Explanation:**

- **1NF Compliance:** By breaking down `food_code` and `food_description` into a separate `Foods` table and using a junction table `Dinner_Foods`, we ensure that each column contains atomic values.
- **2NF Compliance:** Each non-key attribute is fully dependent on the primary key. For instance, `venue_description` is dependent only on `venue_code`, which is handled in the `Venues` table.
- **3NF Compliance:** All transitive dependencies are eliminated. For example, `venue_description` is not stored in the `Dinners` table but is linked through `venue_code`, ensuring that non-key attributes are not dependent on other non-key attributes.

By structuring the data into these tables, the design adheres to 3NF principles, ensuring data integrity, reducing redundancy, and enhancing the efficiency of data management.