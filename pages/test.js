async function test() {
  const response = await fetch(
    "http://admin:password@localhost:5984/test/_design/lotus/_view/monthlytransactions"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const res = await response.json();
  console.log(`Monthly transaction response ${JSON.stringify(res)}`);
  console.log(`Monthly transaction response row ${JSON.stringify(res.rows)}`);
}

test();
