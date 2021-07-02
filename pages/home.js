/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";

export default function home({
  monthlytransactions,
  toptransactions,
  categoryWiseAmounts,
  uncategorizedTrans,
}) {
  return (
    <div>
      <NavBar />
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="flex flex-row text-gray-600">
            <div className="flex-none w-1/4 hidden md:block m-2">
              <div className="grid grid-flow-row gap-4">
                <TopTransactions transactions={toptransactions} />
                <Categories categoryAmount={categoryWiseAmounts} />
              </div>
            </div>
            <div className="flex-auto p-2">
              <div className="grid grid-flow-row gap-4">
                <Chart transactions={monthlytransactions} />
                <Transactions transactions={monthlytransactions} />
              </div>
            </div>
            <div className="flex-none w-1/4 hidden md:block p-2">
              <Uncategorized uncategorizedTransactions={uncategorizedTrans} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const monthly_trans_res = await fetch(
    `http://admin:password@localhost:5984/test/_design/lotus/_view/monthlytransactions?startkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","01"]&endkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","31"]`
  );
  if (!monthly_trans_res.ok) {
    const message = `An error has occured: ${monthly_trans_res.status}`;
    monthly_transaction_res.rows = "NO_TRANSACTIONS_AVAILABLE";
  }
  const monthly_transaction_res = await monthly_trans_res.json();
  //console.log(`Monthly transaction response row ${JSON.stringify(monthly_transaction_res.rows)}`);

  const top_trans_res = await fetch(
    `http://admin:password@localhost:5984/test/_design/lotus/_view/toptransactions?descending=true&limit=5`
  );
  if (!top_trans_res.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    top_transaction_res.rows = "NO_TRANSACTIONS_AVAILABLE";
  }
  const top_transaction_res = await top_trans_res.json();
  //console.log(`Monthly transaction response row ${JSON.stringify(top_transaction_res.rows)}`);

  let categoryWise = await loadCategoryValues();
  //console.log(`categoryWise response row ${JSON.stringify(categoryWise)}`);

  let uncategorized = await loadUncategorized();

  return {
    props: {
      monthlytransactions: monthly_transaction_res.rows,
      toptransactions: top_transaction_res.rows,
      categoryWiseAmounts: categoryWise,
      uncategorizedTrans: uncategorized.rows,
    },
  };
}

async function loadCategoryValues() {
  let userRes = await fetch(`http://admin:password@localhost:5984/test/test`);
  if (!userRes.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    userRes.rows = "NO_USER_RECORD";
  }
  let userResJSON = await userRes.json();
  //console.log(`userResJSON : ${JSON.stringify(userResJSON)}`);
  let Categories = userResJSON.categories;
  //console.log(`categories : ${Categories}`);

  let categoryValues = await Promise.all(
    Categories.map(async (category) => {
      const catRes = await fetch(
        `http://admin:password@localhost:5984/test/_design/lotus/_view/monthlycategories?key=\"${category}\"`
      );
      const catResJSON = await catRes.json();
      let result = {};
      if (catResJSON["rows"].length == 0) {
        const message = `An error has occured: ${catRes.status}`;
      } else {
        result[category] = await catResJSON["rows"][0].value;
      }
      return result;
    })
  );

  //console.log(`Final Category Values ${JSON.stringify(categoryValues)}`);
  return categoryValues;
}

async function loadUncategorized() {
  const monthly_uncategorized_res = await fetch(
    `http://admin:password@localhost:5984/test/_design/lotus/_view/uncategorized?startkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","01"]&endkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","31"]`
  );

  if (!monthly_uncategorized_res.ok) {
    const message = `An error has occured: ${monthly_uncategorized_res.status}`;
    monthly_uncategorized_res.rows = "NO_TRANSACTIONS_AVAILABLE";
  }

  const uncategorizedTrans = await monthly_uncategorized_res.json();
  return uncategorizedTrans;
}
