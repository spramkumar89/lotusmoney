/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import TopTransactions from "../components/home/TopTransactions";
import Categories from "../components/home/Categories";
import Chart from "../components/home/Chart";
import Transactions from "../components/home/Transactions";
import Uncategorized from "../components/home/Uncategorized";
import { useEffect } from "react";
import { loadUser } from "../backend/state/userSlice";
import { loadAppConfig } from "../backend/state/appConfigSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMonthlyTransactions,
  updateAvailableMonths,
  updateTopTransactions,
  updateCategoryWiseAmounts,
  updateUncategorizedTransactions,
} from "../backend/state/homeSlice";

export default function home() {
  const dispatch = useDispatch();
  let selectedMonth = useSelector((state) => state.home.selectedMonth);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAppConfig());
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

      <main className="bg-gray-50 max-w-7xl mx-auto py-2 ">
        <div className="">
          <div className="flex flex-col md:flex-row text-gray-600">
            <div className="flex-none md:w-1/4 m-2 pr-4 md:p-0">
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
            <div className="flex-none md:w-1/4 p-2">
              <Uncategorized />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
