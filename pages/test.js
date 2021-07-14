var XLSX = require("xlsx");
var workbook = XLSX.readFile(
  "C:\\Users\\ramkumar.p\\Desktop\\kotak_statement.csv"
);
var sheet_name_list = workbook.SheetNames;
console.log(
  JSON.stringify(
    XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
      raw: false,
    })
  )
);

console.log(workbook.Sheets[sheet_name_list[0]], {
  raw: false,
});
