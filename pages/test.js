const navigation = [
  { Home: "/home" },
  { Transaction: "/transaction" },
  { Budget: "/home" },
  { Reports: "/home" },
];

navigation.map((item, itemindex) => {
  console.log(`Logging : ${JSON.stringify(item)}`);
  for (let key in item) {
    console.log(`Logging : ${key} value : ${item[key]}`);
  }
});
