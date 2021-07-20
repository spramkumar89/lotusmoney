const formidable = require("formidable");

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      console.log(`Inside the upload API method`);
      const form = new formidable.IncomingForm();
      form.uploadDir = "./upload";
      form.keepExtensions = true;
      console.log(`Going to call parse method`);
      form.parse(req, (err, fields, files) => {
        console.log("Inside the form parse method : " + err, fields, files);
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
