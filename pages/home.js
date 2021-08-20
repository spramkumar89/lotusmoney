/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAvailableMonths } from "../pages/state/homeSlice";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

export default function home() {
  const router = useRouter();
  const dispatch = useDispatch();
  let availableMonths = useSelector((state) => state.home.availableMonths);
  let selectedMonth = useSelector((state) => state.home.selectedMonth);
  let loadTransactionsForMonth = new Date();

  const monthsarr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    dispatch(updateAvailableMonths(loadTransactionsForMonth));
  }, []);

  /* useEffect(async () => {
    if (selectedmonth) {
      let month = monthsarr.indexOf(selectedmonth.split(" ")[0]);
      let year = selectedmonth.split(" ")[1];
      loadTransactionsForMonth.setMonth(month);
      loadTransactionsForMonth.setFullYear(year);
      console.log(`loadTransactionsForMonth ${loadTransactionsForMonth}`);
    }
  }, [selectedmonth]); */

  return (
    <div>
      <NavBar />
      <div className="border border-t-2 border-blue-300"></div>

      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="flex flex-row text-gray-600">
            {/* <div className="flex-none w-1/4 hidden md:block m-2">
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
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
