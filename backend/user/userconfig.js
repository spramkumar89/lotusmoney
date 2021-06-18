import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Create new userconfig record
 * 1. New userconfig record in UserDatabase table
 */
export async function get(dbname, userconfig) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating userconfig record : ${JSON.stringify(userconfig)}`);
    const res = await userDB.get(userconfig._id);
    console.log(`Get userconfig response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user userconfig ${e}`);
  }
}

/**
 * This function is used to Create new userconfig record
 * 1. New userconfig record in UserDatabase table
 */
export async function add(dbname, userconfig) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating userconfig record : ${JSON.stringify(userconfig)}`);
    const res = await userDB.insert(userconfig);
    console.log(`Create userconfig response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while creating userconfig ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteuserconfig(dbname, userconfig) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting userconfig record : ${JSON.stringify(userconfig)}`);
    const res = await userDB.destroy(userconfig._id, userconfig._rev);
    console.log(`Delete userconfig response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user userconfig deletion : ${e}`);
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
    console.log(`Updating userconfig record : ${JSON.stringify(userconfig)}`);
    const res = await userDB.insert(userconfig);
    console.log(`Updating userconfig response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while updating userconfig ${e}`);
  }
}
