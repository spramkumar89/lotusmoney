/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import SettingCard from "../components/settings/SettingCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

export default function home() {
  const router = useRouter();
  const [incomeCategories, setincomeCategories] = useState([]);
  const [expenseCategories, setexpenseCategories] = useState([]);
  const [accounts, setaccounts] = useState([]);
  const [cards, setcards] = useState([]);

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
      userConfigs.accounts = [];
      userConfigs.cards = [];
      userConfigs.incomeCategories = [];
      userConfigs.expenseCategories = [];
    }
    let userConfigs_JSON = await userConfigs.json();
    console.log(`userConfigs_JSON ${JSON.stringify(userConfigs_JSON)}`);
    setincomeCategories(userConfigs_JSON.incomeCategories);
    setexpenseCategories(userConfigs_JSON.expenseCategories);
    setaccounts(userConfigs_JSON.accounts);
    setcards(userConfigs_JSON.cards);
  }, []);

  return (
    <div className="bg-gray-50">
      <NavBar />
      <main className="bg-gray-50 max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-indigo-900 font-mono uppercase bg-indigo-300 py-1">
              Accounts
            </div>
            <SettingCard settings={accounts} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-indigo-900 font-mono uppercase bg-indigo-300 py-1">
              Cards
            </div>
            <SettingCard settings={cards} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-indigo-900 font-mono uppercase bg-indigo-300 py-1">
              Income Categories
            </div>
            <SettingCard settings={incomeCategories} />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-indigo-900 font-mono uppercase bg-indigo-300 py-1">
              Expense Categories
            </div>
            <SettingCard settings={expenseCategories} />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 h-16 w-16">
          <button class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              enable-background="new 0 0 20 20"
              class="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              ></path>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
