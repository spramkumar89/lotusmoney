export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      //http://admin:password@localhost:5984/ramkumar/_design/lotus/_view/monthlycategories?key=["2021","07","Uncategorised"]&reduce=false
      let uncategorized_res = await fetch(
        `${process.env.DBURL}/${
          req.query.name
        }/_design/lotus/_view/monthlycategories?key=["${
          req.query.year
        }","${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}","Uncategorised"]&reduce=false`
      );
      console.log(`${process.env.DBURL}/${
          req.query.name
        }/_design/lotus/_view/monthlycategories?key=["${
          req.query.year
        }","${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}","Uncategorised"]&reduce=false`);
      if (!uncategorized_res.ok) {
        uncategorized_res.rows = "NO_TRANSACTIONS_AVAILABLE";
        console.log(
          `Uncategorized API error has occured: ${catResJSON.status}`
        );
        res.status(400).json(uncategorized_res);
      }

      const uncategorized = await uncategorized_res.json();
      res.status(200).json(uncategorized);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
