function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

/*
A value for the variables: name and code can be manipulated to inject SQL code into the query. Like the following values:
- Name: ' OR '1'='1
- code: ' OR '1'='1
will result in the following query:
SELECT Population FROM ${Country} WHERE Name = '' OR '1'='1' and code = '' OR '1'='1'
This query will return the population of all countries in the database, which is not the intended behavior.
*/

// To prevent SQL injection, you should use parameterized queries or prepared statements. Here's an example using parameterized queries:
function getPopulation(Country, name, code, cb) {
    conn.query(
      "SELECT Population FROM ?? WHERE Name = ? and code = ?",
      [Country, name, code],
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
