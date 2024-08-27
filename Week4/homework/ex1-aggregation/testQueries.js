const { getPopulationByYear, getPopulationByContinent } = require('./queries');

const testQueries = async () => {
  console.log('Fetching population by year for Netherlands:');
  await getPopulationByYear('Netherlands');

  console.log('Fetching population by continent for year 2020 and age group 100+:');
  await getPopulationByContinent(2020, '100+');
};

testQueries();
