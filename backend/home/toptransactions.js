import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

export async function getTopTransactions(user) {
  try {
    let userDB = await nano.use(user);
    let response = await userDB.view("lotus", "monthlytransactions", {
      descending: true,
      limit: 2,
    });

    console.log(`Get Top Transactions response : ` + JSON.stringify(response));

    return rolesResponse;
  } catch (e) {
    console.log(`Exception while creating user database ${e}`);
    return e;
  }
}

//getTopTransactions("test");
