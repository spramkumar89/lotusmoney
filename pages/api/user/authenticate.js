// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const userdata = require("../../../backend/user/user.js");

export default (req, res) => {
  console.log("req.query : " + JSON.stringify(req.query));
  console.log("req.body : " + JSON.stringify(req.body));

  userdata.create({ name: req.body.email, password: req.body.password });
  res.status(200).json({ name: "John Doe" });
  console.log("Invoked the API successfully");
};
