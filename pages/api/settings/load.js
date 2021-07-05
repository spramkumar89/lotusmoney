// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      let userConfig = await fetch(
        `${process.env.DBURL}/${req.query.name}/userconfig`
      );
      if (!userConfig.ok) {
        console.log(
          `UserConfig API error has occured: ${top_trans_res.status}`
        );
        userConfig.rows = "NO_SETTINGS";
        console.log(`Reponse NOT OK`);
        res.status(400).json(userConfig);
      }
      const userConfig_JSON = await userConfig.json();
      let result = {
        accounts: userConfig_JSON.accounts,
        cards: userConfig_JSON.cards,
        incomeCategories: userConfig_JSON.incomeCategories,
        expenseCategories: userConfig_JSON.expenseCategories,
      };
      console.log(`result ${result}`);
      res.status(200).json(result);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
