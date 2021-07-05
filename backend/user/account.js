import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Create new account record
 * 1. New account record in UserDatabase table
 */
export async function get(dbname, account) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating account record : ${JSON.stringify(account)}`);
    const res = await userDB.get(account._id);
    console.log(`Get account response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while getting user account ${e}`);
  }
}

/**
 * This function is used to Create new account record
 * 1. New account record in UserDatabase table
 */
export async function add(dbname, account) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Creating account record : ${JSON.stringify(account)}`);
    const res = await userDB.insert(account);
    console.log(`Create account response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception while creating account ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteaccount(dbname, account) {
  try {
    const userDB = nano.use(dbname);
    console.log(`Deleting account record : ${JSON.stringify(account)}`);
    const res = await userDB.destroy(account._id, account._rev);
    console.log(`Delete account response : ${JSON.stringify(res)}`);
  } catch (e) {
    console.log(`Exception during user account deletion : ${e}`);
  }
}

/**
 * This function is used to Update User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function update(userdb, doc) {
  try {
    let userDB = nano.use(userdb);
    let record = await userDB.get(userdb);
    record.accounts.push(doc.account);
    let response = await userDB.insert(record);
    console.log(`Updated accounts response : ` + JSON.stringify(response));
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}
