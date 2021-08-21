import { useSelector } from "react-redux";

function categories() {
  const categoryWiseAmounts = useSelector(
    (state) => state.home.categoryWiseAmounts
  );
  console.log(`Category in component : ${JSON.stringify(categoryWiseAmounts)}`);
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-center font-mono text-gray-200 bg-yellow-600 rounded-t-lg p-1">
        Categories
      </div>

      {categoryWiseAmounts.map((category, key) => (
        <div className="flex justify-between items-center px-2 py-1" key={key}>
          <div className="flex-initial w-3/4 font-mono">
            {Object.keys(category)[0]}
          </div>
          <div className="text-green-500">
            {category[Object.keys(category)[0]]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default categories;
