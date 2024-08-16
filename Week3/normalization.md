# SQL Normalization Exercise

## Original Table

| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
|-----------|---------------|----------------|-----------|-------------|------------|-------------------|-----------|------------------|
| 1         | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
| 2         | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
| 3         | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
| 4         | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
| 1         | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
| 3         | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafel, Mousse  |
| 5         | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
| 6         | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |

## Normalization to 1NF

The original table had columns (food_code, food_description) that contained multiple values. This violated the 1NF requirement that each column must contain atomic (single) values.

To normalize the table, we split the multiple values in these columns into separate rows.

### Resulting Table (1NF)

| member_id | member_name | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
|-----------|-------------|----------------|-----------|-------------|------------|-------------------|-----------|------------------|
| 1         | Amit        | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1        | Curry            |
| 1         | Amit        | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2        | Cake             |
| 2         | Ben         | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1        | Soup             |
| 2         | Ben         | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | C2        | Cake             |
| 3         | Cristina    | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1        | Soup             |
| 3         | Cristina    | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | C2        | Cake             |
| 4         | Dan         | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1        | Pie              |
| 4         | Dan         | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | T1        | Tea              |
| 4         | Dan         | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | M1        | Mousse           |
| 1         | Amit        | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1        | Pie              |
| 1         | Amit        | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | T1        | Tea              |
| 1         | Amit        | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | M1        | Mousse           |
| 3         | Cristina    | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1        | Falafel          |
| 3         | Cristina    | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | M1        | Mousse           |
| 5         | Gabor       | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1        | Goulash          |
| 5         | Gabor       | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | P2        | Pasca            |
| 6         | Hema        | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1        | Pie              |
| 6         | Hema        | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | T1        | Tea              |
| 6         | Hema        | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | M1        | Mousse           |

## Normalization to 2NF

In the 1NF table, there were partial dependencies; for instance, the venue information only depended on the dinner_id and not on the member_id. To resolve this, we split the table into two tables: one for dinner information and another for member attendance.

### Dinner Table (2NF)

| dinner_id  | dinner_date | venue_code | venue_description |
|------------|-------------|------------|-------------------|
| D00001001  | 2020-03-15  | B01        | Grand Ball Room   |
| D00001002  | 2020/03/15  | B02        | Zoku Roof Top     |
| D00001003  | 20-03-2020  | B03        | Goat Farm         |
| D00001004  | Mar 25 '20  | B04        | Mama's Kitchen    |
| D00001005  | Mar 26 '20  | B05        | Hungry Hungary    |

### Member Attendance Table (2NF)

| member_id | dinner_id | food_code | food_description |
|-----------|-----------|-----------|------------------|
| 1         | D00001001 | C1        | Curry            |
| 1         | D00001001 | C2        | Cake             |
| 2         | D00001002 | S1        | Soup             |
| 2         | D00001002 | C2        | Cake             |
| 3         | D00001002 | S1        | Soup             |
| 3         | D00001002 | C2        | Cake             |
| 4         | D00001003 | P1        | Pie              |
| 4         | D00001003 | T1        | Tea              |
| 4         | D00001003 | M1        | Mousse           |
| 1         | D00001003 | P1        | Pie              |
| 1         | D00001003 | T1        | Tea              |
| 1         | D00001003 | M1        | Mousse           |
| 3         | D00001004 | F1        | Falafel          |
| 3         | D00001004 | M1        | Mousse           |
| 5         | D00001005 | G1        | Goulash          |
| 5         | D00001005 | P2        | Pasca            |
| 6         | D00001003 | P1        | Pie              |
| 6         | D00001003 | T1        | Tea              |
| 6         | D00001003 | M1        | Mousse           |

## Normalization to 3NF

The 2NF table still had transitive dependencies, such as venue_description being dependent on venue_code. To achieve 3NF, we separate these into their own tables.

### Venue Table (3NF)

| venue_code | venue_description |
|------------|-------------------|
| B01        | Grand Ball Room   |
| B02        | Zoku Roof Top     |
| B03        | Goat Farm         |
| B04        | Mama's Kitchen    |
| B05        | Hungry Hungary    |

### Food Table (3NF)

| food_code | food_description |
|-----------|------------------|
| C1        | Curry            |
| C2        | Cake             |
| S1        | Soup             |
| P1        | Pie              |
| T1        | Tea              |
| M1        | Mousse           |
| F1        | Falafel          |
| G1        | Goulash          |
| P2        | Pasca            |

### Member Attendance Table (Final 3NF Version)

| member_id | dinner_id |
|-----------|-----------|
| 1         | D00001001 |
| 2         | D00001002 |
| 3         | D00001002 |
| 4         | D00001003 |
| 1         | D00001003 |
| 3         | D00001004 |
| 5         | D00001005 |
| 6         | D00001003 |

## Discussion

### 1. Was your database already in 2NF / 3NF?
No, the original database was not in 2NF or 3NF. It contained columns with multiple values, which violates 1NF. Also, there were partial and transitive dependencies which violated 2NF and 3NF.

### 2. What changes did you have to do to normalize your database?
- Split columns with multiple values into individual rows (1NF).
- Separated data into multiple tables to remove partial dependencies (2NF).
- Further split tables to remove transitive dependencies (3NF).

### 3. What challenges do you foresee if you want to add thousands of recipes to your database?
- **Data Consistency:** Maintaining data consistency across multiple related tables could become complex.
- **Query Performance:** As the number of records grows, querying large datasets might become slower without proper indexing.
- **Storage Efficiency:** Storing large amounts of normalized data across multiple tables might require more storage space.
- **Maintenance:** Updating or deleting data might require changes in multiple tables, increasing maintenance complexity.

