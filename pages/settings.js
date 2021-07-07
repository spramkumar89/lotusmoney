/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import SettingCard from "../components/settings/SettingCard";
import AddButton from "../components/settings/AddButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

export default function home() {
  const router = useRouter();
  let userConfigs_JSON = {};
  userConfigs_JSON.accounts = [];
  userConfigs_JSON.cards = [];
  userConfigs_JSON.incomeCategories = [];
  userConfigs_JSON.expenseCategories = [];
  userConfigs_JSON.goals = [];
  let [userconfig, setuserconfig] = useState(userConfigs_JSON);

  useEffect(async () => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);

    // Loading USER_SETTINGS
    const userConfigs = await fetch(
      "/api/settings/load?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!userConfigs.ok) {
      console.log(`User config API error has occured: ${userConfigs}`);
    }
    userConfigs_JSON = await userConfigs.json();
    console.log(`userConfigs_JSON : ${JSON.stringify(userConfigs_JSON)}`);
    setuserconfig(userConfigs_JSON);
  }, []);

  return (
    <div className="bg-gray-50">
      <NavBar />
      <main className="bg-gray-50 max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 relative">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Accounts
            </div>
            <SettingCard userconfig={userconfig} data={"Accounts"} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Cards
            </div>
            <SettingCard userconfig={userconfig} data={"Cards"} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Income Categories
            </div>
            <SettingCard userconfig={userconfig} data={"IncomeCategories"} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Expense Categories
            </div>
            <SettingCard userconfig={userconfig} data={"ExpenseCategories"} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Goals
            </div>
            <SettingCard userconfig={userconfig} data={"Goals"} />
          </div>
        </div>

        <div className="fixed bottom-0 right-0 h-16 w-16">
          <AddButton userconfig={userconfig} setuserconfig={setuserconfig} />
        </div>
      </main>
    </div>
  );
}
