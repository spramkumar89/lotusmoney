/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";

export default function home({ monthlytransactions }) {
  return (
    <div>
      <NavBar />
      {/*
      <header className="bg-gray-700 text-yellow-500 shadow">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">LOTUS MONEY</h3>
        </div>
      </header>
      */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-row text-gray-600">
            <div className="flex-none w-1/4 hidden md:block m-2">
              <div className="grid grid-flow-row gap-4">
                <TopTransactions />
                <Categories />
              </div>
            </div>
            <div className="flex-auto p-2">
              <div className="grid grid-flow-row gap-4">
                <Chart />
                <Transactions transactions={monthlytransactions} />
              </div>
            </div>
            <div className="flex-none w-1/4 hidden md:block p-2">
              <Uncategorized />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `http://admin:password@localhost:5984/test/_design/lotus/_view/monthlytransactions?startkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","01"]&endkey=["2021",\"${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}\","31"]`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const res = await response.json();
  console.log(`Monthly transaction response ${JSON.stringify(res)}`);
  console.log(`Monthly transaction response row ${JSON.stringify(res.rows)}`);

  return {
    props: {
      monthlytransactions: res.rows,
    },
  };
}
