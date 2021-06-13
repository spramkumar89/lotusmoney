import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));
//const mail = require("../utilities/mail");

/* interface User {
_id:string;
name:string;
roles?:string[];
type?:string;
password?:string;
email?:string;
}
 */
/**
 * This function is used to Create new Transaction record
 * 1. New Transaction record in UserDatabase table
 */
export async function add(transaction) {
  try {
    const userDB = nano.use(transaction.dbname);
    console.log(`Creating transaction record : ${JSON.stringify(record)}`);
    const insertResponse = await userDB.insert(record);
    console.log(
      `Create transaction response : ${JSON.stringify(insertResponse)}`
    );
  } catch (e) {
    console.log(`Exception while creating user database ${e}`);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteData(transaction) {
  try {
    const userDB = nano.use(transaction.dbname);
    console.log(`Deleting transaction record : ${JSON.stringify(record)}`);
    const insertResponse = await userDB.insert(record);
    console.log(
      `Create transaction response : ${JSON.stringify(insertResponse)}`
    );

    const userDB = nano.use("_users");
    const doc = userDB.get(record._id);
    const deleteUserResponse = await userDB.destroy(
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
  } catch (e) {
    console.log(`Deleting user database and record ${e}`);
  }
}

/**
 * This function is used to Update User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function update(user) {
  user._id = "org.couchdb.user:" + user.name;
  try {
    const userDB = nano.use("_users");
    let doc = await userDB.get(user._id);
    Object.assign(doc, user);
    const userResponse = await userDB.insert(doc);
    console.log(
      `Updated user record response : ` + JSON.stringify(userResponse)
    );
  } catch (e) {
    console.log(e);
  }
}

/**
 * This function is used to Authenticate User
 */
export async function authenticate(user) {
  user._id = "org.couchdb.user:" + user.name;
  try {
    const db = nano.use(user.name);
    const response = await db.auth(user.name, user.password);
    console.log(`Authentication response : ` + JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }
}

/* let user:User={
  _id:"",
  name:"ram",
  roles:["user"],
  type:"user",
  password:"kumar",
  email:"test@gmail.com",
} */

//create(user);
//deleteData(user);
//update(user);
//authenticate(user);
