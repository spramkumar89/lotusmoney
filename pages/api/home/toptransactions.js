// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const toptransaction = require("../../../backend/home/toptransactions");

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      console.log(
        `Top Transactions Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );

      response = await toptransaction.getTopTransactions("test");
      if (response.ok) {
        console.log(`Reponse OK`);
        res.status(200).json(response);
      } else {
        console.log(`Reponse NOT OK`);
        res.status(400).json(response);
      }
      console.log("Completed Account Update");
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
