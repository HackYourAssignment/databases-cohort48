
# SQL Normalization Exercise

## 1. Violation of 1NF (First Normal Form)

1NF requires that each column in a table contains atomic values, meaning no sets, lists, or multi-valued attributes are allowed.

### Columns violating 1NF:
- `food_code` contains multiple values separated by commas (e.g., `C1, C2`).
- `food_description` contains multiple values separated by commas (e.g., `Curry, Cake`).

## 2. Recognizable Entities

From the given table, we can recognize the following entities:
- **Members**: Information about members (`member_id`, `member_name`, `member_address`).
- **Dinners**: Information about dinners (`dinner_id`, `dinner_date`).
- **Venues**: Information about venues where dinners are held (`venue_code`, `venue_description`).
- **Food**: Information about food served at dinners (`food_code`, `food_description`).

## 3. 3NF Compliant Solution

To achieve 3NF, we need to create separate tables for each entity and ensure that each table is free of transitive dependencies and only contains attributes related to its primary key.

### Table 1: `Members`
- `member_id` (Primary Key)
- `member_name`
- `member_address`

### Table 2: `Dinners`
- `dinner_id` (Primary Key)
- `dinner_date`
- `venue_code` (Foreign Key to `Venues`)

### Table 3: `Venues`
- `venue_code` (Primary Key)
- `venue_description`

### Table 4: `Foods`
- `food_code` (Primary Key)
- `food_description`

### Table 5: `Dinner_Attendance`
- `dinner_id` (Foreign Key to `Dinners`)
- `member_id` (Foreign Key to `Members`)

### Table 6: `Dinner_Foods`
- `dinner_id` (Foreign Key to `Dinners`)
- `food_code` (Foreign Key to `Foods`)

## Final Schema

The final set of tables and their relationships would look like this:

1. **Members Table**
   - `member_id` (Primary Key)
   - `member_name`
   - `member_address`

2. **Dinners Table**
   - `dinner_id` (Primary Key)
   - `dinner_date`
   - `venue_code` (Foreign Key to Venues Table)

3. **Venues Table**
   - `venue_code` (Primary Key)
   - `venue_description`

4. **Foods Table**
   - `food_code` (Primary Key)
   - `food_description`

5. **Dinner_Attendance Table**
   - `dinner_id` (Foreign Key to Dinners Table)
   - `member_id` (Foreign Key to Members Table)

6. **Dinner_Foods Table**
   - `dinner_id` (Foreign Key to Dinners Table)
   - `food_code` (Foreign Key to Foods Table)

This normalized structure eliminates redundancy, reduces data anomalies, and ensures that the database is well-organized.
