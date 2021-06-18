import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Create new budget record
 * 1. New budget record in UserDatabase table
 */
export async function get(dbname, budget) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating budget record : ${JSON.stringify(budget)}`);
    const res = await userDB.get(budget._id);
    console.log(`Get budget response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user budget ${e}`);
  }
}

/**
 * This function is used to Create new budget record
 * 1. New budget record in UserDatabase table
 */
export async function add(dbname, budget) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating budget record : ${JSON.stringify(budget)}`);
    const res = await userDB.insert(budget);
    console.log(`Create budget response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while creating budget ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deletebudget(dbname, budget) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting budget record : ${JSON.stringify(budget)}`);
    const res = await userDB.destroy(budget._id, budget._rev);
    console.log(`Delete budget response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user budget deletion : ${e}`);
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
    console.log(`Updating budget record : ${JSON.stringify(budget)}`);
    const res = await userDB.insert(budget);
    console.log(`Updating budget response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while updating budget ${e}`);
  }
}
