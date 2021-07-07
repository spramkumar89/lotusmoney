const { cloneDeep } = require("lodash");

let user1 = {
  _id: "userconfig",
  _rev: "5-2541f80997892d5c6defa3912e93c33f",
  docType: "userconfig",
  userName: "test",
  emailId: "test@gmail.com",
  accounts: ["ICICI Bank", "SBI", "Kotak Bank"],
  cards: ["ICICI CC", "Kotak CC"],
  incomeCategories: ["Salary", "RentalIncome"],
  expenseCategories: [
    "Grocery",
    "Shopping",
    "Miscellaneous",
    "HomeMaintenance",
    "Amazon",
    "Electricity",
  ],
};

//let user2 = Object.assign({}, user1);
let user2 = cloneDeep(user1);
user2.accounts.push("TMB Bank");
user2.docType = "TMB Bank";
console.log(`User1 : ${JSON.stringify(user1)}`);
console.log(`User2 : ${JSON.stringify(user2)}`);
