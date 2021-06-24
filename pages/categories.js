/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import Categories from "../components/categories/Categories";
import AddCategory from "../components/categories/AddCategory";

export default function home() {
  return (
    <div className="bg-gray-50">
      <NavBar />
      <main className="bg-gray-50">
        <div className="grid grid-flow-col gap-4 max-w-lg mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col text-gray-600 mt-2">
            <AddCategory />
            <div className="flex flex-col text-gray-600 mt-2">
              <div className="flex flex-row bg-blue-300 p-2 rounded-md justify-center font-semibold uppercase text-yellow-50">
                <div className="pl-2">Categories</div>
              </div>
              <Categories />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
