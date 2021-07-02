/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import Categories from "../components/categories/Categories";
import AddCategory from "../components/categories/AddCategory";

export default function home({ userCategories }) {
  return (
    <div className="bg-gray-50">
      <NavBar />
      <main className="bg-gray-50">
        <div className="grid grid-flow-col gap-4 max-w-lg mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col text-gray-600 mt-2">
            <AddCategory />
            <div className="flex flex-col text-gray-600 mt-2">
              <div className="flex flex-row bg-blue-200 p-2 rounded-md justify-center font-semibold uppercase text-gray-400">
                <div className="pl-2">Categories</div>
              </div>
              <Categories categories={userCategories} />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  let userRes = await fetch(`http://admin:password@localhost:5984/test/test`);
  if (!userRes.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    userRes.rows = "NO_USER_RECORD";
  }
  let userResJSON = await userRes.json();
  let categories = userResJSON.categories;
  console.log("categories : " + categories);
  return {
    props: {
      userCategories: categories,
    },
  };
}
