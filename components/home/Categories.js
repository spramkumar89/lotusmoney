function categories({ categoryAmount }) {
  //console.log(`Category in component ${JSON.stringify(categoryAmount)}`);
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2">
      <div className="flex justify-center font-semibold text-blue-500">
        Categories
      </div>

      {categoryAmount.map((category, key) => (
        <div className="flex justify-between items-center" key={key}>
          <div className="flex-initial w-3/4">{Object.keys(category)[0]}</div>
          <div className="text-green-500">
            {category[Object.keys(category)[0]]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default categories;
