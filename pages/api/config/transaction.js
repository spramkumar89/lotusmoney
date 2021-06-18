const transaction = require("../../../backend/user/transaction");

export default function handler(req, res) {
  if (req.method === "POST") {
    // Insert transaction record
    console.log(
      `Transaction Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    transaction.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Transaction Insertion");
  } else if (req.method === "GET") {
    // Get transaction record
    console.log(
      `Transaction Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    transaction.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Transaction Retrieval");
  } else if (req.method === "PUT") {
    // Update transaction record
    console.log(
      `Transaction Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    transaction.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Transaction Update");
  } else if (req.method === "DELETE") {
    // Delete transaction record
    console.log(
      `Transaction Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    transaction.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Transaction Deletion");
  } else {
    res.send(
      `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
    );
  }
}
