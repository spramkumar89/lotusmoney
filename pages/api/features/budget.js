const budget = require("../../../backend/features/budget");

export default function handler(req, res) {
  if (req.method === "POST") {
    // Insert budget record
    console.log(
      `budget Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    budget.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed budget Insertion");
  } else if (req.method === "GET") {
    // Get budget record
    console.log(
      `budget Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    budget.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed budget Retrieval");
  } else if (req.method === "PUT") {
    // Update budget record
    console.log(
      `budget Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    budget.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed budget Update");
  } else if (req.method === "DELETE") {
    // Delete budget record
    console.log(
      `budget Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    budget.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed budget Deletion");
  } else {
    res.send(
      `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
    );
  }
}
