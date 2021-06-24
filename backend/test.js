const Nano = require("nano");
const nano = Nano("http://admin:password@localhost:5984");

async function category() {
  try {
    const db = nano.use("test");
    let response = await db.get("category");
    console.log(`response : ` + response);
  } catch (e) {
    console.log(e);
  }
}

category();
