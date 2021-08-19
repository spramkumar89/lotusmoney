// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(
    `udpateuserconfig API - req.query : ${JSON.stringify(
      req.query
    )}, req.body : ${JSON.stringify(req.body)}`
  );
  switch (req.method) {
    case "POST":
      let userRecord = req.body.userRecord;
      console.log(
        `URL formed is ${`${process.env.DBURL}/${req.query.name}/${userRecord._id}`}`
      );
      let userRecordResponse = await fetch(
        `${process.env.DBURL}/${req.query.name}/userconfig`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRecord),
        }
      );

      if (!userRecordResponse.ok) {
        console.log(
          `userRecordResponse API error has occured: ${userRecordResponse.status}`
        );
        userRecordResponse.rows = "NO_SETTINGS";
        console.log(`Reponse NOT OK`);
        res.status(400).json(userRecordResponse);
      }
      const userRecordResponse_JSON = await userRecordResponse.json();
      /* let result = {
        accounts: userRecordResponse_JSON.accounts,
        cards: userRecordResponse_JSON.cards,
        incomeCategories: userRecordResponse_JSON.incomeCategories,
        expenseCategories: userRecordResponse_JSON.expenseCategories,
      }; */
      console.log(
        `userRecordResponse_JSON ${JSON.stringify(userRecordResponse_JSON)}`
      );
      res.status(200).json(userRecordResponse_JSON);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
