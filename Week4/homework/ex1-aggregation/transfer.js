const {MongoClient} = require ('mongodb');
 async function transferCredits(fromAccountId , toAccountId , amount){
    const client = new MongoClient('mongodb+srv://mahtabmardani88:hyfpassword@cluster0.x7tdc.mongodb.net/databaseWeek4?retryWrites=true&w=majority');
    const session = client.startSession();

    try{
        await session.withTransaction(async()=>{
            const accountCollection = client.db('databaseWeek4').collection('accounts');

            await accountCollection.updateOne(
                {account_number : fromAccountId},
                {$inc : {balance : -amount}, $push : {account_changes : {change_number : Date.now(), amount : -amount , changed_date : new Date(),remark : "transfer out"}}},
                {session}
            );

            await accountCollection.updateOne(
                {account_number : toAccountId},
                {$inc : {balance :amount},$push :{account_changes : {change_number : Date.now(), amount : amount , changes_date : new Date(), remark : "transfer in"}}},
                {session}

            );
        });
        console.log('transfer completed successfully !');
    } catch(err){
        await session.abortTransaction();
        console.error("transfer aborted ", err);
    } finally{
        await session.endSession();
        await client.close();
    }
 }

 transferCredits(101 , 102 , 1000).catch(console.error);