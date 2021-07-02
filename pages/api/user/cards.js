// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const card = require("../../../backend/user/card");

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "PUT":
      console.log(
        `Account Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );

      response = await card.update("test", {
        cards: req.body.card,
      });
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
