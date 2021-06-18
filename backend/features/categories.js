import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Create new categories record
 * 1. New categories record in UserDatabase table
 */
export async function get(dbname, categories) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating categories record : ${JSON.stringify(categories)}`);
    const res = await userDB.get(categories._id);
    console.log(`Get categories response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user categories ${e}`);
  }
}

/**
 * This function is used to Create new categories record
 * 1. New categories record in UserDatabase table
 */
export async function add(dbname, categories) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating categories record : ${JSON.stringify(categories)}`);
    const res = await userDB.insert(categories);
    console.log(`Create categories response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while creating categories ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deletecategories(dbname, categories) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting categories record : ${JSON.stringify(categories)}`);
    const res = await userDB.destroy(categories._id, categories._rev);
    console.log(`Delete categories response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user categories deletion : ${e}`);
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
    console.log(`Updating categories record : ${JSON.stringify(categories)}`);
    const res = await userDB.insert(categories);
    console.log(`Updating categories response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while updating categories ${e}`);
  }
}
