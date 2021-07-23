export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      let top_trans_res = await fetch(
        `${process.env.DBURL}/${req.query.name}/_design/lotus/_view/toptransactions?descending=true&limit=5`
      );
      if (!top_trans_res.ok) {
        console.log(`An error has occured: ${top_trans_res.status}`);
        top_transaction_res.rows = "NO_TRANSACTIONS_AVAILABLE";
        console.log(`Reponse NOT OK`);
        res.status(400).json(top_transaction_res);
      }
      const top_transaction_res = await top_trans_res.json();
      console.log(`top_transaction_res ${top_transaction_res}`);
      res.status(200).json(top_transaction_res);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
