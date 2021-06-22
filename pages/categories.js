/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import Categories from "../components/categories/Categories";

export default function home() {
  return (
    <div className="bg-gray-50">
      <NavBar />
      {/*
      <header classNameName="bg-gray-700 text-yellow-500 shadow">
        <div classNameName="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <h3 classNameName="text-xl font-bold">LOTUS MONEY</h3>
        </div>
      </header>
      */}
      <main className="bg-gray-50">
        <div className="max-w-md mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col text-gray-600">
            <div className="flex flex-row justify-between bg-blue-300 p-2 rounded-md items-center">
              <div className="pl-2">Categories</div>
              <div className="bg-blue-500 rounded-md px-4 text-indigo-100 pb-1">
                +
              </div>
            </div>
            <Categories />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
