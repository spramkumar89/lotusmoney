import * as dotenv from "dotenv";
dotenv.config();
import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

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
  let record = {};
  record._id =
    "org.couchdb.user:" + user.name.substring(0, user.name.lastIndexOf("@"));
  try {
    record.name = user.name.substring(0, user.name.lastIndexOf("@"));
    record.roles = ["user"];
    record.type = "user";
    record.email = user.name;
    record.password = user.password;

    for (let key in record) {
      console.log(`Key : ${key}, Value : ${record[key]}`);
    }
    const userDB = nano.use("_users");
    console.log(`Creating user record : ${JSON.stringify(record)}`);
    const insertResponse = await userDB.insert(record);
    console.log(`Create user response : ` + JSON.stringify(insertResponse));
    const databaseResponse = await nano.db.create(record.name);
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
    console.log(`Result : ` + JSON.stringify(rolesResponse));
  } catch (e) {
    console.log(e);
  }
}

/**
 * This function is used to Delete User record
 * 1. Delete User record in _Users table
 * 2. Delete User Database named same as UserName
 */
export async function deleteData(user) {
  user._id = "org.couchdb.user:" + user.name;
  try {
    const deleteDataResponse = await nano.db.destroy(user.name);
    console.log(
      `Delete user data response : ` + JSON.stringify(deleteDataResponse)
    );
    const userDB = nano.use("_users");
    const doc = userDB.get(user._id);
    const deleteUserResponse = await userDB.destroy(
      (
        await doc
      )._id,
      (
        await doc
      )._rev
    );
    console.log(
      `Delete user record response : ` + JSON.stringify(deleteUserResponse)
    );
  } catch (e) {
    console.log(e);
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
