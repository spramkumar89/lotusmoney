import { useSelector } from "react-redux";

function toptransactions({ transactions }) {
  const topTransactions = useSelector((state) => state.home.topTransactions);
  console.log(`toptransactions props ${topTransactions}`);
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-2">
      <div className="flex justify-center font-semibold text-blue-500">
        Top Transactions
      </div>

      {topTransactions.map((trans, key) => (
        <div className="flex justify-between items-center" key={key}>
          <div className="flex-initial w-3/4">{trans.value.description}</div>
          <div className="text-green-500">{trans.value.amount}</div>
        </div>
      ))}
    </div>
  );
}

export default toptransactions;
