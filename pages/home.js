/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";

export default function home() {
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
      <main class="bg-gray-50">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div class="flex flex-row text-gray-600">
            <div class="flex-none w-1/4 hidden md:block m-2">
              <div class="grid grid-flow-row gap-4">
                <TopTransactions />
                <Categories />
              </div>
            </div>
            <div class="flex-auto p-2">
              <div class="grid grid-flow-row gap-4">
                <Chart />
                <Transactions />
              </div>
            </div>
            <div class="flex-none w-1/4 hidden md:block p-2">
              <Uncategorized />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
