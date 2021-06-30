// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const monthlytransactions = require("../../../backend/home/monthlytransactions");

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      response = await monthlytransactions.retrieve("test");
      if (response.total_rows > 0) {
        console.log(`Has monthly transaction`);
        res.status(200).json(response);
      } else {
        console.log(`Does not have monthly transaction`);
        res.status(400).json(response);
      }
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
