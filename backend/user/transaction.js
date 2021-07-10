import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/* const Nano = require("nano");
const nano = Nano("http://admin:password@localhost:5984"); */
/**
 * This function is used to Create new Transaction record
 * 1. New Transaction record in UserDatabase table
 */
export async function get(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.get(transaction._id);
    console.log(`Get transaction response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user transactin ${e}`);
  }
}

/**
 * This function is used to Create new Transaction record
 * 1. New Transaction record in UserDatabase table
 */
export async function add(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.insert(transaction);
    console.log(`Create transaction response : ${JSON.stringify(res)}`);
    return res;
  } catch (e) {
    console.log(`Exception while creating user transaction ${e}`);
    return e;
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteTransaction(dbname, transaction) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.destroy(transaction._id, transaction._rev);
    console.log(`Delete transaction response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user transaction deletion : ${e}`);
  }
}

/**
 * This function is used to Update User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function update(dbname, transcation) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Updating transaction record : ${JSON.stringify(transaction)}`);
    const res = await userDB.insert(transaction);
    console.log(`Updating transaction response : ${JSON.stringify(res)}`);
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
    console.log(
      `Get MonthlyTransactions View : ${JSON.stringify(
        keys
      )} - dbname : ${dbname}`
    );

    const res = await userDB.view("lotus", "monthlytransactions", keys);
    console.log(`Get monthly transactions response : ${JSON.stringify(res)}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

/* console.log(
  getMonthlyTransactions(
    "ramkumar",
    "2021,07,03,bdf08a0cbe302fbf85b6f88cf800c548".split(",")
  )
);
 */
