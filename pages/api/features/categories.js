const category = require("../../../backend/features/categories");

export default function handler(req, res) {
  if (req.method === "POST") {
    // Insert category record
    console.log(
      `category Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    category.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed category Insertion");
  } else if (req.method === "GET") {
    // Get category record
    console.log(
      `category Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    category.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed category Retrieval");
  } else if (req.method === "PUT") {
    // Update category record
    console.log(
      `category Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    category.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed category Update");
  } else if (req.method === "DELETE") {
    // Delete category record
    console.log(
      `category Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    category.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed category Deletion");
  } else {
    res.send(
      `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
    );
  }
}
