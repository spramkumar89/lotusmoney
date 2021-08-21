import { useSelector } from "react-redux";

function transactions() {
  const monthlyTransactions = useSelector(
    (state) => state.home.monthlyTransactions
  );
  console.log(
    `Transactions in component ${JSON.stringify(monthlyTransactions)}`
  );
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg">
      <table className="table-auto w-full">
        <thead>
          <tr className="font-mono text-gray-200 bg-yellow-600 p-3">
            <th className="">Transaction Date</th>
            <th className="">Description</th>
            <th className="">Amount</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTransactions.map((trans, key) => (
            <tr className="p-3" key={key}>
              <td className="pl-4 font-mono">{trans.value.date}</td>
              <td className="font-mono">{trans.value.description}</td>
              <td className="font-mono">{trans.value.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default transactions;
