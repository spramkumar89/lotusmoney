// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(
    `udpateuserconfig API - req.query : ${JSON.stringify(
      req.query
    )}, req.body : ${JSON.stringify(req.body)}`
  );
  switch (req.method) {
    case "POST":
      let userconfig = req.body.userconfig;
      console.log(
        `URL formed is ${`${process.env.DBURL}/${req.query.name}/${userconfig._id}`}`
      );
      let userConfig = await fetch(
        `${process.env.DBURL}/${req.query.name}/userconfig`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userconfig),
        }
      );

      if (!userConfig.ok) {
        console.log(`UserConfig API error has occured: ${userConfig.status}`);
        userConfig.rows = "NO_SETTINGS";
        console.log(`Reponse NOT OK`);
        res.status(400).json(userConfig);
      }
      const userConfig_JSON = await userConfig.json();
      /* let result = {
        accounts: userConfig_JSON.accounts,
        cards: userConfig_JSON.cards,
        incomeCategories: userConfig_JSON.incomeCategories,
        expenseCategories: userConfig_JSON.expenseCategories,
      }; */
      console.log(`userConfig_JSON ${JSON.stringify(userConfig_JSON)}`);
      res.status(200).json(userConfig_JSON);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
