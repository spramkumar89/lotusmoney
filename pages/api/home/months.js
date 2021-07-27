export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      let months_res = await fetch(
        `${process.env.DBURL}/${req.query.name}/_design/lotus/_view/month?` +
          new URLSearchParams({
            group: true,
          }),
        {
          method: "GET",
        }
      );
      if (!months_res.ok) {
        console.log(`An error has occured: ${months_res.status}`);
        months_res = "NO_USER_RECORD";
      }
      let months_resJSON = await months_res.json();
      console.log(`months_resJSON : ${JSON.stringify(months_resJSON)}`);

      res.status(200).json(months_resJSON);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
