// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const user = require("../../../backend/user/user.js");

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "POST":
      console.log(
        `Account Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );
      response = await user.create({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(
        `Completed User Account Creation : ${JSON.stringify(response)}`
      );
      if (response.ok) {
        console.log(`Reponse OK`);
        res.status(200).json(response);
      } else {
        console.log(`Reponse NOT OK`);
        res.status(409).json(response);
      }
      break;
    case "GET":
      console.log(
        `Account Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );

      response = await user.authenticate({
        email: req.query.email,
        password: req.query.password,
      });
      console.log(
        `Completed User Account Retrieval ${JSON.stringify(response)}`
      );
      if (response.ok) {
        console.log(`Reponse OK`);
        res.status(200).json(response);
      } else {
        console.log(`Reponse NOT OK`);
        res.status(401).json(response);
      }
      break;
    case "PUT":
      console.log(
        `Account Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );

      response = await user.update({
        email: req.body.email,
        password: req.body.password,
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
    case "DELETE":
      console.log(
        `Account Request - req.query : ${JSON.stringify(
          req.query
        )}, req.body : ${JSON.stringify(req.body)}`
      );

      response = await user.deleteData({
        email: req.body.email,
        password: req.body.password,
      });
      if (response.ok) {
        console.log(`Reponse OK`);
        res.status(200).json(response);
      } else {
        console.log(`Reponse NOT OK`);
        res.status(403).json(response);
      }

      console.log("Completed Account Deletion");
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
