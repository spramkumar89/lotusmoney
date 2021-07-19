const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      console.log(`Inside the upload API method`);
      const form = new formidable.IncomingForm();
      form.uploadDir = "./upload";
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
        console.log(err, fields, files);
        res.send(err || "DONE");
      });
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
