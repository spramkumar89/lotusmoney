/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

export default function home() {
  const router = useRouter();
  const [monthlytransactions, setmonthlytransactions] = useState([]);
  const [toptransactions, settoptransactions] = useState([]);
  const [categoryWiseAmounts, setcategoryWiseAmounts] = useState([]);
  const [uncategorizedTrans, setuncategorizedTrans] = useState([]);

  useEffect(async () => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);

    // Loading MONTHLY_TRANSACTIONS ******************************************************************
    const monthly_transaction_res = await fetch(
      "/api/home/monthlytransaction?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!monthly_transaction_res.ok) {
      console.log(`An error has occured: ${monthly_transaction_res}`);
      monthly_transaction_res.rows = "NO_USER_RECORD";
    }
    let monthly_transaction_res_JSON = await monthly_transaction_res.json();
    console.log(
      `monthlytransactions ${JSON.stringify(monthly_transaction_res_JSON)}`
    );
    setmonthlytransactions(monthly_transaction_res_JSON.rows);

    // Loading TOP_TRANSACTIONS ******************************************************************
    const top_transaction_res = await fetch(
      "/api/home/toptransactions?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!top_transaction_res.ok) {
      console.log(`An error has occured: ${top_transaction_res}`);
      top_transaction_res.rows = "NO_USER_RECORD";
    }
    let top_transaction_res_JSON = await top_transaction_res.json();
    console.log(`toptransactions ${JSON.stringify(top_transaction_res_JSON)}`);
    settoptransactions(top_transaction_res_JSON.rows);

    // Loading CATEGORY_WISE_TRANSACTIONS ******************************************************************
    let categoryWise = await fetch(
      "/api/home/categoryvalues?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!categoryWise.ok) {
      console.log(`An error has occured: ${categoryWise}`);
    }
    console.log(`categoryWise result : ${categoryWise}`);
    let categoryWise_JSON = await categoryWise.json();
    console.log(`categoryWise ${JSON.stringify(categoryWise_JSON)}`);
    setcategoryWiseAmounts(categoryWise_JSON);

    //Loading UNCATEGORIZED ******************************************************************
    const uncategorized = await fetch(
      "/api/home/uncategorized?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!uncategorized.ok) {
      console.log(`An error has occured: ${uncategorized}`);
      uncategorized.rows = "NO_USER_RECORD";
    }
    let uncategorized_JSON = await uncategorized.json();
    console.log(`uncategorized ${JSON.stringify(uncategorized_JSON)}`);
    setuncategorizedTrans(uncategorized_JSON.rows);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="border border-t-2 border-blue-300"></div>

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
