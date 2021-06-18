const account = require("../../../backend/user/account");

export default function handler(req, res) {
  if (req.method === "POST") {
    // Insert account record
    console.log(
      `Account Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    account.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Account Insertion");
  } else if (req.method === "GET") {
    // Get account record
    console.log(
      `Account Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    account.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Account Retrieval");
  } else if (req.method === "PUT") {
    // Update account record
    console.log(
      `Account Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    account.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Account Update");
  } else if (req.method === "DELETE") {
    // Delete account record
    console.log(
      `Account Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    account.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Account Deletion");
  } else {
    res.send(
      `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
    );
  }
}
