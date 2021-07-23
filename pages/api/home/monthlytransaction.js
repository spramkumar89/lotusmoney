export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      console.log("Inside the monthly transactions API");
      let monthly_trans_res = await fetch(
        `${process.env.DBURL}/${
          req.query.name
        }/_design/lotus/_view/monthlytransactions?startkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","01"]&endkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","31"]`
      );
      console.log(
        `${process.env.DBURL}/${
          req.query.name
        }/_design/lotus/_view/monthlytransactions?startkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","01"]&endkey=["2021",\"${(
          "0" +
          (new Date().getMonth() + 1)
        ).slice(-2)}\","31"]`
      );
      let monthly_transaction_res;
      if (!monthly_trans_res.ok) {
        console.log(
          `Monthly transactions API error has occured: ${monthly_trans_res.status}`
        );
        monthly_transaction_res = "NO_TRANSACTIONS_AVAILABLE";
        console.log(`Reponse NOT OK`);
        res.status(400).json(monthly_transaction_res);
      }
      monthly_transaction_res = await monthly_trans_res.json();
      console.log(
        `monthly_transaction_res ${JSON.stringify(monthly_transaction_res)}`
      );
      res.status(200).json(monthly_transaction_res);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
