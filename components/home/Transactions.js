function transactions({ transactions }) {
  //console.log(`Transactions in component ${JSON.stringify(transactions)}`);
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-2 border-2 border-gray-300">
      <table className="table-auto w-full">
        {/* <thead>
      <tr className="border-b-2 border-gray-300">
        <th>Title</th>
        <th>Author</th>
        <th>Views</th>
      </tr>
    </thead> */}
        <tbody>
          {transactions.map((trans, key) => (
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
