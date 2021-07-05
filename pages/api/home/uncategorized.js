// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const account = require("../../../backend/user/account");

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      let uncategorized_res = await fetch(
        `${process.env.DBURL}/${
          req.query.name
        }/_design/lotus/_view/uncategorized?startkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","01"]&endkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","31"]`
      );
      if (!uncategorized_res.ok) {
        uncategorized_res.rows = "NO_TRANSACTIONS_AVAILABLE";
        console.log(
          `Uncategorized API error has occured: ${catResJSON.status}`
        );
        res.status(400).json(uncategorized_res);
      }

      const uncategorized = await uncategorized_res.json();
      res.status(200).json(uncategorized);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
