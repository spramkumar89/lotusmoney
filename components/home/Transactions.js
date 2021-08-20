import { useSelector } from "react-redux";

function transactions() {
  const monthlyTransactions = useSelector(
    (state) => state.home.monthlyTransactions
  );
  console.log(
    `Transactions in component ${JSON.stringify(monthlyTransactions)}`
  );
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-2">
      <table className="table-auto w-full">
        {/* <thead>
      <tr className="border-b-2 border-gray-300">
        <th>Title</th>
        <th>Author</th>
        <th>Views</th>
      </tr>
    </thead> */}
        <tbody>
          {monthlyTransactions.map((trans, key) => (
            <tr className="border-b-2 border-gray-200 px-3" key={key}>
              <td>{trans.value.date}</td>
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
