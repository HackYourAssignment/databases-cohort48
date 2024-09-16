const setup = require('./setup');
const transfer = require('./transfer');

async function testTransactions() {
  await setup(); 

  // Sample parameters for transfer process
  const fromAccountNumber = 101;
  const toAccountNumber = 102;
  const amount = 1000;
  const remark = 'Transfer from Account 101 to Account 102';

  // Test the transfer 
  await transfer(fromAccountNumber, toAccountNumber, amount, remark);

  console.log('Money transfer test completed.');
}

testTransactions();