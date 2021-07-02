import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteData(user) {
  let record = {};
  record.name = user.email.substring(0, user.email.lastIndexOf("@"));
  record._id = "org.couchdb.user:" + record.name;
  try {
    let deleteDataResponse = await nano.db.destroy(record.name);
    console.log(
      `Delete user database response : ${JSON.stringify(deleteDataResponse)}`
    );
    let userDB = nano.use("_users");
    let doc = userDB.get(record._id);
    let deleteUserResponse = await userDB.destroy(
      (
        await doc
      )._id,
      (
        await doc
      )._rev
    );
    console.log(
      `Delete user record response : ${JSON.stringify(deleteUserResponse)}`
    );
    return deleteUserResponse;
  } catch (e) {
    console.log(`Deleting user database and record ${e}`);
    return e;
  }
}

/**
 * This function is used to Update User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function update(userdb, doc) {
  try {
    const userDB = nano.use(userdb);
    const record = await userDB.get(userdb);
    record.categories.push(doc.category);
    let response = await userDB.insert(record);
    console.log(`Updated cateogories response : ` + JSON.stringify(response));
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}
