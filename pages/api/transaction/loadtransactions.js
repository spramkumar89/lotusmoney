// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const loadtransactions = require("../../../backend/user/transaction");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      console.log(`req.query - ${JSON.stringify(req.query)}`);
      let key = "";
      if (req.query.startkey && req.query.startkey !== "") {
        key = req.query.startkey.split(",");
      }

      // Loading MONTHLY_TRANSACTIONS ******************************************************************
      let transaction_res = await loadtransactions.getMonthlyTransactions(
        req.query.name,
        key
      );
      console.log(
        `>>>>>>>>>>>>>>>>>>>>>>> : ${JSON.stringify(transaction_res)}`
      );
      if (!transaction_res) {
        console.log(
          `Monthly transactions API error has occured: ${JSON.stringify(
            transaction_res
          )}`
        );
        transaction_res["description"] = "NO_TRANSACTIONS_AVAILABLE";
        console.log(`Reponse NOT OK`);
        res.status(400).json(transaction_res);
      }
      transaction_res["description"] = "TRANSACTIONS_AVAILABLE";
      transaction_res["previouskey"] = req.query.startkey;
      if (transaction_res.rows.length == 1) {
        transaction_res["nextkey"] = "";
        transaction_res["description"] = "NO_MORE_RECORDS";
      } else {
        transaction_res["nextkey"] = transaction_res.rows.pop().key;
      }
      console.log(
        `Transaction page API transaction response : ${JSON.stringify(
          transaction_res
        )}`
      );
      res.status(200).json(transaction_res);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
