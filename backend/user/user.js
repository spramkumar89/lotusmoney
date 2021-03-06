import Nano from "nano";
const nano = Nano(String(process.env.DBURL));

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
      accounts: [],
      cards: [],
      incomeCategories: [],
      expenseCategories: [],
      goals: [],
    };
    await userDB.insert(userRecord);

    let designdoc = {
      _id: "_design/lotus",
      views: {
        monthlytransactions: {
          map: 'function (doc) {\n  if (doc.doc_type==\'transaction\' && doc.date) {\n    let date = doc.date.split("-");\n    date.push(doc._id);\n    emit(date, {"date":doc.date,"description":doc.description,"amount":doc.amount,"_id":doc._id,"category":doc.category});\n  }\n}',
        },
        monthlycategories: {
          map: "function (doc) {\n  if (doc.doc_type=='transaction' && doc.category && doc.amount) {\n    emit(doc.category, parseFloat(doc.amount));\n  }\n}",
          reduce:
            "function (keys, values, rereduce) {\n   return sum(values);\n}",
        },
        toptransactions: {
          map: 'function (doc) {\n  if (doc.doc_type==\'transaction\' && doc.amount) {\n    emit(parseFloat(doc.amount), {"date":doc.date,"description":doc.description,"amount":doc.amount,"_id":doc._id});\n  }\n}',
        },
        uncategorized: {
          map: 'function (doc) {\n  if (doc.doc_type==\'transaction\' && doc.date && doc.category==\'Uncategorized\') {\n    let date = doc.date.split("-");\n    emit(date, {"date":doc.date,"description":doc.description,"amount":doc.amount,"_id":doc._id});\n  }\n}',
        },
      },
      language: "javascript",
    };
    await userDB.insert(designdoc, "_design/lotus");

    //mail.createContact(record);
    console.log(`Result : ` + JSON.stringify(rolesResponse));
    return rolesResponse;
  } catch (e) {
    console.error(`Exception while creating user database : `, e);
    return e;
  }
}

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
    console.error(`Deleting user database and record : `, e);
    return e;
  }
}

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
    console.error(e);
    return e;
  }
}

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
    console.error(e);
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
