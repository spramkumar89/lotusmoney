import { useSelector } from "react-redux";

function uncategorized() {
  const uncategorizedTransactions = useSelector(
    (state) => state.home.uncategorizedTransactions
  );
  return (
    <div className="grid grid-flow-row gap-4">
      <div className="bg-gray-200 rounded-lg shadow-lg p-2">
        <div className="flex justify-center font-semibold text-blue-500">
          Uncategorised Transactions
        </div>

        {uncategorizedTransactions.map((trans, key) => (
          <div className="flex justify-between items-center" key={key}>
            <div className="flex-initial w-3/4">{trans.value.description}</div>
            <div className="text-green-500">{trans.value.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default uncategorized;
