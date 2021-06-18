const userconfig = require("../../../backend/user/userconfig.js");

export default function handler(req, res) {
  if (req.method === "POST") {
    // Insert user config record
    console.log(
      `UserConfig Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    userconfig.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Userconfig Insertion");
  } else if (req.method === "GET") {
    // Get user config record
    console.log(
      `UserConfig Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    userconfig.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Userconfig Retrieval");
  } else if (req.method === "PUT") {
    // Update user config record
    console.log(
      `UserConfig Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    userconfig.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Userconfig Update");
  } else if (req.method === "DELETE") {
    // Delete user config record
    console.log(
      `UserConfig Request - req.query : ${JSON.stringify(
        req.query
      )}, req.body : ${JSON.stringify(req.body)}`
    );

    userconfig.add({ name: req.body.email, password: req.body.password });
    res.status(200).json({ name: "John Doe" });
    console.log("Completed Userconfig Deletion");
  } else {
    res.send(
      `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
    );
  }
}
