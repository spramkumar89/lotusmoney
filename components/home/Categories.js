function categories() {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2">
      <div className="flex justify-center font-semibold text-blue-500">
        Categories
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Internet Bill</div>
        <div className="text-green-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Electricity Bill</div>
        <div className="text-red-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Telephone Bill</div>
        <div className="text-red-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Petrol</div>
        <div className="text-red-500">100</div>
      </div>
    </div>
  );
}

export default categories;
