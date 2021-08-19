import NavBar from "../components/NavBar";
import SettingCard from "../components/settings/SettingCard";
import AddButton from "../components/settings/AddButton";
import { useEffect } from "react";
import { getSession } from "next-auth/client";
import { useSelector, useDispatch } from "react-redux";
import { loadUserState } from "./state/userSlice";
import { loadAppConfig } from "./state/appConfigSlice";

export default function home() {
  const dispatch = useDispatch();
  const incomeCategories = useSelector(
    (state) => state.appConfig.incomeCategories
  );
  const expenseCategories = useSelector(
    (state) => state.appConfig.expenseCategories
  );
  const goals = useSelector((state) => state.appConfig.goals);
  const accounts = useSelector((state) => state.user.accounts);
  const cards = useSelector((state) => state.user.cards);

  //Loading User Accounts and Cards
  useEffect(async () => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);
    const userConfigs = await fetch(
      "/api/settings/user?" +
        new URLSearchParams({ name: session.user.name.toLowerCase() }),
      { method: "GET" }
    );
    if (!userConfigs.ok) {
      console.log(`User config API error has occured: ${userConfigs}`);
    }
    let userConfigs_JSON = await userConfigs.json();
    console.log(`Loading user record : ${JSON.stringify(userConfigs_JSON)}`);

    dispatch(loadUserState(userConfigs_JSON));
  }, []);

  //Loading User Goals, Income/Expense Categories
  useEffect(async () => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);
    const apiConfigs = await fetch(
      "/api/settings/appConfig?" +
        new URLSearchParams({ name: session.user.name.toLowerCase() }),
      { method: "GET" }
    );
    if (!apiConfigs.ok) {
      console.log(`App config API error has occured: ${apiConfigs}`);
    }
    let apiConfigs_JSON = await apiConfigs.json();
    console.log(
      `Loading apiConfig record : ${JSON.stringify(apiConfigs_JSON)}`
    );

    dispatch(loadAppConfig(apiConfigs_JSON));
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
            <SettingCard data="Accounts" />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Cards
            </div>
            <SettingCard data="Cards" />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Income Categories
            </div>
            <SettingCard data="IncomeCategories" />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Expense Categories
            </div>
            <SettingCard data="ExpenseCategories" />
          </div>

          <div className="flex flex-col bg-gray-200 rounded-md shadow-lg h-64 w-screen/2 justify-items-center overflow-x-auto">
            <div className="text-center text-xl text-gray-200 font-mono uppercase bg-indigo-300 py-1">
              Goals
            </div>
            <SettingCard data="Goals" />
          </div>
        </div>

        <div className="fixed bottom-0 right-0 h-16 w-16">
          <AddButton />
        </div>
      </main>
    </div>
  );
}
