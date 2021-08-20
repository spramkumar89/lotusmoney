import { useSelector } from "react-redux";

function toptransactions({ transactions }) {
  const topTransactions = useSelector((state) => state.home.topTransactions);
  console.log(`toptransactions props ${topTransactions}`);
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-center font-semibold text-gray-200 bg-yellow-600 rounded-t-lg p-1">
        Top Transactions
      </div>

      {topTransactions.map((trans, key) => (
        <div className="flex justify-between items-center p-2" key={key}>
          <div className="flex-initial w-3/4">{trans.value.description}</div>
          <div className="text-green-500">{trans.value.amount}</div>
        </div>
      ))}
    </div>
  );
}

export default toptransactions;
