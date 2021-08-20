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
      <table className="table-auto w-full rounded-lg">
        <thead>
          <tr className="font-semibold text-gray-200 bg-yellow-600 rounded-t-lg p-1">
            <th>Title</th>
            <th>Author</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTransactions.map((trans, key) => (
            <tr className="p-3" key={key}>
              <td className="pl-4">{trans.value.date}</td>
              <td>{trans.value.description}</td>
              <td>{trans.value.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default transactions;
