# SQL Normalization Exercise

## Questions and Answers

1. **What columns violate 1NF?**
   - The columns `food_code` and `food_description` violate 1NF because they contain multiple values in a single cell.

2. **What entities do you recognize that could be extracted?**
   - We can extract entities like `Members`, `Dinners`, `Venues`, and `Food`.

3. **Name all the tables and columns that would make a 3NF compliant solution.**
   - **Members Table:** `member_id`, `member_name`, `member_address`
   - **Dinners Table:** `dinner_id`, `dinner_date`, `venue_code`
   - **Venues Table:** `venue_code`, `venue_description`
   - **Food Table:** `food_code`, `food_description`
   - **Member_Dinners Table:** `member_id`, `dinner_id`, `food_code`

---

# Prep Exercises

1. **Was your database already in 2NF / 3NF?**
   - No, the original database was not in 2NF or 3NF.

2. **What changes did you have to do to normalize your database?**
   - We had to split the data into different tables and remove any partial and transitive dependencies.
