function toptransactions({ transactions }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2">
      <div className="flex justify-center font-semibold text-blue-500">
        Top Transactions
      </div>

      {transactions.map((trans, key) => (
        <div className="flex justify-between items-center">
          <div className="flex-initial w-3/4">{trans.value.description}</div>
          <div className="text-green-500">{trans.value.amount}</div>
        </div>
      ))}
    </div>
  );
}

export default toptransactions;
