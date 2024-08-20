# Normalization
## 1. What columns violate 1NF?
`food_code` and `food_description`
___
## 2. What entities do you recognize that could be extracted?
The following entities could be extracted:
1. Members
2. Dinner
3. Venues
4. Food
___
## 3. Name all the tables and columns that would make a 3NF compliant solution.

1. Members:
- member_id 
- member_name 
- member_address

2.  Dinners:
- dinner_id
- dinner_date
- venue_code

3. Venues: 
- venue_code 
- venue_description

4. Foods Table: 
- food_code
- food_description

5. Member_Dinner (junction table):
- member_id
- dinner_id

6. Dinner_Food Table (junction table): 
- dinner_id
- food_code