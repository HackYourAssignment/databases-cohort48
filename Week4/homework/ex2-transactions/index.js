//Week4/homework/ex2-transactions/index.js
import dotenv from 'dotenv';
import {setup} from "./setup.js";
import {transfer} from "./transfer.js";

dotenv.config(); //load env variables

const main = async () => {
    try {
        console.log(`Database setup in process...`);
        await setup();


        console.log(`Transfering in process..`);
        await transfer(101, 102, 1000, `Test transfer`);

    } catch (error) {
        console.error(`Error: `, error.message);
    }
};

main();