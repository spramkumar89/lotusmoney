import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));
const mail = require("../utilities/mail");

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
 * This function is used to Create new User record
 * 1. New User record in _Users table
 * 2. New Database created for the user with the name same as UserName
 * 3. Roles are updated for the new Database to allow the User & Admin credentials to access it
 */
export async function create(user) {
  try {
    let record = {};
    record.name = user.email.substring(0, user.email.lastIndexOf("@"));
    record._id = "org.couchdb.user:" + record.name;
    record.roles = ["user"];
    record.type = "user";
    record.email = user.email;
    record.password = user.password;

    let userDB = nano.use("_users");
    console.log(`Creating user record : ${JSON.stringify(record)}`);
    let insertResponse = await userDB.insert(record);
    console.log(`Create user response : ` + JSON.stringify(insertResponse));
    let databaseResponse = await nano.db.create(record.name);
    console.log(
      `Create database response : ` + JSON.stringify(databaseResponse)
    );
    const rolesResponse = await nano.request({
      db: record.name,
      method: "put",
      path: "/_security",
      body: {
        admins: { names: ["techadmin"], roles: ["_admin"] },
        members: { names: [record.name], roles: ["_user"] },
      },
    });

    userDB = nano.use(record.name);
    let userRecord = {
      _id: record.name,
      docType: "userconfig",
      userName: record.name,
      emailId: record.email,
      categories: [],
      accounts: [],
      cards: [],
    };
    await userDB.insert(userRecord);

    let designdoc = {
      updates: {
        updateCategory:
          "function(document, request){if (document != null){document['categories']=req.body.categories;return [document, 'Added the requested fields'];}return [null, 'No such document'];}",
      },
    };
    await userDB.insert(designdoc, "_design/lotus");

    //mail.createContact(record);
    console.log(`Result : ` + JSON.stringify(rolesResponse));
    return rolesResponse;
  } catch (e) {
    console.log(`Exception while creating user database ${e}`);
    return e;
  }
}

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
export async function update(user) {
  user.name = user.email.substring(0, user.email.lastIndexOf("@"));
  user._id = "org.couchdb.user:" + user.name;
  try {
    const userDB = nano.use("_users");
    let doc = await userDB.get(user._id);
    Object.assign(doc, user);
    let userResponse = await userDB.insert(doc);
    console.log(
      `Updated user record response : ` + JSON.stringify(userResponse)
    );
    return userResponse;
  } catch (e) {
    console.log(e);
    return e;
  }
}

/**
 * This function is used to Authenticate User
 */
export async function authenticate(user) {
  console.log(`Inside create user api ${JSON.stringify(user)}`);
  //let record = {};
  user.name = user.email.substring(0, user.email.lastIndexOf("@"));
  console.log(`Inside create user api ${user.name}`);
  //record._id = "org.couchdb.user:" + user.name;
  try {
    const db = nano.use(user.name);
    let response = await db.auth(user.name, user.password);
    console.log(`Authentication response : ` + JSON.stringify(response));
    return response;
  } catch (e) {
    console.log(e);
    return e;
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
