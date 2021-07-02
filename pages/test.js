function test() {
  let result = [{ Grocery: 200 }, { Shopping: 100 }, { Miscellaneous: 300 }];
  result.map((category, key) => {
    let cat = category;
    console.log(
      `key is ${key} result ${Object.keys(cat)[0]} value is ${
        category[Object.keys(cat)[0]]
      }`
    );
  });
}

test();
