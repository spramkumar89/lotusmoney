import { cloneDeep } from "lodash";

export default async function handler(req, res) {
  let response = {};
  switch (req.method) {
    case "GET":
      let category_res = await fetch(
        `${process.env.DBURL}/${req.query.name}/userconfig`
      );
      if (!category_res.ok) {
        console.log(`An error has occured: ${category_res.status}`);
        category_res = "NO_USER_RECORD";
      }
      let category_resJSON = await category_res.json();
      let Categories = category_resJSON.incomeCategories;
      let incomeCategoryValues = await Promise.all(
        Categories.map(async (category) => {
          const catRes = await fetch(
            `${process.env.DBURL}/${req.query.name}/_design/lotus/_view/monthlycategories?key=[\"${req.query.year}\",\"${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}\",\"${category}\"]`
          );
          
          const catResJSON = await catRes.json();
          let result = {};
          if (catResJSON["rows"].length != 0) {
            result[category] = await catResJSON["rows"][0].value;
          }
          return result;
        })
      );

      Categories = category_resJSON.expenseCategories;
      let expenseCategoryValues = await Promise.all(
        Categories.map(async (category) => {
          const catRes = await fetch(
            `${process.env.DBURL}/${req.query.name}/_design/lotus/_view/monthlycategories?key=[\"${req.query.year}\",\"${("0" + (parseInt(req.query.month) + 1)).slice(
          -2
        )}\",\"${category}\"]`
          );
          
          const catResJSON = await catRes.json();
          let result = {};
          if (catResJSON["rows"].length != 0) {
            result[category] = await catResJSON["rows"][0].value;
          }
          return result;
        })
      );

      let categoryValues = [];
      incomeCategoryValues.forEach((item,index)=>{
        if(Object.keys(item).length !== 0){
          categoryValues.push(item);
        }
      });
      expenseCategoryValues.forEach((item,index)=>{
        if(Object.keys(item).length !== 0){
          categoryValues.push(item);
        }
      });
      console.log(`categoryValues : ${JSON.stringify(categoryValues)}`);
      res.status(200).json(categoryValues);
      break;
    default:
      res.send(
        `API invoked method ${req.method} is not available, please pass one of the following methods (POST, GET, PUT, DELETE)`
      );
  }
}
