function test() {
  let date = "2021-07-10";
  let splitDate = date.split("-");
  let checkMonth = splitDate[0] + splitDate[1];
  let currentDate = new Date();
  let currentMonth =
    currentDate.getFullYear() + ("0" + (currentDate.getMonth() + 1)).slice(-2);
  console.log("Current Month" + currentMonth);
}

test();
