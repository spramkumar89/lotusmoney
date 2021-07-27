export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      //http://admin:password@localhost:5984/ramkumar/_design/lotus/_view/toptransactions?startkey=["2021","07",100000000000]&endkey=["2021","07",1]&descending=true&limit=5
      let top_trans_res = await fetch(
        `${process.env.DBURL}/${req.query.name}/_design/lotus/_view/toptransactions?startkey=["${
          req.query.year
        }","${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}",1000000000]&endkey=["${req.query.year}",\"${(
          "0" +
          (parseInt(req.query.month) + 1)
        ).slice(-2)}\",1]&descending=true&limit=5`
      );
      console.log(`${process.env.DBURL}/${req.query.name}/_design/lotus/_view/toptransactions?startkey=["${
          req.query.year
        }",\"${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}\","1000000000"]&endkey=["${req.query.year}",\"${(
          "0" +
          (parseInt(req.query.month) + 1)
        ).slice(-2)}\","1"]&descending=true&limit=5`);
      if (!top_trans_res.ok) {
        console.log(`An error has occured: ${top_trans_res.status}`);
        top_transaction_res.rows = "NO_TRANSACTIONS_AVAILABLE";
        console.log(`Reponse NOT OK`);
        res.status(400).json(top_transaction_res);
      }
      const top_transaction_res = await top_trans_res.json();
      console.log(`top_transaction_res ${JSON.stringify(top_transaction_res)}`);
      res.status(200).json(top_transaction_res);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
