import Nano from "nano";
const nano = Nano(String(process.env.DBURL));
import { getSession } from "next-auth/client";

export async function get(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    //console.log(`Creating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.get(transaction._id);
    //console.log(`Get transaction response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user transactin ${e}`);
  }
}

export async function add(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    //console.log(`Creating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.insert(transaction);
    //console.log(`Create transaction response : ${JSON.stringify(res)}`);
    return res;
  } catch (e) {
    console.log(`Exception while creating user transaction ${e}`);
    return e;
  }
}

export async function deleteTransaction(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    //console.log(`Deleting transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.destroy(transaction._id, transaction._rev);
    //console.log(`Delete transaction response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user transaction deletion : ${e}`);
  }
}

export async function update(dbname, transcation) {
  try {
    const userDB = nano.use(dbname);
    //console.log(`Updating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.insert(transaction);
    //console.log(`Updating transaction response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while updating transaction ${e}`);
  }
}

export async function getMonthlyTransactions(dbname, startkey) {
  try {
    if (!startkey) {
      startkey = "";
    }
    const userDB = nano.use(dbname);

    let keys = {};
    keys.limit = 2;
    keys.include_docs = true;
    if (startkey !== "") {
      keys.startkey = startkey;
    }

    const res = await userDB.view("lotus", "monthlytransactions", keys);
    //console.log(`Get monthly transactions response : ${JSON.stringify(res)}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}
