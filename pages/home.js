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
import {
  updateMonthlyTransactions,
  updateAvailableMonths,
  updateTopTransactions,
  updateCategoryWiseAmounts,
  updateUncategorizedTransactions,
} from "../pages/state/homeSlice";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

export default function home() {
  const router = useRouter();
  const dispatch = useDispatch();
  let availableMonths = useSelector((state) => state.home.availableMonths);
  let selectedMonth = useSelector((state) => state.home.selectedMonth);

  useEffect(() => {
    dispatch(updateAvailableMonths());
  }, []);

  useEffect(() => {
    if (selectedMonth) {
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
      let month = monthsarr.indexOf(selectedMonth.split(" ")[0]);
      let year = selectedMonth.split(" ")[1];
      loadTransactionsForMonth.setMonth(month);
      loadTransactionsForMonth.setFullYear(year);
      console.log(
        `Inside the selectedMonth useEffect hook : ${loadTransactionsForMonth}`
      );
      dispatch(updateMonthlyTransactions(loadTransactionsForMonth));
      dispatch(updateTopTransactions(loadTransactionsForMonth));
      dispatch(updateCategoryWiseAmounts(loadTransactionsForMonth));
      dispatch(updateUncategorizedTransactions(loadTransactionsForMonth));
    }
  }, [selectedMonth]);

  return (
    <div>
      <NavBar showMonth={true} />
      <div className="border border-t-2 border-blue-300"></div>

      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
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
                <Transactions />
              </div>
            </div>
            <div className="flex-none w-1/4 hidden md:block p-2">
              <Uncategorized />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
