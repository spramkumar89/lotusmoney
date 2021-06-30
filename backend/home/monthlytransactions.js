import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

export async function retrieve(user) {
  try {
    let userDB = await nano.use(user);
    let response = await userDB.view("lotus", "monthlytransactions");
    console.log(`Monthly Transactions response : ` + JSON.stringify(response));
    return response;
  } catch (e) {
    console.log(`Exception while getting monthly transactions ${e}`);
    return e;
  }
}
