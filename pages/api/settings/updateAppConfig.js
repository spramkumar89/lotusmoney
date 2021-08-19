// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(
    `udpateuserconfig API - req.query : ${JSON.stringify(
      req.query
    )}, req.body : ${JSON.stringify(req.body)}`
  );
  switch (req.method) {
    case "POST":
      let appConfigRecord = req.body.appConfigRecord;
      console.log(
        `URL formed is ${`${process.env.DBURL}/${req.query.name}/${appConfigRecord._id}`}`
      );
      let appConfigRecordResponse = await fetch(
        `${process.env.DBURL}/${req.query.name}/appConfig`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appConfigRecord),
        }
      );

      if (!appConfigRecordResponse.ok) {
        console.log(
          `appConfigRecordResponse API error has occured: ${appConfigRecordResponse.status}`
        );
        appConfigRecordResponse.rows = "NO_SETTINGS";
        console.log(`Reponse NOT OK`);
        res.status(400).json(appConfigRecordResponse);
      }
      const appConfigRecordResponse_JSON = await appConfigRecordResponse.json();
      /* let result = {
        accounts: appConfigRecordResponse_JSON.accounts,
        cards: appConfigRecordResponse_JSON.cards,
        incomeCategories: appConfigRecordResponse_JSON.incomeCategories,
        expenseCategories: appConfigRecordResponse_JSON.expenseCategories,
      }; */
      console.log(
        `appConfigRecordResponse_JSON ${JSON.stringify(
          appConfigRecordResponse_JSON
        )}`
      );
      res.status(200).json(appConfigRecordResponse_JSON);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
