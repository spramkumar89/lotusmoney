import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Create new goals record
 * 1. New goals record in UserDatabase table
 */
export async function get(dbname, goals) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating goals record : ${JSON.stringify(goals)}`);
    const res = await userDB.get(goals._id);
    console.log(`Get goals response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user goals ${e}`);
  }
}

/**
 * This function is used to Create new goals record
 * 1. New goals record in UserDatabase table
 */
export async function add(dbname, goals) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating goals record : ${JSON.stringify(goals)}`);
    const res = await userDB.insert(goals);
    console.log(`Create goals response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while creating goals ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deletegoals(dbname, goals) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting goals record : ${JSON.stringify(goals)}`);
    const res = await userDB.destroy(goals._id, goals._rev);
    console.log(`Delete goals response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user goals deletion : ${e}`);
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
    console.log(`Updating goals record : ${JSON.stringify(goals)}`);
    const res = await userDB.insert(goals);
    console.log(`Updating goals response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while updating goals ${e}`);
  }
}
