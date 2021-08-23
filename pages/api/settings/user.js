// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      console.log(
        `Prod URL : ${process.env.DBURL}/${req.query.name}/userconfig`
      );
      let userConfig = await fetch(
        `${process.env.DBURL}/${req.query.name}/userconfig`
      );
      if (!userConfig.ok) {
        console.log(`UserConfig API error has occured: ${userConfig.status}`);
        userConfig.rows = "NO_SETTINGS";
        console.log(`Reponse NOT OK`);
        res.status(400).json(userConfig);
      }
      const userConfig_JSON = await userConfig.json();
      res.status(200).json(userConfig_JSON);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
