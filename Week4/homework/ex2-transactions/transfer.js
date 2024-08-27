//Week4/homework/ex2-transactions/transfer.js
import {MongoClient} from "mongodb";

// Helper function to generate a unique change_number
const generateUniqueChangeNumber = async (accounts) => {
    const latestChangeNumber = await accounts.aggregate([
        { $unwind: "$account_changes" },
        { $group: { _id: null, maxChangeNumber: { $max: "$account_changes.change_number" } } }
    ]).toArray();

    return (latestChangeNumber.length > 0 ? latestChangeNumber[0].maxChangeNumber : 0) + 1;
};

export const transfer = async (fromAccount, toAccount, amount, remark) => {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri);

    let session;

    try {
        await client.connect();
        const db = client.db('bank');
        const accountsCollection = db.collection('accounts');

        session = client.startSession();
        session.startTransaction();

        const [fromAccountDoc, toAccountDoc] = await Promise.all([
            accountsCollection.findOne({ account_number: fromAccount }),
            accountsCollection.findOne({ account_number: toAccount })
        ]);

        if (!fromAccountDoc) {
            throw new Error(`Account ${fromAccount} does not exist`);
        }
        if (!toAccountDoc) {
            throw new Error(`Account ${toAccount} does not exist`);
        }

        if (fromAccountDoc.balance < amount) {
            throw new Error("Insufficient funds in the source account");
        }

        // Generate a unique change_number for this transaction using the helper function
        const newChangeNumber = await generateUniqueChangeNumber(accountsCollection);

        // Combine remarks
        const fromAccountRemark = `Transfer to account ${toAccount}: ${remark}`;
        const toAccountRemark = `Transfer from account ${fromAccount}: ${remark}`;


        //If all of the checks pass - proceed with transaction
        // Deduct amount from the source account
        const updateFromAccount = await accountsCollection.updateOne(
            { account_number: fromAccount },
            {
                $inc: { balance: -amount },
                $push: {
                    account_changes: {
                        change_number: newChangeNumber,
                        amount: -amount,
                        changed_date: new Date(),
                        remark: `${fromAccountRemark}`
                    }
                }
            },
            { session } //  this operation is part of a transaction: it will be committed only if the entire transaction succeeds
        );

        // Add amount to the destination account
        const updateToAccount = await accountsCollection.updateOne(
            { account_number: toAccount },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: newChangeNumber,
                        amount,
                        changed_date: new Date(),
                        remark: `${toAccountRemark}`
                    }
                }
            },
            { session } //  this operation is part of a transaction: it will be committed only if the entire transaction succeeds
        );





        await session.commitTransaction();
        console.log(`Successfully transferred $${amount} from account ${fromAccount} to account ${toAccount}.`);
    } catch (error) {
        if (session && session.inTransaction()) { //if error occurred when transaction was in process
            await session.abortTransaction();
            console.error("Transaction aborted due to an error:", error.message);
        } else { //if error occurred when there was no active transaction -> thus it hasn't started
            console.error("Error occurred before transaction started:", error.message);
        }
    } finally {
        if (session) {
            session.endSession();
        }
        await client.close();
    }
}