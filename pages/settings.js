import NavBar from "../components/NavBar";
import SettingCard from "../components/settings/SettingCard";
import AddButton from "../components/settings/AddButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../backend/state/userSlice";
import { loadAppConfig } from "../backend/state/appConfigSlice";

export default function home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAppConfig());
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
